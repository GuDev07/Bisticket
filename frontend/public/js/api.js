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
            }),
            credentials: 'include'
        })

        const { pagina } = await login.json();

        const data = {
            pagina
        }

        return data ;
    } catch (error) {
        throw new Error(error)
    }
}

export async function deslogar() {
    try {
        const logout = await fetch(`http://${apiUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        const result = await logout.json()
        return result;
        
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
    try {
        const usuario = await fetch(`http://${apiUrl}/users/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })

        const data = await usuario.json()

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function buscarTickets() {
    try {
        const tickets = await fetch(`http://${apiUrl}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await tickets.json()
        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function buscarComentarios(id) {   
    try {
        const comentarios = await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                acao: 'ver_comentarios'
            }),
            credentials: 'include'
        });

        const data = await comentarios.json();

        return data;

    } catch (error) {
        throw new Error(error)
    }
}

export async function criarTicket(titulo, descricao, comentario) {
    try {
        const ticketCriado = await fetch(`http://${apiUrl}/tickets/create`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                descricao: descricao,
                comentario: comentario || undefined
            }),
            credentials: 'include'
        });

        const data = await ticketCriado.json()

        return data
    } catch (error) {
        throw new Error(error)
    }
}

export async function comentarTicket(id, comentario) {

    try {
        const coment = await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                acao: 'comentar',
                comentario: comentario
            }),
            credentials: 'include'
        })

        const data = await coment.json();

        return data;
    } catch (error) {
        throw new Error(error)
    }
}

export async function resolverTicket(id) {

    try {
        await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                acao: 'resolver'
            }),
            credentials: 'include'
        });

        return;
    } catch (error) {
        throw new Error(error)
    }
}

export async function fecharTicket(id, resposta) {
    try {
        await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                acao: 'fechar',
                resposta: resposta
            }),
            credentials: 'include'
        });

        return;
    } catch (error) {
        throw new Error(error)
    }
}

export async function abrirTicket(id) {
    try {
        await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                acao: 'abrir',
            }),
            credentials: 'include'
        });

        return;
    } catch (error) {
        throw new Error(error)
    }
}

export async function escalarTicket(id) {

    try {
        await fetch(`http://${apiUrl}/tickets/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                acao: "escalar"
            }),
            credentials: 'include'
        });

        return;
    } catch (error) {
        throw new Error(error)
    }
}