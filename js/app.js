"use strict";

const formulario = document.getElementById("converter-form");
const campoValor = document.getElementById("valor");
const selectOrigem = document.getElementById("unidade-origem");
const selectDestino = document.getElementById("unidade-destino");
const botaoLimpar = document.getElementById("limpar");
const mensagemErro = document.getElementById("mensagem-erro");
const areaResultado = document.getElementById("result-area");
const campoResultado = document.getElementById("resultado");

function carregarUnidades() {
    selectOrigem.innerHTML = "";
    selectDestino.innerHTML = "";

    Object.entries(UNIDADES_COMPRIMENTO).forEach(([codigo, unidade]) => {
        const opcaoOrigem = document.createElement("option");

        opcaoOrigem.value = codigo;
        opcaoOrigem.textContent = unidade.nome;

        const opcaoDestino = opcaoOrigem.cloneNode(true);

        selectOrigem.appendChild(opcaoOrigem);
        selectDestino.appendChild(opcaoDestino);
    });

    selectOrigem.value = "m";
    selectDestino.value = "cm";
}

function validarValor(valorInformado) {
    const texto = String(valorInformado).trim();

    if (texto === "") {
        return {
            valido: false,
            mensagem: "Informe um valor para converter."
        };
    }

    const valor = Number(texto.replace(",", "."));

    if (!Number.isFinite(valor)) {
        return {
            valido: false,
            mensagem: "Digite um número válido."
        };
    }

    if (valor < 0) {
        return {
            valido: false,
            mensagem: "O valor não pode ser negativo."
        };
    }

    return {
        valido: true,
        valor
    };
}

function definirEstadoVisual(estado) {
    areaResultado.classList.toggle(
        "estado-sucesso",
        estado === "sucesso"
    );

    areaResultado.classList.toggle(
        "estado-erro",
        estado === "erro"
    );

    mensagemErro.classList.toggle(
        "error",
        estado === "erro"
    );
}

function exibirErro(mensagem) {
    mensagemErro.textContent = mensagem;
    campoResultado.textContent =
        "Não foi possível realizar a conversão.";

    definirEstadoVisual("erro");
}

function exibirResultado(mensagem) {
    mensagemErro.textContent = "";
    campoResultado.textContent = mensagem;

    definirEstadoVisual("sucesso");
}

function converterFormulario(evento) {
    evento.preventDefault();

    const validacao = validarValor(campoValor.value);

    if (!validacao.valido) {
        exibirErro(validacao.mensagem);
        return;
    }

    const resultado = converterComprimento(
        validacao.valor,
        selectOrigem.value,
        selectDestino.value
    );

    const descricao = criarDescricaoConversao(
        validacao.valor,
        resultado,
        selectOrigem.value,
        selectDestino.value
    );

    exibirResultado(descricao);
}

function limparResultado() {
    mensagemErro.textContent = "";
    campoResultado.textContent =
        "Informe os dados e clique em converter.";

    definirEstadoVisual("inicial");
    selectOrigem.value = "m";
    selectDestino.value = "cm";
    campoValor.focus();
}

formulario.addEventListener("submit", converterFormulario);
botaoLimpar.addEventListener("click", limparResultado);

carregarUnidades();
definirEstadoVisual("inicial");
