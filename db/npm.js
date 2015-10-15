module.exports = [{
	
	"title": "Install Globally without SUDO",
	"description": "You forgot to sudo it.",
	"commands": function (descriptor) {
		return ["sudo " + descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("npm install -g") >= 0; 
	}
	
}];
