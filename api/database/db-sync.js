import { sequelize } from "./db.js";
import { Category } from "./entities/category.model.js";
import { Income } from "./entities/income.model.js"
import "./entities/user.model.js";
import "./entities/transaction.model.js";
import "./entities/income.model.js"
import "./entities/transfer.model.js";
import "./entities/settings.model.js";
import "./index.js"; // relatiile

sequelize.sync({ force: true }).then(async () => {
  await Category.bulkCreate([
    { name: "Food" },
    { name: "Transport" },
    { name: "Entertainment" },
    { name: "Health" },
    { name: "Salary" },
    { name: "Gift" },
    { name: "Other" }
  ]);

  console.log("FINISHED SUCCESS");
  process.exit(0);
}).catch((err) => {
  console.error("Eroare:", err); // <- err in afara string-ului
  process.exit(1);
});