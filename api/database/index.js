import { Category } from "./entities/category.model.js";
import { Transaction } from "./entities/transaction.model.js";

Category.hasMany(Transaction, { foreignKey: "categoryId" });
Transaction.belongsTo(Category, { foreignKey: "categoryId" });

export { Transaction, Category };