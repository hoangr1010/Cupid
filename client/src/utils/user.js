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
};

export const getFileNameFromUrl = (url) => {
  const lastSlashIndex = url.lastIndexOf("/");
  return url.substring(lastSlashIndex + 1);
};

export const parseObject = (template, target) => {
  const parsedObj = {};

  for (let key in target) {
    let value = target[key];

    try {
      switch (typeof template[key]) {
        case "string":
          if (value !== "") {
            parsedObj[key] = String(value);
          }
          break;
        case "number":
          if (value !== 0) {
            parsedObj[key] = Number(value);
          }
          break;
        case "boolean":
          parsedObj[key] = Boolean(value);
          break;
        default:
          parsedObj[key] = value;
      }
    } catch (e) {
      parsedObj[key] = value;
    }
  }

  return parsedObj;
};
