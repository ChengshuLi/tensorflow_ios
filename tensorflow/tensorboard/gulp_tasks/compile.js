/* Copyright 2015 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

var gulp = require('gulp');
var ts = require('gulp-typescript');
var typescript = require('typescript');
var gutil = require('gulp-util');
var filter = require('gulp-filter');
var merge = require('merge2');

var tsProject = ts.createProject('./tsconfig.json', {
  typescript: typescript,
  noExternalResolve: true, // opt-in for faster compilation!
});


module.exports = function() {
  var isComponent = filter(['components/**/*.js']);
  var isLib = filter(['lib/js/**/*.js']);
  var isApp = filter(['app/**/*.js']);

  var tsResult = tsProject.src()
                     .pipe(ts(tsProject));
  return merge([
    // Duplicate all component code to live next to the ts file
    // (makes polymer imports very clean)
    tsResult.js
            .pipe(isComponent)
            .pipe(gulp.dest('.')),
    tsResult.js
            .pipe(isLib)
            .pipe(gulp.dest('.')),
  ]);
}
