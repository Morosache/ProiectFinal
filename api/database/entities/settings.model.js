import { DataTypes } from "sequelize";

import { sequelize } from "../db.js";

export const Settings = sequelize.define(
    "Settings",
    {
        theme: {
            type: DataTypes.ENUM("Light", "Dark"),
            defaultValue: "Light",
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            defaultValue: "en",
            allowNull: false,
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: "RON",
            allowNull: false,
        },
        notificationsEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },

    {
        sequelize,
        freezeTableName: true,
        paranoid: true,
    },
);