const namespace = require('../mapping').namespace.frontend;

module.exports = icons => {
  let code = '';

  code += 'window.' + namespace + ' = window.' + namespace + ' || {};\n';
  code += 'window.' + namespace + '.styles = window.' + namespace + '.styles || {};\n';

  Object.keys(icons).forEach(cls => {
    code += 'window.' + namespace + '.styles.' + cls + ' = window.' + namespace + '.styles.' + cls + ' || {};\n';

    icons[cls].forEach(currentIcon => {
      code += 'window.' + namespace + '.styles.' + cls + '[\'' + currentIcon.iconName + '\'] = ' + JSON.stringify(currentIcon.icon) + ';';
    });
  });

  return code;
};
