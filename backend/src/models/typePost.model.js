import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';
import { Post } from './post.model.js';

export const Typepost = sequelize.define('typepost', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: { 
        type: DataTypes.STRING
    },

});

Typepost.hasMany(Post, {
    foreignKey: 'typepostId',
    sourceKey: 'id'
})

Post.belongsTo(Typepost, {
    foreignKey: 'typepostId',
    targetKey: 'id'
})

