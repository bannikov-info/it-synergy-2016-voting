;(function () {
    angular.module('demo', ['ngMaterial'])
        .factory('demoModeInterceptor', function ($q, $rootScope) {
            return {
                'request': function (config) {
                    // debugger;
                    var def = $q.defer();
                    switch(config.method.toUpperCase()){
                        case 'POST':
                            $rootScope.$broadcast('POST_REQUEST', config)
                            def.reject(config);
                            break;
                        default:
                            def.resolve(config);
                    }

                    return def.promise;
                }
            }
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('demoModeInterceptor');
        });
}());
