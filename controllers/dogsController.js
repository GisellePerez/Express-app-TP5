const dogsService = require('../services/dogsService');
const self = {};

self.dogsList =  function (req, res, next) {
    res.render('index', { title: 'Dogs', dogs: dogsService.allDogs() });
}

self.dogDetails = function (req, res, next) {
    console.log('dog details works');

    let dog = dogsService.findDog(req.params.id)
    console.log('linea 12 - dog',dog);
        
    res.render('dog', { title:dog.breed, dog: dog});
} 





// FILTERRRR
// var ages = [32, 33, 16, 40];

// function checkAdult(age) {
//     return age >= 18;
// }

// function myFunction() {
//     document.getElementById("demo").innerHTML = ages.filter(checkAdult);
// }

// self.dogInfo = function (req, res, next) {
//     res.render('dog', {})
// }

// self.getUser = function (req, res) {
//     let data = usersService.getUser(parseInt(req.params.id));

//     if (data){
//         res.render('user', { userData: data } );
//     }else{
//         res.render('error', { message: 'El usuario no existe', error: {}})
//     }   
// }

module.exports = self;