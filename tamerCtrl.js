wcTamer.controller('tamerCtrl', function tamerCtrl($scope, tamerStorage) {

  $scope.tamerStorage = tamerStorage;

  $scope.$watch('tamerStorage.data', function() {
    $scope.hwList = $scope.tamerStorage.data;
  });

  $scope.tamerStorage.findAll(function(data) {
    $scope.hwList = data;
    $scope.$apply();
  });

  $scope.removeAll = function() {
    tamerStorage.removeAll();
  };

});

wcTamer.controller('hwCtrl', function hwCtrl($scope, tamerStorage, $log, $routeParams, tamerUI) {
  var hwID = $routeParams.id;
  console.log('hwCtrl: ' + hwID);

  // Yes, I know this is rubbish 
  // TODO: fix
  for (var i = 0; i < tamerStorage.data.length; i++) {
    if (tamerStorage.data[i].time == hwID) {
      console.log('hwID found');
      $scope.currentTab = tamerStorage.data[i];
      break; //eww
    }
    else {
      console.log('Nothing found');
    }
  }

  $scope.tamerStorage = tamerStorage;

  $scope.remove = function(hw) {
    tamerStorage.remove(hw);
  };

  $scope.toggleLine = function() {
    tamerUI.toggleLine();
  };

  $scope.print = function() {
    tamerUI.print();
  };
});

wcTamer.controller('dashCtrl', function dashCtrl($scope, tamerStorage, tamerUI) {
  $scope.tamerStorage = tamerStorage;

  $scope.$watch('tamerStorage.data', function() {
    $scope.hwList = $scope.tamerStorage.data;
  });

  $scope.removeAll = function() {
    tamerStorage.removeAll();
  };

  $scope.toggleLine = function() {
    tamerUI.toggleLine();
  };

  $scope.print = function() {
    tamerUI.print();
  };


});


wcTamer.service('tamerUI', function() {

  this.toggleLine = function() {
    var lines = Array.prototype.slice.call(document.querySelectorAll(".lineCount, .lineCountHilight"));
    var commentDivs = document.querySelectorAll('tr > td:not(:last-child) > div');
    for (var i = 0; i < commentDivs.length; i++) {
      lines.push(commentDivs[i].parentElement);
    }
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].style.display == 'none') {
        lines[i].style.display = 'table-cell';
      }
      else {
        lines[i].style.display = 'none';
      }
    }
  }

  this.print = function() {
    window.print();
  }


  /*
  //myscopes
    $scope.currentTab = { title:'', content: ''};

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }*/

});