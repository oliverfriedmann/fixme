module.exports = [{
	
	"title": "Easy Install without SUDO",
	"description": "You forgot to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("easy_install") >= 0 && descriptor.stderr.indexOf("error: can't create or remove files in install directory") >= 0; 
	}
	
}];
