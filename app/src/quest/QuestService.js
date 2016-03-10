;(function (faker) {
    angular.module('quest')
           .service('quests', QuestResolver)
           .service('Quest', QuestService);

    QuestResolver.$inject = ['Quest'];
    function QuestResolver(Quest) {
        return Quest.get();
    }

    QuestService.$inject = ['$resource', '$q'];
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
                                    var url = new URL(faker.image.imageUrl(200,150,'business'));
                                    url.hash = Date.now();
                                    // console.log(url.toString());
                                    variant.imageUrl = url.toString();
                                })
                            }
                        });
                    };

                    return data;
                }
            },
            postResults: {
                method: 'POST',
                url: '/api/quests'
            }

        })
    }
}(faker));
