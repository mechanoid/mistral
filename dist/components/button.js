define(['util/logger'], function (logger) { 'use strict';

logger = 'default' in logger ? logger['default'] : logger;

/*  global alert */

var Button = function Button (selector) {
  this.element = document.querySelector(selector);
  logger('button created');
};

Button.prototype.init = function init () {
  this.element.addEventListener('click', this.clicked);
};

Button.prototype.clicked = function clicked () {
  var message = 'clicked';
  logger(message);
  alert(message);
};

return Button;

});
