import { criarTicket } from "../api.js";

export async function telaCriarTicket(container) {
    container.innerHTML = '';

    container.innerHTML = `
        <div class="create__ticket__screen">
            <div class="ticket">
                <div class="ticket__title-area">
                    <span class="ticket-title inter-bold white-text purple-selection">Título: *</span>
                    <input type="text" class="inter-bold white-text purple-selection" placeholder="Digite o título">
                </div>
                <span class="ticket-description inter-regular white-text amber-selection">Descrição *</span>
                <div class="ticket__description-area">
                    <div class="ticket__description-area--scroll">
                        <textarea name="description" id="description" class="ticket-description inter-regular white-text amber-selection" placeholder="Digite a descrição"></textarea>
                    </div>
                </div>
                <span class="ticket-description inter-regular white-text amber-selection">Comentário (opcional)</span>
                <div class="ticket__description-area">
                    <div class="ticket__description-area--scroll">
                        <textarea name="description" id="commentary" class="ticket-description inter-regular white-text amber-selection" placeholder="Digite o comentário"></textarea>
                    </div>
                </div>
                <div class="ticket__buttons">
                    <button class="ticket__button create-button button-text">Criar</button>
                </div>
            </div>
        </div>
    `;

    const criarBtn = container.querySelector('.create-button');
    const input = container.querySelector('input');
    const descArea = container.querySelector('#description');
    const comentArea = container.querySelector('#commentary');
    criarBtn.addEventListener('click', async () => {
        const titulo = input.value.trim();
        const desc = descArea.value.trim();
        const coment = comentArea.value.trim();

        if(!coment) {
            await criarTicket(titulo, desc)
        } else {
            await criarTicket(titulo, desc, coment)
        }
        
    })
}