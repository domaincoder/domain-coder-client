(function(exports) {
'use strict';

var module = angular.module('DomainCoder.Project', ['ngResource'])
.config(function () {
});

// require lodash
//

module.run(['$rootScope', '$state', '$log',
    function($rootScope, $state, $log){
}]);

/**
 * ==================================================================
 * classes
 * ==================================================================
 */

/**
 * @namespace DomainCoder
 */
var DomainCoder = exports.DomainCoder || {};

(function (Project) {

    Project.Project = function() {
        /** @type {string} */
        this.name = '';
        /** @type {string} */
        this.directory = '';
    };

})(DomainCoder.Project = DomainCoder.Project || {});

/**
 * ==================================================================
 * services
 * ==================================================================
 */
module.constant('backend_url_base', 'http://localhost:8976/api/');
module.value('api_token', null);

module.factory('dcore_Project', [
function () {
    return new DomainCoder.Project.Project();
}]);


module.factory('resource_project_project', ['$resource','backend_url_base', 'AppContext',
function ($resource, backend_url_base, AppContext) {
    return $resource(backend_url_base + 'project/project/token/:token.json', {token: AppContext.api_token}, {
        get: {method:'GET', isArray:false}
    });
}]);
module.factory('resource_project_open', ['$resource','backend_url_base', 'AppContext',
function ($resource, backend_url_base, AppContext) {
    return $resource(backend_url_base + 'project/open/token/:token.json', {token: AppContext.api_token}, {
        post: {method:'POST', isArray:false}
    });
}]);
module.factory('resource_session_start', ['$resource','AppContext', 'backend_url_base',
function ($resource, AppContext, backend_url_base) {
    return $resource(backend_url_base + 'session/start.json', {}, {
        post: {method:'POST', isArray:false}
    });
}]);

exports.DomainCoder = DomainCoder;
})(this);