;(function () {
    angular.module('quest')
           .controller('QuestController', QuestController);

    QuestController.$inject = ['$scope', 'quest', 'quests', '$location'];
    // QuestController.$;
    function QuestController($scope, quest, quests, $location) {
        var self = this;

        $scope.quest = quest;

        // $scope.answer = quest.answer;
        Object.defineProperty($scope, 'answer', {
            enumerable: true,
            get: function () {
                return quest.answer;
            },
            set: function (val) {
                quest.answer = val;
            }
        })

        self.setAnswer = function (answ) {
            if($scope.answer === answ){
                $scope.answer=null;
            }else{
                $scope.answer=answ;
            }

        }

        self.hasNext = function () {
            return !self.isLastQuest(quest);
        }

        self.hasPrev = function () {
            return !(quests[0] === quest);
        };

        self.goNext = function () {
            // body...
            var nextQuest = quests[findFirstQuestOf($scope.quest)+1];
            $location.path('/quests/'+nextQuest.id);
        };

        self.goPrev = function () {
            // body...
            var nextQuest = quests[findFirstQuestOf($scope.quest)-1];
            $location.path('/quests/'+nextQuest.id);
        };

        self.isLastQuest = function () {
            return (quests[quests.length-1].id === quest.id);
        };

        self.hasAllAnswers = function () {
            var res = quests.reduce(function (prev, q) {
                return prev && !!q.answer;
            }, true);

            console.log(res);
            return res;
        }

        function findFirstQuestOf(quest) {
            // body...
            // var quest = $scope.quest;
            debugger
            for (var i = 0; i < quests.length; i++) {
                if(quests[i].id === quest.id) {return i};
            }
            return -1;
        }
    }
}());
