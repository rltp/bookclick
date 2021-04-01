from pipeline.shared.context import JobContext

from pyspark.ml.recommendation import ALS
from pyspark.ml.tuning import ParamGridBuilder, CrossValidator
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.sql.types import *
from pyspark.sql.functions import *


def run(sc, environment):
    context = JobContext(sc, environment)

    struct = StructType([
        StructField("user_id", LongType(), True),
        StructField("book_id", LongType(), True),
        StructField("score", IntegerType(), True)
    ])

    context.log("INFO", "Loading ratings data...")

    ratings_file = context.load_static_file('ratings.csv', 'csv', struct)
    
    ratings_db = (context
    	.load_db('Ratings')
    	.selectExpr(
    		'cast(conv(user_id, 16, 10) as long) as user_id',
    		'cast(book_id as long)',
    		'score'
    		)
    	)
  
    
    ratings = ratings_db.join(ratings_file, ["user_id", "book_id", "score"], "left")
    
    (train, test) = ratings.randomSplit([0.1, 0.9], seed = 2020)

    context.log("INFO", "Training the ALS model...")
    
    als = ALS(
        userCol="user_id",
        itemCol="book_id",
        ratingCol="score",
        nonnegative=True,
        implicitPrefs=False,
        coldStartStrategy="drop"
    )

    param_grid = (ParamGridBuilder()
        .addGrid(als.rank, [10, 50, 100, 150])
        .addGrid(als.regParam, [.01, .05, .1, .15])
        .build()
    )

    evaluator = RegressionEvaluator(
        metricName="rmse",
        labelCol="score",
        predictionCol="prediction"
    )

    context.log("INFO", "Num models to be tested : %s" % len(param_grid))

    cv = CrossValidator(estimator=als, estimatorParamMaps=param_grid, evaluator=evaluator, numFolds=5)

    context.log("INFO", "Cross Validator done !")

    # Fit cross validator to the 'train' dataset
    model = cv.fit(train)
    # Extract best model from the cv model above
    best_model = model.bestModel
    # View the predictions
    test_predictions = best_model.transform(test)

    context.log("INFO", "**Best Model**")
    context.log("INFO", "> RMSE: %s" % evaluator.evaluate(test_predictions))
    context.log("INFO", "> Rank: %s" % best_model._java_obj.parent().getRank())
    context.log("INFO", "> MaxIter: %s" % best_model._java_obj.parent().getMaxIter())
    context.log("INFO", "> RegParam: %s" % best_model._java_obj.parent().getRegParam())

    model = best_model.fit(ratings)

    context.log("INFO", "ALS model built!")

    model.save("s3a://pipeline-jobs/als_model")

    context.log("INFO", "ALS model save!")

    # The follow code need to be remove when the online pipeline will be deploy.
    
    # Generate n recommendations for all users
    recommendations = model.recommendForAllUsers(numItems=72)

    cleaned = (recommendations
        .withColumn("predicted", explode("recommendations"))
        .select('user_id', col("predicted.book_id"), col("predicted.rating"))
    ).selectExpr("user_id", "book_id", "rating as prediction")

    # Recommendations for unread books
    unrated_books = (cleaned
        .join(ratings, ["user_id", "book_id"], "left")
        .filter(ratings.rating.isNull())
    )

    top_recommendations = unrated_books.select('user_id', 'book_id', 'prediction')

    w = Window().partitionBy("user_id").orderBy(col("prediction").desc())

    top10 = (top_recommendations
        .withColumn("rn", row_number().over(w))
        .where((col("rn") <= 10))
        .select("user_id", "book_id", "prediction")
        .orderBy(col('user_id'), col('prediction').desc())
    )

    context.save_db('ALS', top10)

    context.log("INFO", "Top 10 recommendations saved to the DataBase !")
