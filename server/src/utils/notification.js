import User from "../models/User.js";
import Request from "../models/Request.js";
import Opening from "../models/Opening.js";

/**
 * class Notification
 *
 * Example create a Notification type variable:
 *
 *    notification with notiType === matchingDone:
 *      noti = Notification.matchingDone("matchingDone", userId)
 *
 */
export class Notification {
  constructor(notiType, recipientId, requestId, openingId, userPref, email) {
    (this.notiType = notiType),
      (this.recipientId = recipientId),
      (this.requestId = requestId),
      (this.openingId = openingId),
      (this.userPref = userPref),
      (this.email = email);
  }

  static async matchingDone(notiType, recipientId) {
    const user = await User.findOne({ _id: recipientId });

    // const email = user.email.valueOf();
    return new Notification(notiType, recipientId, "", "", "", user.email);
  }

  static async refererRequestMoreInfo(notiType, requestId) {
    // fetch data to get recipientId
    const request = await Request.findOne({ _id: requestId });
    const recipientId = request.candidate_id.valueOf();
    console.log(request.candidate_id.valueOf());

    const user = await User.findOne({ _id: recipientId });

    return new Notification(
      notiType,
      recipientId,
      requestId,
      "",
      "",
      user.email,
    );
  }

  static async requestRemindAction(notiType, requestId) {
    // fetch data to get recipientId
    const request = await Request.findOne({ _id: requestId });
    const recipientId = request.candidate_id.valueOf();
    const user = await User.findOne({ _id: recipientId });

    return new Notification(notiType, recipientId, requestId, "", "", user.email);
  }

  static async openingRemindAction(notiType, openingId) {
    // fetch data to get recipientId
    const opening = await Opening.findOne({ _id: openingId });
    const recipientId = opening.referrer_id.valueOf();
    const user = await User.findOne({ _id: recipientId });

    return new Notification(notiType, recipientId, "", openingId, "", "", email);
  }
}
