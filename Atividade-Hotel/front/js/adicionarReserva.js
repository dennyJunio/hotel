const form = document.querySelector('#form');
const inputQuarto = document.querySelector('#inputQuarto');
const inputCliente = document.querySelector('#inputCliente');
const inputCheckIn = document.querySelector('#inputCheckIn');
const inputCheckOut = document.querySelector('#inputCheckOut');
const URLReservas = 'http://localhost:8080/apiReservas.php';

function adicionarReserva(e){
    e.preventDefault()

    const quarto = inputQuarto.value;
    const cliente = inputCliente.value;
    const checkIn = inputCheckIn.value;
    const checkOut = inputCheckOut.value;
    
    fetch(URLQuartos, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors'
    })
        .then(response => response.json())
        .then(quartos => {
            for(let i = 0; i <= quartos.length; i++){
                const campo = quartos[i];
                console.log("i: ", i)
                console.log("campo: ", campo)
                console.log("quarto: ", quarto)
                console.log("disponivel: ", !campo.disponivel, campo.disponivel)
                if(campo.numQuarto == quarto && campo.disponivel){
                    console.log("deuserto")
                    fetch(URLReservas, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body: `quarto=${encodeURIComponent(quarto)}&cliente=${encodeURIComponent(cliente)}&check_in=${encodeURIComponent(checkIn)}&check_out=${encodeURIComponent(checkOut)}`
                    })
                        .then(response => {
                            if(response.ok){
                                console.log("response: ", response)
                                swal("Reserva adicionada", "Sua reserva foi feita com sucesso!", "success");
                            } else{
                                console.error('Erro ao adicionar reserva');
                                swal("Erro ao adicionar reserva", "error");
                            }
                        })
                } else if(campo.numQuarto == quarto && !campo.disponivel){
                    console.error('Erro ao adicionar reserva: quarto não disponível');
                    swal("Erro ao adicionar reserva!", "O quarto selecionado não está disponível", "error");
                    end
                } else{
                    console.error('Erro ao adicionar reserva: quarto não existente');
                    swal("Erro ao adicionar reserva!", "O número de quarto inserido não existe, por favor insira outro", "error");
                }
            }
        })
}

form.addEventListener('submit', adicionarReserva);
