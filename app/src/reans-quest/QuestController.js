(function(){

  angular
       .module('reansQuest')
       .controller('ReansQuestController', [
          '$mdSidenav', '$mdBottomSheet', '$log', '$q', 'questsService',
          '$mdDialog', 'Quest', '$location',
          ReansQuestController
       ]);

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function ReansQuestController( $mdSidenav, $mdBottomSheet, $log, $q, questsService,
      $mdDialog, Quest, $location) {
    var self = this;

    // debugger;

    self.selected     = null;
    self.quests        = [ ];
    self.selectQuest   = selectQuest;
    self.toggleList   = toggleQuestsList;
    self.showContactOptions  = showContactOptions;
    self.setAnswer = setAnswer;
    self.isLastQuest = function(quest) {
        return !!quest && quest.order == self.quests.length;
    }
    self.hasAnswer = function(quest){
        return !!quest && !!Quest.answers && Quest.answers[quest.order-1] == null;
    }
    self.getAnswer = function(quest){
        return !!quest && !!Quest.answers ? Quest.answers[quest.order-1] : null;
    }

    self.processAnswers = function  () {
        // debugger;
        // dialogService.hide();
        $location.path('/process-answers')
    };

    if(!Quest.quests){
        startQuest($mdDialog)
            .then(function(action){
                // debugger;
                Quest.initialize()
                    .then(function(){
                        self.quests = Quest.quests;
                        self.selected = Quest.quests[0];
                    });
            });
    };

    // *********************************
    // Internal methods
    // *********************************

    /**
     * First hide the bottomsheet IF visible, then
     * hide or Show the 'left' sideNav area
     */
    function toggleQuestsList() {
      var pending = $mdBottomSheet.hide() || $q.when(true);

      pending.then(function(){
        $mdSidenav('left').toggle();
      });
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectQuest ( quest ) {
        // debugger;
      self.selected = angular.isNumber(quest) ? self.quests[quest-1] : quest;
    //   self.toggleList();
    //   if (self.selected.)
    }

    function startQuest(dialogService){
        return dialogService.show({
            templateUrl: 'src/reans-quest/view/questStartDialog.html',
            parent: angular.element(document.body),
            // parent: angular.element(document.querySelector('#popupContainer')),
            // templateUrl: 'src/reans-quest/view/questStartBottomSheet.html',
            // parent: angular.element(document.getElementById('content')),
            clickOutsideToClose:false,
            escapeToClose: false,
            disableParentScroll: false,
            fullscreen: false,
            controllerAs: 'dCtrl',
            controller: function($scope){
                this.goTest = function  () {
                    // debugger;
                    dialogService.hide();
                }
            }
        });
    };

    function showEndQuest(dialogService){
        dialogService.show({
            templateUrl: 'src/reans-quest/view/questEndDialog.html',
            parent: angular.element(document.body),
            // templateUrl: 'src/reans-quest/view/questEndBottomSheet.html',
            // parent: angular.element(document.getElementById('content')),
            clickOutsideToClose:true,
            escapeToClose: false,
            disableParentScroll: false,
            fullscreen: false,
            controllerAs: 'dCtrl',
            controller: function($scope, $location){
                this.processAnswers = function  () {
                    // debugger;
                    // dialogService.hide();
                    $location.path('/process-answers')
                };

                this.goQuests = function  () {
                    // debugger;
                    dialogService.hide();
                };
            }
        });

    };

    function processAnswers(answers){
        var testKeys = [1,1,1,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1];
        return answers.reduce(function(prev, curr, idx, arr){
            return prev + (curr === testKeys[idx] ? 1 : 0);
        },0);
    };

    function setAnswer(quest, answer){
        if (!!quest){
            // self.selected.answer = answer;
            Quest.answers[quest.order-1] = answer;
        };

        var answerCount = Quest.answers.length;

        self.mustProcessAnswers = answerCount == Quest.answers.filter(function(q){return ((q != null)); }).length;

        console.log(Quest.answers.join(','));
    }



    /**
     * Show the bottom sheet
     */
    function showContactOptions($event) {
        var user = self.selected;

        return $mdBottomSheet.show({
        //   parent: angular.element(document.getElementById('content')),
          parent: angular.element(document.querySelector('#popupContainer')),
          templateUrl: './src/reans-quest/view/contactSheet.html',
          controller: [ '$mdBottomSheet', 'questsService', ContactPanelController],
          controllerAs: "cp",
          bindToController : true,
          targetEvent: $event
        }).then(function(clickedItem) {
          clickedItem && $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * Bottom Sheet controller for the Avatar Actions
         */
        function ContactPanelController( $mdBottomSheet, questsService ) {
          var self = this;
          this.user = user;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.submitContact = function(action) {
            $mdBottomSheet.hide(action);
          };

          questsService
            .getQuestDescription()
            .then(function( qDescr ){
                // self.questDescription = qDescr;
            });
        }



    }

  }

})();
