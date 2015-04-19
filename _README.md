# Structure
- index.jade
- views/
  - form.jade
  - dash.jade
  - _dashSidebar.jade
  - _formInterview.jade
  - _formPreview.jade
- css/
  - style.css
- js/
  - app.js
  - formService.js
  - coopAdminService.js
  - coopAdminController.js
- bower_components/
  - various libs

# Views
index.jade
  Head, navbar, data-ng-view
dash.jade
  root view, table, includes _dashSidebar
  dashCtrl
_dashSidebar.jade
  sidebar with filters for jade
form.jade
  routed to /:uuid, the main student form using schemaform with _formPreview for left panel
_formPreview
  left panel, contains complicated ngshow junk for previewing and css tricks for printing

# JS methods
app.js
  Creates var app with schemaForm
  Handles routing
  Assorted filters (should go elsewhere?)
  `app`
  `(filter) numToYear`
formDataService.js
  Designs the form using formSchema with default values
  `formService.schema`
  `formService.form`
studentStorageService.js
  Handles localstorage (later post to db)
  `studentStorageService.get`
  `studentStorageService.save`
  `studentStorageService.filterData`
  `studentStorageService.addStudent`
  `studentStorageService.deleteStudent`
coopAdminController.js
  



