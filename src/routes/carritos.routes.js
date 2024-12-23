import { Router } from "express";
import {getCart, createCart, insertProductCart, updateProductsCart, updateQuantityProductCart, deleteCart, deleteProductCart} from "../controllers/carts.controllers.js";

const cartRouter = Router()

cartRouter.get('/:cid', getCart) //Consultar los productos guardados en un carritp
cartRouter.post('/', createCart) //Crear un nuevo carrito vacio
cartRouter.post('/:cid/products/:pid', insertProductCart) //Agregar nuevo producto al carrito
cartRouter.put('/:cid', updateProductsCart) //modificar toralmente el array de productos carrito
cartRouter.put('/:cid/products/:pid', updateQuantityProductCart) //actualizo cantidad de productos
cartRouter.delete('/:cid', deleteCart) //elimino todos los prod del carrito
cartRouter.delete('/:cid/products/:pid', deleteProductCart)  //elimino un prod del carrito

export default cartRouter