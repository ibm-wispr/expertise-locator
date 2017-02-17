(function () {
  angular
    .module('ngcServices')
    .factory('ExpertiseService', ExpertiseService);
  ExpertiseService.$inject = ['$log', '$window', 'Message', 'Search', 'UserService', '$rootScope', '$http', 'ComposeService'];
  /* @ngInject */
  function ExpertiseService($log, $window, Message, Search, UserService, $rootScope, $http, ComposeService) {
    const obj = {};
    obj.experts;

    //Query for experts with the subject from the search field
    obj.getExpertise = function (subject) {
      $http({
        method: 'POST',
        url: '{EXPERTISE_SERVER}/api/awesomeBot/expertlistRequest',
        responseType: 'text',
        data:{
          text: subject,
            html: "false",
            options: [
                {field: "photoURL", link: ""},
                {field: "name", link: "{PICTURE_SERVER}/profiles/html/profileView.do?userid=%userid"},
                {field: "job", link: ""},
                {field: "org", link: ""},
                {field: "phone", link: ""},
                {field: "mail", link: "mailto:%mail"}
            ]
        }
      }).then((response) =>{
        //the response is a JSON Array of experts
        obj.experts = response.data;
      },(error) =>{
        $log.error(error);
      });
    };

    //Create a Compose Window with the name and email address of the expert you want to email.
    obj.openComposeWindow = function (name,email) {
      const template = {};
      template.subject = '';
      template.from = UserService.sourceAddress;
      template.to = [{name:name,address:email}];
      template.cc = [];
      template.bcc = [];
      template.message = '<span ></span>';
      template.attachments = [];
      template.attachSid = '';
      template.importance = 'normal';
      template.returnReceipt = '0';
      ComposeService.addComposeWindow(template, false);
    };

    return obj;
  }
}());
