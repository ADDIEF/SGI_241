function cargarPagina(pagina) {
    fetch(pagina)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar la página');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('contenido').innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('contenido').innerHTML = '<p>Error al cargar el contenido.</p>';
        });
}

function toggleMenu() {
    const navContainer = document.querySelector('.nav-container');
    navContainer.classList.toggle('active');
}
