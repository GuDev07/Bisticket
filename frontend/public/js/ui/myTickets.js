import { buscarComentarios, buscarTickets } from "../api.js"

export async function carregarMeusTickets(container, usuario) {
    container.innerHTML = ''

    const tickets = await buscarTickets();
    let htmlTicketBoxes = ``;

    tickets.forEach(ticket => {
        htmlTicketBoxes += `
            <div class="ticket">
                <div class="ticket__status-area">
                    <span class="ticket__status status-${ticket.status}">${ticket.status}</span>
                </div>
                <div class="ticket__title-area">
                    <h1 class="ticket-title inter-bold white-text purple-selection">${ticket.titulo}</h1>
                </div>
                <div class="ticket__description-area">
                    <div class="ticket__description-area--scroll">
                        <p class="ticket-description inter-regular white-text amber-selection">${ticket.descricao}</p>
                    </div>
                </div>
                <button class="ticket__comments-button button-text" id="mostrarComentario" data-id="${ticket.id}">Mostrar Comentários</button>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="tickets">
            <h1 class="tickets-title inter-bold title purple-selection">Olá <span class="purple-text purple-selection">${usuario}</span></h1>
            <div class="tickets__area">
                ${htmlTicketBoxes}
            </div>
        </div>
    `;

    const comentBtn = container.querySelectorAll('.ticket__comments-button');

    comentBtn.forEach(btn => {

        btn.addEventListener('click', () => {
            const comentarioContainer = document.getElementById('app__comments');
    
            abrirComentario(comentarioContainer, btn.dataset.id)
            comentarioContainer.classList.toggle('closed', false)
        })
    })

}

export async function abrirComentario(container, id) {
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
                    <span class="ticket__status status-${coment.usuario.tipo} mint-selection">${coment.usuario.tipo}</span>
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
        <div class="app__comments-comments__area">
            ${htmlTicketBoxes}
        </div>
    `;

    const closeBtn = container.querySelector('#close-button');
    closeBtn.addEventListener('click', () => {
        container.innerHTML = '';
        container.classList.add('closed')
    })
}

