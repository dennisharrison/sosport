var Future = Npm.require('fibers/future');

  Meteor.publish('media', function () {
    var future = new Future;
    future.return(Media.find({}, {sort: {timestamp: -1}}));

    // Meteor.setTimeout(function () {
    //   future.return(Media.find({}, {sort: {timestamp: -1}}));
    // }, 2000);

    return future.wait();
  });