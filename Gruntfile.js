/*
 * angular-cache
 * http://github.com/jmdobry/angular-cache
 *
 * Copyright (c) 2013 Jason Dobry <http://jmdobry.github.io/angular-cache>
 * Licensed under the MIT license. <https://github.com/jmdobry/angular-cache/blob/master/LICENSE>
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['dist/', 'docs/'],
        jshint: ['src/angular-cache.js'],
        copy: {
            options: {
                processContent: function (contents) {
                    contents = contents.replace(/<%= pkg.version %>/g, grunt.file.readJSON('package.json').version);
                    return contents;
                }
            },
            dist: {
                src: ['src/angular-cache.js'],
                dest: 'dist/angular-cache-<%= pkg.version %>.js'
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/angular-cache-<%= pkg.version %>.min.js': ['dist/angular-cache-<%= pkg.version %>.js']
                }
            }
        },
        karma: {
            options: {
                configFile: 'test/karma.conf.js',
                singleRun: true,
                autoWatch: false
            },
            dev: {
                browsers: ['Chrome']
            },
            travis: {
                browsers: ['PhantomJS', 'Firefox']
            }
        },
        jsdoc : {
            dist : {
                src: ['dist/angular-cache-<%= pkg.version %>.js'],
                options: {
                    destination: 'docs',
                    lenient: true,
                    verbose: true,
                    private: true
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('build', ['clean', 'jshint', 'copy', 'uglify', 'karma:dev']);
    grunt.registerTask('build:all', ['build', 'jsdoc']);

    grunt.registerTask('travis', ['clean', 'jshint', 'copy', 'uglify', 'karma:travis']);
};