db.alumnos.insertMany([
    {
        "nombre": "Pepe",
        "apellido": "Perez",
        "edad": 27,
        "genero": "M"
    },
    {
        "nombre": "Emilia",
        "apellido": "Estevez",
        "edad": 21,
        "genero": "F"
    },
    {
       "nombre": "Facundo",
        "apellido": "Fernandez",
        "edad": 30,
        "genero": "F" 
    },
    {
        "nombre": "Ana",
        "apellido": "Alvarez",
        "edad": 34,
        "genero": "F"
    }
])

/*
db.alumnos.find({
    $and: [
        {edad: {$lte: 30}}, 
        {genero: "F"}
    ]
})
db.alumnos.find({edad:{$lte: 30}}, {nombre: 1, apellido: 1, _id: 0}) excenta el id

db.alumnos.find().sort({edad:-1}) -- ordena mayor a menor

//cambiar nombre
db.alumnos.updateOne({_id: ObjectId('675cdffa92988a2eb359a0c9')}, {$set: {nombre: "Pablo"}})

//incrementar la edad
db.alumnos.updateOne({_id: ObjectId('675cdffa92988a2eb359a0c9')}, {$inc: {edad: 1}})

//cambiar nombre del atributo
db.alumnos.updateOne({_id: ObjectId('675cdffa92988a2eb359a0c9')}, {$rename: {"edad": "age"}})

//update many, {} pq quiero que sea a todos
db.alumnos.updateMany({}, {$inc: {edad:1}})


//eliminar
db.alumnos.delete(ObjectId('675cdffa92988a2eb359a0c9))
db.alumnos.deleteMany({edad: {$gte: 30}})

*/



