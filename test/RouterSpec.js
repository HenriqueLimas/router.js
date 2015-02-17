// currentRoute = <configObject>;
// route: function(routeId, configObject){}

// configObject: {
//     templateUrl: '',
//     url: '',
//     params: ''
// }

// loadTemplate -> using promise then
// 	find element with id then
// 	append template into element then
// 	change route with history.pushState();

// on refresh (window event popstate) then
//     find state then:
//     loadTemplate


describe('$router', function() {
    it('should exist on the window.', function() {
        expect(window.$router).toBeDefined();
        expect($router).toBeDefined();
    });

    describe('$router.route', function() {
        it('should exists on $router.', function() {
            expect($router.route).toBeDefined();
        });

        describe('testing the parameters:', function() {
            describe('when the first parameters is not a string,', function() {
                it('should throw an error.', function() {
                    expect(function() {
                        $router.route();
                    }).toThrowError('Error "Route.route": It should be passed a String on routeId!');
                });
            });

            describe('when the second parameters is not an object', function() {
                it('should throw an error.', function() {
                    expect(function() {
                        $router.route('routeId');
                    }).toThrowError('Error "Route.route": It should be passed a Object on routeConfig!');
                });
            });

            describe('when routeConfig doesn\'t have', function() {
                describe('templateUrl', function() {
                    it('should throw an error.', function() {
                        expect(function() {
                            $router.route('routeId', {});
                        }).toThrowError('Error "Route.route": It should exist templateUrl on routeConfig!');
                    });

                    it('should throw an error when it is not a String.', function() {
                        expect(function() {
                            $router.route('routeId', {
                                templateUrl: 42
                            });
                        }).toThrowError('Error "Route.route": It should exist templateUrl on routeConfig!');
                    });
                });

                describe('url', function() {
                    it('should throw an error.', function() {
                        expect(function() {
                            $router.route('routeId', {
                                templateUrl: 'template.html'
                            })
                        }).toThrowError('Error "Route.route": It should exist url on routeConfig!');
                    });
                });
            });
        });

        it('should return the $router object', function() {
            expect($router.route('routeId', {
                templateUrl: 'template.html',
                url: '/url'
            })).toBe($router);
        });
    });

    describe('$router.otherwise', function() {
        it('should be defined on $router.', function() {
            expect($router.otherwise).toBeDefined();
        });

        describe('when the routeId doesn\'t exist on the router list', function() {
            it('should throw an error.', function() {
                expect(function() {
                    $router.otherwise('routeAnonymous');
                }).toThrowError();
            });
        });
    });

    describe('$router.go', function() {
        it('should be defined on $router.', function() {
            expect($router.go).toBeDefined();
        });

        describe('when the routeId does not exist', function() {
            it('should throw an error.', function() {
                expect(function() {
                    $router.go('routerAnonymous');
                }).toThrowError();
            });
        });

        describe('when the routeId exist on the array', function() {
            var router;

            beforeEach(function() {
                router = {
                    routeId: 'routeId',
                    config: {
                        templateUrl: 'template.html',
                        url: '/template'
                    }
                };

                $router.route(router.routeId, router.config);
            });

            it('should change the location.pathname', function() {
            	$router.go(router.routeId);
            });
        });
    });
});
