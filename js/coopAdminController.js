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
    var previewArray = $scope.preview.paragraphs;
    var loadContent = $scope.parsePreviewArray(previewArray);

    var doc = {
        content: loadContent
    };
    console.log(doc);
    pdfMake.createPdf(doc).open();
  }; 

  // Ew. Well, now that I know this works I want a better way to do it. 
  $scope.parsePreviewArray = function(array) {
    var content = [];
    var unparse = function(string) {
      return string.replace(/(\{\{)(.*?)(\}\})/g, (function(v0, v1, v2) { return $scope.modelParse(v2); }));    
    };
    
    for(var i = 0; i < array.length; i++) {
      var paragraph = {text: []};
      if ($scope.showText(array[i])) {
        paragraph.text.push(unparse(array[i].showtext));
        if (array[i].children) {
          var kids = $scope.parsePreviewArray(array[i].children);
          for(var l = 0; l < kids.length; l++) {
            paragraph.text.push.apply(paragraph.text, kids[l].text);
          }
        }
      } else if (array[i].hidetext) {
        paragraph.text.push(unparse(array[i].hidetext));
      }
      content.push(paragraph);
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