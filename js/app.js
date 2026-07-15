"use strict";

const selectOrigem = document.getElementById("from-unit");
const selectDestino = document.getElementById("to-unit");

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

carregarUnidades();
