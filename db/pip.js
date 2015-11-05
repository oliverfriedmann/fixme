module.exports = [{
	
	"title": "PIP without SUDO",
	"description": "You forgot to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("pip") >= 0 && (descriptor.stderr.indexOf("failed with error code 1") >= 0 || descriptor.stderr.indexOf("Permission denied") >= 0); 
	}
	
}, {
	
	"title": "Requires wheel",
	"description": "You forgot to install wheel it.",
	"commands": function (descriptor) {
		return ["sudo pip install wheel", descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("python") >= 0 && descriptor.stderr.indexOf("error: invalid command 'bdist_wheel'") >= 0; 
	}
	
}];
