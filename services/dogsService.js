const service = {};

const dogs = [
    {breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie01.jpg', id:'01', fav: false},
    {breed:'Border Collie', size:'Medium', age: 'Puppy', img:'images/border_collie02.jpg', id:'02', fav: false},
    {breed:'Border Collie', size:'Medium', age: 'Adult', img:'images/border_collie04.jpg', id:'03', fav: false},
    {breed:'Labrador', size:'Medium', age: 'Senior', img:'images/labrador04.jpg', id:'04', fav: false},
    {breed:'Labrador', size:'Medium', age: 'Puppy', img:'images/labrador01.jpg', id:'05', fav: false},
    {breed:'Pug', size:'Small', age: 'Puppy', img:'images/pug01.jpg', id:'06', fav: false},
    {breed:'Pug', size:'Small', age: 'Adult', img:'images/pug03.jpg', id:'07', fav: false},
    {breed:'Gran Danes', size:'Large', age: 'Puppy', img:'images/gran_danes01.jpg', id:'08', fav: false},
    {breed:'Gran Danes', size:'Large', age: 'Adult', img:'images/gran_danes02.jpg', id:'09', fav: false}
];


service.allDogs = function () {
    return dogs;
}

service.findDog = function(id) {
	let dog = dogs.find(dog => dog.id === id);
	return dog;
}

module.exports = service