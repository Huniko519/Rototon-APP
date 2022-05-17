import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Product = db.define('products', {
    title: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.DOUBLE
    },
    userWalletAddress: {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.DOUBLE
    },
    symbol: {
        type: DataTypes.STRING
    },
    contractAddress: {
        type: DataTypes.STRING
    },
    network: {
        type: DataTypes.STRING
    },
    adminAddress: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Product;