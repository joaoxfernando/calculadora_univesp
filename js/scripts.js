function mostrarFormulario() {
  const checked = document.querySelector('input[name="tipo"]:checked');
  const valor = checked ? checked.value : '';
  const map = { bimestral: 'formBimestral', projeto: 'formProjeto' };

  document.querySelectorAll('.formulario').forEach(el => el.classList.remove('active'));

  if (map[valor]) {
    const el = document.getElementById(map[valor]);
    if (el) el.classList.add('active');
  }
}

// escuta mudanças nos radios e define estado inicial
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[name="tipo"]').forEach(r => {
    r.addEventListener('change', mostrarFormulario);
  });
  mostrarFormulario();
});

function calcularNotaBimestral() {
    const atividades = parseFloat(document.getElementById('atividades').value);
    const prova = parseFloat(document.getElementById('prova').value);

    if (isNaN(atividades) || isNaN(prova)) {
    document.getElementById('resultadoBimestral').innerText = "Preencha todos os campos corretamente.";
    return;
    }

    const notaFinal = (atividades * 0.4) + (prova * 0.6);
    const status = notaFinal >= 5 ? "Aprovado ✅" : "Reprovado ❌";

    gtag('event', 'countClicksBimestral', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Bimestral',
      'value': 1
    });

    document.getElementById('resultadoBimestral').innerText = `Média final: ${notaFinal.toFixed(2)} - ${status}`;
}

function calcularNotaProjeto() {

    const planoAcao = parseFloat(document.getElementById('plano-acao').value);
    const relatorioParcial = parseFloat(document.getElementById('relatorio-parcial').value);
    const relatorioFinal = parseFloat(document.getElementById('relatorio-final').value);
    const video = parseFloat(document.getElementById('video').value);


    if (isNaN(planoAcao) || isNaN(relatorioParcial) || isNaN(relatorioFinal) || isNaN(video)) {
    document.getElementById('resultadoProjeto').innerText = "Preencha todos os campos corretamente.";
    return;
    }

    const notaFinal = (planoAcao * 0.15) + (relatorioParcial * 0.25) + (relatorioFinal * 0.35) + (video * 0.1);
    const status = notaFinal >= 5 ? "Aprovado ✅" : "Reprovado ❌";

    gtag('event', 'countClicksBimestral', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Bimestral',
      'value': 1
    });

    document.getElementById('resultadoProjeto').innerText = `Nota final: ${notaFinal.toFixed(2)} - ${status}`;
}

// Obtendo o ano atual para inserir no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();
});