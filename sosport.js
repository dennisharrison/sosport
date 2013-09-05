 if (Meteor.isClient) {
  Meteor.absoluteUrl.defaultOptions.rootUrl = "http://haven.aeonstructure.com:3000";

  Template.file_picker.events({
    'click #CameraButton': function(ev) {
      $("#FilePickerInput").click();
    },
    'change #FilePickerInput': function(ev) {  
      _.each(ev.srcElement.files, function(file) {
        Meteor.saveFile(file, file.name);
      });
      //$("#FilePickerInput").remove();
      $("#FilePickerInput").attr('value', '');
      
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Meteor.absoluteUrl.defaultOptions.rootUrl = "http://haven.aeonstructure.com:3000";
  });
}
