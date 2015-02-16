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


describe('Router', function() {
    it('should exist on the window.', function() {
        expect(window.Router).toBeDefined();
        expect(Router).toBeDefined();
    });

    describe('Router.route', function() {
        it('should exists on Router.', function() {
            expect(Router.route).toBeDefined();
        });

        describe('testing the parameters:', function() {
            describe('when the first parameters is not a string,', function() {
                it('should throw an error.', function() {
                    expect(function() {
                        Router.route();
                    }).toThrowError('Error "Route.route": It should be passed a String on routeId!');
                });
            });

            describe('when the second parameters is not an object', function() {
                it('should throw an error.', function() {
                    expect(function() {
                        Router.route('routeId');
                    }).toThrowError('Error "Route.route": It should be passed a Object on routeConfig!');
                });
            });

            describe('when routeConfig doesn\'t have', function() {
                describe('templateUrl', function() {
                    it('should throw an error.', function() {
                        expect(function() {
                            Router.route('routeId', {});
                        }).toThrowError('Error "Route.route": It should exist templateUrl on routeConfig!');
                    });

                    it('should throw an error when it is not a String.', function() {
                        expect(function() {
                            Router.route('routeId', {
                                templateUrl: 42
                            });
                        }).toThrowError('Error "Route.route": It should exist templateUrl on routeConfig!');
                    });
                });

                describe('url', function() {
                    it('should throw an error.', function() {
                        expect(function() {
                            Router.route('routeId', {
                                templateUrl: 'template.html'
                            })
                        }).toThrowError('Error "Route.route": It should exist url on routeConfig!');
                    });
                });
            });
        });

        it('should return the Router object', function() {
            expect(Router.route('routeId', {
                templateUrl: 'template.html',
                url: '/url'
            })).toBe(Router);
        });
    });

    describe('Router.otherwise', function() {
        it('should be defined on Router.', function() {
            expect(Router.otherwise).toBeDefined();
        });

        describe('when the routeId doesn\'t exist on the router list', function() {
            it('should throw an error.', function() {
                expect(function() {
                    Router.otherwise('routeAnonymous');
                }).toThrowError();
            });
        });
    });

    describe('Router.go', function() {
        it('should be defined on Router.', function() {
            expect(Router.go).toBeDefined();
        });

        describe('when the routeId does not exist', function() {
            it('should throw an error.', function() {
                expect(function() {
                    Router.go('routerAnonymous');
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

                Router.route(router.routeId, router.config);
            });

            it('should change the location.pathname', function() {
            	Router.go(router.routeId);
            });
        });
    });
});
