// Realizar una solicitud a la API
fetch('https://api.bluelytics.com.ar/v2/latest')
.then(response => response.json()) // Convertir la respuesta a JSON
.then(data => {
  // Obtener los datos necesarios de la respuesta JSON
  const dolarOficialCompra = data.oficial.value_buy;
  const dolarOficialVenta = data.oficial.value_sell;
  const blueCompra = data.blue.value_buy;
  const blueVenta = data.blue.value_sell;

  // Agregar los datos a la tabla HTML
  const tableBody = document.querySelector('#dolar-table tbody');
  tableBody.innerHTML = `
    <tr>
      <td>Dólar Oficial</td>
      <td>${dolarOficialCompra}</td>
      <td>${dolarOficialVenta}</td>
    </tr>
    <tr>
      <td>Dólar Blue</td>
      <td>${blueCompra}</td>
      <td>${blueVenta}</td>
    </tr>
  `;
})
.catch(error => {
  console.error('Error:', error);
});
