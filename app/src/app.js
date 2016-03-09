;(function () {
    angular
        .module('questApp', ['ngMaterial', 'ngRoute', 'quest'])
        .config(function($mdThemingProvider, $mdIconProvider, $routeProvider){

            $mdIconProvider
                .defaultIconSet("./assets/svg/avatars.svg", 128)
                .icon("menu"       , "./assets/svg/menu.svg"        , 24)
                .icon("share"      , "./assets/svg/share.svg"       , 24)
                .icon("google_plus", "./assets/svg/google_plus.svg" , 512)
                .icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
                .icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
                .icon("phone"      , "./assets/svg/phone.svg"       , 512)
                .icon("help"      , "./assets/svg/help1.svg"       , 512);

                $mdThemingProvider.theme('default')
                    .primaryPalette('blue')
                    .accentPalette('red');

             $routeProvider
                  .when('/', {redirectTo: '/quests/001'})
                  .when('/quests/:theme_id', {
                      templateUrl: './assets/parts/index.html',
                      controller: 'QuestController as ctrl',
                      resolve: {
                          quest: function ($route, quests, $q) {
                            // return quests[$route.current.params.theme_id];
                              var theme_id = $route.current.params.theme_id;
                              var def = $q.defer();

                              quests.$promise.then(
                                  function (quests) {
                                      var quest = quests.filter(function (q) {
                                          return q.id === theme_id;
                                      })[0];

                                      def.resolve(quest);
                                  },
                                  def.reject
                              )

                              return def.promise;
                          }
                    }
                    //   controller: 'ReansQuestController',
                    //   controllerAs: 'ul'
                  })
                  .otherwise({
                      redirectTo: '/quests/001'
                  })

        });

}());
