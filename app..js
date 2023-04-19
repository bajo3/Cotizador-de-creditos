window.addEventListener('load', function() {
    var loader = document.querySelector('.loader');
    loader.classList.add('hide');

    
    document.getElementById("cotizar").addEventListener("click", function() {
        const valorAuto = parseFloat(document.getElementById("valor-auto").value.replace(/,/g, ''));
        const anoAuto = parseInt(document.getElementById("ano-auto").value);
    
        // Verificar si los campos obligatorios están llenos
        if (isNaN(valorAuto) || isNaN(anoAuto)) {
            document.getElementById("valor-auto").classList.add("required");
            document.getElementById("ano-auto").classList.add("required");
            return;
        } else {
            document.getElementById("valor-auto").classList.remove("required");
            document.getElementById("ano-auto").classList.remove("required");
        }
    
        const edadAuto = new Date().getFullYear() - anoAuto;
        let tasaInteres;
    
        if (edadAuto >= 0 && edadAuto <= 10) {
            tasaInteres = 0.8;
        } else if (edadAuto > 10 && edadAuto <= 20) {
            tasaInteres = 0.88;
        } else if (edadAuto > 20) {
            tasaInteres = 0.95;
        }
    
        const cuotas = parseInt(document.getElementById("cuotas").value);
    
        const valorCuota = (valorAuto * tasaInteres) / cuotas;
        const valorCuotaConComas = valorCuota.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
        document.getElementById("resultado").innerHTML = `El valor de la cuota es: ${valorCuotaConComas}`;
    });
    
    // Resaltar en rojo los campos que faltan llenar
    document.getElementById("valor-auto").addEventListener("blur", function() {
        if (this.value === '') {
            this.classList.add("required");
        } else {
            this.classList.remove("required");
        }
    });
    
    document.getElementById("ano-auto").addEventListener("blur", function() {
        if (this.value === '') {
            this.classList.add("required");
        } else {
            this.classList.remove("required");
        }
    });
    
});

