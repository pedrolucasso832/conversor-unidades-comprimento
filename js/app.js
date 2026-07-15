"use strict";

const formulario = document.getElementById("converter-form");
const campoValor = document.getElementById("valor");
const selectOrigem = document.getElementById("unidade-origem");
const selectDestino = document.getElementById("unidade-destino");
const botaoLimpar = document.getElementById("limpar");
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

function converterFormulario(evento) {
    evento.preventDefault();

    const validacao = validarValor(campoValor.value);

    if (!validacao.valido) {
        campoResultado.textContent = validacao.mensagem;
        return;
    }

    const resultado = converterComprimento(
        validacao.valor,
        selectOrigem.value,
        selectDestino.value
    );

    campoResultado.textContent =
        `${formatarResultado(validacao.valor)} ` +
        `${obterNomeUnidade(selectOrigem.value)} equivalem a ` +
        `${formatarResultado(resultado)} ` +
        `${obterNomeUnidade(selectDestino.value)}.`;
}

function limparResultado() {
    campoResultado.textContent =
        "Informe os dados e clique em converter.";

    selectOrigem.value = "m";
    selectDestino.value = "cm";
    campoValor.focus();
}

formulario.addEventListener("submit", converterFormulario);
botaoLimpar.addEventListener("click", limparResultado);

carregarUnidades();
