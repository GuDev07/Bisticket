import { deslogar } from "./api";

const criarUsuarioBtn = document.querySelector('.create-user-button');
const logoutBtn = document.getElementById('logout-button');

logoutBtn.addEventListener('click', async () => {
    const logout = await deslogar()
    if(!logout) return;
    window.location.href = './login.html'
})

criarUsuarioBtn.addEventListener('click', async () => {
    const t = document.getElementById('tipo').value
    const n = document.getElementById('nome').value
    const e = document.getElementById('email').value
    const s = document.getElementById('senha').value

    const usuario = await criar(t, n, e, s);

    document.getElementById('message').innerHTML = `
        <span class="inter-regular white-text mint-selection">ID: ${usuario.id}</span>
        <span class="inter-regular white-text mint-selection">Nome: ${usuario.nome}</span>
        <span class="inter-regular white-text mint-selection">Email: ${usuario.email}</span>
        <span class="inter-regular white-text mint-selection">Tipo: ${usuario.tipo}</span>
        
        `

})

async function criar(t, n, e, s) {
    try {   
        const usuario = await fetch('http://localhost:3000/users/admin/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tipo: t,
                nome: n,
                email: e,
                senha: s
            }),
            credentials: 'include'
        });

        const data = await usuario.json();

        return data
    } catch (error) {
        throw new Error(error)
    };
}