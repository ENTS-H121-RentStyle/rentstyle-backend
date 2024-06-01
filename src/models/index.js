import { Product, ProductSchema } from "./product_model.js";
import { Cart, CartSchema } from "./cart_model.js";
import { User, UserSchema } from "./user_model.js";
import { Preference, PreferenceSchema } from "./preference_model.js";
import { Seller, SellerSchema } from "./seller_model.js";
import { Favorite, FavoriteSchema } from "./favorite_model.js";
import { Constanta, ConstSchema } from "./constanta_model.js";
import { Size, SizeSchema } from "./size_model.js";

const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  Size.init(SizeSchema, Size.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Preference.init(PreferenceSchema, Preference.config(sequelize));
  Seller.init(SellerSchema, Seller.config(sequelize));
  Favorite.init(FavoriteSchema, Favorite.config(sequelize));
  Constanta.init(ConstSchema, Constanta.config(sequelize));

  Product.belongsTo(Seller, { foreignKey: "seller_id" });
  Seller.hasMany(Product, { foreignKey: "seller_id" });

  Cart.belongsTo(Product, { foreignKey: "product_id" });
  Favorite.belongsTo(Product, { foreignKey: "product_id" });

  User.hasMany(Cart, { foreignKey: "user_id" });
  Cart.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Favorite, { foreignKey: "user_id" });
  Favorite.belongsTo(User, { foreignKey: "user_id" });

  User.hasOne(Preference, { foreignKey: "pref_id" });
  Preference.belongsTo(User, { foreignKey: "user_id" });

  Size.belongsTo(Product, { foreignKey: "product_id" });
};

export default setupModels;
