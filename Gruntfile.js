/*global module:false*/
module.exports = function(grunt) {
    'use strict';
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            options: {
                jshintrc: 'tests-settings/.jshintrc'
            },
            bundle: {
                src: ['src/**/*.js', '!**/vendor/**/*.js', '*.json', 'Gruntfile.js']
            }
        },

        csslint: {
            options: {
                csslintrc: 'tests-settings/.csslintrc',
            },
            bundle: {
                src: ['src/**/*.css', '!**/vendor/**/*.css']
            }
        },

        phpcsfixer: {
            options: {
                bin: 'vendor/bin/php-cs-fixer',
                level: 'all',
                ignoreExitCode: false,
                verbose: true,
                diff: false,
                dryRun: true
            },
            bundle: {
                dir: 'src/'
            }
        },

        phpcs: {
            options: {
                bin: 'vendor/bin/phpcs',
                extensions: 'php',
                standard: 'PSR2'
            },
            bundle: {
                dir: ['src/']
            }
        },

        phpmd: {
            options: {
                bin: 'vendor/bin/phpmd',
                reportFormat: 'text',
                rulesets: 'tests-settings/phpmd-rules.xml'
            },
            bundle: {
                dir: 'src/'
            }
        },

        phpcpd: {
            options: {
                bin: 'vendor/bin/phpcpd',
                quiet: true
            },
            bundle: {
                dir: 'src/'
            }
        },

        phpunit: {
            options: {
                configuration: 'tests-settings/phpunit.xml'
            },
            bundle: {
                dir: ''
            }
        },

        exec: {
          twig_lint: 'vendor/bin/twig-lint lint src/ --ansi'
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-php-cs-fixer');
    grunt.loadNpmTasks('grunt-phpcs');
    grunt.loadNpmTasks('grunt-phpmd');
    grunt.loadNpmTasks('grunt-phpcpd');
    grunt.loadNpmTasks('grunt-exec');

    // Default task.
    grunt.registerTask('lint', ['jshint', 'csslint', 'exec:twig_lint']);
    grunt.registerTask('cs', ['phpcsfixer', 'phpcs', 'phpmd', 'phpcpd']);
    grunt.registerTask('test', ['phpunit', 'lint', 'cs']);
    grunt.registerTask('default', ['test']);
};
