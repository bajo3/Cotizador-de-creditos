// Cuando se carga la página
window.addEventListener('load', function () {
    // Ocultar la animación de carga
    var loader = document.querySelector('.loader');
    loader.classList.add('hide');

    // Cuando se hace clic en el botón "Cotizar"
    document.getElementById("cotizar").addEventListener("click", function () {
        // Obtener el valor y el año del auto del usuario
        const valorAuto = parseFloat(document.getElementById("valor-auto").value.replace(/,/g, '.'))
        const anoAuto = parseInt(document.getElementById("ano-auto").value);

        // Seleccionar el input "valor-auto"
        const valorAutoInput = document.getElementById("valor-auto");

        // Agregar el evento "input" al input "valor-auto"
        valorAutoInput.addEventListener("input", function () {
            // Obtener el valor actual del input
            const valor = parseFloat(this.value.replace(/,/g, '.'));

            // Verificar si el valor es válido
            if (!isNaN(valor)) {
                // Convertir el valor a formato de moneda con separador de miles
                const valorConPuntos = valor.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

                // Actualizar el valor del input con el valor convertido
                this.value = valorConPuntos;
            }
        });

        // Verificar si los campos obligatorios están llenos
        if (isNaN(valorAuto) || isNaN(anoAuto)) {
            document.getElementById("valor-auto").classList.add("required");
            document.getElementById("ano-auto").classList.add("required");
            return;
        } else {
            document.getElementById("valor-auto").classList.remove("required");
            document.getElementById("ano-auto").classList.remove("required");
        }

        // Calcular la edad del auto y la tasa de interés correspondiente
        const edadAuto = new Date().getFullYear() - anoAuto;
        let tasaInteres;

        if (edadAuto > 1 && edadAuto <= 10) {
            tasaInteres = 0.77;
        }else if (edadAuto > 0 && edadAuto <= 10) {
            tasaInteres = 0.8;
        } else if (edadAuto > 10 && edadAuto <= 20) {
            tasaInteres = 0.88;
        } else if (edadAuto > 20) {
            tasaInteres = 0.95;
        }

        // Obtener el número de cuotas
        const cuotas = parseInt(document.getElementById("cuotas").value);

        // Calcular el valor de cada cuota
        const valorCuota = (valorAuto * tasaInteres) / cuotas;
        // Formatear el valor con comas para mostrarlo en el HTML
        const valorCuotaConComas = valorCuota.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // Mostrar el resultado en el HTML
        document.getElementById("resultado").innerHTML = `El valor de la cuota es: ${valorCuotaConComas}`;
    });

    // Resaltar en rojo los campos que faltan llenar
    document.getElementById("valor-auto").addEventListener("blur", function () {
        if (this.value === '') {
            this.classList.add("required");
        } else {
            this.classList.remove("required");
        }
    });

    document.getElementById("ano-auto").addEventListener("blur", function () {
        if (this.value === '') {
            this.classList.add("required");
        } else {
            this.classList.remove("required");
        }
    });


});
