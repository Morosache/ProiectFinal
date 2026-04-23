import { Category } from "./entities/category.model.js";
import { Transaction } from "./entities/transaction.model.js";
import { User } from "./entities/user.model.js";
import { Settings } from "./entities/settings.model.js";

Category.hasMany(Transaction, { foreignKey: "categoryId" });
Transaction.belongsTo(Category, { foreignKey: "categoryId" });


User.hasOne(Settings, { foreignKey: "userId", onDelete: "CASCADE" });
Settings.belongsTo(User, { foreignKey: "userId" });

export { Transaction, Category, User, Settings };