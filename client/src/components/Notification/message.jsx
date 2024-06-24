import React from "react";

export const Message = (noti) => {
  // console.log(noti.createdAt);
  // console.log(Date.now());
  // console.log(Date.now() - noti.createdAt);

  const d = Math.floor((Date.now() - noti.createdAt) / 86400000);
  const h = Math.floor((Date.now() - noti.createdAt) / 3600000);
  const m = Math.floor((Date.now() - noti.createdAt) / 60000);
  const s = Math.floor((Date.now() - noti.createdAt) / 1000);

  const w = d % 7;
  const month = d % 30;
  const y = month % 12;
  // console.log(d, h, m, s);

  var msg = "";
  var time = 0;
  var time_unit = "";

  if (y) {
    time = y;
    y > 1 ? (time_unit = "years") : (time_unit = "year");
  } else if (month) {
    time = month;
    month > 1 ? (time_unit = "months") : (time_unit = "month");
  } else if (w) {
    time = w;
    w > 1 ? (time_unit = "weeks") : (time_unit = "week");
  } else if (d) {
    time = d;
    d > 1 ? (time_unit = "days") : (time_unit = "day");
  } else if (h) {
    time = h;
    h > 1 ? (time_unit = "hours") : (time_unit = "hour");
  } else if (m) {
    time = m;
    m > 1 ? (time_unit = "minutes") : (time_unit = "minute");
  } else {
    time = s;
    s > 1 ? (time_unit = "seconds") : (time_unit = "second");
  }

  switch (noti.notiType) {
    case "matchingDone":
      msg = "Your matching result is here!";
      break;

    case "refererRequestMoreInfo":
      msg = "A referer requests more information from you";
      break;

    case "requestRemindAction":
      msg = "Provide more information to expedite your referring process";
      break;

    case "openingRemindAction":
      msg = "Refer your candidate. They are still waiting for you!";
      break;

    default:
      break;
  }
  return (
    <div>
      <div className="font-semibold text-sm flex justify-start text-start">{msg}</div>
      <div className="font-light text-xs flex justify-start">{time} {time_unit} ago</div>
    </div>
  )
};

// export default message;
