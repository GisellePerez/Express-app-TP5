const dogsService = require('../services/dogsService');
const self = {};

const dogs = [
    {breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie01.jpg', id:'01', fav: false},
    {breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie02.jpg', id:'02', fav: false},
    {breed:'Border Collie', size:'Medium', age: 'Adult', img:'images/border_collie04.jpg', id:'03', fav: false},
    {breed:'Labrador', size:'Medium', age: 'Senior', img:'images/labrador04.jpg', id:'04', fav: false},
    {breed:'Labrador', size:'Medium', age: 'Puppy', img:'images/labrador01.jpg', id:'05', fav: false},
    {breed:'Pug', size:'Small', age: 'Puppy', img:'images/pug01.jpg', id:'06', fav: false},
    {breed:'Pug', size:'Small', age: 'Adult', img:'images/pug03.jpg', id:'07', fav: false},
    {breed:'Gran Danes', size:'Large', age: 'Puppy', img:'images/gran_danes01.jpg', id:'08', fav: false},
    {breed:'Gran Danes', size:'Large', age: 'Adult', img:'images/gran_danes02.jpg', id:'09', fav: false},
    {breed:'Dalmata', size:'Medium', age: 'Puppy', img:'images/dalmata02.jpg', id:'10', fav: false},
    {breed:'Dalmata', size:'Medium', age: 'Puppy', img:'images/dalmata03.jpg', id:'11', fav: false},
    {breed:'Boxer', size:'Medium', age: 'Puppy', img:'images/boxer01.jpg', id:'12', fav: false},
    {breed:'Boxer', size:'Medium', age: 'Puppy', img:'images/boxer02.jpg', id:'13', fav: false}
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

    let perPage = 3;
    let page = parseInt(req.params.page) || 1; //si el usuario no solicita una pag especifica ira a la 1
    //console.log('page',page)
    //console.log(page + 500) //para ver como toma page
    let dogsPerPageArr = []; //array nuevo que recibirá los objetos que tendrá cada pag (3)

    //console.log('dogs',dogs);

    for(let i = (page - 1) * perPage ; i < ((page - 1) * perPage) + perPage ; i++){
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

    let strPages = pages.map(function(e){return e.toString()}); //para poder poner el numero en el a del pug

    console.log('total pages: ', totalPages);
    console.log('page numbers: ', pageNumber);
    console.log(pages);
    console.log(strPages);

    res.render('doggies', { //este pug tiene paginación
        title: 'paginando',
        dogsPerPage: dogsPerPageArr,
        page: parseInt(req.params.page), 
        pages: strPages
    })
}

module.exports = self;