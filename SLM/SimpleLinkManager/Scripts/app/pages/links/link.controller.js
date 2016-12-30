(function () {
    var app = angular.module("linkApp", ['ui.router', 'angularUtils.directives.dirPagination']);

    app.controller("linkController", ['linkService', '$state', function (linkService, $state) {
        var vm = this;

        vm.dateNow = new Date();
        vm.links = [];

        vm.indexOfEditElement = null;

        activate();

        function activate() {
            var linkPromise = linkService.getLinks();
            linkPromise.then(function (response) {
                console.log("[LinkController] linkPromise - ", response);
                vm.links.push.apply(vm.links, response.data);
                vm.sortByDate();
            });
        };

        vm.sortByDate = function () {
            vm.links.sort(function (a, b) {
                if (a.Date > b.Date) {
                    return -1;
                }
                if (a.Date < b.Date) {
                    return 1;
                }
                return 0;
            });
        }

        vm.onAddNewLink = function onAddNewLink() {
            var newLink = { Id: 0, Title: vm.newLinkTitle, Date: vm.dateNow };
            linkService
                .addLink(newLink)
                .then(function (response) {
                    console.log("[LinkController] onAddNewLink - success", arguments);
                    vm.links.unshift(response.data);
                    vm.newLinkTitle = "";
                    $state.go('list');
                }, function (response) {
                    console.log("[LInkController] onAddNewLInk - fail", arguments);
                    alert("Adding a new link has failed.");
                });
        };

        vm.showEditForm = function (l) {
            $state.go('edit');
            var indx = 0;
            for (var i = 0; i < vm.links.length; i++) {
                if (vm.links[i].Title == l.Title)
                    indx = i;
            }
            vm.linkEditTitle = vm.links[indx].Title;
            vm.indexOfEditElement = indx;
        };

        vm.isSameLinkExists = function (editTitle) {
            for (var i = 0; i < vm.links.length; i++) {
                if (vm.links[i].Title == editTitle) {
                    return true;
                }
            }
            return false;
        };

        vm.saveEditing = function (updateLinkEditTitle) {    
            linkService
                .updateLink(vm.links[vm.indexOfEditElement])
                .then(function (response) {
                    console.log("[LinkController] update - success");
                    vm.links[vm.indexOfEditElement].Title = updateLinkEditTitle;
                    vm.indexOfEditElement = null;
                    $state.go('list');
                }, function (response) {
                    console.log("[LinkController]  update - success");
                    alert("Updating link has failed");
                })             
        };

        vm.addFormCancel = function () {
            $state.go('list');
            vm.newLinkTitle = "";

        };
        vm.editFormCancel = function () {
            $state.go('list');
            vm.indexOfEditElement = null;
        };

        vm.remove = function (lk) {
            linkService
                .removeLink(lk)
                .then(function (response) {
                    console.log("[LinkController]  remove - success");
                    for (var i = 0; i < vm.links.length; i++) {
                        if (lk.Id == vm.links[i].Id) {
                            vm.links.splice(i, 1);
                        }
                    }
                }, function (response) {
                    console.log("[LinkController] remove - fail");
                    alert("Removing a link has failed.");
                });
        };
    }]);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/list');

        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: '/Templates/ShowLinks.html',
                controllerAs: 'vm'
            })
            .state('add', {
                url: '/add',
                templateUrl: '/Templates/AddLink.html',
                controllerAs: 'vm'
            })
            .state('edit', {
                url: '/edit',
                templateUrl: '/Templates/EditLink.html',
                controllerAs: 'vm'
            })
    });

})();