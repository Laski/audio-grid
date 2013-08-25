'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		nodeunit: {
			files: ['test/**/*_test.js'],
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				ignores: ['js/A.instruments.js']
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib: {
				src: ['js/*.js']
			},
			test: {
				src: ['test/**/*.js']
			},
		},
		jekyll: {
			server: {
				src: './',
				dest: './_site'
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					base: '_site',
					keepalive: true
				}
			}
		},
		concat: {
			styles: {
				src: [
					'css/bootstrap.css',
					'css/bootstrap-responsive.css',
					'css/slider.css',
					'css/audio-grid.css',
					'css/audio-grid-responsive.css'
				],
				dest: 'dist/styles.css'
			},
			grid: {
				src: [
					'js/_A.js',
					'js/A.Helper.js',
					'js/A.MidiExport.js',
					'js/A.Data.js',
					'js/A.Draw.js',
					'js/A.Grid.js',
					'js/A.Player.js',
					'js/A.Tick.js',
					'js/A.instruments.js'
				],
				dest: 'dist/grid.js'
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: 'dist/',
				src: ['styles.css'],
				dest: 'dist/',
				ext: '.min.css'
			}
		},
		uglify: {
			dist: {
				files: {
					'dist/grid.min.js': ['dist/grid.js']
				}
			}
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib: {
				files: '<%= jshint.lib.src %>',
				tasks: ['jshint:lib', 'concat', 'cssmin', 'nodeunit', 'jekyll']
			},
			html: {
				files: ['*.html', '_includes/*.html'],
				tasks: ['jekyll']
			},
			css: {
				files: ['css/*.css'],
				tasks: ['concat', 'cssmin', 'jekyll']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'nodeunit']
			},
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jekyll');

	// Default task.
	grunt.registerTask('default', ['jshint', 'concat', 'cssmin', 'nodeunit']);
	grunt.registerTask('build', ['jshint', 'concat', 'cssmin', 'uglify', 'nodeunit', 'jekyll']);
	grunt.registerTask('server', ['connect']);

};
