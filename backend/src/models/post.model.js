import { sequelize } from '../config/connection.js';
import { DataTypes } from 'sequelize';
import { User } from './user.model.js';
import { Typepost } from './typePost.model.js';
import { Typeprice } from './typePrice.js';
import { deleteImage } from '../helpers/Cloudinary.js';

export const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: { 
        type: DataTypes.STRING
    },
    descripcion: { 
        type: DataTypes.STRING
    },

    disponibilidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
    },
    imagenId: {
        type: DataTypes.STRING,
    },
    lat: {
        type: DataTypes.FLOAT
    },
    lon: {
        type: DataTypes.FLOAT
    },
    radius: {
        type: DataTypes.FLOAT
    }
});


User.hasMany(Post, {
    foreignKey: 'userId',
    sourceKey: 'id'
})

Post.belongsTo(User, {
    foreignKey: 'userId',
    targetKey: 'id'
})

Typeprice.hasMany(Post, {
    foreignKey: 'typepriceId',
    sourceKey: 'id' 
 })
 
 Post.belongsTo(Typeprice, {
     foreignKey: 'typepriceId',
     targetKey: 'id'
 })

//services

export const postService = { 
    async createPost(post) {
        try {
            const newPost = await Post.create(post);

            return await this.getPostById(newPost.id);

        } catch (error) {
            console.log(error);
        }
    },
    async getAllPosts() {
        try {
            return await Post.findAll({include: [Typepost, Typeprice, {
                model: User, 
                attributes: ['name', 'surname', 'username', 'email']
            }]});
        } catch (error) {
            console.log(error);
        }
    },

    async getPostsByUserId(id) {
        try {
            return await Post.findAll({ where: {userId: id}, 
                include: [Typepost, Typeprice, {
                model: User, 
                attributes: ['name', 'surname', 'username']
            }]});
        } catch (error) {
            console.log(error);
        }
    },

    async getPostById(id) {
        try {
            return await Post.findByPk(id, {include: [Typepost, Typeprice, {
                model: User, 
                attributes: ['name', 'surname', 'username']
            }]});
        } catch (error) {
            console.log(error);
        }
    },
    async updatePostById(id, post) {
        try {
            await Post.update(post, {
                where: { id }, 
                returning: true
            });

            return await this.getPostById(id);
           
        } catch (error) {
            console.log(error);
        }
    },
    async deletePostById(id) {
        try {
            const postDelete = await Post.findByPk(id);

            await postDelete.destroy();

            await deleteImage(postDelete.imagenId);
        } catch (error) {
            console.log(error);
        }
    }
}