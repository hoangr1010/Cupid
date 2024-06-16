
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
  constructor(notiType, recipientId, requestId, openingId, userPref) {
    (this.notiType = notiType),
      (this.recipientId = recipientId),
      (this.requestId = requestId),
      (this.openingId = openingId),
      (this.userPref = userPref);
  }

  static matchingDone(notiType, recipientId) {
    return new Notification(notiType, recipientId, "", "", "");
  }

  static refererRequestMoreInfo(notiType, requestId) {
    // fetch data to get recipientId
    return new Notification(notiType, "", requestId, "", "");
  }

  static requestRemindAction(notiType, requestId) {
    // fetch data to get recipientId
    return new Notification(notiType, "", requestId, "", "");
  }

  static openingRemindAcion(notiType, openingId) {
    // fetch data to get recipientId
    return new Notification(notiType, "", "", openingId, "");
  }
}
