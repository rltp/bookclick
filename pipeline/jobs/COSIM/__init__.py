
from pipeline.shared.context import JobContext

from pyspark.sql.types import *
import pyspark.sql.functions as psf

from pyspark.ml.feature import HashingTF, IDF, Normalizer

from pyspark.ml.linalg import DenseVector


def run(sc, environment):
    context = JobContext(sc, environment)

    context.log("INFO", "Loading DB books data...")
    books = context.load_db('Books')

    context.log("INFO", "Saving ratings data...")
    
    items = books_file.withColumn("tag_array", psf.split(psf.regexp_replace("tag_name", " ", ""), ','))

    hashingTF = HashingTF(inputCol="tag_array", outputCol="tf")

    tf = hashingTF.transform(items)

    idf = IDF(inputCol="tf", outputCol="feature").fit(tf)
    tfidf = idf.transform(tf)

    normalizer = Normalizer(inputCol="feature", outputCol="norm")
    data = normalizer.transform(tfidf)

    dot_udf = psf.udf(lambda x, y: float(sum(x * DenseVector(y)[3])), DoubleType())

    computed = data.alias("i").join(data.alias("j"), psf.col("i.book_id") < psf.col("j.book_id"))\
        .select(
            psf.col("i.book_id").alias("i"),
            psf.col("j.book_id").alias("j"),
            dot_udf("i.norm", "j.norm").alias("dot"))\
        .sort("i", "j")

    computed.show(10)

    context.save_db('Books', computed)
