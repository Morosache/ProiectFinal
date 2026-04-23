import { sequelize } from "../db.js";
import { DataTypes } from "sequelize";


export const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,    // "Food", "Transport", "Health", etc.
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  }
);
