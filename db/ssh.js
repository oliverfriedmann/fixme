module.exports = [{
	
	"title": "Remove old host",
	"description": "We need to remove the old host.",
	"commands": function (descriptor) {
		var s = "Offending RSA key in ";
		var i = descriptor.stderr.indexOf(s) + s.length;
		var t = descriptor.stderr.substr(i).split("\n");
		t = t[0].split(":");
		return [
		    "mv " + t[0] + " " + t[0] + ".bak",
		    "sed -e \"" + t[1].trim() + "d\" " + t[0] + ".bak > " + t[0],
		    descriptor.command
		];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("ssh") >= 0 && descriptor.stderr.indexOf("WARNING: POSSIBLE DNS SPOOFING DETECTED!") >= 0; 
	}
	
}];
