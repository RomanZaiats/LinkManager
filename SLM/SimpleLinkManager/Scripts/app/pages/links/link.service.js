(function (angular) {
    angular
        .module('linkApp')
        .factory('linkService', linkService);

    linkService.$inject = ['$http'];

    function linkService($http) {
        var service = {
            getLinks: getLinks,
            addLink: addLink,
            updateLink: updateLink,
            removeLink: removeLink
        };

        return service;

        function getLinks() {
            var promise = $http.get("/Link/GetLinks");
            return promise;
        };

        function addLink(link) {
            var promise = $http.post("/Link/AddLink", link);
            return promise;
        };

        function updateLink(link) {
            var promise = $http.post("/Link/UpdateLink", link);
            return promise;
        };

        function removeLink(link) {
            var promise = $http.post("/Link/RemoveLink", link);
            return promise;
        }
    }
})(angular);