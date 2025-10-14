function mostrarFormulario() {
  const checked = document.querySelector('input[name="tipo"]:checked');
  const valor = checked ? checked.value : '';
  const map = { bimestral: 'formBimestral', exame: 'formExame', projeto: 'formProjeto' };

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

    if (isNaN(atividades) || isNaN(prova) ) {
    document.getElementById('resultadoBimestral').innerText = "Preencha todos os campos corretamente.";
    return;
    } else if (atividades < 0 || atividades > 10 || prova < 0 || prova > 10) {
    document.getElementById('resultadoBimestral').innerText = "Atenção: as notas devem estar entre 0 e 10.";
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
    } else if (planoAcao < 0 || planoAcao > 10 || relatorioParcial < 0 || relatorioParcial > 10 || relatorioFinal < 0 || relatorioFinal > 10 || video < 0 || video > 10) {
    document.getElementById('resultadoProjeto').innerText = "Atenção: as notas devem estar entre 0 e 10.";
    return;
    }

    const notaFinal = (planoAcao * 0.15) + (relatorioParcial * 0.25) + (relatorioFinal * 0.35) + (video * 0.1);
    const status = notaFinal >= 5 ? "Aprovado ✅" : "Reprovado ❌";

    gtag('event', 'countClicksProjeto', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Projeto Integrador',
      'value': 1
    });

    document.getElementById('resultadoProjeto').innerText = `Nota final: ${notaFinal.toFixed(2)} - ${status}`;
}

function calcularNotaExame() {
//  A pontuação do exame varia de 0 (zero) a 10 (dez). Para calcular a média final após a prova de exame, 
// soma-se a nota de exame à média obtida anteriormente (Média final na disciplina no bimestre, composta pela prova regular e atividades realizadas no AVA); 
// esse total é dividido por dois e o resultado será a média final do aluno na respectiva disciplina, após exame.

    const mediaNota = parseFloat(document.getElementById('atividades-prova').value);
    const notaExame = parseFloat(document.getElementById('exame').value);

    if (isNaN(mediaNota) || isNaN(notaExame)) {
    document.getElementById('resultadoExame').innerText = "Preencha todos os campos corretamente."; // alterar ID após inserir formulário no HTML.
    return;
    } else if (mediaNota < 0 || mediaNota > 10 || notaExame < 0 || notaExame > 10) {
    document.getElementById('resultadoExame').innerText = "Atenção: as notas devem estar entre 0 e 10."; // alterar ID após inserir formulário no HTML.
    return;
    }

    const notaFinal = (mediaNota + notaExame) / 2;
    const status = notaFinal >= 5 ? "Aprovado ✅" : "Reprovado ❌";

    gtag('event', 'countClicksExame', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota do Exame',
      'value': 1
      });


    document.getElementById('resultadoExame').innerText = `Média final após exame: ${notaFinal.toFixed(2)} - ${status}`; // alterar ID após inserir formulário no HTML.

  }

// Obtendo o ano atual para inserir no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();
});