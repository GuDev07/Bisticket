import { cadastrar, logar } from './api.js';

function carregarPagina(pagina) {
    const container = document.querySelector('.content');

    if (!container) return;

    if (pagina === 1) {
        container.innerHTML = `
        <h1 class="inter-bold title purple-selection">Cadastro</h1>
        <div class="form">
        <input class="inter-regular input-text" type="text" placeholder="Nome" required>
        <input class="inter-regular input-text" type="email" placeholder="Email" required>
        <input class="inter-regular input-text" type="password" placeholder="Password" required>
        <div class="link-box">
        <a id="login-btn">Já tem uma conta?</a>
        </div>
        <button class="inter-regular button-text" id="register-btn" type="submit">Cadastrar</button>
        </div>
        `;
        
        const inputs = document.querySelectorAll('input');
        const registerBtn = container.querySelector('#register-btn')
        registerBtn.addEventListener('click', async () => {
            const nome = inputs[0].value;
            const email = inputs[1].value;
            const senha = inputs[2].value;

            await cadastrar(nome, email, senha);

            carregarPagina(0);
        })

        container.querySelector('a').addEventListener('click', () => {
            carregarPagina(0)
        });
        
        return
    }
    
    container.innerHTML = `
    <h1 class="inter-bold title purple-selection">Login</h1>
    <div class="form">
    <input class="inter-regular input-text" type="email" placeholder="Email" required>
            <input class="inter-regular input-text" type="password" placeholder="Password" required>
            <div class="link-box">
                <a href="./forgot-password.html">Esqueceu sua senha?</a>
                <a id="register-btn">Não tem uma conta?</a>
            </div>
            <button class="inter-regular button-text" type="submit">Login</button>
            </div>
    `;
    const inputs = document.querySelectorAll('input');
    const registerBtn = container.querySelector('#register-btn')
    const btn = document.querySelector('button');

    btn.addEventListener('click', async () => {
        const email = inputs[0].value;
        const senha = inputs[1].value;
        
        console.log(email, senha)

        if (!email || !senha) {
            return console.log("email ou senha não preenchidos")
        };
        const token = await logar(email, senha)
        if(!token) {
            throw new Error("Erro ao carregar token");
            return;
        }

        console.log(token)

        localStorage.setItem('token', token);

        setTimeout(() => {
            window.location.href = '/tickets.html'
        }, 1500);
    });

    registerBtn.addEventListener('click', () => {
        carregarPagina(1);
    });
}


document.addEventListener('DOMContentLoaded', async () => {
    carregarPagina(0);  
})