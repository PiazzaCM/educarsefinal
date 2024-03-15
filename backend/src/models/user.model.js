import { sequelize } from '../config/connection.js'
import { DataTypes } from 'sequelize'
import { hashString } from '../helpers/hash.js';
import bcrypt from 'bcrypt'
import { deleteImage } from '../helpers/Cloudinary.js';

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
     type: DataTypes.STRING 
  },
  surname: {
     type: DataTypes.STRING 
    },
  username: {
    type: DataTypes.STRING
  },
  email: {
     type: DataTypes.STRING 
    },
  password: {
     type: DataTypes.STRING 
    },
  imagen: {
     type: DataTypes.STRING 
    },
  imagenId: {
     type: DataTypes.STRING 
    },
  portadaColor: {
      type: DataTypes.STRING,
      defaultValue: "#FF8400"
  },
  visitas: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  valoracion : {
    type: DataTypes.JSON,
    defaultValue: []
  }
});



//services

export const userService = {
  async createUser(user) {
    try {
      const hashedPassword = await hashString(user.password)
      user.password = hashedPassword
      return await User.create(user);
    } catch (error) {
      console.log(error);
    }
  },

  //comparacion de contraseñas(se puede reutilizar)
  async validatePassword(password, hashedPassword) {
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (error) {
      console.log(error);
    }
  },

  async getAllUsers() {
    try {
      return await User.findAll();
    } catch (error) {
      console.log(error);
    }
  },

  async getUserById(id) {
    try {
      return await User.findByPk(id, {attributes: {exclude: ['password']}});
    } catch (error) {
      console.log(error);
    }
  },

  async getUserByUsername(username) {
    const user = await User.findOne({ 
      where: { username },
      attributes: { exclude: ['password'] }
    });

    if(user) await user.increment('visitas');
    if (user) {
      const rating = JSON.parse(user.valoracion);

      let ratingTotal = 0;

      rating.forEach(i => {
        ratingTotal += i;
      });

      const promedio = ratingTotal / rating.length | 0;

      user.valoracion = promedio
    }
    return user;
  },

  async getUserByEmailandPassword(email, password) {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) return null
      const isValidPassword = await this.validatePassword(password, user.password)
      if (!isValidPassword) return null


      const rating = JSON.parse(user.valoracion);

      let ratingTotal = 0;

      rating.forEach(i => {
        ratingTotal += i;
      });

      const promedio = ratingTotal / rating.length | 0;

      user.valoracion = promedio

      return user
    } catch (error) {
      console.log(error);
    }
  },

  async changeProfilePhoto(id, data){

    try {
      const user = await User.findByPk(id);

      await deleteImage(user.imagenId);

      user.imagen = data.imagen;
      user.imagenId = data.imagenId;

      await user.save();
      return user
    } catch (error) {
      console.log(error);
    }
  },

  async changeColor(id, data){
      try {
        const user = await User.update(data, {where: {id}})
        return user
      } catch (error) {
        console.log(error);
      }
  },

  async valorarProfesor(rating){
    try {
      const user = await User.findByPk(rating.id);
      console.log("aaaaaaaaaa", rating)

      let valoracion = JSON.parse(user.valoracion);
   
      valoracion.push(rating.valoracion);

      user.valoracion = valoracion;

      await user.save();

      return user;
    } catch (error) {
      console.log(error);
    }
  }
}



