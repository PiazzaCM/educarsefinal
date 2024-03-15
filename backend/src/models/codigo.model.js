import { DataTypes } from 'sequelize';
import { sequelize } from '../config/connection.js';

export const Codigo = sequelize.define('codigo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo: { 
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    idUser: {
        type: DataTypes.INTEGER
    },
});


const generarCodigoRandom = ()=> {
    let codigo = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const caracteresLength = caracteres.length;
    for (let i = 0; i < 30; i++) {
        codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLength));
    }
    return codigo;
}


export const codigoService = {
    async generalLink(data){
        return await Codigo.create({
            ...data,
            codigo: generarCodigoRandom()
        })
    },

    async validatorLink(codigo){
        const findCodigo = await Codigo.findOne({
            where: {
                codigo
            }
        })
        console.log(findCodigo)
        if(findCodigo){
            return findCodigo;
        }else{
            return false;
        }
    }
}




