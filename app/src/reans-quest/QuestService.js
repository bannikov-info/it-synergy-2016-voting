(function(){
  'use strict';

  angular.module('reansQuest')
         .service('Quest', ['$q', 'questsService', Quest]);

  function Quest($q, questsService){
      var self = this;
      self.quests = null;
      self.answers = null;

      this.initialize = function(fullName){
          self.quests = null;
          self.answers = null;

          var defer = $q.defer();

          questsService.getQuests()
                .then(function(quests){
                    self.quests = [].concat(quests);
                    // self.selected = quests[0];
                    self.answers = [];
                    defer.resolve(self);
                });

          return defer.promise;
      };

      this.processAnswers = processAnswers;

      function processAnswers(answers){
        //   debugger;
          var testKeys = [1,1,1,0,0,1,0,1,0,1,1,1,0,1,0,1,0,1,1,1];
          var res = {mark:null, markDescription: null};
          res.mark =  answers.reduce(function(prev, curr, idx, arr){
              return prev + (curr === testKeys[idx] ? 1 : 0);
          },0);

          res.markTitle = (function(mark){

              var title = '';

              if (angular.isNumber(mark)){
                //   debugger;
                  if((1 <= mark) && (mark <= 7)){
                      title = "Мотивация на неудачу (боязнь неудачи)";
                  }
                  else if((8 <= mark) && (mark  <= 13)){
                      title = "Мотивационный полюс ярко не выражен";
                  }
                  else if((14 <= mark) && (mark  <= 20)){
                      title = "Mотивация на успех (надежда на успех)";
                  }
              }


              return title;
          })(res.mark);

          return res;
      };

  }

})();
