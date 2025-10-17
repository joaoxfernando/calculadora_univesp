function mostrarFormulario() {
  const checked = document.querySelector('input[name="tipo"]:checked');
  const valor = checked ? checked.value : '';
  const map = { bimestral: 'formBimestral', exame: 'formExame', projeto: 'formProjeto', exigida: 'formNotaExigida' };

  document.querySelectorAll('.formulario').forEach(el => el.classList.remove('active'));

  if (map[valor]) {
    const el = document.getElementById(map[valor]);
    if (el) el.classList.add('active');
  }
}

function arredondarMeioPonto(numero) {
  return Math.round(numero * 2) / 2;
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
    document.getElementById('resultadoBimestral').innerHTML = '<span style="color: #ff3232d2">Preencha todos os campos corretamente.</span>';
    return;
    } else if (atividades < 0 || atividades > 10 || prova < 0 || prova > 10) {
    document.getElementById('resultadoBimestral').innerHTML = '<span style="color: #ff3232d2">Atenção: as notas devem estar entre 0 e 10.</span>';
    return;
    }

    
    const notaFinal = (atividades * 0.4) + (prova * 0.6);
    const aprovado = notaFinal >= 5;
    const corAprovado = aprovado ? '#4caf50' : '#ff3232d2';
    const status = aprovado ? 'Aprovado ✅' : 'Reprovado ❌';

    document.getElementById('resultadoBimestral').innerHTML = `<span style="color: ${corAprovado};">Média final: ${notaFinal.toFixed(2)} - ${status}</span>`;

    gtag('event', 'countClicksBimestral', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Bimestral',
      'value': 1
    });
}

function calcularNotaProjeto() {

    const planoAcao = parseFloat(document.getElementById('plano-acao').value);
    const relatorioParcial = parseFloat(document.getElementById('relatorio-parcial').value);
    const relatorioFinal = parseFloat(document.getElementById('relatorio-final').value);
    const video = parseFloat(document.getElementById('video').value);


    if (isNaN(planoAcao) || isNaN(relatorioParcial) || isNaN(relatorioFinal) || isNaN(video)) {
    document.getElementById('resultadoProjeto').innerHTML = '<span style="color: #ff3232d2">Preencha todos os campos corretamente.';
    return;
    } else if (planoAcao < 0 || planoAcao > 10 || relatorioParcial < 0 || relatorioParcial > 10 || relatorioFinal < 0 || relatorioFinal > 10 || video < 0 || video > 10) {
    document.getElementById('resultadoProjeto').innerHTML = '<span style="color: #ff3232d2">Atenção: as notas devem estar entre 0 e 10.';
    return;
    }

    const notaFinal = (planoAcao * 0.15) + (relatorioParcial * 0.25) + (relatorioFinal * 0.35) + (video * 0.1);
    const aprovado = notaFinal >= 5;
    const corAprovado = aprovado ? '#4caf50' : '#ff3232d2';
    const status = aprovado ? 'Aprovado ✅' : 'Reprovado ❌';

    gtag('event', 'countClicksProjeto', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Projeto Integrador',
      'value': 1
    });

    document.getElementById('resultadoProjeto').innerHTML = `<span style="color: ${corAprovado};">Nota final: ${notaFinal.toFixed(2)} - ${status}</span>`;
}

function calcularNotaExame() {

    const mediaNota = parseFloat(document.getElementById('atividades-prova').value);
    const notaExame = parseFloat(document.getElementById('exame').value);

    if (isNaN(mediaNota) || isNaN(notaExame)) {
    document.getElementById('resultadoExame').innerHTML = '<span style="color: #ff3232d2">Preencha todos os campos corretamente.';
    return;
    } else if (mediaNota < 0 || mediaNota > 10 || notaExame < 0 || notaExame > 10) {
    document.getElementById('resultadoExame').innerHTML = '<span style="color: #ff3232d2">Atenção: as notas devem estar entre 0 e 10.'; 
    return;
    }

    const notaFinal = (mediaNota + notaExame) / 2;
    const aprovado = notaFinal >= 5;
    const corAprovado = aprovado ? '#4caf50' : '#ff3232d2';
    const status = aprovado ? 'Aprovado ✅' : 'Reprovado ❌';

    document.getElementById('resultadoExame').innerHTML = `<span style="color: ${corAprovado};">Média final após exame: ${notaFinal.toFixed(2)} - ${status}</span>`;
    
    gtag('event', 'countClicksExame', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota do Exame',
      'value': 1
      });
  }

function calcularNotaExigida() {
    const mediaNota = parseFloat(document.getElementById('atividades-semanais').value);

    if (isNaN(mediaNota)) {
    document.getElementById('resultadoNotaExigida').innerHTML = '<span style="color: #ff3232d2">Preencha todos os campos corretamente.'; 
    return;
    } else if (mediaNota < 0 || mediaNota > 10) {
    document.getElementById('resultadoNotaExigida').innerHTML = '<span style="color: #ff3232d2">Atenção: as notas devem estar entre 0 e 10.';
    return;
    }

    const mediaAprovacao = 5;
    const notaNecessaria = (mediaAprovacao-(mediaNota*0.4))/0.6;
    const corTexto = '#7b9cffff'

    const status = 
    `<span style="color: ${corTexto};">Você precisa tirar pelo menos</span> <span style="color:#4caf50;">` 
    + arredondarMeioPonto(notaNecessaria.toFixed(2)) 
    + `</span><span style="color: ${corTexto};"> pontos na prova regular para ser aprovado.</span>`;

    gtag('event', 'countClicksNotaNecessaria', {
      'event_category': 'interacao',
      'event_label': 'Cliques botão Calcular Nota Necessária para passar',
      'value': 1
      });

    document.getElementById('resultadoNotaExigida').innerHTML = `${status}`; 

  }


// Obtendo o ano atual para inserir no rodapé
document.addEventListener('DOMContentLoaded', () => {
  const anoEl = document.getElementById('anoAtual');
  if (anoEl) anoEl.textContent = new Date().getFullYear();
});