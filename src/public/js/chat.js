const socket = io() //Instancio socket.io

const chatBox = document.getElementById('chatBox')

//permite mostrar los mensajes del usuario
const messageLogs = document.getElementById('messageLogs')
let user = 

//alerta para nombre de usuario
Swal.fire({
    title: "Inicio de Sesion",
    input: "text",
    text: "Por favor ingrese su nombre de usuario para continuar",
    inputValidator: (valor) => {
        return !valor && 'Ingrese un valor valido'
    },
    allowOutsideClick: false
}).then(resultado => {
    user = resultado.value
    console.log(user)
})

//Evento change cuando sucede algun cambio en el input (pj cuando den enter)
chatBox.addEventListener('change', (e) => {

    if (chatBox.value.trim().length > 0) { //Si no me envio una cadena vacia
        //Envio un mensaje al servidor 
        socket.emit('mensaje', { usuario: user, mensaje: chatBox.value, hora: new Date().toLocaleString() })
        chatBox.value = "" //limpio el input
    }

})

//espera una respuesta del servidor
//cuando llega muestra la respuesta del servidor
socket.on('respuesta', info => {
    messageLogs.innerHTML = ""
    //Recorro el array de mensajes y lo muestro
    info.forEach(mensaje => {
        messageLogs.innerHTML += `<p>${mensaje.hora}hs. Usuario ${mensaje.usuario} dice: ${mensaje.mensaje}</p>`
    })
})