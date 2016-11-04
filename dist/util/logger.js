define(function () { 'use strict';

var logger = function () {
	var messages = [], len = arguments.length;
	while ( len-- ) messages[ len ] = arguments[ len ];

	return console.log.apply(console, messages);
};

return logger;

});
