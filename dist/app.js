define(function () { 'use strict';

/* global requirejs */

requirejs({ baseUrl: 'dist' }, ['components/button', 'util/logger'], function (Button, logger) {
  var button = new Button('button');
  button.init();
  logger(button);
});

});
