import { Sequelize, DataTypes } from "sequelize";
const db = {
  NAME: "moneytrack",
  USERNAME: "moneytrack",
  PASSWORD: "moneytrack",

  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "mysql.moneytrack",
    port: 3306,
    logging: function (str) {
      console.log(str);
    },
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options
);

