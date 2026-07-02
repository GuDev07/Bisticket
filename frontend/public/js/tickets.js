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

    if (!usuario || !usuario.tipo) {
        window.location.href = './login.html'
        throw new Error("Usuário não autenticado")
        return
    } else if (usuario.tipo === 'administrador') {
        window.location.href = './ejf_capivara_admin.html'
    }

    const app = document.querySelector('.app');
    
    const sideBtn = document.querySelectorAll('.sidebar__buttons--button');
    const exitBtn = document.querySelector('.sidebar__buttons--exit-button')
    
    let telaAtual = 'dashboard'
    
    sideBtn.forEach((btn) => {
        btn.addEventListener('click', () => {
            telaAtual = btn.dataset.page
            for (let i = 0; i < sideBtn.length; i++) {
                sideBtn[i].classList.toggle('pressed', telaAtual == sideBtn[i].dataset.page)
            };
            const tela = router[telaAtual];
            tela(app, usuario)
        })
        if (!(usuario.tipo.includes(btn.dataset.role))) {
            btn.style.display = "none"
        }
    })

    for(let i = 0; i < sideBtn.length; i++) {
        if (sideBtn[i].style.display !== "none" && (sideBtn[i].dataset.page === "dashboard" || sideBtn[i].dataset.page === "myTickets")) {
                sideBtn[i].click()
                break;
            }
    }

    exitBtn.addEventListener('click', () => {
        localStorage.removeItem("token");
        window.location.href = './login.html'
    })
})