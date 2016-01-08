module.exports = [{
	
	"title": "Install Globally without SUDO",
	"description": "You forgot to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("npm install -g") >= 0; 
	}
	
}, {
	
	"title": "Global module missing",
	"description": "You need to install the missing module.",
	"commands": function (descriptor) {
		var regex = /Error: Cannot find module '(.+)'/g;
		var match = regex.exec(descriptor.stderr);
		return [
		    "sudo npm install -g " + match[1],
		    descriptor.command
		];
	},
	"applies": function (descriptor) {
		return descriptor.stderr.indexOf("Error: Cannot find module") >= 0 && descriptor.stderr.indexOf("at require") >= 0; 
	}
	
}];
