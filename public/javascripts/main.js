// var favs= [];
// var jsonFavs;
// var favList = localStorage.getItem('fav');

// $('.icon').on('click', function(){
//     let name = $(this).data('name');
//     console.log(name);
//     let fav = $(this)
//     console.log(fav);
//     fav.toggleClass('faved')

//     $.ajax ({
//         url:'/fav',
//         type: 'POST',
//         data: {
//             info: JSON.stringify({'favsies':name})
//         },

//         success: function() {
//             if (fav.hasClass('faved')) {
//                 console.log(name);
//             }else{
//                 console.log('error');
//             }
//         },

//         error: function(){
//             console.log('Please try with another doggie');
//         }
//     })
// })

// /* si nuestro localStorage no está vacío, lo pareceamos y borramos el div que estaba en el lugar de nuestros favoritos */
// if(favList !== null){
//     fav = JSON.parse(favtList).fav;
// }

// /* Genera el localStorage donde guardaremos los likes */
// $('.icon').click(function () {
// 	event.preventDefault();
// 	$(this).html(`<i class="fas fa-heart red"></i>`);
//     var liked = { 
//         name: $(this).siblings(".name").html(),
//     }
//     console.log(liked)

// 	fav.push(liked);
// 	jsonFavs = {
// 		    'liked': fav,
// 		    'total': fav.length
// 	}
// 	let string = JSON.stringify(jsonFavs);
// 	localStorage.setItem('fav', string);
// });

// /* Mostramos los favs */
// function mostrarFavs() {
//   $.each(fav, function(index, elem) {
//     let htmltoappend = `<div class="each"><img class="img-fav" src="${elem.img}">`
//     htmltoappend += `<a href='adopciones/${elem.id}'><button>Más info</button></a></div>`;
//     $(".favs").append(htmltoappend);
//   });
// }
// mostrarFavs();

//Save faved dogs in localStorage
var jsonFavs;
var favs;
var datosGuardados = localStorage.getItem("favs"); 

if (datosGuardados == null) {
  favs = [];
  //$(".no-favs").append("No hay ningun producto en favoritos");
} else {
  favs = JSON.parse(datosGuardados).favs; 
}

$(".icon").on("click", function(e) {
  $(this).addClass("faved");
  console.log($(this).parent().parent().parent()); //div.dog
  console.log('parents children' + $(this).parent().parent().children().text())
  console.log('el link' + $(this).parent().parent().children('a').text());
  console.log('asjaskass', $(this).parent().parent().children().first().attr('href')) //link
  console.log('img src', $(this).parent().parent().parent().parent().children().first().children().first().attr('src'))
  console.log('el link' + $(this).parent().parent().children().attr('href'));
  console.log('breed', $(this).parent().parent().parent().children().first().text())
  console.log('age',$(this).parent().parent().parent().children().first().siblings().first().text()) 
    // ESTO FUNCIONA
    // let link = `<a href="${$(this).parent().parent().children().first().attr('href')}"> Link`
    // $('.favs-div').append(link);

    //save data in localStorage
    data = {
        imgSrc: $(this).parent().parent().parent().parent().children().first().children().first().attr('src'), 
        link: $(this).parent().parent().children().first().attr('href'),
        breed: $(this).parent().parent().parent().children().first().text(),
        age: $(this).parent().parent().parent().children().first().siblings().first().text()
    }

    favs.push(data);
    console.log('favs'+favs);

    jsonFavs = {
      favs: favs,
      total: favs.length
    }
    console.log(jsonFavs);

    let jsonFavsString = JSON.stringify(jsonFavs);
    localStorage.setItem('favs',jsonFavsString);

    console.log('json string',jsonFavsString);

});

/**
 * Display faved dogs
 */