$(document).ready(function() {
    // Configurar el input del valor del auto
    $('#valor-auto').inputmask({
      'alias': 'numeric',
      'groupSeparator': ',',
      'autoGroup': true,
      'digits': 2,
      'radixPoint': '.',
      'allowMinus': false,
      'rightAlign': false
    });
  
    // Configurar el input del año del auto
    $('#ano-auto').inputmask({
      'alias': 'numeric',
      'autoGroup': true,
      'allowMinus': false,
      'rightAlign': false
    });
  });
  