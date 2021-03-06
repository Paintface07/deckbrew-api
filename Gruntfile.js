module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: "dist",
                    keepalive: true
                }
            }
        },
        watch: {
            src: {
                files: ['src/**/*.js', 'src/**/*.less', 'src/**/*.html'],
                tasks: ['copy', 'uglify', 'less']
            }
        },
        less: {
            dev: {
                options: {
                    compress: true
                },
                files: {
                    'dist/deckbrewApp.css': 'src/**/*.less'
                }
            }
        },
        uglify: {
            all: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/deckbrewApp.js': ['src/DeckBrewApp.module.js', 'src/**/*.js']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/angular/angular.min.js',
                            'node_modules/angular-aria/angular-aria.min.js',
                            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                            'node_modules/bootstrap/dist/css/bootstrap.min.css',
                            'node_modules/bootstrap/dist/js/bootstrap.min.js',
                            'node_modules/jquery/dist/jquery.min.js'
                        ],
                        dest: 'dist/vendor/'
                    }, {
                        expand: true,
                        flatten: true,
                        src: [
                            'src/index.html'
                        ],
                        dest: 'dist/'
                    }, {
                        expand: true,
                        src: [
                            'src/*/*.html'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'uglify', 'less', 'connect:server'/*, 'watch'*/]);
};