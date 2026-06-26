const apiUrl = 'localhost:3000';

export async function logar(email, senha) {
    try {
        const login = await fetch(`http://${apiUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })

        const { token } = await login.json();

        console.log(token)

        return token;
    } catch (error) {
        throw new Error(error)
    }
}

export async function cadastrar(nome, email, senha) {
    try {
        const login = await fetch(`http://${apiUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                senha: senha
            })
        })

    } catch (error) {
        throw new Error(error)
    }
}

export async function buscarDadosUsuario() {
    const token = localStorage.getItem("token")
    try {
        const usuario = await fetch(`http://${apiUrl}/users/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await usuario.json()

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function buscarTickets() {
    const token = localStorage.getItem("token")
    try {
        const tickets = await fetch(`http://${apiUrl}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await tickets.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}