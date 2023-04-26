$(document).ready(function() {

    // Ocultar la animación de carga
    var loader = $('.loader');
    loader.addClass('hide');

    


    // Cargar la tabla de préstamos desde el localStorage, si existe
    const tablaPrestamosString = localStorage.getItem("tablaPrestamos");
    if (tablaPrestamosString) {
        const tablaPrestamos = $("#tabla-prestamos");
        tablaPrestamos.html(tablaPrestamosString);
    }

    // Cuando se hace clic en el botón "Cotizar"
    $("#cotizar").on("click", function () {

        // Obtener el valor y el año del auto del usuario
        const valorAuto = parseFloat($("#valor-auto").val().replace(/,/g, '.'))
        const anoAuto = parseInt($("#ano-auto").val());

        // Seleccionar el input "valor-auto"
        const valorAutoInput = $("#valor-auto");

        // Agregar el evento "input" al input "valor-auto"
        valorAutoInput.on("input", function () {
            // Obtener el valor actual del input
            const valor = parseFloat($(this).val().replace(/,/g, '.'));

         
        

            // Verificar si el valor es válido
            if (!isNaN(valor)) {
                // Convertir el valor a formato de moneda con separador de miles
                const valorConPuntos = valor.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

                // Actualizar el valor del input con el valor convertido
                $(this).val(valorConPuntos);
            }

            // Obtener la tabla de préstamos
            const tablaPrestamos = $("#tabla-prestamos");

            // Crear una nueva fila
            const fila = tablaPrestamos[0].insertRow(0);

            // Crear las celdas de la fila
            const celdaValorAuto = fila.insertCell();
            const celdaAnoAuto = fila.insertCell();
            const celdaCuotas = fila.insertCell();
            const celdaValorCuota = fila.insertCell();

            // Agregar la información del préstamo a las celdas
            celdaValorAuto.innerHTML = valorAuto.toLocaleString('es-ES', { style: 'currency', currency: 'ARS' });
            celdaAnoAuto.innerHTML = anoAuto;
            celdaCuotas.innerHTML = cuotas;
            celdaValorCuota.innerHTML = valorCuotaConComas;

            // Guardar la tabla en el localStorage
            const tablaPrestamosString = tablaPrestamos.html();
            localStorage.setItem("tablaPrestamos", tablaPrestamosString);
        });

        // Verificar si los campos obligatorios están llenos
        if (isNaN(valorAuto) || isNaN(anoAuto)) {
            $("#valor-auto").addClass("required");
            $("#ano-auto").addClass("required");
            return;
        } else {
            $("#valor-auto").removeClass("required");
            $("#ano-auto").removeClass("required");
        }


            // Calcular la edad del auto y la tasa de interés correspondiente
            const edadAuto = new Date().getFullYear() - anoAuto;
            let tasaInteres;

            if (edadAuto > 1 && edadAuto <= 10) {
                tasaInteres = 0.77;
            } else if (edadAuto > 0 && edadAuto <= 10) {
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
        $("#borrar-datos").on("click", function() {
            localStorage.removeItem("tablaPrestamos");
            // Elimina la tabla de préstamos en la página
            $("#tabla-prestamos").html("");
          });

      

    });
    
