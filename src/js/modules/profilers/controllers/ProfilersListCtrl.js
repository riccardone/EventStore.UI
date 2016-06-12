define(['./_module'], function (app) {

    'use strict';

    return app.controller('ProfilersListCtrl', [
		'$rootScope', '$scope', 'ProfilersService', 'ProfilersMapper', 'poller', 'MessageService', '$state',
		function ($rootScope, $scope, profilersService, profilersMapper, pollerProvider, msg, $state) {

            if($rootScope.profilersMode == 'None') {
                msg.failure('Profilers are not enabled on the node');
                $state.go('dashboard.list');
                return;
            }
            
			var all = pollerProvider.create({
				interval: 2000,
				action: profilersService.all,
				params: [ false ]
			});

			all.start();
			all.promise.then(null, null, function (data) {
			    $scope.profilers = profilersMapper.map(data);
			});

			all.promise.catch(function () {
				msg.failure('An error occurred');
				all.stop();
			});

			$scope.disableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to disable & stop all profilers?');

				if(!confirmation) {
					return;
				}

				profilersService.disableAll().then(function () {
					msg.success('All profilers have been disabled');
				}, function (err) {
				    msg.failure('Disabling all the profilers have failed, reason :' + '\n\r' + err);
				});
			};

			$scope.enableAll = function ($event) {
				$event.preventDefault();
				$event.stopPropagation();

				var confirmation = msg.confirm('Are you sure you want to enable & start all profilers?');

				if(!confirmation) {
					return;
				}

				profilersService.enableAll().then(function () {
				    msg.success('All profilers have been enabled');
				}, function (err) {
				    msg.failure('Enabling all profilers have failed, reason : ' + '\n\r' + err);
				});
			};

			$scope.includeQueries = false;
			$scope.toggleIncludeQueries = function(){
				$scope.includeQueries = !$scope.includeQueries;
			}
			var unbindHandler = $scope.$watch('includeQueries', function (newVal, oldVal) {
				if(newVal !== oldVal) {
					all.update({params: [newVal]});
				}
				
			});
			$scope.$on('$destroy', function () {
				unbindHandler();
				pollerProvider.clear();
			});
		}
	]);
});
