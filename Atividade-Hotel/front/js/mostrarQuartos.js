const containerQuartos = document.querySelector('#quartos');

const URLQuartos = 'http://localhost:8080/apiQuartos.php';

function carregarQuartos(){
    fetch(URLQuartos, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            containerQuartos.innerHTML = '';

            for(let i = 0; i <= quartos.length; i++){
                const quarto = quartos[i];
                if(quarto.disponivel){
                    const card = document.createElement('card');
                    card.innerHTML = `
                    <div class="col-4">
                      <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">Quarto ${quarto.numQuarto}</h5>
                              <p class="card-text">${quarto.tipoQuarto}</p>
                          </div>
                      </div>
                    </div>
                    `;
                    containerQuartos.appendChild(card);
                }
            }
        })
}

carregarQuartos();