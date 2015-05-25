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
  
app.controller('formCtrl', function($scope, $location, $routeParams, formDataService, studentStorageService, $parse) {
  $scope.storage = studentStorageService;
  $scope.schema = formDataService.schema;
  $scope.form = formDataService.form;
  $scope.preview = formDataService.preview;

  
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
    for(var i = 0, l = oldBold.length; i < l; i++) {
      oldBold[i].classList.remove(CLASS_NAME);
    }
    //Adding
    for(i = 0, l = newBold.length; i < l; i++) {
      newBold[i].classList.add(CLASS_NAME);
    }
  };

  $scope.pdfMaker = function() {
    var loadContent = $scope.parsePreviewArray();

    var doc = {
        content: loadContent
    };
    console.log("Doc for printing: ", doc);
    pdfMake.createPdf(doc).open();
  }; 

  // Good enough. I really should just do it server side anyway. 
  $scope.parsePreviewArray = function() {
    var content = [];
    var rootNodes = document.querySelectorAll("#output > *"); // Mostly <p>, but might be tables in future

    for(var i = 0; i < rootNodes.length; i++) {
      var textObject = {text: []};
      var kids = rootNodes[i].children;

      for(var k = 0; k < kids.length; k++) {
        if(kids[k].innerText) {
          textObject.text.push(kids[k].innerText);
        }
      }
      
      content.push(textObject);
    }
    
    return content;
  };


  $scope.logme = function(modelValue,form) {
    console.log(form.key[0]);
  };
  
  
  
  $scope.modelParse = function(string) {
    var scope = $scope;
    return $parse(string)(scope);
  };
  
  
  $scope.showText = function(item) {
    var noShowVal = item.show === undefined;
    var noItemShow = item.model && noShowVal;
    return $scope.modelParse(item.show) || noItemShow;
    
  };
  
});


app.directive('bindUnsafeHtml', ['$compile',
  function($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch 'bindUnsafeHtml' for changes
          return scope.$eval(attrs.bindUnsafeHtml);
        },
        function(value) {
          //when'bindUnsafeHtml' changes assign to current dom
          element.html(value);
          // compile new DOM and link to current scope
          // NOTE: only compile .childNodes to prevent infinite loop

          $compile(element.contents())(scope);
        }
      );
    };
  }
]);