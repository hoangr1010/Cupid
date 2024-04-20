export const valid_url = (resumeLink) => {
  var split_url = resumeLink.split("/");

    // Check if split_url is a link drive

    // Turn the provided Google Drive link to a link that 
    // can be shown with iframe tag
    var new_url = "";
    for (var i = 0; i < split_url.length; i++) {
      if (i === split_url.length - 1) {
        new_url += "preview";
      } else {
        new_url += split_url[i] + "/";
      }
    }

    return new_url;
}