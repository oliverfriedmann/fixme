module.exports = [{
	
	"title": "Git Pull Origin Master",
	"description": "You forgot to specify origin master.",
	"commands": ["git pull origin master"],
	"applies": function (descriptor) {
		return descriptor.command === "git pull" && descriptor.stderr.indexOf("You are not currently on a branch.") >= 0; 
	}
	
}, {
	
	"title": "Git Status Detached Head",
	"description": "Something went wrong with this head, but we can get it back.",
	"commands": ["git checkout master", "git pull origin master"],
	"applies": function (descriptor) {
		return descriptor.command === "git status" && descriptor.stdout.indexOf("HEAD detached at") >= 0; 
	}
	
}];
