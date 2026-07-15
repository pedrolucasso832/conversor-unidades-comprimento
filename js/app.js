"use strict";

const formulario = document.getElementById("conversion-form");
const campoValor = document.getElementById("value");
const selectOrigem = document.getElementById("from-unit");
const selectDestino = document.getElementById("to-unit");
const botaoLimpar = document.getElementById("clear-button");
const campoResultado = document.getElementById("result");

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

  campoResultado.textContent = formatarResultado(resultado);
}

function limparResultado() {
  campoResultado.textContent = "Informe os dados e clique em converter.";
}

formulario.addEventListener("submit", converterFormulario);
botaoLimpar.addEventListener("click", limparResultado);

carregarUnidades();
