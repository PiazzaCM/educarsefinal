import { DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
import { Post } from "./post.model.js";

export const Typeprice = sequelize.define('typeprice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
});





