(function() {
  'use strict';

  angular
    .module('dtb')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('default page', {
        url: '/',
        templateUrl: 'app/main/main.html'
      })
      .state('main', {
        url: '/main',
        controller: 'adminController',
        templateUrl: 'app/admin/main.html'
      })
      // .state('login', {
      //   url: 'admin/login',
      //   templateUrl: 'app/admin/login.html'
      // })
      // .state('refund', {
      //   url: '/refund',
      //   templateUrl: 'app/admin/refund.html'
      // })
      // .state('quiz app', {
      //   url: '/quiz',
      //   controller: 'quizController',
      //   templateUrl: 'app/quiz/quiz.html'
      // })
      ;

    $urlRouterProvider.otherwise('/');
  }
})();
