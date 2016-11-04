/* global requirejs */

requirejs({ baseUrl: 'dist' }, ['components/button', 'util/logger'], (Button, logger) => {
  const button = new Button('button')
  button.init()
  logger(button)
})
