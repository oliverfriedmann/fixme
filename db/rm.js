module.exports = [{
	
	"title": "rm without permission",
	"description": "You might want to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("rm") >= 0 && descriptor.stderr.indexOf("Permission denied") >= 0; 
	}
	
}, {
	
	"title": "rm directory without -rf",
	"description": "You might want to -rf it.",
	"commands": function (descriptor) {
		return ["rm -r -f " + descriptor.command.substring(2)];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("rm") >= 0 && descriptor.stderr.indexOf("is a directory") >= 0; 
	}
	
}];