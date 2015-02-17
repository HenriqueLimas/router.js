'use strict';

$router
    .route('firstRoute', {
        templateUrl: 'templates/first-template.html',
        url: '#first-template'
    })
    .route('secondRoute', {
        templateUrl: 'templates/second-template.html',
        url: '#second-template'
    });

function goToFirstRoute() {
    $router.go('firstRoute');
}

function goToSecondRoute() {
    $router.go('secondRoute');
}


