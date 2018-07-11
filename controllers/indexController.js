const self = {};

var filtered = [];
var page;
var dogData=[];
var gustados = [];

const dogs = [
    {name:'Lala' ,breed:'Border Collie', size:'Medium', gender:'Girl',age: 'Puppy', img:'images/border_collie01.jpg', id:'01', fav: false},
    {name:'Mimi' ,breed:'Border Collie', size:'Medium', gender:'Girl',age: 'Puppy', img:'images/border_collie02.jpg', id:'02', fav: false},
    {name:'Jess' ,breed:'Border Collie', size:'Medium', gender:'Girl',age: 'Adult', img:'images/border_collie04.jpg', id:'03', fav: false},
    {name:'Toto' ,breed:'Labrador', size:'Medium', gender:'Boy',age: 'Senior', img:'images/labrador04.jpg', id:'04', fav: false},
    {name:'Angie' ,breed:'Labrador', size:'Medium', gender:'Boy',age: 'Puppy', img:'images/labrador01.jpg', id:'05', fav: false},
    {name:'Lucho' ,breed:'Pug', size:'Small', gender:'Girl',age: 'Puppy', img:'images/pug01.jpg', id:'06', fav: false},
    {name:'Tomi' ,breed:'Pug', size:'Small', gender:'Boy',age: 'Adult', img:'images/pug03.jpg', id:'07', fav: false},
    {name:'Maria' ,breed:'Gran Danes', size:'Large', gender:'Boy',age: 'Puppy', img:'images/gran_danes01.jpg', id:'08', fav: false},
    {name:'Toti' ,breed:'Gran Danes', size:'Large', gender:'Girl',age: 'Adult', img:'images/gran_danes02.jpg', id:'09', fav: false},
    {name:'Nana' ,breed:'Dalmata', size:'Medium', gender:'Boy',age: 'Puppy', img:'images/dalmata02.jpg', id:'10', fav: false},
    {name:'Crash' ,breed:'Dalmata', size:'Medium', gender:'Boy',age: 'Puppy', img:'images/dalmata03.jpg', id:'11', fav: false},
    {name:'Pia' ,breed:'Boxer', size:'Medium', gender:'Girl',age: 'Puppy', img:'images/boxer01.jpg', id:'12', fav: false},
    {name:'Butch' ,breed:'Boxer', size:'Medium', gender:'Boy',age: 'Puppy', img:'images/boxer02.jpg', id:'13', fav: false}
];


self.dogsList =  function (req, res, next) {   
    res.render('index', { title: 'Dogs', dogs: dogs }); //sin paginación
}

self.dogDetails = function (req, res, next) {
    //console.log('dog details works');
    //console.log('this is a dog',dog);        
    let dog = dogs.find(dog => dog.id === req.params.id);    
    res.render('dog', { title: dog.name, dog: dog});
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
    console.log(pages);
    console.log(strPages);

    res.render('index', { 
        title: 'Find your new friend!',
        dogsPerPage: dogsPerPageArr,
        page: parseInt(req.params.page), 
        strPages: strPages,
        pages:pages
    })
}

self.getFilters = function (breed,age,gender){

    if(breed !== "All" && age !== "All" && gender !== 'All'){
        filtered= dogs.filter(item => 
            item.breed === breed && item.age === age && item.gender === gender);
    }else if(breed !== 'All' && age === 'All' && gender !== 'All'){
        filtered= dogs.filter(item => 
            item.breed === breed && item.gender === gender);
    }else if(breed !== 'All' && age === 'All' && gender === 'All'){
        filtered= dogs.filter(item => 
            item.breed === breed);
    }else if(breed !== 'All' && age !== 'All' && gender === 'All'){
        filtered= dogs.filter(item => 
            item.breed === breed && item.age === age);
    }else if(breed === 'All' && age !== 'All' && gender === 'All'){
        filtered= dogs.filter(item => 
            item.age === age);
    }else if(breed === 'All' && age === 'All' && gender !== 'All'){
        filtered= dogs.filter(item => 
            item.gender === gender);
    }else if(breed === 'All' && age !== 'All' && gender !== 'All'){
        filtered= dogs.filter(item => 
            item.age === age && item.gender === gender);
    }else if (breed === 'All' && age === 'All' && gender === 'All'){
        filtered = dogs;
    }
    console.log(filtered);
    return filtered;
}

self.filterDogs = function(req, res, next){

    let age = req.body.ages;
    let breed = req.body.breeds;
    let gender = req.body.genders;
    console.log('filters: ',age,breed,gender);
    
    let filter = self.getFilters(breed ,age, gender);
    console.log('filter',filter)

    if(filter === 0){
        res.render('error');
    }else{
        res.render('filter', {
            title: 'Resultados de búsqueda: Breed: '+breed+' Age: '+age, 
            filter: filter});
    }
}

self.createFav = function(info){
    var likedDog = gustados.indexOf(info);
    if(likedDog >= 0){
        gustados.splice(likedDog, 1);
    }else{
        gustados.push(info)
    }

    for(i=0; i<dogs.length; i++){
        dogs[i].fav = false;
    }

    for(i=0; i<gustados.length; i++){
        for(j=0; j<dogs.length; j++){
            if(dogs[j].img === gustados[i]){
                dogs[j].fav= true;
            }
        }
    }
}

self.getFaved = function(req, res, next){
    var img = (JSON.parse(req.body.info)).img;
    console.log('info from main'+img);
    
    var liked = (JSON.parse(req.body.info)).liked;
    var id = (JSON.parse(req.body.info)).id;
    
    console.log('liked',liked, 'id',id, 'img',img);

    let dogInfo = {
        dogId: id,
        dogName:liked 
    }
    
    dogData.push(liked); 
    
    self.createFav(liked);
    res.send("response ok");
}

self.faved = function(req, res, next){
    //var dogData=[];
    var dogName;
    var dogId;
    for(i=0; i<gustados.length; i++){
        for(j=0; j<dogs.length; j++){
            if(dogs[j].img === gustados[i]){
                //dogId=gustados[j].id;
                dogName=dogs[j].img;               
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



