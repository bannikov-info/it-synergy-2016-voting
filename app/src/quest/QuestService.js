;(function (faker) {
    angular.module('quest')
           .service('quests', QuestService);

    QuestService.$inject = ['$resource'];
    function QuestService($resource) {
        return $resource('/api/quests.json', {},
        {
            'get': {
                method: 'GET',
                isArray: true,
                transformResponse: function (jsonData) {
                    var data = angular.fromJson(jsonData);
                    if(data instanceof Array && !!faker){
                        data.forEach(function (theme) {
                            if(!!theme.answer_variants){
                                theme.answer_variants.forEach(function (variant) {
                                    var url = new URL(faker.image.imageUrl(640,480,'business'));
                                    url.hash = Date.now();
                                    // console.log(url.toString());
                                    variant.imageUrl = url.toString();
                                })
                            }
                        });
                    };

                    return data;
                }
            }
        }).get();
    }
}(faker));
