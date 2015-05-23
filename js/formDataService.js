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
      "uuid": {
        "type": "number"
      },
      "name": {
        "title": "Name",
        "type": "string",
        "comment": "Name of applicant"
      },
      "date": {
        "title": "Date of Application",
        "format": "date",
        "type": "string"
      },
      "email": {
        "title": "Email",
        "type": "string",
        "pattern": "^\\S+@\\S+$"
      },
      "school": {
        "title": "School",
        "type": "string",
        "default": "Northeastern University"
      },
      "gpa": {
        "title": "Student GPA",
        "default": 3.0,
        "type": "number"
      },
      "comment": {
        "title": "Comment",
        "type": "string"
      },
      "hadcoop": {
        "type": "string",
        "title": "Has this applicant had a co-op before?",
        "enum": ["Yes", "No"]
      },
      "numbercoops": {
        "title": "How many coops have the applicant had already?",
        "default": 1,
        "type": "number"
      },
      "hadinterview": {
        "type": "string",
        "title": "Has this applicant already been interviewed?",
        "enum": ["Yes", "No"]
      },
      "cooplocation": {
        "title": "Co-op Location",
        "type": "string",
        "description": "Location of Most Recent Co-op"
      },
      "cooptitle": {
        "title": "Co-op Title",
        "type": "string",
        "description": "Title of Most Recent Co-op"
      },
      "cooprelevance": {
        "title": "Relevance of co-op to applied for position",
        "type": "string",
        "enum": ["Completely unrelated", "Loosely related", "Similar", "Relevant", "Very Relevant"]
      },
      "interviewscore": {
        "title": "General Interview Impression",
        "type": "string",
        "enum": ["Very Poor", "Poor", "Moderate", "Good", "Excellent"]
      },
      "year": {
        "title": "Year",
        "type": "string",
        "enum": ["Freshman", "Sophomore", "Junior", "Senior"]
      },
      "likeable": {
        "title": "Likeability during interview",
        "type": "string",
        "enum": ["Very Poor", "Poor", "Moderate", "Good", "Excellent"]
      },
      "technical": {
        "title": "Demonstrated Technical Competence in Interview",
        "type": "string",
        "enum": ["Very Poor", "Poor", "Moderate", "Good", "Excellent"]
      },
      "required": ["name", "email", "comment", "hadcoop", "hadinterview"]
    }
  }; //end this.schema
  
  
  this.form = [{
    "type": "fieldset",
    "items": [{
      "type": "tabs",
      "tabs": [{
        "title": "General Information",
        "items": [{
          "key": "name"
        }, {
          "key": "date",
          "placeholder": "Month/Day/Year"
        }, "email", "school", {
          "key": "year",
          "type": "radios-inline",
          "title": "Year",
          "titleMap": [{
            "value": "Freshman",
            "name": "Freshman"
          }, {
            "value": "Sophomore",
            "name": "Sophomore"
          }, {
            "value": "Junior",
            "name": "Junior"
          }, {
            "value": "Senior",
            "name": "Senior"
          }, ]
        }, "gpa", {
          "key": "comment",
          "type": "textarea"
        }]
      }, {
        "title": "Interview",
        "items": [{
          "key": "hadinterview",
          "style": {
            "selected": "btn-success",
            "unselected": "btn-default"
          },
          "type": "radiobuttons"
        }, {
          "key": "interviewscore",
          "condition": "model.hadinterview === 'Yes'",
          "type": "radios-inline",
          "title": "Overall Interview Score",
          "titleMap": [{
            "value": "Very Poor",
            "name": "Very Poor"
          }, {
            "value": "Poor",
            "name": "Poor"
          }, {
            "value": "Moderate",
            "name": "Moderate"
          }, {
            "value": "Good",
            "name": "Good"
          }, {
            "value": "Excellent",
            "name": "Excellent"
          }]
        }, {
          "key": "likeable",
          "title": "Interviewing Poise",
          "type": "radios-inline",
          "condition": "model.hadinterview === 'Yes'",
          "titleMap": [{
            "value": "Very Poor",
            "name": "Very Poor"
          }, {
            "value": "Poor",
            "name": "Poor"
          }, {
            "value": "Moderate",
            "name": "Moderate"
          }, {
            "value": "Good",
            "name": "Good"
          }, {
            "value": "Excellent",
            "name": "Excellent"
          }]
        }, {
          "key": "technical",
          "title": "Technical Competancy",
          "type": "radios-inline",
          "condition": "model.hadinterview === 'Yes'",
          "titleMap": [{
            "value": "Very Poor",
            "name": "Very Poor"
          }, {
            "value": "Poor",
            "name": "Poor"
          }, {
            "value": "Moderate",
            "name": "Moderate"
          }, {
            "value": "Good",
            "name": "Good"
          }, {
            "value": "Excellent",
            "name": "Excellent"
          }]
        }]
      }, {
        "title": "Co-ops",
        "items": [{
          "key": "hadcoop",
          "style": {
            "selected": "btn-success",
            "unselected": "btn-default"
          },
          "type": "radiobuttons"
        }, {
          "key": "numbercoops",
          "condition": "model.hadcoop === 'Yes'"
        }, {
          "key": "cooplocation",
          "condition": "model.hadcoop === 'Yes'"
        }, {
          "key": "cooptitle",
          "condition": "model.hadcoop === 'Yes'"
        }, {
          "key": "cooprelevance",
          "type": "radios-inline",
          "condition": "model.hadcoop === 'Yes'",
          "titleMap": [{
            "value": "Completely unrelated",
            "name": "Completely unrelated"
          }, {
            "value": "Loosely Related",
            "name": "Loosely Related"
          }, {
            "value": "Similar",
            "name": "Similar"
          }, {
            "value": "Relevant",
            "name": "Relevant"
          }, {
            "value": "Very Relevant",
            "name": "Very Relevant"
          }]
        }]
      }]
    }]
  }]; // end this.form
  
  this.preview = {
    paragraphs: [
    {
      model: "name",
      tag: "p",
      showtext: "{{model.name}} is a ",
      children : [
        {
          model: "year",
          tag: "span",
          showtext: "{{model.year}} ",
          hidetext: "student "
        },
        {
          model: "school",
          tag: "span",
          showtext: "at {{model.school}} ",
        }, 
        {
          model: "date",
          tag: "span",
          showtext: "who applied on {{model.date}} ",
        }
      ]
    },
    {
      model: "gpa",
      tag: "p",
      showtext: "{{model.name}}'s GPA is {{model.gpa}}/4.0. "
    },
    {
      model: "hadinterview",
      show: "model.hadinterview === 'Yes'",
      tag: "span",
      showtext: "{{model.name}} ",
      hidetext: "{{model.name}} has not had an interview. ",
      children: [
        {
          model: "interviewscore",
          tag: "span",
          showtext: "had an overall {{model.interviewscore}} interview. "
        },
        {
          model: "likable",
          tag: "span",
          showtext: "{{model.name}} performed {{model.likable}} in his interview. ",
        }, 
        {
          model: "technical",
          tag: "span",
          showtext: "{{model.name}} demonstrated {{model.technical}} technical competence. ",
        }
      ]
    },
    {
      model: "hadcoop",
      show: "model.hadcoop === 'Yes'",
      tag: "p",
      showtext: "{{model.name}} has had ",
      hidetext: "{{model.name}} has had no prior coops",
      children: [
        {
          model: "numbercoop",
          show: "model.numbercoop > '1'",
          tag: "span",
          hidetext: "one previous coop. ",
          showtext: "{{model.numbercoops}} coops before. "
        },
        {
          model: "cooplocation",
          tag: "span",
          showtext: "{{model.name}} did his last co-op at {{model.cooplocation}} "
        },
        {
          model: "cooplocation",
          tag: "span",
          showtext: "as a {{model.cooptitle}}. ",
          hidetext: "."
        },
        {
          model: "cooprelevance",
          tag: "span",
          showtext: "The job may be considered {{model.cooprelevance}} to this job. ",
        }
      ]
    },
    {
      model: "email",
      tag: "p",
      showtext: "{{model.name}} can be reached at {{model.email}}"
    },
    {
      model: "comment",
      tag: "p",
      showtext: "Other notes: {{model.comment}}"
    }
  ]}; // end this.preview
  
}); //end service