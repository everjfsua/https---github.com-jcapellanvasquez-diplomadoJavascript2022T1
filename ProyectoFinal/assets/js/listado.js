function formatearFecha(fecha) {
    const meses = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
           ];
       
        return `${fecha.getDate()}  ${meses[fecha.getMonth()]}  ${fecha.getFullYear()}` 
}


window.addEventListener('load', function(event) {
    renderizarLista(getTransacciones());
    const form = document.querySelector("#mi-form")

    form.addEventListener("submit", event => {
        event.preventDefault();
               
        const data = getTransacciones();
        const amount = +event.target.elements['amount'].value;
        const fecha = new Date(event.target.elements['fecha'].value) || new Date;
       
          
        
            filterData = data.filter(tran => {
            const tranFecha = new Date(tran.fecha_registro)
            return tranFecha.getTime() < fecha.getTime() && (tran.amount < amount)
        }) 

              renderizarLista(filterData)
    })

})

function renderizarLista(data) {
    
    const listado = document.querySelector("#listado");

    listado.innerHTML = '';

    for(let i=0; i < data.length; i++) {
        const tran = data[i];
        const fechaRegistro = formatearFecha(new Date(tran.fecha_registro));
        listado.innerHTML = listado.innerHTML +

        ` 
        <a href="#" class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                  
                   <h5 class="mb-1">${tran.cuenta}</h5> 
                    <small class="text-muted">${new Intl.NumberFormat('en-IN').format(tran.amount)}</small>
                </div>

                <p class="mb-1">${tran.notas}</p>
                <small class="text-muted">${fechaRegistro}.</small>
        </a>
        `;
    }

}

