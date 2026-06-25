export async function logar(email, senha) {
    try {
        const login = await fetch('https://localhost:3000/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })

        const token = await login.json().token;

        return token;
    } catch (error) {
        throw new Error(error)
    }
}