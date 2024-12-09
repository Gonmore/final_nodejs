import { DataTypes } from "sequelize"
import sequelize from "../database/database.js"
import { Task }  from "./tasks.js"
import { Status } from "../constants/index.js"
import { encriptar } from "../common/bycript.js"
import logger from '../logs/logger.js'

export const User = sequelize.define('Users', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,

        validate:{
            notNull:{
                msg: 'Username must not be null',
            },
        },
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg: 'Password must not be null',
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,

        validate: {
            isIn:{
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Status must be active or inactive',
            },
        },
    },

})

User.hasMany(Task);
Task.belongsTo(User);

/*
User.hasMany(Task, {
    foreignKey: 'user_id',
    sourceKeys: 'id'
}
)

Task.belongsTo(User,{
    foreignKey: 'user_id',
    targetKeys: 'id',
}) */

User.beforeCreate(async (user) =>{
    try{
        user.password = await encriptar(user.password);
    }catch(error){
        logger.error(error.message);
        throw new Error('Error al crear contraseña');
    }
})
User.beforeUpdate(async (user) =>{
    try{
        user.password = await encriptar(user.password);
    }catch(error){
        logger.error(error.message);
        throw new Error('Error al actualizar contraseña');
    }
})