$(document).ready(function () {
  var endPoint = 'https://api.themoviedb.org/3/'; // como uso muchas veces el endpoint, creo una variable y la concateno con los parametros ej: endPoint + 'configuration',
  var endPoint2 = 'https://api.themoviedb.org/3/search/movie?';
  var baseURL; //creo la variable de la url de la imagen
  var size;  // creo la variable del tamaño de la imagen
  var apiKey = {api_key:'4798875c2c71d7e72aaea586d7202013'}; //e46d80d9b3b8f770fc8fed16379bbdb6
  var $form = $('form');
  var options;

$form.on('submit', function (e) {
  e.preventDefault(); // previene que se actualice la pagina cuando submitea 
  $(this).find('.searchText').attr('disabled','disabled');  // evitar que el usuario vuelva a submitear el formulario.
  $(this).find('.boton').attr('disabled','disabled');
  var value = $('.searchText').val()                  // agarrar el valor del input 
  var query = { query: value }
  options = $.extend({}, apiKey, query); 
           
  if(!value){
    alert("Debes llenar el campo seleccionado");
    $('.loading').hide();
    $(this).find('.searchText').removeAttr('disabled' , 'disabled'); // habilita el boton luego del alert.
    $(this).find('.boton').removeAttr('disabled' , 'disabled');
  } 
  else  {
  busqueda();
  }
});
 

$.get( endPoint + 'configuration', apiKey ) //  $.get() tipo de request para pegarle al endpoint (como ajax)
  .then(function (config) {                                     
    if (config && config.images) {
      if (config.images.base_url) {
        baseURL = config.images.base_url;
      }
      if (config.images.poster_sizes) {
        size = config.images.poster_sizes[4];
      }
    }                               
  });
                                      
                                   
                                                        


// hacer request

function busqueda(){
  $('.loading').show();
  $.get (endPoint2 , options )
    .then(function (movies) {
      if(movies && movies.results){ 
        var output = '';
        $.each(movies.results , function (i, movie) {
          var movie = movies.results;
          var title = movie[i].title; 
          var poster = movie[i].poster_path;
          var id = movie[i].id;
          var image = baseURL + size + poster;

          output += `
          <div class="col-md-3">
            <div class="well text-center jumbotron">
              <img src="${image}" class="img-responsive pelis">
              <h5>
                <strong>${title}</strong>
              </h5>
              <a class="btn btn-primary details" href="https://www.themoviedb.org/movie/${id}" target="_blank">
                Movie Details
              </a>
            </div>
          </div>
          `;
        })      
        $('.movies').html(output);                              
      }
    })
    .done(function() {
      $(".loading").hide();   // (cuando llega el request) sacar logo de carga
    })                                                 
}
})
  


      





