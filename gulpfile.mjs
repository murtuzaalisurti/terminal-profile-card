import gulp from 'gulp'
import gulpTs from "gulp-typescript"
import rename from 'gulp-rename'
import terser from 'gulp-terser'

const tsConfig = gulpTs.createProject("tsconfig.json")

function compileTS() {
    return tsConfig.src().pipe(tsConfig()).js.pipe(terser()).pipe(rename({extname: ".mjs"})).pipe(gulp.dest("./"))
}

function watchTSCompile() {
    gulp.watch("index.ts", compileTS)
}

export const watch = watchTSCompile
export default compileTS