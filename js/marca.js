var urlBase = "http://localhost:8080/marcas";

function salvar() {
    var dados = {
        "id": document.getElementById("txtId").value,
        "nome": document.getElementById("txtDescricao").value
    };

    if (dados.id != "") {
        atualizar(dados);
    } else {
        inserir(dados);
    }

}

function inserir(dados) {

    var requisicao = {
        method: "POST",
        body: JSON.stringify(dados),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(urlBase, requisicao)
        .then(res => {
            if (res.ok) {
                alert("Registro Inserido com sucesso");
            } else {
                alert("Verifique os dados. Tente novamente");
            }
        })
        .then(res => listarTodos())
        .catch(error => alert("Falha na requisicao ao backend"));

}

function listarTodos() {

    var requisicao = {
        method: "GET"
    };

    fetch(urlBase, requisicao)
        .then(res => res.json())
        .then(res => montarDados(res))
        .then(res => {
            document.getElementById("txtId").value = "";
            document.getElementById("txtDescricao").value = "";
        })
        .catch(error => alert("Falha na requisicao ao backend"));

}

function montarDados(dados) {
    //verifica no console se os dados estão OK
    //console.log(dados);
    var divDados = `<table class = 'table table-striped>'
                    <thead>
                        <tr> 
                            <th scope ='col'>ID</th>
                            <th scope ='col'>Descrição</th>
                            <th scope ='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>`;

    for (i = 0; i < dados.length; i++) {
        var item = dados[i];
        divDados += `<tr>
                            <td>${item.id}</td>
                            <td>${item.nome}</td>
                            <td onClick="buscaPorID(${item.id})" class="fas fa-edit"></td>
                            <td onClick="excluir(${item.id})" class="fas fa-trash-alt"></td>
                     </tr>`;
    }

    divDados += "</tbody></table>";

    document.getElementById("divDados").innerHTML = divDados;

}

function excluir(id) {
    var resposta = confirm("Deseja realmente excluir ?");
    if (resposta == false) {
        return;
    }

    var endpoint = `${urlBase}/${id}`;

    var requisicao = {
        method: "DELETE"
    };

    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {
                alert("Registro excluido com sucesso");
            } else {
                alert("Verifique os dados. Tente novamente");
            }
        })
        .then(res => listarTodos())
        .catch(error => alert("Falha na requisicao ao backend"));

}

function buscaPorID(id) {
    var endpoint = `${urlBase}/${id}`;

    var requisicao = {
        method: "GET"
    };

    fetch(endpoint, requisicao)
        .then(res => res.json())
        .then(res => {
            document.getElementById("txtDescricao").value = res.nome
        })
        .catch(error => alert("Falha na requisicao ao backend"));

}

function atualizar(dados) {
    var endpoint = `${urlBase}/${dados.id}`;

    var requisicao = {
        method: "PUT",
        body: JSON.stringify(dados),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch(endpoint, requisicao)
        .then(res => {
            if (res.ok) {
                alert("Registro Atualizado com sucesso");
            } else {
                alert("Verifique os dados. Tente novamente");
            }
        })
        .then(res => listarTodos())
        .catch(error => alert("Falha na requisicao ao backend"));

}