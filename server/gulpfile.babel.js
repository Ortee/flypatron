import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
const plugins = loadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  tests: './server/test/**/*.test.js',
};

gulp.task('babel', () => {
  return gulp.src(paths.js, { base: '.' })
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', ['babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'app.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel'],
  })
);

gulp.task('set-env', () => {
  plugins.env({
    vars: {
      NODE_ENV: 'test',
    },
  });
});
