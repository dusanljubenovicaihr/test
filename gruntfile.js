'use strict';
module.exports = function ( grunt ) {

    /*
     * Grunt Tasks
     * load all grunt tasks matching the `grunt-*` pattern
     * Ref. https://npmjs.org/package/load-grunt-tasks
     */
    require( 'load-grunt-tasks' )( grunt );

    /*
     * Grunt Config
     */
    grunt.initConfig( {
        // watch for changes and trigger sass, uglify and livereload
        watch: {
            sass: {
                files: [ 'assets/css/scss/**/*.{scss,sass}' ],
                tasks: [ 'sass' ],
            },
            js: {
                files: [ 'assets/js/**/{*.js, !*.min.js}'],
                tasks: [ 'uglify' ]
            }
        },
        // sass
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                    //sourcemap: 'none'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/css/scss',
                    src: ['*.scss'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            }
        },
        // autoprefixer
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 9', 'ios 6', 'android 4' ],
                map: false,
            },
            files: {
                expand: true,
                flatten: true,
                src: 'assets/css/*.css',
                dest: 'assets/css/'
            }
        },
        /*
         * CSS minify
         * Compress and Minify CSS files
         * Ref. https://github.com/gruntjs/grunt-contrib-cssmin
         */
        cssmin: {
            minify: {
                expand: true,
                cwd: 'assets/css/',
                src: [ '*.css', '!*.min.css'],
                dest: 'assets/css/',
                ext: '.min.css'
            }
        },
        /*
         * Uglify
         * Compress and Minify JS files
         * Ref. https://npmjs.org/package/grunt-contrib-uglify
         */
        uglify: {
            dist: {
                options: {
                    banner: '/*! \n * Infinum Theme JavaScript Library \n * @package Infinum Theme \n */'
                },
                files: [
                    {
                        expand: true,
                        cwd: "assets/js/",
                        src: ["*.js", "!*.min.js"],
                        dest: "assets/js/",
                        ext: ".min.js"
                    }
                ]
            }
        },
       /*
         * Check text domain
         * Check your code for missing or incorrect text-domain in gettext functions
         * Ref. https://github.com/stephenharris/grunt-checktextdomain
         */
        checktextdomain: {
            options: {
                text_domain: ['infinum'], //Specify allowed domain(s)
                keywords: [ //List keyword specifications
                    '__:1,2d',
                    '_e:1,2d',
                    '_x:1,2c,3d',
                    'esc_html__:1,2d',
                    'esc_html_e:1,2d',
                    'esc_html_x:1,2c,3d',
                    'esc_attr__:1,2d',
                    'esc_attr_e:1,2d',
                    'esc_attr_x:1,2c,3d',
                    '_ex:1,2c,3d',
                    '_n:1,2,4d',
                    '_nx:1,2,4c,5d',
                    '_n_noop:1,2,3d',
                    '_nx_noop:1,2,3c,4d'
                ]
            },
            target: {
                files: [ {
                        src: [
                            '*.php',
                            '**/*.php',
                            '!node_modules/**',
                            '!tests/**'
                        ], //all php
                        expand: true
                    } ]
            }
        },
        /*
         * Makepot
         * Generate a POT file for translators to use when translating your plugin or theme.
         * Ref. https://github.com/cedaro/grunt-wp-i18n/blob/develop/docs/makepot.md
         */
        makepot: {
            target: {
                options: {
                    cwd: '.', // Directory of files to internationalize.
                    domainPath: 'languages/', // Where to save the POT file.
                    exclude: [ 'node_modules/*' ], // List of files or directories to ignore.
                    mainFile: 'index.php', // Main project file.
                    potFilename: 'infinum.pot', // Name of the POT file.
                    potHeaders: { // Headers to add to the generated POT file.
                        poedit: true, // Includes common Poedit headers.
                        'Last-Translator': 'Infinum',
                        'Language-Team': 'Infinum',
                        'report-msgid-bugs-to': '',
                        'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
                    },
                    type: 'wp-theme', // Type of project (wp-plugin or wp-theme).
                    updateTimestamp: false, // Whether the POT-Creation-Date should be updated without other changes.
                    updatePoFiles: false // Whether to update PO files in the same directory as the POT file.
                }
            }
        }
    } );

    grunt.registerTask( 'default', [ 'sass', 'uglify', 'autoprefixer', 'cssmin', 'checktextdomain', 'makepot' ] );
};