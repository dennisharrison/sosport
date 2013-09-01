// Add the base roles to the system.
var roles = ['admin', 'manage-roles', 'manage-users', 'manage-media'];
var existingRolesObjects = Roles.getAllRoles().fetch();
var existingRolesArray = [];
existingRolesObjects.each(function(role){
  existingRolesArray.push(role.name);
});
 
roles.each(function(role, id){
	if(existingRolesArray.none(role)){
		Roles.createRole(role);
	}
});
 
// Add base roles to the admin user.
// By default the admin user gets ALL roles.
_.each(Roles.getAllRoles().fetch(), function(role){
  var user = Meteor.users.findOne("LpoTXiHowtsDxv98m");
	Roles.addUsersToRoles(user._id, role.name);
});