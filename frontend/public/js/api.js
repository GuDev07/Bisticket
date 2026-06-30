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

export async function buscarComentarios(id) {
    const token = localStorage.getItem("token");    
    try {
        const comentarios = await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                acao: 'ver_comentarios'
            })
        });

        const data = await comentarios.json();

        return data;

    } catch (error) {
        throw new Error(error)
    }
}

export async function criarTicket(titulo, descricao, comentario) {
    const token = localStorage.getItem("token");
    try {
        const ticketCriado = await fetch(`http://${apiUrl}/tickets/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao,
                comentario: comentario || undefined
            })
        });

        const data = await ticketCriado.json()

        return data
    } catch (error) {
        throw new Error(error)
    }
}