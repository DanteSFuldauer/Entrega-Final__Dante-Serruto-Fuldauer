import express from 'express'
import mongoose from 'mongoose'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'
import cartRouter from './routes/carritos.routes.js'
import chatRouter from './routes/chat.routes.js'
import orderRouter from './routes/orders.routes.js'

//instancia de express
const app = express()
const hbs = create()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log("Server on Port", PORT)
})

//conexion con mongo DB
await mongoose.connect("mongodb+srv://dante:coderhouse@cluster0.8dvcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("BDD Conectada"))
.catch((e) => console.log("Error al conectar con BDD: ", e))

//inicializo socket.io en el servidor
const io = new Server(server)


//Middlewares 
app.use(express.json()) //para manejar JSON en las peticiones
app.use(express.urlencoded({extended:true})) //para manejar queries complejos

//configuracion de hbs para locacion de plantilla y extencion de archivos
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

//establezco el directorio de las vistas
app.set('views', path.join(__dirname, 'views'))

//rutas de mi applicacion
app.use('/public', express.static(__dirname + '/public'))
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)
app.use('/api/orders', orderRouter)


//res.render('nombre-plantilla', {objetos a enviar})
app.get('/', (req,res) => {

    //envio array objeto
    res.render('/templates/productos', {productos})
})

//guardar mensajes en array
let mensajes = []

//agrego mensajes
io.on('conection', () => { //cuando se produzca el apreton de manos puedo ejecutar las isguientes funciones
    console.log('Usuario conectado: ', socket.id) //id de conexion

    //con ON se recibe
    socket.on('Mensaje', (data) => { //cuando el usuario me muestra un mensaje, trabajo con esos datos
        console.log('Mensaje recibido: ', data)
        mensajes.push(data)

        //envia el array de mensajes
        socket.emit('respuesta', mensajes)
    })

    //detectar desconexion
    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ', socket.id);
    })
})
