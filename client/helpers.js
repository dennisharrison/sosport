Handlebars.registerHelper('host_origin', function(){
	return window.location.origin
});

Handlebars.registerHelper('file_server_url', function(){
	var location = window.location
	var protocol = location.protocol
	var hostname = location.hostname
	var port = '8080'
	
	return protocol + "//" + hostname + ":" + port + "/"
});