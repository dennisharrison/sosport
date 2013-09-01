 if (Meteor.isClient) {

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
  });
}
