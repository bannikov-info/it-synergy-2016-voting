;(function () {
    angular.module('demo')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$mdDialog', '$location'];
    function AppController($scope, $mdDialog, $location) {
        $scope.$on('POST_REQUEST', requestHandler);

        function requestHandler(ev, config) {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title(config.method+': '+config.url)
                    .textContent(config.data)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Пройти повторно')
            ).then(
                function (res) {
                    $location.path('/')
                }
            )
        }
    }
}());
