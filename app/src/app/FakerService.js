;(function (faker) {
    angular.module('tool')
           .service('Faker', function () {
               return function(){
                   return faker
               }
           });
}(faker))
