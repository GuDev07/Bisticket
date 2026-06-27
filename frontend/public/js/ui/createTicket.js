export async function telaCriarTicket(container) {
    container.innerHTML = '';

    container.innerHTML = `
        <div class="ticket">
            <div class="ticket__title-area">
                <span class="ticket-title inter-bold white-text purple-selection">Título</span>
                <input type="text" placeholder="Digite o título">
            </div>
            <span class="ticket-description inter-regular white-text amber-selection">Descrição</span>
            <div class="ticket__description-area">
                <div class="ticket__description-area--scroll">
                    <textarea name="description" id="description" class="ticket-description inter-regular white-text amber-selection" placeholder="Digite a descrição"></textarea>
                </div>
            </div>
            <button class="ticket__comments-button button-text">Adicionar Comentários</button>
        </div>
    `
}