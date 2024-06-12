import { Product, ProductSchema } from "./product_model.js";
import { Cart, CartSchema } from "./cart_model.js";
import { User, UserSchema } from "./user_model.js";
import { Preference, PreferenceSchema } from "./preference_model.js";
import { Seller, SellerSchema } from "./seller_model.js";
import { Favorite, FavoriteSchema } from "./favorite_model.js";
// import { Size, SizeSchema } from "./size_model.js";
// import { Collection, CollectionSchema } from "./collection_model.js";
// import { Follow, FollowSchema } from "./follow_model.js";
import { Order, OrderSchema } from "./order_model.js";
import { Review, ReviewSchema } from "./review_model.js";
// import { History, HistorySchema } from "./history_model.js";
import { Result, ResultSchema } from "./result_model.js";

const setupModels = (sequelize) => {
  Product.init(ProductSchema, Product.config(sequelize));
  // Size.init(SizeSchema, Size.config(sequelize));
  Cart.init(CartSchema, Cart.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  Preference.init(PreferenceSchema, Preference.config(sequelize));
  Seller.init(SellerSchema, Seller.config(sequelize));
  Favorite.init(FavoriteSchema, Favorite.config(sequelize));
  // Collection.init(CollectionSchema, Collection.config(sequelize));
  // Follow.init(FollowSchema, Follow.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Review.init(ReviewSchema, Review.config(sequelize));
  // History.init(HistorySchema, History.config(sequelize))
  Result.init(ResultSchema, Result.config(sequelize));

  Product.belongsTo(Seller, { foreignKey: "seller_id" });
  Seller.hasMany(Product, { foreignKey: "seller_id" });

  Cart.belongsTo(Product, { foreignKey: "product_id" });
  Favorite.belongsTo(Product, { foreignKey: "product_id" });

  User.hasMany(Cart, { foreignKey: "user_id" });
  Cart.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Favorite, { foreignKey: "user_id" });
  Favorite.belongsTo(User, { foreignKey: "user_id" });

  Preference.belongsTo(User, { foreignKey: "user_id" });
  User.hasOne(Preference, { foreignKey: "user_id" });

  // Collection.hasMany(Product, { foreignKey: "collection_id" });
  // Product.belongsTo(Collection, { foreignKey: "collection_id" });

  // Seller.hasMany(Collection, { foreignKey: "seller_id" });
  // Collection.belongsTo(Seller, { foreignKey: "seller_id" });

  User.hasOne(Seller, { foreignKey: "user_id" });
  Seller.belongsTo(User, { foreignKey: "user_id" });

  Product.hasMany(Order, {foreignKey: "product_id"})
  Order.belongsTo(Product, {foreignKey: "product_id"})
  Product.hasMany(Review, { foreignKey: "product_id" });
  Review.belongsTo(Product, { foreignKey: "product_id" });

  User.hasMany(Review, { foreignKey: "user_id" });
  Review.belongsTo(User, { foreignKey: "user_id" });

  Order.hasOne(Review, { foreignKey: "order_id" });
  Review.belongsTo(Order, { foreignKey: "order_id" });
  Order.belongsTo(User, { foreignKey: "user_id" });

  User.hasMany(Result, { foreignKey: "user_id" });
  Result.belongsTo(User, { foreignKey: "user_id" });

  // Size.belongsTo(Product, { foreignKey: "product_id" });

  // History.belongsTo(Order, {foreignKey: "order_id"})

  Preference.hasMany(Review, { foreignKey: "user_id" });
};

export default setupModels;
