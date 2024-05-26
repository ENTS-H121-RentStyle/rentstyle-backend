import { Product, ProductSchema } from "./product_model.js";
import { Cart, CartSchema } from "./cart_model.js";
// import { Customer, CustomerSchema } from "./customer_model.js";

const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  // Customer.init(CustomerSchema, Customer.config(sequelize))

  Cart.belongsTo(Product, { foreignKey: "product_id" });
  Product.hasMany(Cart, { foreignKey: "product_id" });

  // Cart.belongsTo(Customer, {foreignKey: "customer_id"})
  // Customer.hasMany(Cart, { foreignKey: "customer_id"})
};

export default setupModels;
