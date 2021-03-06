﻿/// <reference path="../Scripts/libs/angular.js" />
/// <reference path="../Scripts/jasmine/jasmine.js" />
/// <reference path="../Scripts/app/pages/links/link.controller.js" />
/// <reference path="../Scripts/app/pages/links/link.service.js" />
/// <reference path="../Scripts/libs/angular-mocks.js" />
/// <reference path="../Scripts/libs/angular-route.js" />
/// <reference path="../Scripts/libs/angular-ui-router.js" />
/// <reference path="../Scripts/libs/dirPagination.js" />

describe("Link Service Tests ->", function () {

    var linkServiceFactory, httpBackend, linkController, $controller;
    var mockLinks = [
            { Id: 1001, Title: 'https://www.youtube.com/', Date: '09 December 2016' },
            { Id: 1002, Title: 'https://www.google.com.ua/', Date: '08 December 2016' },
            { Id: 1003, Title: 'http://www.henrihietala.fi/running-jasmine-unit-tests-in-your-visual-studio-online-build/', Date: '09 December 2016' },
            { Id: 1004, Title: 'https://www.youtube.com/watch?v=W1p6T_KXLyI', Date: '08 December 2016' }
    ];

    beforeEach(module('linkApp'));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    beforeEach(inject(function ($httpBackend, linkService, _$controller_, $state) {
        $controller = _$controller_
        httpBackend = $httpBackend;
        linkServiceFactory = linkService;

        httpBackend
            .expectGET('/Link/GetLinks')
            .respond(200, mockLinks);

        httpBackend
            .expectGET('/Templates/ShowLinks.html')
            .respond(200, '');

        linkController = $controller('linkController', {});

        httpBackend.flush();
    }));

    it('Get links', function () {
        expect(linkController.links.length).toBe(4);
    });

    it('Add link', function () {
        var linkToAdd = { Id: 1001, Title: 'https://www.youtube.com/', Date: '09 December 2016' };
        var resultLink = null;

        httpBackend
            .expectPOST('/Link/AddLink', linkToAdd)
            .respond(200, linkToAdd);

        linkServiceFactory.addLink(linkToAdd).then(function (response) {
            resultLink = response.data;
        });

        httpBackend.flush();

        expect(linkToAdd).toEqual(resultLink);
    });

    it('Remove link', function () {
        var linkToRemove = { Id: 1002, Title: 'https://www.google.com.ua/', Date: '08 December 2016' };

        httpBackend
           .expectPOST('/Link/RemoveLink', linkToRemove)
           .respond(200, '');

        linkController.remove(linkToRemove);

        httpBackend.flush();

        expect(linkController.links.length).toBe(3);
    });

    it('Update link', function () {
        var indxOfEditElement = 1;
        var newTitle = 'http://www.newTitle.ua/';
        linkController.indexOfEditElement = indxOfEditElement;

        httpBackend
            .expectPOST("/Link/UpdateLink", linkController.links[indxOfEditElement])
            .respond(200, '');

        linkController.saveEditing(newTitle);

        httpBackend.flush();

        expect(linkController.links[indxOfEditElement].Title.toString()).toEqual(newTitle.toString());
    });
});