import { sendMessageToQueue } from "../services/SQS.js"

export const notificationService = (req, res) => {
  try {
    const msg = {
      notiType: req.body.notiType,
      recipientId: req.body.recipientId,
      requestId: req.body.requestId,
      openingId: req.body.openingId,
      userPref: req.body.userPref,
      email: req.body.email,
      seen: false,
      retrySend: 0,
    }
  
    console.log(msg);
  
    sendMessageToQueue(JSON.stringify(msg));

    res.status(201).json({
      message: "success"
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      error: error.message,
    });
  }
}