module.exports = [{
	
	"title": "Composer missing",
	"description": "You need to install composer.",
	"commands": function (descriptor) {
		var regex = /Error: Cannot find module '(.+)'/g;
		var match = regex.exec(descriptor.stderr);
		return [
		    "curl -sS https://getcomposer.org/installer | php",
		    "sudo mv composer.phar /usr/local/bin/composer",
		    descriptor.command
		];
	},
	"applies": function (descriptor) {
		return descriptor.stderr.indexOf("composer: command not found") >= 0; 
	}
	
}];
