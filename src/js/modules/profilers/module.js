/* global define */
/*jshint sub: true */

define(['./_index'], function (app) {
	'use strict';

    return app.config([
    '$stateProvider',
    function ($stateProvider) {

        $stateProvider
            // ========================================PROFILERS============
            .state('profilers', {
                url: 'profilers',
                parent: 'app',
                abstract: true,
                templateUrl: 'profilers.tpl.html',
                data: {
                    title: 'Profilers'
                }
            })
            .state('profilers.list', {
                url: '',
                templateUrl: 'profilers.list.tpl.html',
                controller: 'ProfilersListCtrl',
                data: {
                    title: 'profilers'
                }
            })
            .state('profilers.new', {
                url: '/new',
                templateUrl: 'profilers.new.tpl.html',
                controller: 'ProfilersNewCtrl',
                data: {
                    title: 'New Profilers'
                }
            })

            .state('profilers.standard', {
                url: '/standard',
                templateUrl: 'profilers.standard.tpl.html',
                controller: 'ProfilersStandardCtrl',
                data: {
                    title: 'New Standard Profiler'
                }
            })
            .state('profilers.item', {
                url: '/{location}',
                abstract: true,
                templateUrl: 'profilers.item.tpl.html',
            })
            .state('profilers.item.details', {
                url: '',
                templateUrl: 'profilers.item.details.tpl.html',
                controller: 'ProfilersItemDetailsCtrl',
                data: {
                    title: 'Profilers Details'
                }
            })
            .state('profilers.item.delete', {
                url: '/delete',
                templateUrl: 'profilers.item.delete.tpl.html',
                controller: 'ProfilersItemDeleteCtrl',
                data: {
                    title: 'Profiler Delete'
                }
            })
            .state('profilers.item.debug', {
                url: '/debug?fromQueryState',
                templateUrl: 'profilers.item.debug.tpl.html',
                controller: 'ProfilersItemDebugCtrl',
                data: {
                    title: 'Profiler Debug'
                }
            })
            .state('profilers.item.edit', {
                url: '/edit',
                templateUrl: 'profilers.item.edit.tpl.html',
                controller: 'ProfilersItemEditCtrl',
                data: {
                    title: 'Profiler Edit'
                }
            })

            // ========================================QUERY============
            .state('query', {
                url: 'query?location',
                parent: 'app',
                templateUrl: 'query.tpl.html',
                controller: 'QueryCtrl',
                data: {
                    title: 'Query'
                }
            });
    }]);
});