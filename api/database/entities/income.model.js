import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";


export const Income = sequelize.define(
    "Income",
    {
        source: {
            type: DataTypes.ENUM("Salary", "Gift", "Investment", "Other"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM("Card", "Cash", "Economies"),
            allowNull: false,
        },
        observation: {
            type: DataTypes.STRING,
            allowNull: true,
        }

    },

    {
        sequelize,
        freezeTableName: true,
        paranoid: true,
    },
);