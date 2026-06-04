import { sequelize } from "./db.js";
import { Category } from "./entities/category.model.js";
import "./entities/user.model.js";
import "./entities/transaction.model.js";
import "./entities/income.model.js";
import "./entities/transfer.model.js";
import "./entities/settings.model.js";
import "./index.js";
import bcrypt from "bcryptjs";
import { User } from "./entities/user.model.js";

sequelize.sync({ alter: true }).then(async () => {
    for (const name of ["Food", "Transport", "Entertainment", "Health", "Salary", "Gift", "Other"]) {
        await Category.findOrCreate({ where: { name } });
    }

    const passwordHash = await bcrypt.hash("admin123", 10);
    await User.findOrCreate({
        where: { username: "admin" },
        defaults: {
            name: "Administrator",
            username: "admin",
            password: passwordHash,
            email: "admin@example.com",
            phone: "0000000000",
        },
    });

    console.log("FINISHED SUCCESS");
    process.exit(0);
}).catch((err) => {
    console.error("Eroare:", err);
    process.exit(1);
});
