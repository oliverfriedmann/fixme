module.exports = [{
	
	"title": "Git Pull Origin Master",
	"description": "You forgot to specify origin master.",
	"commands": ["git pull origin master"],
	"applies": function (descriptor) {
		return descriptor.command === "git pull" && (
			descriptor.stderr.indexOf("You are not currently on a branch.") >= 0 ||
			descriptor.stdout.indexOf("There is no tracking information for the current branch.")
		); 
	}
	
}, {
	
	"title": "Git Status Detached Head",
	"description": "Something went wrong with this head, but we can get it back.",
	"commands": ["git checkout master", "git pull origin master"],
	"applies": function (descriptor) {
		return descriptor.command === "git status" && descriptor.stdout.indexOf("HEAD detached at") >= 0; 
	}
	
}, {
	
	"title": "Pull discard local changes",
	"description": "You want to pull, you have local changes, but you don't care about them.",
	"commands": function (descriptor) {
		return ["git reset --hard", descriptor.command];
	},
	"applies": function (descriptor) {
		return descriptor.command.indexOf("git pull") >= 0 && descriptor.stderr.indexOf("The following untracked working tree files would be overwritten by merge") >= 0; 
	}
	
}];
