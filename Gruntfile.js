/*global module, require */


module.exports = function(grunt) {
	var srcFiles = ['Gruntfile.js', './lib/**/*.js', './test/**/*.js'];
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			src: srcFiles
		},
		watch: {
			dev: {
				files: srcFiles,
				tasks: ['jshint', 'nightwatch'],
				options: { spawn: false, reload: true }
			}
		},
		nightwatch: {
			options: {
				src_folders: './test/',
				output_folder : './reports/',
                selenium: {
                    start_process : true,
                    server_path : './node_modules/selenium-standalone/.selenium/2.39.0/server.jar',
                    cli_args : {
                        'webdriver.chrome.driver': './node_modules/selenium-standalone/.selenium/2.39.0/chromedriver'
                    }
                },
				test_settings: {
					default: {
						desiredCapabilities: { 
							browserName: 'phantomjs',
							'phantomjs.binary.path': './node_modules/phantomjs/lib/phantom/phantomjs.exe'
						}
					}
				},
				chrome: {
					desiredCapabilities: { 
						browserName: 'chrome'
					}
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nightwatch');

	grunt.registerTask('default', ['jshint', 'nightwatch:chrome']);
	grunt.registerTask('dev', ['watch']);

};
