const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

document.getElementById("aviso-vigencia").textContent =
  "Base: " + META.guia + ". " + META.vigencia;

const SITUACOES_FRAUDE = ["invasao", "golpe", "coercao", "loja_fraudadora"];

// Decide qual cenário da BASE_JURIDICA se aplica.
// Ordem: 1) fora do MED por natureza, 2) prazo, 3) falha operacional, 4) fraude.
function decidir(situacao, dias) {
  if (situacao === "erro_proprio") return "nao_se_aplica_erro";
  if (situacao === "desacordo") return "nao_se_aplica_comercial";
  if (dias > META.prazoMedDias) return "prazo_esgotado";
  if (situacao === "falha_operacional") return "falha_operacional";
  if (SITUACOES_FRAUDE.includes(situacao)) return "fraude_med";
  return null;
}

function montarCaixa(classe, etiqueta, bloco, extras) {
  const caixa = document.createElement("div");
  caixa.className = "caixa " + classe;

  if (etiqueta) {
    const tag = document.createElement("span");
    tag.className = "etiqueta";
    tag.textContent = etiqueta;
    caixa.appendChild(tag);
  }

  const h2 = document.createElement("h2");
  h2.textContent = bloco.titulo;
  caixa.appendChild(h2);

  const p = document.createElement("p");
  p.textContent = bloco.texto;
  caixa.appendChild(p);

  if (bloco.passos && bloco.passos.length) {
    const ul = document.createElement("ul");
    bloco.passos.forEach(function (texto) {
      const li = document.createElement("li");
      li.textContent = texto;
      ul.appendChild(li);
    });
    caixa.appendChild(ul);
  }

  if (extras) caixa.appendChild(extras);
  return caixa;
}

function montarOrientacoes(bo) {
  const linhas = [bo === "sim" ? ORIENTACOES.bo_sim : ORIENTACOES.bo_nao];

  const caixa = document.createElement("div");
  caixa.className = "caixa";

  const h2 = document.createElement("h2");
  h2.textContent = "Orientações";
  caixa.appendChild(h2);

  const ul = document.createElement("ul");
  linhas.forEach(function (texto) {
    const li = document.createElement("li");
    li.textContent = texto;
    ul.appendChild(li);
  });
  caixa.appendChild(ul);

  return caixa;
}

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  resultado.replaceChildren();

  const situacao = document.getElementById("situacao").value;
  const diasTexto = document.getElementById("dias").value;
  const dias = Number(diasTexto);
  const bo = document.getElementById("bo").value;

  if (!situacao || diasTexto === "" || !Number.isInteger(dias) || dias < 0) {
    const erro = document.createElement("p");
    erro.className = "erro";
    erro.textContent = "Escolha o que aconteceu e informe os dias desde a transação (número inteiro, 0 ou mais).";
    resultado.appendChild(erro);
    resultado.classList.remove("oculto");
    return;
  }

  const chave = decidir(situacao, dias);
  const cenario = BASE_JURIDICA[chave];

  // Referências normativas ficam no fim da caixa do MED.
  const refs = document.createElement("p");
  refs.className = "refs";
  refs.textContent = "Base: " + cenario.referencias.join("; ");

  resultado.appendChild(montarCaixa(cenario.status, cenario.etiqueta, cenario.med, refs));

  if (cenario.depois) {
    resultado.appendChild(montarCaixa("alerta", null, RESPONSABILIDADE_CIVIL));
  }

  // A orientação sobre o B.O. só aparece quando há algo a contestar.
  if (chave === "fraude_med" || chave === "falha_operacional" || chave === "prazo_esgotado") {
    resultado.appendChild(montarOrientacoes(bo));
  }

  resultado.classList.remove("oculto");
});