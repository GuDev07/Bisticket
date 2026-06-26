import { buscarTickets } from "../api.js"

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
                    <p class="ticket-description inter-regular white-text amber-selection">${ticket.descricao}</p>
                </div>
                <button class="ticket__comments-button button-text">Mostrar Comentários</button>
            </div>
        `
    });

    container.innerHTML = `
        <div class="tickets">
            <h1 class="tickets-title inter-bold title purple-selection">Olá <span class="purple-text purple-selection">${usuario}</span></h1>
            <div class="tickets__area">
                ${htmlTicketBoxes}
            </div>
        </div>
    `
}