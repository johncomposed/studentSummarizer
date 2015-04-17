/**
 * Created with studentSummarizer.
 * User: johncomposed
 * Date: 2015-04-05
 * Time: 12:17 AM
 * To change this template use Tools | Templates.
 */
app.service('studentStorageService', function($q) {
  var _this = this;
  this.data = (localStorage.getItem('coopStudents')) ? JSON.parse(localStorage.getItem('coopStudents')) : [];
  
  this.get = function() {
    return this.data;
  };
  
  this.save = function() {
    localStorage.setItem('coopStudents', JSON.stringify(this.data));
  };
  
  this.deleteStudent = function(student) {
    this.data.splice(_this.data.indexOf(student), 1);
    this.save();
  };
  
  this.addStudent = function(newStudentModel) {
		this.data.push(newStudentModel);
    this.save();
	};
	
	this.lookupStudents = function(key, val) {
		var results = [];
		angular.forEach(this.data, function(student){
			if (student[key] === val) results.push(student);
		});
		return results;
	};


});