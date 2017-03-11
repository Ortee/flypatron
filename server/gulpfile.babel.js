import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import path from 'path';
import winston from 'winston';
import babelCompiler from 'babel-core/register';
const plugins = loadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  tests: './test/**/*.test.js',
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
    ignore: ['node_modules/**/*.js', 'dist/**/*.js', 'test/**/*.test.js'],
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

gulp.task('test', () => {
  gulp.start('run-test');
  gulp.watch([paths.tests], ['run-test']);
});

gulp.task('run-test', ['set-env'], () => {
  return gulp.src([paths.tests], { read: true })
    .pipe(plugins.plumber())
    .pipe(plugins.mocha({
      reporter: 'spec',
      ui: 'bdd',
      timeout: 2000,
      compilers: {
        js: babelCompiler,
      },
    }))
    .once('error', (err) => {
      winston.error(err);
    });
});

gulp.task('mocha', ['clean'], () => {
  return runSequence('babel', 'test');
});
