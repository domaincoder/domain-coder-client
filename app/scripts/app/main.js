(function(exports) {
'use strict';

/**
 * @module DomainCoder.App.Global
 */

var module = angular.module('DomainCoder.App.Main', ['DomainCoder.Core'])
.config(function () {
});

/**
 * ==================================================================
 * classes
 * ==================================================================
 */

var AppContext = function($location, $route, $log) {
    this.api_token = '';
    this.user_name = '';
};


/**
 * ==================================================================
 * services
 * ==================================================================
 */

module.factory('AppContext', ['$location', '$route', '$log', function ($location, $route, $log) {
    return new AppContext($location, $route, $log);
}]);


/**
 * ==================================================================
 * controllers
 * ==================================================================
 */
module.controller('MainCtrl', [
    '$rootScope', '$scope', '$timeout',
    'AppContext',
    'dcore_Project',
    'resource_project_project',
    'resource_session_start',
    '$modal',
function($rootScope, $scope, $timeout, AppContext, Project, ProjectResource, SessionStartResource, $modal) {

    if (AppContext.user_name == '') {
        $timeout(function() {
            $rootScope.$broadcast('login.open');
        });
    }

    $scope.$on('login.open', function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/app/project/login.html',
            controller: 'Main_ProjectLoginCtrl'
        });

        modalInstance.result.then(function (name) {
            AppContext.user_name = name;
            $scope.loginAfter();
        });
    });

    $scope.loginAfter = function() {
        SessionStartResource.post({name: AppContext.user_name}).$promise.then(function (data) {
            AppContext.api_token = data.token;
            ProjectResource.get().$promise.then(function (data) {
                Project.name = data.name;
                Project.directory = data.path;
            }, function(error) {
                console.log('error');
                Project.name = '';
                Project.directory = '';
                $timeout(function() {
                    $rootScope.$broadcast('project.open');
                })
            });
        });
    };
}]);

/**
 * Main_ProjectLoginCtrl
 */
module.controller('Main_ProjectLoginCtrl', ['$scope', '$modalInstance',
function($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.name);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

})(this);