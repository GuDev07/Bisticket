import { buscarDadosUsuario } from "./api.js";
import { carregarMeusTickets } from "./ui/myTickets.js";

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = await buscarDadosUsuario();

    if (!usuario) {
        throw new Error("Usuário não autenticado")
        return
    }

    const app = document.querySelector('.app');
    
    const sideBtn = document.querySelectorAll('.sidebar__buttons--button');
    
    let telaAtual = 'dashboard'

    if (usuario.tipo === 'cliente') {
        telaAtual = 'myTicket';
        sideBtn[0].style.display = 'none';
        sideBtn[1].classList.add('pressed')
    };
    
    sideBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            telaAtual = btn.dataset.page
            for (let i = 0; i < sideBtn.length; i++) {
                sideBtn[i].classList.toggle('pressed', telaAtual == sideBtn[i].dataset.page)
            };
        })
    })

    carregarMeusTickets(app, usuario.nome)
})