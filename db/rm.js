module.exports = [{
	
	"title": "rm without permission",
	"description": "You might want to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("rm") >= 0 && descriptor.stderr.indexOf("Permission denied") >= 0; 
	}
	
}];