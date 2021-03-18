import { DataTypes } from "sequelize"

const Recommenders = (sequelize, DataTypes) => {
  const ALS = sequelize.define('als', {
      user_id: DataTypes.STRING,
      book_id: DataTypes.STRING,
      prediction: DataTypes.DECIMAL(2)
  },
  {
    timestamps: false
  });

  const Cosim = sequelize.define('cosim', {
      book_i: DataTypes.STRING,
      book_j: DataTypes.STRING,
      similarity: DataTypes.DECIMAL(2)
    },
    {
      timestamps: false
    });

  Cosim.associate = models => {
    Cosim.belongsTo(models.Book, { foreignKey: 'book_i' });
    Cosim.belongsTo(models.Book, { foreignKey: 'book_j' });
  };

  Cosim.similarityTop = () =>{
    //"SELECT C.book_j, B.title FROM public.Cosim JOIN public.Books ON C.book_i = B.book_id WHERE book_i = :book_i ORDER BY similarity DESC"
  }

  ALS.colaborativeTop = (user_id) =>{
    //"SELECT A.book_id, B.title, A.prediction FROM public.ALs JOIN public.Books B ON A.book_id = B.book_id WHERE user_id = :user_id ORDER BY prediction DESC"
  }

  ALS.colaborativeScore = (user_id, book_id) => {
    //"SELECT A.book_id, B.title, A.prediction FROM public.ALs JOIN public.Books B ON A.book_id = B.book_id WHERE user_id = 55 AND book_id = 55",
  }

  return { ALS, Cosim };
};

module.exports = Recommenders