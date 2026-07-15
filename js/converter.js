const UNIDADES_COMPRIMENTO = {
    mm: {
        nome: "Milímetros",
        fatorEmMetros: 0.001
    },

    cm: {
        nome: "Centímetros",
        fatorEmMetros: 0.01
    },

    m: {
        nome: "Metros",
        fatorEmMetros: 1
    },

    km: {
        nome: "Quilômetros",
        fatorEmMetros: 1000
    },

    in: {
        nome: "Polegadas",
        fatorEmMetros: 0.0254
    },

    ft: {
        nome: "Pés",
        fatorEmMetros: 0.3048
    },

    yd: {
        nome: "Jardas",
        fatorEmMetros: 0.9144
    },

    mi: {
        nome: "Milhas",
        fatorEmMetros: 1609.344
    }
};

function converterComprimento(
    valor,
    unidadeOrigem,
    unidadeDestino
) {
    const origem = UNIDADES_COMPRIMENTO[unidadeOrigem];
    const destino = UNIDADES_COMPRIMENTO[unidadeDestino];

    if (!origem || !destino) {
        throw new Error("Unidade de comprimento inválida.");
    }

    const valorEmMetros =
        valor * origem.fatorEmMetros;

    return valorEmMetros / destino.fatorEmMetros;
}

function formatarResultado(valor) {
    return new Intl.NumberFormat("pt-BR", {
        maximumFractionDigits: 8
    }).format(valor);
}

function obterNomeUnidade(codigo) {
    return UNIDADES_COMPRIMENTO[codigo]?.nome ?? codigo;
}
