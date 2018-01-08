const plugin = require('./index');

test('Error if empty configuration', () => {
  return expect(plugin()).rejects.toThrow();
});

test('Option as object', () => {
  return expect(plugin({ src: 'test/' })).resolves.toBeDefined();
});

test('Option as string', () => {
  return expect(plugin('test/')).resolves.toBeDefined();
});

test('Should return string', done => {
  plugin('test/').then(data => {
    expect(typeof data).toEqual('string');
    done();
  })
});

test('Should return array of used icons', done => {
  plugin({ src: 'test/*.html', output: 'array' }).then(data => {
    expect(Array.isArray(data)).toEqual(true);
    done();
  })
});

test('Should return object of used icons', done => {
  plugin({ src: 'test/*.html', output: 'object' }).then(data => {
    expect(Array.isArray(data)).toEqual(false);
    expect(typeof data).toEqual('object');
    done();
  })
});

test('Should return string if passed output wrong', done => {
  plugin({ src: 'test/*.html', output: 'ha-ha-ha' }).then(data => {
    expect(typeof data).toEqual('string');
    done();
  })
});

test('Should work', done => {
  plugin({ src: 'test/', output: 'array' }).then(data => {
    expect(data.length).toEqual(4); // no duplicates, no unknown
    done();
  });
});
