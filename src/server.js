import express from 'express';
import mongoose from 'mongoose';
import { create } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { __dirname } from './path.js';
import productRouter from './routes/productos.routes.js';
import cartRouter from './routes/carritos.routes.js';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'; 
import Handlebars from 'handlebars';

// Instancia de express
const app = express();

const hbs = create({ 
    defaultLayout: 'main', // Especifica el layout predeterminado
    layoutsDir: path.join(__dirname, 'views', 'layouts'), // Ubicación del layout
    partialsDir: path.join(__dirname, 'views', 'partials'), // Ubicación de los partials })
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});


const PORT = 8080;

// Conexión con MongoDB
await mongoose.connect("mongodb+srv://dante:coderhouse@cluster0.8dvcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("BDD Conectada"))
.catch((e) => console.log("Error al conectar con BDD: ", e));

// Inicializo socket.io en el servidor
const server = app.listen(PORT, () => {
    console.log("Server on Port", PORT);
});

const io = new Server(server);

// Middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars para locación de plantilla y extensión de archivos
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Aquí está el cambio importante: 
// Establezco el directorio de las vistas para buscar dentro de 'views/templates'
app.set('views', path.join(__dirname, 'views', 'templates'));

// Rutas de mi aplicación
app.use('/public', express.static(__dirname + '/public'));
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Ruta principal para redirigir a la lista de productos
app.get('/', (req, res) => {
    res.redirect('/products');
});

// Guardar mensajes en array
let mensajes = [];

// Agrego mensajes
io.on('connection', (socket) => {
    console.log('Usuario conectado: ', socket.id);

    socket.on('Mensaje', (data) => {
        console.log('Mensaje recibido: ', data);
        mensajes.push(data);

        socket.emit('respuesta', mensajes);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado: ', socket.id);
    });
});
