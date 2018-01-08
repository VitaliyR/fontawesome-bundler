const mapping = require('../mapping');

const baseReg = '[\\S\\s]*?(fa-[\\w-]+)';

module.exports = files => {
  const data = new Array(mapping.classes.length).fill().map(function() { return []; });

  return Promise.all(
    files.map(fileContents => {
      return mapping.classes.map(cl => {
        const regexp = new RegExp(cl + baseReg, 'igm');
        const fa = [];
        let e;

        while (e = regexp.exec(fileContents)) {
          fa.push(e[1]);
        }

        return fa;
      });
    })
  ).then(classes => {
    classes.forEach(cl => {
      cl.forEach((c, i) => {
        data[i].push.apply(data[i], c);
      });
    });

    data.forEach((classes, index) => {
      data[index] = data[index].filter((e, i) => data[index].indexOf(e) === i)
    });

    return data;
  });
};
