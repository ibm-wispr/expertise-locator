  //Add the ExpertiseService into the main function which starts with (() =>{
  let ExpertiseService;

  //In the constructor for MailListFrameController, add the ExpertiseService
  class MailListFrameController {
    /* @ngInject */
    constructor(/*Append this to the end of the Constructor */_ExpertiseService_) {
      //point the ExpertiseService to the passed in service
      ExpertiseService = _ExpertiseService_;
      //create an attribute to hold the experts retruned from the service
      this.experts;

      //watch for new experts from the ExpertiseService
      $scope.$watch(() => ExpertiseService.experts, (experts) => {
        this.experts = experts;
      });

      /* In this function, where we watch for search tags, add the call to the ExpertiseService if a search value is passed */
      $scope.$watch(() => $state.params, ({ tags, search }) => {
        /*some code is here.  Look for the if (search) and add the expertiseservice call*/
        if (search) {
          //Get the Experts when you search for something
          //Merge this line into the function
          ExpertiseService.getExpertise(search);
        }
        //rest of code is here.
      }, true);

      //rest of constructor code is here.
    }

    //Add this function to be called when an expert is selected from the results.
    emailExpert(name, email){
      ExpertiseService.openComposeWindow(name, email);
    }
  }

  //Inject the ExpertiseService into the $inject line
  MailListFrameController.$inject = [/*append this to the end */ 'ExpertiseService'];
  //rest of code is here.
})();
