const glob = require('globby');
const fs = require('fs-fs');

const tasks = require('./lib/tasks');

/**
 * @param {Object|String} [config=] configuration
 * @return {Promise}
 */
module.exports = function(config) {
  config = typeof config === 'string' ? { src: config } : (config || {});
  const output = config.output || 'string';

  return glob(config.src)
    .then(files => {
      return Promise.all(
        files.map(filePath => fs.readFile(filePath, 'utf-8'))
      );
    })
    .then(tasks.parser)
    .then(tasks.loader)
    .then(icons => {
      switch (output) {
        case 'string':
        default:
          return tasks.formatter(icons);
        case 'array':
          return tasks.plainer(icons);
        case 'object':
          return icons;
      }
    });
};
