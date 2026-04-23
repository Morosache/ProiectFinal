import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Transfer = sequelize.define(
  "Transfer",
  {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM("Cash", "Card", "Economies"),
      allowNull: false,
    },
    destination: {
      type: DataTypes.ENUM("Cash", "Card", "Economies"),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  }
);