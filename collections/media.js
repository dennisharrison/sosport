// Media:
//  url: string
//  name: string
//  type: string
//  
//  
// Relations:
//  
//  

Media = new Meteor.Collection("media");

Media.allow({
  insert: function(userId, doc) {
    var user;
 
    user = Meteor.users.findOne({
      _id: userId
    });
    return Roles.userIsInRole(user, ['admin', 'manage-media']);
  },
  update: function(userId, doc) {
    var user;
 
    user = Meteor.users.findOne({
      _id: userId
    });
    return Roles.userIsInRole(user, ['admin', 'manage-media']);
  },
  remove: function(userId, doc) {
    var user;
 
    user = Meteor.users.findOne({
      _id: userId
    });
    return Roles.userIsInRole(user, ['admin', 'manage-media']);
  }
});