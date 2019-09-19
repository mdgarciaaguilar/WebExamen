
/*
1. Función que muestra y esconde la sección para hacer comentarios
   al hacer click el botón 'Escribe una reseña'.
   on click!
   (5 puntos)
*/
$('#seccion_comentario').addClass('hidden')
$('#escribe_reseña').on('click', function(event) {
  $('#seccion_comentario').removeClass('hidden')
})


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml
  (función ajax, 25 puntos)
*/
$.ajax({
  url : 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type : 'GET',
  dataType : 'xml',
  success: function(data) {
    let newHtml = ''

    $(data).find('comment').each(function() {

      //input[name='rating']:checked

      let $stars = $(this).find('stars').text()

      //$(input[name='rating']:checked)

      newHtml += `
      <div class="review">
        <h1 class="nombre">
          ${$(this).find('name').text()}
        </h1>
        <div>
        ${getStarsSpans($(this).find('stars').text())}
        </div>
        <p> ${$(this).find('text').text()} </p>
      </div>
        `
    })

    $('#seccion_reviews').append(newHtml)

  },
  error : function(errorMsg) {
    console.log(errorMsg)
  }
})

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#error_comment').addClass('hidden')

//let error = document.getElementById('error_comment')

$('#btn-publicar').on('click', function(event) {
  let newHtml = ''

  let stars = $("input[name='rating']:checked").val()
  console.log(stars)

  if ($('#nombre').val() === '' || $('#comentario').text() === '') {
    $('#error_comment').removeClass('hidden')
  } else {
    $('#error_comment').addClass('hidden')
    newHtml += `
    <div class="review">
      <h1 class="nombre">
        ${$('#nombre').val()}
      </h1>
      <div>
      ${getStarsSpans(stars)}
      </div>
      <p> ${$('#comentario').text()} </p>
    </div>
    `
    $('#seccion_reviews').append(newHtml)
    $('#nombre').val('')
    $('#email').val('')
    $('#comentario').text('')

  }



})



/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').on('click', function(event) {
  $('#nombre').val('')
  $('#email').val('')

  $('#comentario').empty()

})

/*
Funcion que recibe un numero de stars y regresa los 5 spans
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
