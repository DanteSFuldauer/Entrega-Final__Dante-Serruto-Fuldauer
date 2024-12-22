import {Schema, model} from 'mongoose'

const userSchema = new Schema( {
    username: String, //agreggo una caracteristica, esta es el tipo
    email: {
        type: String,
        unique: true //no se puede repetir mal // al ser unico, tambien se implementa por defecto como un indice

    }
})

                        //nombre de la coleccion /esquema a utilizar
export const userModel = model("users", userSchema)