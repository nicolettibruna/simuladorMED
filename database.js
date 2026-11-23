// Base de conhecimento do simulador.
// Fonte: Guia MED do Banco Central, versão 4.4.

const META = {
  guia: "Guia MED do Banco Central, versão 4.4",
  vigencia: "Consulta realizada em 23/11/2026.",
  prazoMedDias: 80,
  prazoRecebedorPorIniciativaPropriaDias: 90
};

const BASE_JURIDICA = {
  nao_se_aplica_erro: {
    status: "negado",
    etiqueta: "MED não se aplica",
    med: {
      titulo: "O que acontece no MED",
      texto: "Erro do próprio usuário (chave errada, arrependimento) não é fraude nem falha operacional, então não abre Recuperação de Valores.",
      passos: [
        "Peça a devolução diretamente a quem recebeu (o MED não faz isso por você).",
        "Se a pessoa não devolver, avalie ação judicial."
      ]
    },
    depois: null,
    referencias: ["Guia MED v4.4 (hipóteses de cabimento)"]
  },

  nao_se_aplica_comercial: {
    status: "negado",
    etiqueta: "MED não se aplica",
    med: {
      titulo: "O que acontece no MED",
      texto: "Controvérsia sobre o negócio por trás do Pix (entrega atrasada, produto que não agradou) é desacordo comercial. O MED não é chargeback e não permite pedir devolução nesses casos.",
      passos: [
        "Reclame com o vendedor e use os canais de defesa do consumidor (Procon, consumidor.gov.br).",
        "Se necessário, ação judicial contra o vendedor.",
        "Se o vendedor na verdade nunca enviou nada ou enviou algo totalmente diferente, trata-se de loja fraudadora: refaça a análise escolhendo essa opção."
      ]
    },
    depois: null,
    referencias: ["Guia MED v4.4 (desacordo comercial fica fora do MED)"]
  },

  prazo_esgotado: {
    status: "alerta",
    etiqueta: "Prazo do MED esgotado",
    med: {
      titulo: "O que acontece no MED",
      texto: "A transação passou de 80 dias, então o prazo para pedir o MED esgotou.",
      passos: [
        "Contate o banco mesmo assim: o banco recebedor ainda pode devolver por conta própria, em até 90 dias, se identificar a fraude.",
        "Guarde provas (comprovante, conversas, B.O.) para a etapa seguinte."
      ]
    },
    depois: "responsabilidade_civil",
    referencias: ["Guia MED v4.4 (prazo de 80 dias; devolução por iniciativa do recebedor em até 90 dias)"]
  },

  falha_operacional: {
    status: "aprovado",
    etiqueta: "Falha operacional: devolução entre bancos",
    med: {
      titulo: "O que acontece no MED",
      texto: "Falha operacional segue um caminho separado do de fraude. Não há bloqueio prévio.",
      passos: [
        "O banco recebedor tem 48 horas para devolver.",
        "Ele só devolve se houver saldo na conta e não é obrigado a usar recursos próprios.",
        "Não vale se o Pix foi iniciado corretamente por você e creditado no valor certo (art. 41-B, § 3º)."
      ]
    },
    depois: "responsabilidade_civil",
    referencias: ["Guia MED v4.4", "Art. 41-B, § 3º"]
  },

  fraude_med: {
    status: "aprovado",
    etiqueta: "Dentro do MED: conteste agora",
    med: {
      titulo: "O que acontece no MED",
      texto: "O MED cobre qualquer golpe, inclusive quando você autorizou o Pix com senha ou biometria. Conteste no app do seu banco agora. Não é preciso ter B.O. para abrir.",
      passos: [
        "Prazo de 7 dias para o banco recebedor analisar.",
        "Depois da análise, 72 horas para o banco pagador iniciar a devolução.",
        "Documentos (como o B.O.) podem ser pedidos depois, não na abertura."
      ]
    },
    depois: "responsabilidade_civil",
    referencias: [
      "Guia MED v4.4: Capítulo XI e seção III do Capítulo XIII do Regulamento",
      "Art. 39-B (bloqueio cautelar, feito pelo banco recebedor)",
      "Art. 89, § 2º (rejeitar Pix de contas marcadas por fraude)"
    ]
  }
};

// Segunda camada: responsabilidade civil, discutida depois do MED.
const RESPONSABILIDADE_CIVIL = {
  titulo: "Se não resolver",
  texto: "Mesmo que o MED não recupere o dinheiro, você pode abrir uma disputa contra o seu próprio banco e, se perder, ir à Justiça.",
  passos: [
    "Disputa formal com o banco (reclamação no SAC e ouvidoria; depois, registrato/Banco Central).",
    "Ação judicial. Teses usuais: Súmula 479 do STJ (o banco responde pelos danos de fraudes por fortuito interno) e art. 14 do CDC (falha na prestação do serviço)."
  ]
};

// Orientações que NÃO alteram a elegibilidade.
const ORIENTACOES = {
  bo_nao: "Registre um B.O. assim que puder: não é exigido para abrir o MED, mas ajuda na análise e em eventual ação judicial.",
  bo_sim: "Guarde o B.O. e anexe quando o banco pedir documentos."
};