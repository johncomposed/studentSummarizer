/**
* Created with studentSummarizer.
* User: johncomposed
* Date: 2015-04-05
* Time: 12:16 AM
* To change this template use Tools | Templates.
*/

//////////////////////
// Dash page

app.controller('dashCtrl', function($scope, $location, studentStorageService) {
  $scope.storage = studentStorageService;
  $scope.students = $scope.storage.data;

  $scope.newStudent = function() {
    var newUUID = Date.now();
    $location.path("/new/" + newUUID);
  };
  
});




//////////////////////
// Form page
  
app.controller('formCtrl', function($scope, $location, $routeParams, formDataService, studentStorageService) {
  $scope.storage = studentStorageService;
  $scope.schema = formDataService.schema;
  $scope.form = formDataService.form;
  
  //  This is going to run when the page loads due to
  //  data-ng-init="initFillForm()"
  //  and expose $scope.fmodel for sf-model="model"
  $scope.initFillForm = function() {
    if ($routeParams.status === "new") {
      $scope.model = {
        "uuid": $routeParams.uuid
      };
    } else {
      uuid = $routeParams.uuid;
      $scope.model = $scope.storage.lookupStudents("uuid", uuid)[0]; // There better be only one with that uuid
    }
  };
    
  $scope.saveForm=function(){
      $scope.storage.addStudent($scope.model);
      $location.path('/');
  };
  

  // Functions for
    $scope.boldChanges = function(thisClass) {
      
      var CLASS_NAME = "bold";
      var oldBold = document.querySelectorAll("." + CLASS_NAME);
      var newBold = document.querySelectorAll("." + thisClass);
      //Removing
      for(i = 0, l = oldBold.length; i < l; i++) {
        oldBold[i].classList.remove(CLASS_NAME);
      }
      //Adding
      for(i = 0, l = newBold.length; i < l; i++) {
        newBold[i].classList.add(CLASS_NAME);
      }
    };
});