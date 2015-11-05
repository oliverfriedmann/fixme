module.exports = [{
	
	"title": "Grunt without local NPM",
	"description": "You forgot to npm install it.",
	"commands": function (descriptor) {
		return ["npm install", descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("grunt") >= 0 && (
			descriptor.stdout.indexOf("Fatal error: Unable to find local grunt.") >= 0 ||
			descriptor.stdout.indexOf("Cannot find module 'node_modules") >= 0) ||
			descriptor.stdout.indexOf("Local Npm module") >= 0; 
	}
	
}, {
	
	"title": "SASS is not installed",
	"description": "We need to install the sass gem first.",
	"commands": function (descriptor) {
		return ["gem install sass", descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("grunt") >= 0 && descriptor.stdout.indexOf("You need to have Ruby and Sass installed") >= 0; 
	}

}];
