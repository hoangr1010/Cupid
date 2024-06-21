import db from "../utils/connectDB.js";

export const changeSeenField = async (req, res) => {
  try {
    // get Notification object
    const { userId, notificationId } = req.body;
    console.log(userId, notificationId);

    const notiRef = db.collection(userId).doc(notificationId);

    const doc = (await notiRef.get()).data();
    console.log(doc);

    doc.seen = true;
    console.log(doc);

    await notiRef.set(doc);

    res.status(201).json({
      message: "Success setting field 'seen' to true",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error setting field 'seen' to true",
      error: error.message,
    });
  }
};
