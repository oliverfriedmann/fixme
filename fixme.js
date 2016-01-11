process.title = 'grunt'; 

var child_process = require('child_process');
var cli_color = require('cli-color');
var readline = require('readline');
var indentString = require('indent-string');
var fs = require("fs");


var prompt = function (s, cb) {
	var rl = readline.createInterface({
	  input: process.stdin,
	  output: process.stdout
	});
	rl.question(s, function (answer) {
		rl.close();
		cb(answer);
	});
};


var fixDatabase = [];

fs.readdirSync(__dirname + "/db").forEach(function (file) {
	var fixes = require(__dirname + "/db/" + file);
	fixes.forEach(function (fix) {
		fixDatabase.push(fix);
	});
});

var fixApplies = function (descriptor, fix) {
	return fix.applies(descriptor);
};

var fixCommands = function (descriptor, fix) {
	return fix.commands ? (typeof fix.commands === "function" ? fix.commands(descriptor) : fix.commands) : [];
}

var fixExecute = function (descriptor, fix) {
	var commands = fixCommands(descriptor, fix);
	if (commands.length > 0) {
		var f = function (idx) {
			if (idx >= commands.length)
				return;
			child_process.exec(commands[idx], {}, function (error, stdout, stderr) {
				process.stdout.write(stdout);
				process.stderr.write(stderr);
				if (!error)
					f(idx + 1);
			});
		};
		f(0);
	} else {
		console.log(cli_color.yellow("(No commands specified.)"));
	}
};


var fixQuery = function (descriptor) {
	return fixDatabase.filter(function (fix) {
		return fixApplies(descriptor, fix);
	});
};


var fixCommand = function (command) {
	console.log("");
	console.log("-------------------- Running --------------------");
	child_process.exec(command, {}, function (error, stdout, stderr) {
		process.stdout.write(stdout);
		process.stderr.write(stderr);
		var descriptor = {
			command: command,
			error: error,
			stdout: stdout,
			stderr: stderr
		};
		var fixResult = fixQuery(descriptor);
		console.log("");
		console.log("-------------------- Fixing --------------------");
		if (fixResult.length > 0) {
			console.log(cli_color.green("We have found " + (fixResult.length > 1 ? fixResult.length + " fixes" : "a fix") + ":"), "\n");
			console.log("----");
			fixResult.forEach(function (fix, fixIdx) {
				console.log(cli_color.green("Fix") + " " + (fixResult.length > 1 ? cli_color.blue("[" + (fixIdx + 1) + "] ") : "") + ": " + fix.title);
				console.log("");
				console.log(indentString(fix.description, " ", 6));
				var commands = fixCommands(descriptor, fix);
				if (commands.length > 0) {
					console.log("");
					console.log(cli_color.blue(indentString(commands.join("\n"), " ", 6)));
				}
				console.log("----");
			});
			console.log("");
			if (fixResult.length === 1) {
				prompt("Do you want to apply the fix? [Y] or return : ", function (answer) {
					answer = answer.toLowerCase();
					if (answer === "y")
						fixExecute(descriptor, fixResult[0]);
				});
			} else {
				var choices = "[" + fixResult.map(function (dummy, i) { return i + 1; }).join("] [") + "]";
				prompt("Do you want to apply a fix? " + choices + " or return : ", function (answer) {
					try {
						answer = parseInt(answer) - 1;
					} catch (e) {
						answer = -1;
					}
					if (answer >= 0 && answer < fixResult.length)
						fixExecute(descriptor, fixResult[answer]);
				});
			}
		} else {
			console.log(cli_color.yellow("(No fixes found or required.)"));
			console.log("");
			prompt("Do you want to google it? [Y] or return : ", function (answer) {
				answer = answer.toLowerCase();
				if (answer === "y")
					child_process.exec("open https://www.google.com/search?q=" + encodeURIComponent(command));
			});
		}
	});
};

fixCommand(process.argv.slice(2).map(function (s) {
	return s.indexOf(' ') >= 0 ? '"' + s + '"' : s;
}).join(" "));