const { src, dest, parallel, watch } = require("gulp");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-csso");
const autoprefixer = require("gulp-autoprefixer");
const notify = require("gulp-notify");
const purgecss = require("gulp-purgecss");
const plumber = require("gulp-plumber");

const autoprefixBrowsers = [
  "> 1%",
  "last 2 versions",
  "firefox >= 4",
  "safari 7",
  "safari 8",
  "IE 8",
  "IE 9",
  "IE 10",
  "IE 11"
];

const onError = function(err) {
  notify.onError({
    title: "Error",
    message: err.message,
    sound: "Beep"
  })(err);
  this.emit("end");
};

function css() {
  return src("src/assets/src/sass/main.sass")
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: autoprefixBrowsers
      })
    )
    .pipe(minifyCSS())
    .pipe(
      purgecss({
        content: ["src/**/*.js", "public/index.html"]
      })
    )
    .pipe(dest("src/css"));
}

function watchFiles() {
  watch("src/assets/src/sass/**/*.sass", css);
  watch("src/**/*.js", css);
}

exports.css = css;
exports.default = parallel(css, watchFiles);
