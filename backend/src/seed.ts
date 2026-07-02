import { prisma } from "./config/prisma";

async function init() {
    try {
        const result = await prisma.user.create({
            data: {
                nome: "Administrador",
                email: "admin@email.com",
                senha: "$argon2id$v=19$m=65536,t=3,p=4$E0xvPYOi+x7RwCs4KJORVQ$L3V3id7E3v+PjzhZmkZHBTT5zMY90Y1RvyDz7YqcpQ0",
                tipo: "administrador"
            }
        });
        console.log("Administrador criado com sucesso:" + result + "\n\n" + "Email: " + result.email + "\nSenha: Admin@1234");
    } catch (error) {
        console.error("Erro ao criar administrador:", error);
    }
}

init();