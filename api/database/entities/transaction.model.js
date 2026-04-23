import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";


export const Transaction = sequelize.define(
    "Transaction",
    {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,
        },
        isNeed: {
            type: DataTypes.ENUM("Need", "Wish"),
            allowNull: false,
        },
        paymentMethod: {
            type: DataTypes.ENUM("Cash", "Card"),
            allowNull: false,
        }

    },

    {
        sequelize,
        freezeTableName: true,
        paranoid: true,
    },
);