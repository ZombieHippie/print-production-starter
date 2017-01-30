const gulp = require('gulp')
const sass = require('gulp-sass')
const path = require('path')

// Gulp is ONLY for compiling SCSS FILES!
// node-sass is not featured enough to support
// what we need for compiling css files 😕

const SASS_CONFIG = {
  outputStyle: "compressed",
  sourceMapEmbed: true,
  sourceMapContents: true,
  includePaths: [
    root("src/@styles"),
    root("node_modules"),
  ]
}

gulp.task('styles', function() {
    gulp.src([
      './src/**/*.scss'
    ])
        .pipe(sass(SASS_CONFIG).on('error', sass.logError))
        .pipe(gulp.dest('./src/'))
})

const pug = require('gulp-pug');

const PUG_CONFIG = {
  pretty: true,
  /**
opts (Object): Any options from Pug's API in addition to pug's own options.
opts.locals (Object): Locals to compile the Pug with. You can also provide locals through the data field of the file object, e.g. with gulp-data. They will be merged with opts.locals.
opts.data (Object): Same as opts.locals.
opts.client (Boolean): Compile Pug to JavaScript code.
opts.pug: A custom instance of Pug for gulp-pug to use.
  */
}

gulp.task('markup', function buildHTML() {
    gulp.src([
      './src/**/*.pug',
      '!./src/**/_*.pug'
    ])
        .pipe(pug(PUG_CONFIG))
        .pipe(gulp.dest('./src/'))
});

gulp.task('default', ['styles', 'markup'], function() {
  gulp.watch('./src/**/*.scss', ['styles'])
  gulp.watch('./src/**/*.pug', ['markup'])
})

// Helper functions
function root(args) {
  args = Array.prototype.slice.call(arguments, 0)
  return path.join.apply(path, [__dirname].concat(args))
}
