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
  $scope.searchText = {}; 
  $scope.searchNum = 0;
  $scope.selectedSearch = 'name';
  $scope.tableHead = ["Name of Applicant", "Date of Application", "GPA", "Interview Score", "Comments"];

  $scope.newStudent = function() {
    var newUUID = Date.now();
    $location.path("/new/" + newUUID);
  };
  
  // Note: should later make this work on like $scope.searchNum = {}; 
  $scope.greaterThan = function(prop, val){
    return function(item){
      return parseFloat(item[prop]) > parseFloat(val);
    };
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
        "uuid": parseInt($routeParams.uuid)
      };
    } else {
      var ruuid = $routeParams.uuid;
      $scope.model = $scope.storage.lookupStudents("uuid", parseInt(ruuid))[0]; // There better be only one with that uuid
    }
  };
    
  $scope.saveForm=function(){
    if ($routeParams.status === "new") $scope.storage.addStudent($scope.model);
    else $scope.storage.save();
    $location.path('/');
  };
  
  $scope.printBio = function() {
    window.print();
  };

  // Functions for
  $scope.boldChanges = function(modelValue,form) {
    //console.log(form.key[0]);
    var thisClass = form.key[0];
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


$scope.logme = function(modelValue,form) {
  console.log(form.key[0]);
};
  
  
  
  
  
});