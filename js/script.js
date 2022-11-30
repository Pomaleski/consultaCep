document.addEventListener('DOMContentLoaded', () => {
    const campoCep = document.querySelector('#cep');
    const info = document.querySelector('#info');

    campoCep.addEventListener('input', (e) => {
        const divCep = document.querySelector('#campo-cep');
        const msg = document.querySelector('#cep-invalido');
        const conexao = document.querySelector('#erro-conexao');
        
        let cep = campoCep.value;

        if (validaCep(cep)) {
            info.classList.add('active');

            if (msg !== null) {
                msg.remove();
            }

            fetch('https://brasilapi.com.br/api/cep/v1/' + campoCep.value)
            .then((res) => {
                if(res.ok) {
                    if (conexao !== null) {
                        conexao.remove();
                    }

                    return res.json();
                } else {
                    if (conexao === null) {
                        let span = document.createElement('span');
                        span.classList.add('fs-6', 'mt-2', 'text-danger', 'fw-bold');
                        span.id = 'erro-conexao';
                        if (res.status === 404) {
                            span.innerHTML = 'Página não encontrada';
                        } else {
                            span.innerHTML = 'Erro de conexão';
                        }
                        info.insertBefore(span, info.children[0]);
                    }
                }
            })
            .then((dados) => {
                document.querySelector('#estado').innerHTML = dados.state;
                document.querySelector('#cidade').innerHTML = dados.city;
                document.querySelector('#rua').innerHTML = dados.street;
                document.querySelector('#bairro').innerHTML = dados.neighborhood;
            })

        } else {
            info.classList.remove('active');

            if (msg == null) {
                let span = document.createElement('span');
                span.classList.add('fs-6', 'mt-2', 'text-danger', 'fw-bold');
                span.id = 'cep-invalido';
                span.innerHTML = 'CEP inválido';
                divCep.appendChild(span);
            }
        }

    })
})

// https://brasilapi.com.br/api/cep/v1/{cep}


function validaCep(cepParam) {
    let cep = cepParam.replace(/\D/g, '');

    if (cep != '') {
        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}