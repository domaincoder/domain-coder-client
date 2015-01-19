(function(exports) {
'use strict';

/**
 * @module DomainCoder.App.Menu
 */

var module = angular.module('DomainCoder.App.Menu', ['DomainCoder.Project'])
.config(function () {
});

 /**
 * @ngdoc function
 * @name TopNavCtrl
 */
module.controller('TopNavCtrl',[
    '$scope',
    'dcore_Project',
    'resource_project_open',
    '$modal',
function ($scope, Project, ProjectOpenResource, $modal) {

    $scope.$on('project.open', function() {
        $scope.projectOpenDialog();
    });

    /**
     * プロジェクトを開く ダイアログ
     */
    $scope.projectOpenDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/app/project/open.html',
            controller: 'TopNav_ProjectOpenCtrl',
        });

        modalInstance.result.then(function (path) {
            ProjectOpenResource.open(path).$promise.then(function(data) {
                Project.name = data.name;
                Project.directory = data.path;
            }, function(error) {
                console.log('プロジェクトを開けません');
            });
        });
    };


    /**
     * プロジェクト設定 ダイアログ
     */
    $scope.projectSettingDialog = function () {
        var modalInstance = $modal.open({
            templateUrl: 'views/app/project/setting.html',
            controller: 'TopNav_ProjectSettingCtrl',
            resolve: {
                Project: function() {
                    return angular.copy(Project);
                }
            }
        });

        modalInstance.result.then(function (name) {
            Project.name = name;
        });
    };


}]);

/**
 * TopNav_ProjectOpenCtrl
 */
module.controller('TopNav_ProjectOpenCtrl', ['$scope', '$modalInstance',
function($scope, $modalInstance) {
    $scope.ok = function() {
        $modalInstance.close($scope.path);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);


/**
 * TopNav_ProjectSettingCtrl
 */
module.controller('TopNav_ProjectSettingCtrl', ['$scope', '$modalInstance', 'Project',
function($scope, $modalInstance, Project) {
    $scope.Project = Project;

    $scope.ok = function() {
        $modalInstance.close($scope.Project.name);
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);



/**
 * @ngdoc function
 * @name LeftMenuCtrl
 */
module.controller('LeftMenuCtrl', [
    '$scope',
    '$rootScope',
    '$log',
function($scope, $rootScope, $log) {

}]);

/**
 * @ngdoc function
 * @name LeftMenuContextCtrl
 */
module.controller('LeftMenuContextCtrl', [
    '$scope',
    '$rootScope',
    'dcore_ContextCollection',
    '$log',
function($scope, $rootScope, ContextCollection, $log) {
    $scope.ContextCollection = ContextCollection;
}]);

/**
 * @ngdoc function
 * @name LeftMenuEntityCtrl
 */
module.controller('LeftMenuEntityCtrl', [
    '$scope',
    '$rootScope',
    'emodel_EntityCollection',
    '$log',
function($scope, $rootScope, EntityCollection, $log) {
    $scope.EntityCollection = EntityCollection;
}]);


})(this);