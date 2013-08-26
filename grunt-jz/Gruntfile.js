/* global module,require,__dirname */
module.exports = function(grunt) {

	// Load dependencies specified in devDependencies in package.json
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2013 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'js/reveal.js',
				dest: 'js/reveal.min.js'
			}
		},

		cssmin: {
			compress: {
				files: {
					'css/reveal.min.css': [ 'css/reveal.css' ]
				}
			}
		},

		sass: {
			main: {
				files: {
					'css/theme/default.css': 'css/theme/source/default.scss',
					'css/theme/beige.css': 'css/theme/source/beige.scss',
					'css/theme/night.css': 'css/theme/source/night.scss',
					'css/theme/serif.css': 'css/theme/source/serif.scss',
					'css/theme/simple.css': 'css/theme/source/simple.scss',
					'css/theme/sky.css': 'css/theme/source/sky.scss',
					'css/theme/moon.css': 'css/theme/source/moon.scss',
					'css/theme/iterate.css': 'css/theme/source/iterate.scss',
					'css/theme/solarized.css': 'css/theme/source/solarized.scss'
				}
			}
		},

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false
				}
			},
			files: [ 'Gruntfile.js', 'js/reveal.js' ]
		},

		connect: {
			server: {
				options: {
					port: 8000,
					base: '.'
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'css/**',
				'js/**',
				'lib/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'js/reveal.js', 'css/reveal.css' ],
				tasks: 'default'
			},
			theme: {
				files: [ 'css/theme/source/*.scss', 'css/theme/template/*.scss' ],
				tasks: 'themes'
			}
		}

	});

	grunt.registerTask('pdfify', 'Creates a PDF of the presentation', function () {
		grunt.task.requires('connect');

		var path = require('path');
		var childProcess = require('child_process');
		var phantomjsBin = require('phantomjs').path;
		var done = this.async();

		var url = 'http://';
		url += grunt.config('connect.server.options.hostname') || 'localhost';
		url += ':' + grunt.config('connect.server.options.port');
		url += '/index.html?print-pdf';

		var args = [ path.join(__dirname, 'plugin/print-pdf/print-pdf.js'), url ];

		childProcess.execFile(phantomjsBin, args, function(err, stdout, stderr) {
			if (err) {
				grunt.log.error('Error:', err);
				done(false);
			}
			grunt.log.write(stdout);
			done();
		});
	});

	// Default task
	grunt.registerTask('default', [ 'jshint', 'cssmin', 'uglify' ] );

	// Theme task
	grunt.registerTask('themes', [ 'sass' ] );
 
	// PDF task
	grunt.registerTask('mkpdf', [ 'connect', 'pdfify' ] );

	// Package presentation to archive
	grunt.registerTask('package', [ 'default', 'zip' ] );

	// Serve presentation locally
	grunt.registerTask('serve', [ 'connect', 'watch' ] );
	
};
