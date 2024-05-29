import { Product, ProductSchema } from "./product_model.js";
import { Cart, CartSchema } from "./cart_model.js";
import { Customer, CustomerSchema } from "./customer_model.js";
import { Preference, PreferenceSchema } from "./preferensi_model.js";
import {Seller, SellerSchema } from "./seller_model.js";
import { Favorite, FavoriteSchema } from "./favorite_model.js";

const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Preference.init(PreferenceSchema, Preference.config(sequelize))
  Seller.init(SellerSchema, Seller.config(sequelize));
  Favorite.init(FavoriteSchema, Favorite.config(sequelize));

  Product.belongsTo(Seller, { foreignKey: "seller_id"});
  Seller.hasMany(Product, { foreignKey: "seller_id" });

  Cart.belongsTo(Product, { foreignKey: "product_id" });
  Favorite.belongsTo(Product, { foreignKey: "product_id" });
  
  Customer.hasMany(Cart, {foreignKey: "customer_id"});
  Cart.belongsTo(Customer, { foreignKey: "customer_id" });

  Customer.hasMany(Favorite, { foreignKey: "customer_id" }),  
  Favorite.belongsTo(Customer, { foreignKey: "customer_id" });


  Customer.hasOne(Preference, { foreignKey: 'pref_id' });
  Preference.belongsTo(Customer, { foreignKey: "customer_id" });
};

export default setupModels;
