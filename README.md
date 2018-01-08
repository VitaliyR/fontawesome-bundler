# fontawesome-bundler

Extract used fontawesome icons into separate bundle

## Why?

Fontawesome 5 with all icons weights a lot. And you, probably, as me
don't need all of them - but only few from each fontawesome group.

Starting from version 5, fontaweome uses SVG icons which are described 
as node modules. Using this module you can find which icons are used 
in your project source files, like in templates, concat and append 
them  into your main bundle. It helps to reduce your bundle size up 
to -400kb.

## Installation

```bash
npm i -S fontawesome-bundler
``` 

Add task to your build tool:

* **Gulp:**

```js
var gulpUglify = require('gulp-uglify');
var gap = require('gulp-append-prepend');

var fontawesome = require('fontawesome-bundler');

gulp.task('vendor', function() {
  return fontawesome('src/templates/**/*.hbs')
      .then(function(icons) {
        return gulp.src('vendor/')
          .pipe(gulpConcat('vendor.js'))
          .pipe(gap.prependText(icons))
          .pipe(gulpUglify())
          .pipe(gulp.dest('build/js'));
      });
});
```

## API

`fontawesome(sourceDir or options)`

* `sourceDir` *(String)*. Path to directory with html files or templates
* `options` *(Object)*. Additional options:
  * `src` *(String)*. Path to directory with html files or templates
  * `output` *(String)*. **Possible values:** string, array, object.
  **Default value:** string. Format of the output. If configured as
  string, plugin will return ready to inject source code.

## Testing

```bash
npm test
```

## License

MIT © 2018 [Vitaliy Ribachenko](https://ribachenko.com) <vit@ribachenko.com>
