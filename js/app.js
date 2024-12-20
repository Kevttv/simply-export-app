// Obtener referencias a los elementos del DOM
const form = document.getElementById('data-form');
const tableBody = document.querySelector('#data-table tbody');
const exportBtn = document.getElementById('export-btn');

// Almacenamiento temporal en memoria para los datos del formulario
let data = [];

// Función para renderizar la tabla con los datos almacenados
function renderTable() {
    tableBody.innerHTML = ''; // Limpia la tabla antes de renderizar
    data.forEach((item, index) => {
        // Crear una nueva fila para cada elemento en los datos
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.Nombre}</td>
          <td>${item.Email}</td>
          <td><button class="delete-button" onclick="deleteRow(${index})"> 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        </button></td>
        `;
        // Agregar la fila a la tabla
        tableBody.appendChild(row);
    });
}

// Manejo del evento de envío del formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Agregar los datos del formulario al almacenamiento en memoria
    data.push({ Nombre: name, Email: email });

    // Renderizar la tabla con los nuevos datos
    renderTable();

    // Limpiar los campos del formulario
    form.reset();
});

// Función para eliminar una fila de la tabla y los datos en memoria
function deleteRow(index) {
    // Eliminar el elemento en el índice especificado
    data.splice(index, 1);

    // Renderizar la tabla nuevamente para reflejar los cambios
    renderTable();
}

// Manejo del evento de clic del botón de exportación
exportBtn.addEventListener('click', () => {
    if (data.length === 0) {
        alert('No hay datos para exportar');
        return;
    }

    // Crear un nuevo libro de trabajo de Excel
    const wb = XLSX.utils.book_new();

    // Convertir los datos en memoria a una hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(data);

    // Agregar la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    // Descargar el archivo Excel con los datos
    XLSX.writeFile(wb, 'datos.xlsx');
});