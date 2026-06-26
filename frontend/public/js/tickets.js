import { buscarDadosUsuario } from "./api.js";
import { carregarMeusTickets } from "./ui/myTickets.js";
import { telaCriarTicket } from "./ui/createTicket.js";
import { carregarDashboard } from "./ui/dashboard.js";

const router = {
    dashboard: carregarDashboard,
    myTickets: carregarMeusTickets,
    createTicket: telaCriarTicket
}

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
        telaAtual = 'myTickets';
        sideBtn[0].style.display = 'none';
        sideBtn[1].classList.add('pressed');
        const tela = router[telaAtual];
        tela(app, usuario.nome)
    };
    
    sideBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            telaAtual = btn.dataset.page
            for (let i = 0; i < sideBtn.length; i++) {
                sideBtn[i].classList.toggle('pressed', telaAtual == sideBtn[i].dataset.page)
            };
            const tela = router[telaAtual];
            tela(app, usuario.nome)
        })
    })
})