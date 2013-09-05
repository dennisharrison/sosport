Meteor.methods({
  saveFile: function(blob, name, path, encoding) {
    var encoding = encoding || 'binary';
    var path = '/Users/dennisharrison/projects/sosport/uploaded_content/'
    var Future = Npm.require('fibers/future');
    var ext = name.substr(name.lastIndexOf('.') + 1);
    var uuid = createUUID();
    var name = uuid + "." + ext;
    var temp_name = "!TEMP_" + uuid + "." + ext;
    var temp_path = path + temp_name;
    var perm_path = path + name;
    var media_item = {
          url: "http://localhost:8080/" + name,
          name: name,
          type: "image/" + ext,
          timestamp: new Date().getTime()
        }

    var Imagemagick = Npm.require('imagemagick');
    Imagemagick.convert.path = "/opt/ImageMagick/bin/convert";
    var resize_future = new Future();

    fs.writeFile(path + temp_name, blob, encoding, function(err) {
      if (err) {
        console.log(err);
        throw (new Meteor.Error(500, 'Failed to save file.', err));
      } else {
        console.log('The file ' + name + ' (' + encoding + ') was saved to ' + path);
        Imagemagick.resize({ srcPath: temp_path, dstPath: perm_path, width: 500 }, function(err, stdout, stderr){
            if (err) resize_future.return({ error:err });
            console.log('resized');
            resize_future.return();
        });
      }
    });

    function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
    }
    
    resize_future.wait();
    Media.insert(media_item);
  }

});