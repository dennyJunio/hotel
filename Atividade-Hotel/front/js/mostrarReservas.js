const containerReservas = document.querySelector('#reservas');

const URL = 'http://localhost:8080/apiReservas.php';

function carregarReservas(){
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(reservas => {
            containerReservas.innerHTML = '';
            const options = {year: 'numeric', month: 'numeric', day: 'numeric'}
            for(let i = 0; i <= reservas.length; i++){
                const reserva = reservas[i];
                const date_in = new Date(Date.UTC(reserva.check_in));
                const date_out = new Date(Date.UTC(reserva.check_out));    
                const card = document.createElement('card');
                card.innerHTML = `
                <div class="col-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title col-6">Quarto ${reserva.quarto}</h5>
                            <p class="card-text">Nome do cliente: ${reserva.cliente}</p>
                            <p class="card-text">Data de check-out: ${date_in.toLocaleDateString(options)}</p>
                            <p class="card-text">Data de check-out: ${date_out.toLocaleDateString(options)}</p>
                        </div>
                    </div>
                </div>
                `;
                containerReservas.appendChild(card);
            }
        })
}

carregarReservas();