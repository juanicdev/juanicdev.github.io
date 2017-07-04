$(document).ready(function () {
  var endPoint = 'https://api.themoviedb.org/3/'; 
  var endPoint2 = 'https://api.themoviedb.org/3/search/movie?';
  var baseURL; 
  var size;  
  var apiKey = {api_key:'4798875c2c71d7e72aaea586d7202013'}; 
  var $form = $('form');
  var options;

$form.on('submit', function (e) {
  e.preventDefault(); 
  $(this).find('.searchText').attr('disabled','disabled');  
  $(this).find('.boton').attr('disabled','disabled');
  var value = $('.searchText').val();                   
  var query = { query: value };
  options = $.extend({}, apiKey, query); 
           
  if(!value){
    alert("Debes llenar el campo seleccionado");
    $('.loading').hide();
    $(this).find('.searchText').removeAttr('disabled' , 'disabled'); 
    $(this).find('.boton').removeAttr('disabled' , 'disabled');
  } 
  else  {
  busqueda()
  $(this).find('.searchText').removeAttr('disabled' , 'disabled'); 
  $(this).find('.boton').removeAttr('disabled' , 'disabled');
  }
});
 

$.get( endPoint + 'configuration', apiKey ) 
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
              <img src="${image}" class="img-responsive pelis backup_picture">
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
         $(".backup_picture").on("error", function(){
          $(this).attr('src', 'images/NoPic.png');
         });
      }
    })
    .done(function() {
      $(".loading").hide();  
    })                                                 
}


})
  


      





