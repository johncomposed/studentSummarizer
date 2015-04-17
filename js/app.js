/**.
 * User: johncomposed
 * Date: 2015-03-31
 * Time: 02:28 AM
 */
var app = angular.module('coopAdmin', ['ngRoute', 'schemaForm']);


app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:'views/dash.html',
                controller: 'dashCtrl'
            }).when('/:status/:uuid', {
                templateUrl:'views/form.html',
                controller: 'formCtrl'
            })
            .otherwise({redirectTo: '/'});
    });




app.filter('numToYear', function() {
  return function(year) {
    return year == 1 ? 'Freshman' : year == 2 ? 'Sophmore' : year == 3 ? 'Junior' : year == 4 ? 'Senior' : '';
  };
});




