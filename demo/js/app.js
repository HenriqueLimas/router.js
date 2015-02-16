'use strict';

Router
    .route('firstRoute', {
        templateUrl: 'templates/first-template.html',
        url: '#first-template'
    })
    .route('secondRoute', {
        templateUrl: 'templates/second-template.html',
        url: '#second-template'
    });

function goToFirstRoute() {
    Router.go('firstRoute');
}

function goToSecondRoute() {
    Router.go('secondRoute');
}


