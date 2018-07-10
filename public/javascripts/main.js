// //Save faved dogs in localStorage
// var jsonFavs;
// var favs;
// var datosGuardados = localStorage.getItem("favs"); 

// if (datosGuardados == null) {
//   favs = [];
//   //$(".no-favs").append("No hay ningun producto en favoritos");
// } else {
//   favs = JSON.parse(datosGuardados).favs; 
// }

// $(".icon").on("click", function(e) {
//   $(this).addClass("faved");
//   console.log($(this).parent().parent().parent()); //div.dog
//   console.log('parents children' + $(this).parent().parent().children().text())
//   console.log('el link' + $(this).parent().parent().children('a').text());
//   console.log('asjaskass', $(this).parent().parent().children().first().attr('href')) //link
//   console.log('img src', $(this).parent().parent().parent().parent().children().first().children().first().attr('src').slice(3))
//   console.log('el link' + $(this).parent().parent().children().attr('href'));
//   console.log('breed', $(this).parent().parent().parent().children().first().text())
//   console.log('age',$(this).parent().parent().parent().children().first().siblings().first().text()) 
//     // ESTO FUNCIONA
//     // let link = `<a href="${$(this).parent().parent().children().first().attr('href')}"> Link`
//     // $('.favs-div').append(link);

//     //save data in localStorage
//     data = {
//         imgSrc: $(this).parent().parent().parent().parent().children().first().children().first().attr('src').slice(3), 
//         link: $(this).parent().parent().children().first().attr('href'),
//         breed: $(this).parent().parent().parent().children().first().text(),
//         age: $(this).parent().parent().parent().children().first().siblings().first().text()
//     }

//     favs.push(data);
//     console.log('favs'+favs);

//     jsonFavs = {
//       favs: favs,
//       total: favs.length
//     }
//     console.log(jsonFavs);

//     let jsonFavsString = JSON.stringify(jsonFavs);
//     localStorage.setItem('favs',jsonFavsString);

//     console.log('json string',jsonFavsString);

// //AGREGAR FUNCIONALIDAD PARA PERROS REPETIDOS

// });

// localStorage.clear()
// /**
//  * Display faved dogs
//  */

//WATCHED
var likedDogs= [];

$('.icon').on('click', function(){
  var name= $(this).data('name');
  var id = $(this).data('id')
  var icon= $(this);
  $(this).toggleClass('faved');

  $.ajax({
    url: '/favs',
    type: 'post',
    data: {info: JSON.stringify({'liked':name, 'id':id})},

    

    success: function(){
      if(icon.hasClass('faved')){
        console.log(name);
        console.log(id);
      }else{
        console.log('error');
      }
    },

    error: function(response){
      console.log('Select a movie, please')
    }
  })
})
