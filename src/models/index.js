import { Product, ProductSchema } from "./product_model.js";
import { Cart, CartSchema } from "./cart_model.js";
import { Customer, CustomerSchema } from "./customer_model.js";
import { Preference, PreferenceSchema } from "./preferensi_model.js";
import {Seller, SellerSchema } from "./seller_model.js";

const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Preference.init(PreferenceSchema, Preference.config(sequelize))
  Seller.init(SellerSchema, Seller.config(sequelize));

  Cart.belongsTo(Product, { foreignKey: "product_id" });
  
  Customer.hasOne(Cart, {foreignKey: "customer_id"})
  Cart.belongsTo(Customer, { foreignKey: "customer_id" });

  Preference.hasOne(Customer, { foreignKey: 'pref_id' });
  Customer.belongsTo(Preference, { foreignKey: "pref_id" })
};

export default setupModels;
