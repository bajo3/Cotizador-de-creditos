// Verificar si los campos obligatorios están llenos
function validarCampos() {
    const valorAuto = document.getElementById("valor-auto").value.replace(/,/g, '');
    const anoAuto = document.getElementById("ano-auto").value;
    const cuotas = document.getElementById("cuotas").value;

    if (valorAuto === "" || isNaN(valorAuto) || anoAuto === "" || isNaN(anoAuto)) {
        document.getElementById("valor-auto").classList.add("required");
        document.getElementById("ano-auto").classList.add("required");
        return false;
    } else {
        document.getElementById("valor-auto").classList.remove("required");
        document.getElementById("ano-auto").classList.remove("required");
        return true;
    }
}

// Dar formato de comas a los números mientras se escriben
function agregarComas(input) {
    const num = input.value.replace(/\./g, '').replace(/\,/g, '');
    const numConComas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    input.value = numConComas;
}

document.getElementById("valor-auto").addEventListener("input", function() {
    agregarComas(this);
});

// Calcular valor de la cuota
document.getElementById("cotizar").addEventListener("click", function() {
    if (!validarCampos()) {
        return;
    }

    const valorAuto = parseFloat(document.getElementById("valor-auto").value.replace(/,/g, ''));
    const anoAuto = parseInt(document.getElementById("ano-auto").value);
    const cuotas = parseInt(document.getElementById("cuotas").value);

    const antiguedadAuto = new Date().getFullYear() - anoAuto;
    let tasaInteres;

    if (antiguedadAuto >= 0 && antiguedadAuto <= 10) {
        tasaInteres = 0.8;
    } else if (antiguedadAuto > 10 && antiguedadAuto <= 20) {
        tasaInteres = 0.88;
    } else if (antiguedadAuto > 20) {
        tasaInteres = 0.95;
    }

    const valorCuota = (valorAuto * tasaInteres) / cuotas;
    const valorCuotaConComas = valorCuota.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

    document.getElementById("resultado").innerHTML = `El valor de la cuota es: ${valorCuotaConComas}`;
});
