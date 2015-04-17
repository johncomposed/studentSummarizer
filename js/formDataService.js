/**
 * Created with studentSummarizer.
 * User: johncomposed
 * Date: 2015-04-05
 * Time: 09:30 PM
 * To change this template use Tools | Templates.
 */
app.service('formDataService', function($q) {

  this.schema = {
  "type": "object",
  "title": "Comment",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "email": {
      "title": "Email",
      "type": "string",
      "pattern": "^\\S+@\\S+$",
      "description": "Email will be used for evil."
    },
    "comment": {
      "title": "Comment",
      "type": "string",
      "maxLength": 20,
      "validationMessage": "Don't be greedy!"
    },
    "uuid": {
      "type": "number",
      "condition": false
    }
  },
  "required": [
    "name",
    "email",
    "comment"
  ]
};

  this.form = [
  "name",
  "email",
  {
    "key": "comment",
    "type": "textarea",
    "placeholder": "Make a comment"
  }
];

//end service
});