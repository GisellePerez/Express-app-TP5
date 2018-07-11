const dogsService = require('../services/dogsService');
const self = {};

var dogsFilter = [];
var filtered = [];
var page;
var dogData=[];
var favs = [];
const dogs = [
    {name:'Lala' ,breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie01.jpg', id:'01', fav: false},
    {name:'Mimi' ,breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie02.jpg', id:'02', fav: false},
    {name:'Jess' ,breed:'Border Collie', size:'Medium', age: 'Adult', img:'images/border_collie04.jpg', id:'03', fav: false},
    {name:'Toto' ,breed:'Labrador', size:'Medium', age: 'Senior', img:'images/labrador04.jpg', id:'04', fav: false},
    {name:'Angie' ,breed:'Labrador', size:'Medium', age: 'Puppy', img:'images/labrador01.jpg', id:'05', fav: false},
    {name:'Lucho' ,breed:'Pug', size:'Small', age: 'Puppy', img:'images/pug01.jpg', id:'06', fav: false},
    {name:'Tomi' ,breed:'Pug', size:'Small', age: 'Adult', img:'images/pug03.jpg', id:'07', fav: false},
    {name:'Maria' ,breed:'Gran Danes', size:'Large', age: 'Puppy', img:'images/gran_danes01.jpg', id:'08', fav: false},
    {name:'Toti' ,breed:'Gran Danes', size:'Large', age: 'Adult', img:'images/gran_danes02.jpg', id:'09', fav: false},
    {name:'Nana' ,breed:'Dalmata', size:'Medium', age: 'Puppy', img:'images/dalmata02.jpg', id:'10', fav: false},
    {name:'Crash' ,breed:'Dalmata', size:'Medium', age: 'Puppy', img:'images/dalmata03.jpg', id:'11', fav: false},
    {name:'Pia' ,breed:'Boxer', size:'Medium', age: 'Puppy', img:'images/boxer01.jpg', id:'12', fav: false},
    {name:'Butch' ,breed:'Boxer', size:'Medium', age: 'Puppy', img:'images/boxer02.jpg', id:'13', fav: false}
];


self.dogsList =  function (req, res, next) {   
    res.render('index', { title: 'Dogs', dogs: dogs }); //sin paginación
}

self.dogDetails = function (req, res, next) {
    //console.log('dog details works');
    //console.log('this is a dog',dog);        
    let dog = dogs.find(dog => dog.id === req.params.id);    
    res.render('dog', { title: dog.breed, dog: dog});
} 

self.pages = function (req,res, next){
    
    if (req.params.page){
        page = req.params.page;
    }else{
        page = 1;
    }

    let perPage = 3;
    let dogsPerPageArr = []; //array nuevo que recibirá los objetos que tendrá cada pag (3)

    for(let i = (parseInt(page) - 1) * perPage ; i < ((parseInt(page) - 1) * perPage) + perPage ; i++){
        if (dogs[i]) {
            dogsPerPageArr.push(dogs[i]);
        }
    }
    //console.log('dogsArr: ',dogsPerPageArr);
    //console.log('page: ',parseInt(req.params.page));

    let totalPages = Math.ceil(dogs.length / perPage);
    let pageNumber = 0;
    let pages = [];

    while (pageNumber < totalPages) {
        pageNumber++;
        pages.push(pageNumber);
    }

    let strPages = pages.map(function(e){return e.toString()}); 
    //toString para poder ver si puedo poner el numero en el a del pug. No es necesario pero queria probar el map

    // console.log('total pages: ', totalPages);
    // console.log('page numbers: ', pageNumber);
    // console.log(pages);
    // console.log(strPages);

    res.render('index', { 
        title: 'paginando',
        dogsPerPage: dogsPerPageArr,
        page: parseInt(req.params.page), 
        pages: strPages
    })
}

self.getFilters = function (breed,age){

    if(breed !== "All" && age !== "All"){
        filtered= dogs.filter(item => 
            item.breed === breed && item.age === age);
    }else if(breed !== 'All' && age === 'All'){
        filtered= dogs.filter(item => 
            item.breed === breed);
    }else if(breed === 'All' && age !== 'All'){
        filtered= dogs.filter(item => 
            item.age === age);
    }
    console.log(filtered);
    return filtered;
}

self.filterDogs = function(req, res, next){

    var age = req.body.ages;
    var dogSize = req.body.sizes;
    var breed = req.body.breeds;

    console.log('filters: ',age,dogSize,breed);
    
    var filter= self.getFilters(breed, age);
    console.log(filter)

    if(filter === 0){
        res.render('error');
    }else{
        res.render('filter', {
            title: 'Resultados de búsqueda: '+breed+' '+age, 
            filter: filter});
    }
}

var gustados = [];

self.createFav = function(liked){
    var likedDog = gustados.indexOf(liked);
    if(likedDog >= 0){
        gustados.splice(likedDog, 1);
    }else{
        gustados.push(liked)
    }

    for(i=0; i<dogs.length; i++){
        dogs[i].fav = false;
    }

    for(i=0; i<gustados.length; i++){
        for(j=0; j<dogs.length; j++){
            if(dogs[j].name === gustados[i]){
                dogs[j].fav= true;
            }
        }
    }
}

self.getFaved = function(req, res, next){
    var liked = (JSON.parse(req.body.info)).liked;
    var id = (JSON.parse(req.body.info)).id;
    
    console.log('liked',liked, 'id',id);

    let dogInfo = {
        dogId: id,
        dogName:liked 
    }
    
    dogData.push(dogInfo); 
    
    self.createFav(liked);
    res.send("response ok");
}


self.faved = function(req, res, next){
    //var dogData=[];
    var dogName;
    var dogId;
    for(i=0; i<gustados.length; i++){
        for(j=0; j<dogs.length; j++){
            if(dogs[j].name === gustados[i]){
                //dogId=gustados[j].id;
                dogName=dogs[j].name;               
            }
        }
    }
    console.log('gust',gustados);
    console.log('dog data',dogData);

    res.render('favs', {
        title:'faving',
        gustados,
        dogData
    });
}

module.exports= self;



