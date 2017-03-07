import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';
import runSequence from 'run-sequence';
import babelCompiler from 'babel-core/register';
const plugins = loadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  tests: './server/test/**/*.test.js'
};

gulp.task('babel', () => {
  return gulp.src(paths.js, { base: '.' })
    .pipe(plugins.babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('nodemon', ['babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['babel']
  })
);

gulp.task('set-env', () => {
  plugins.env({
    vars: {
      NODE_ENV: 'test'
    }
  });
});
