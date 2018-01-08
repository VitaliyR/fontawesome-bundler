module.exports = icons => {
  return Object
    .keys(icons)
    .reduce((arr, iconName) => arr.concat(icons[iconName]), []);
};
