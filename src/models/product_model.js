import { Model, DataTypes } from "sequelize"

const TABLE_NAME = "products"

class Product extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: TABLE_NAME,
      modelName: "Product",
      timestamps: true,
    }
  }
}

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: "product_id"
  },
  product_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  seller_id:{
    allowNull: false,
    type: DataTypes.STRING
  },
  category: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING
  },
  color: {
    allowNull: false,
    type: DataTypes.STRING
  },
  size: {
    allowNull: false,
    type: DataTypes.STRING
  },
  desc: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  rent_price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  product_price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
}

export { Product, ProductSchema }