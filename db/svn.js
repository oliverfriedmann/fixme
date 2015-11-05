module.exports = [{
	
	"title": "SVN old version",
	"description": "We need to upgrade your repository first.",
	"commands": function (descriptor) {
		return ["svn upgrade", descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("svn") >= 0 && descriptor.stderr.indexOf("svn upgrade") >= 0; 
	}
	
}];
