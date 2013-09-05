var Future = Npm.require('fibers/future');

  Meteor.publish('media', function () {
    var future = new Future;
    future.return(Media.find({}, {sort: {timestamp: -1}}));

    // Meteor.setTimeout(function () {
    //   future.return(Media.find({}, {sort: {timestamp: -1}}));
    // }, 2000);

    return future.wait();
  });

  Meteor.publish("userData", function () {
  return Meteor.users.find({_id: this.userId},
                           {fields: {
                           	'services.facebook.email': 1, 
                           	'services.google.email': 1
                           }});
});