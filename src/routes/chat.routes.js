import { Router } from "express";
const chatRouter = Router()

chatRouter.get('/', (req,res) => {

    //renderizo una ruta de nuestra app -- chat
    res.render('templates/chat', {js: 'chat.js', css: 'chat.css'})
})

export default chatRouter