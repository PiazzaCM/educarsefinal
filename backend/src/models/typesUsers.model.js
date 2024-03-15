import { sequelize } from '../config/connection.js';
import { DataTypes } from 'sequelize';
import {User} from './user.model.js';

export const Typeuser = sequelize.define('typeusers',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING
    },
});

Typeuser.hasMany(User, {
    foreignKey: 'typeUserId',
    sourceKey: 'id'
})

User.belongsTo(Typeuser, {
    foreignKey: 'typeUserId',
    targetKey: 'id'
})


