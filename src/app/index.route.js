(function() {
  'use strict';

  angular
    .module('scg')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html'
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html'
      })
      .state('admin login', {
        url: '/admin/login',
        templateUrl: 'app/admin/login.html'
      })
      .state('admin main', {
        url: '/admin/main',
        controller: 'adminController',
        templateUrl: 'app/admin/main.html'
      })
      .state('refund', {
        url: '/refund',
        templateUrl: 'app/admin/refund.html'
      })
      .state('quiz app', {
        url: '/quiz',
        controller: 'quizController',
        templateUrl: 'app/quiz/quiz.html'
      })
      ;

    $urlRouterProvider.otherwise('/');
  }
})();
