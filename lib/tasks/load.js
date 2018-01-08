const mapping = require('../mapping');

module.exports = classes => {
  const icons = mapping.classes.reduce((o,c) => (o[c] = []) && o, {});

  classes.forEach((classList, i) => {
    const pkg = mapping.namespace.packages + '/' + mapping.packages[i];
    const cls = mapping.classes[i];

    classList.forEach(icon => {
      const iconName = icon.split('-').slice(1).join('-');
      const fileName = iconName
        .split('-')
        .map(name => name[0].toUpperCase() + name.slice(1))
        .join('');
      const filePath = pkg + '/' + 'fa' + fileName + '.js';

      try {
        icons[cls].push(require(filePath));
      } catch (e) {
        console.error(`Could not find an icon ${iconName}`);
      }
    });
  });

  return icons;
};
