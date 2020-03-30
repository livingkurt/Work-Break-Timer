const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();

// compile scss into css
function style() {
  // Find ANH scss file in scss folder
  return (
    gulp
      .src("./public/sass/**/*.scss")

      // Pass that file through sass compiler
      .pipe(sass())

      // Where compiled css to be saved
      .pipe(gulp.dest("./public/css"))

      // stream changes to all browser
      .pipe(browserSync.stream())
  );
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
  gulp.watch("./public/sass/style.scss", style);
  gulp.watch("./public/*.html").on("change", browserSync.reload);
  gulp.watch("./js/observers.js").on("change", browserSync.reload);
}

exports.style = style;
exports.watch = watch;