import { buscarComentarios, buscarTickets, comentarTicket, fecharTicket, resolverTicket } from "../api.js"

function renderTickets(tickets, usuario) {

    if (usuario.tipo.startsWith("suporte")) {
        const html = tickets.map(ticket => `
            <div class="ticket" data-status="${ticket.status}">
                <div class="ticket__status-area">
                    <span class="ticket__status status-${ticket.status}">${ticket.status == 'em_andamento' ? 'Em andamento' : ticket.status}</span>
                </div>
                <div class="ticket__title-area">
                    <h1 class="ticket-title inter-bold white-text purple-selection">${ticket.titulo}</h1>
                </div>
                <div class="ticket__description-area">
                    <div class="ticket__description-area--scroll">
                        <p class="ticket-description inter-regular white-text amber-selection">${ticket.descricao}</p>
                    </div>
                </div>
                <div class="ticket__buttons">
                    <button class="ticket__button comments-button button-text" id="mostrarComentario" data-id="${ticket.id}" data-status="${ticket.status}">Mostrar Comentários</button>
                    <button class="ticket__button resolveTicket-button button-text" id="resolverTicket" data-id="${ticket.id}" data-status="aberto">Resolver</button>
                    <button class="ticket__button closeTicket-button button-text" id="fecharTicket" data-id="${ticket.id}" data-status="em_andamento">Fechar</button>
                    <button class="ticket__button openTicket-button button-text" id="abrirTicket" data-id="${ticket.id}" data-status="fechado">Reabrir</button>
                </div>
            </div>
            `
        ).join('');

        return html;
    }

    const html = tickets.map(ticket => `
        <div class="ticket" data-status="${ticket.status}">
            <div class="ticket__status-area">
                <span class="ticket__status status-${ticket.status}">${ticket.status == 'em_andamento' ? 'Em andamento' : ticket.status}</span>
            </div>
            <div class="ticket__title-area">
                <h1 class="ticket-title inter-bold white-text purple-selection">${ticket.titulo}</h1>
            </div>
            <div class="ticket__description-area">
                <div class="ticket__description-area--scroll">
                    <p class="ticket-description inter-regular white-text amber-selection">${ticket.descricao}</p>
                </div>
            </div>
            <button class="ticket__button comments-button button-text" id="mostrarComentario" data-id="${ticket.id}" data-status="${ticket.status}">Mostrar Comentários</button>
        </div>
        `
    ).join('');

    return html;
}

export async function carregarMeusTickets(container, usuario) {
    container.innerHTML = ''

    const tickets = await buscarTickets();

    container.innerHTML = `
        <div class="tickets">
            <h1 class="tickets-title inter-bold title purple-selection">Olá <span class="purple-text purple-selection">${usuario.nome}</span></h1>
            <div class="tickets__area">
                ${renderTickets(tickets, usuario)}
            </div>
        </div>
    `;

    const comentBtn = container.querySelectorAll('.comments-button');

    comentBtn.forEach(btn => {

        btn.addEventListener('click', () => {
            const comentarioContainer = document.getElementById('app__comments');

            abrirComentario(comentarioContainer, btn.dataset.id, btn)
            comentarioContainer.classList.toggle('closed', false)
            for (let i = 0; i < comentBtn.length; i++) {
                comentBtn[i].disabled = false
            };
            btn.disabled = true;
        })
    })

    container.querySelectorAll('.ticket').forEach(card => {

        const buttons = card.querySelectorAll('.ticket__button');

        buttons.forEach(btn => {
            btn.style.display = "block"
            if (btn.dataset.status !== card.dataset.status) {
                btn.style.display = "none";
            };
        });
        const resolverBtn = card.querySelector('#resolverTicket')
        const fecharBtn = card.querySelector('#fecharTicket')
        const abrirBtn = card.querySelector('#abrirTicket')
    
        resolverBtn.addEventListener('click', async () => {
            await resolverTicket(btn.dataset.id)
            carregarMeusTickets(container, usuario)
        });

        fecharBtn.addEventListener('click', () => {
            modalFecharTicket(fecharBtn.dataset.id, container, usuario)
        })
    });


}

async function modalFecharTicket(id, container, usuario) {
    const modal = document.getElementById('app__closeTicket');

    modal.innerHTML = `
        <div class="app__closeTicket--content">
            <h1 class="app__closeTicket--content--title inter-bold mint-text mint-selection">Fechar ticket</h1>
            <label for="closeTicketResponse" class="inter-regular white-text mint-selection">Resposta:</label>
            <textarea id="closeTicketResponse" class="app__closeTicket--content--textarea white-text amber-selection" placeholder="Escreva a resposta final do ticket..."></textarea>
            <div class="app__closeTicket--content--buttons">
                <button class="app__closeTicket--content--buttons--button button-text" id="closeTicketButton">Fechar ticket</button>
                <button class="app__closeTicket--content--buttons--button button-text" id="cancelCloseTicketButton">Cancelar</button>
            </div>
        </div>
    `;

    const confirmBtn = document.getElementById('closeTicketButton');
    const cancelBtn = document.getElementById('cancelCloseTicketButton');

    modal.classList.remove("closed");

    cancelBtn.addEventListener('click', () => {
        modal.classList.add("closed")
        modal.innerHTML = '';
    });

    confirmBtn.addEventListener('click', async () => {
        const ticketRes = document.getElementById('closeTicketResponse').value.trim();
        if (!ticketRes) {
            throw new Error("Resposta do ticket vazia")
        }
        await fecharTicket(id, ticketRes);
        cancelBtn.click();
        carregarMeusTickets(container, usuario);
    });
}

async function abrirComentario(container, id, button) {
    container.innerHTML = ''

    const comentarios = await buscarComentarios(id);
    let htmlTicketBoxes = ``;

    comentarios.forEach(coment => {
        let tipo = coment.usuario.tipo;

        if (tipo.startsWith("suporte")) {
            tipo = "suporte";
        };

        htmlTicketBoxes += `
            <div class="ticket__comment">
                <div class="ticket__comment__user-area">
                    <span class="ticket-title inter-bold white-text purple-selection">${coment.usuario.nome.trim()}</span>
                    <span class="ticket__status status-${tipo} mint-selection">${tipo}</span>
                </div>
                <div class="ticket__description-area">
                    <div class="ticket__description-area--scroll">
                        <p class="ticket-description inter-regular white-text amber-selection">${coment.texto}</p>
                    </div>
                </div>
            </div>
        `
    });

    container.innerHTML = `
        <div class="app__comments-header">
            <span class="title-text inter-bold white-text purple-selection" >Comentários</span>
            <button class="close-button" id="close-button">
                <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g opacity="0.4"> <path d="M9.16992 14.8299L14.8299 9.16992" stroke="#f5f5Ef" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M14.8299 14.8299L9.16992 9.16992" stroke="#f5f5Ef" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#f5f5Ef" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
            </button>
        </div>
        <div class="app__comments-comments__area-scroll">
            <div class="app__comments-comments__area">
                ${htmlTicketBoxes}
            </div>
        </div>
        <div class="app__comments-user-input-area">
            <div class="app__comments-comment-textarea">
                <textarea name="comment" id="comment-textarea" class="white-text amber-selection"></textarea>
            </div>
            <button class="add-comment-button button-text">Enviar</button>
        </div>
    `;

    const enviarBtn = container.querySelector('.add-comment-button')

    enviarBtn.addEventListener('click', async () => {
        const comentario = container.querySelector('#comment-textarea').value.trim();

        await comentarTicket(id, comentario);
        await abrirComentario(container, id, button);
    })

    const closeBtn = container.querySelector('#close-button');
    closeBtn.addEventListener('click', () => {
        container.innerHTML = '';
        container.classList.add('closed')
        button.disabled = false;
    })
}

