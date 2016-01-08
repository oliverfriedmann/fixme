module.exports = [{
	
	"title": "Remove old host",
	"description": "We need to remove the old host.",
	"commands": function (descriptor) {
		var regex = /Offending [\w]+ key in (.+):(\d+)/g;
		var match = regex.exec(descriptor.stderr);
		return [
		    "mv " + match[1] + " " + match[1] + ".bak",
		    "sed -e \"" + match[2].trim() + "d\" " + match[1] + ".bak > " + match[1],
		    descriptor.command
		];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("ssh") >= 0 && descriptor.stderr.indexOf("IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!") >= 0; 
	}
	
}];
