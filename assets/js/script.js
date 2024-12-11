// Inicializar Flipping.js con easing personalizado
const flipping = new Flipping({
  easing: 'cubic-bezier(.5, 0, .5, 1)'
});


//---------------------------------------------------------------------------------------
// Seleccionar el elemento de navegación
const elNav = document.querySelector('nav');

// Obtener todos los elementos `li` en el menú de navegación
const elLinks = Array.from(elNav.querySelectorAll("ul li"));

// Configurar la propiedad CSS personalizada para la cantidad total de elementos
elNav.style.setProperty('--total', elLinks.length);

// Agregar un evento 'click' a cada elemento de la lista de navegación
elLinks.forEach((elLink, i) => {
    elLink.addEventListener('click', flipping.wrap(() => {
        // Eliminar el estado activo de todos los elementos
        elLinks.forEach(link => delete link.dataset.active);

        // Establecer el estado activo en el elemento clicado
        elLink.dataset.active = true;

        // Actualizar la propiedad CSS personalizada con el índice del elemento activo
        elNav.style.setProperty('--active', i);

        // Cargar contenido dinámico
        const page = elLink.getAttribute('data-page');
        if (page) {
            cargarPagina(page);
        }
    }));
});

// Establecer el primer elemento como activo al cargar la página
elLinks[0].dataset.active = true;
elNav.style.setProperty('--active', 0);


// Función para cargar contenido dinámico
function cargarPagina(pagina) {
      fetch(pagina)
          .then(response => {
              if (!response.ok) throw new Error('Error al cargar la página');
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



// Cargar automáticamente la página de inicio al cargar la página principal
document.addEventListener('DOMContentLoaded', () => {
    cargarPagina('pages/inicio.html');
});

//-----------------------------------------------------------------------------------------------------------------


/*ANIMACION DE LA PAGINA*/ 

document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll(".navbar li");
    const contenido = document.getElementById("contenido");
  
    // Verifica que el contenedor exista
    if (!contenido) {
      console.error("El elemento #contenido no fue encontrado.");
      return;
    }
  
    navbarLinks.forEach(link => {
      link.addEventListener("click", async event => {
        event.preventDefault(); // Previene la navegación inmediata
  
        // Obtén la página a cargar desde el atributo data-page
        const page = link.getAttribute("data-page");
        if (!page) {
          console.error("El atributo data-page no está definido.");
          return;
        }
  
        // Aplica la animación al contenedor
        contenido.setAttribute("transition-style", "in:custom:circle-swoop");
  
        // Espera a que la animación termine
        setTimeout(async () => {
          try {
            // Usa fetch para cargar el contenido de la página
            const response = await fetch(page);
            if (!response.ok) throw new Error(`Error al cargar ${page}`);
            const html = await response.text();
  
            // Reemplaza el contenido dinámicamente
            contenido.innerHTML = html;
  
            // Opcional: Remueve el atributo después de la animación
            contenido.removeAttribute("transition-style");
          } catch (error) {
            console.error("Error al cargar la página:", error);
          }
        }, 1000); // Duración de la animación
      });
    });
  });
  