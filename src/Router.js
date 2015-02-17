;
(function(window) {
    'use strict';

    var $router = window.$router || {};

    var routerList = [];
    var defaultRoute;

    function route(routeId, routeConfig) {
        if (!isString(routeId)) {
            throwError('route', 'It should be passed a String on routeId');
        }

        if (!isObject(routeConfig)) {
            throwError('route', 'It should be passed a Object on routeConfig');
        }

        if (!routeConfig.templateUrl || !isString(routeConfig.templateUrl)) {
            throwError('route', 'It should exist templateUrl on routeConfig');
        }

        if (!routeConfig.url || !isString(routeConfig.url)) {
            throwError('route', 'It should exist url on routeConfig');
        }

        var router = {
            routeId: routeId,
            routeConfig: routeConfig
        };

        routerList.push(router);

        return $router;
    }

    function otherwise(routeId) {
        defaultRoute = findRoute(routeId);
    }

    function go(routeId, params) {
        var router = findRoute(routeId);

        loadTemplate(router.routeConfig.templateUrl).then(function(template) {
            var element = document.querySelector('[router]');

            if (!element) {
                throwError('go', 'Element with id ' + router.routeId + ' does not exist ');
            }

            element.innerHTML = template;

            history.pushState(router.routeConfig.routeId, null, router.routeConfig.url);
        });
    }

    window.onload = function() {
        if (location.hash) {
            reload(location.hash);
        }
    };

    function reload(url) {
        var router = findRouteByUrl(url);

        go(router.routeId);
    }

    function findRoute(routeId) {
        for (var i = 0, length = routerList.length; i < length; i++) {
            if (routerList[i].routeId === routeId) {
                return routerList[i];
            }
        }

        throwError('findRoute', 'Route: "' + routeId + '" does not exist yet!');
    }

    function findRouteByUrl(url) {
        for (var i = 0, length = routerList.length; i < length; i++) {
            if (routerList[i].routeConfig.url === url) {
                return routerList[i];
            }
        }

        throwError('otherwise', 'Route: "' + url + '" does not exist yet!');
    }

    function loadTemplate(templateUrl) {
        var promise = new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();

            req.open('GET', templateUrl);

            req.onload = function() {
                if (req.status === 200) {
                    resolve(req.response);
                } else {
                    reject(Error(req.statusText));
                }
            };

            req.onerror = function() {
                reject(Error('Network error!'));
            }

            req.send();
        });

        return promise;
    }

    function isString(string) {
        return typeof string === 'string';
    }

    function isObject(object) {
        return object && object.toString() === '[object Object]';
    }

    function throwError(local, message) {
        throw new Error('Error "Route.' + local + '": ' + message + '!');
    }

    function publishExternalAPI($router) {
        extend($router, {
            'route': route,
            'otherwise': otherwise,
            'go': go
        });
    }

    function extend(destination, origin) {
        for (var key in origin) {
            destination[key] = origin[key];
        }
    }

    publishExternalAPI($router);

    window.$router = $router;
})(window, undefined);
