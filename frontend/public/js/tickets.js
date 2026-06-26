import { buscarDadosUsuario } from "./api.js";

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = await buscarDadosUsuario();

    if (!usuario) {
        throw new Error("Usuário não autenticado")
        return
    }

})

const sideBtn = document.querySelectorAll('.sidebar__buttons--button');

sideBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const pressed = btn.classList.replace('pressed', '')
        if (!pressed) {
            btn.classList.add('pressed')
        }
    })
})