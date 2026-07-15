"use strict";

const UNIDADES_COMPRIMENTO = Object.freeze({
    mm: Object.freeze({
        nome: "Milímetros",
        singular: "milímetro",
        plural: "milímetros",
        fatorEmMetros: 0.001
    }),

    cm: Object.freeze({
        nome: "Centímetros",
        singular: "centímetro",
        plural: "centímetros",
        fatorEmMetros: 0.01
    }),

    m: Object.freeze({
        nome: "Metros",
        singular: "metro",
        plural: "metros",
        fatorEmMetros: 1
    }),

    km: Object.freeze({
        nome: "Quilômetros",
        singular: "quilômetro",
        plural: "quilômetros",
        fatorEmMetros: 1000
    }),

    in: Object.freeze({
        nome: "Polegadas",
        singular: "polegada",
        plural: "polegadas",
        fatorEmMetros: 0.0254
    }),

    ft: Object.freeze({
        nome: "Pés",
        singular: "pé",
        plural: "pés",
        fatorEmMetros: 0.3048
    }),

    yd: Object.freeze({
        nome: "Jardas",
        singular: "jarda",
        plural: "jardas",
        fatorEmMetros: 0.9144
    }),

    mi: Object.freeze({
        nome: "Milhas",
        singular: "milha",
        plural: "milhas",
        fatorEmMetros: 1609.344
    })
});

function obterUnidade(codigo) {
    const unidade = UNIDADES_COMPRIMENTO[codigo];

    if (!unidade) {
        throw new Error("Unidade de comprimento inválida.");
    }

    return unidade;
}

function converterComprimento(
    valor,
    unidadeOrigem,
    unidadeDestino
) {
    const origem = obterUnidade(unidadeOrigem);
    const destino = obterUnidade(unidadeDestino);

    const valorEmMetros =
        valor * origem.fatorEmMetros;

    return valorEmMetros / destino.fatorEmMetros;
}

function formatarResultado(valor) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 8
    }).format(valor);
}

function obterNomeUnidade(codigo, valor = 2) {
    const unidade = obterUnidade(codigo);

    return Math.abs(valor) === 1
        ? unidade.singular
        : unidade.plural;
}

function criarDescricaoConversao(
    valorOriginal,
    valorConvertido,
    unidadeOrigem,
    unidadeDestino
) {
    const verbo =
        Math.abs(valorOriginal) === 1
            ? "equivale"
            : "equivalem";

    return (
        `${formatarResultado(valorOriginal)} ` +
        `${obterNomeUnidade(unidadeOrigem, valorOriginal)} ` +
        `${verbo} a ` +
        `${formatarResultado(valorConvertido)} ` +
        `${obterNomeUnidade(unidadeDestino, valorConvertido)}.`
    );
}
