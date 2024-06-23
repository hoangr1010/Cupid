import { sendMessageToQueue } from "../services/SQS.js"

export const notificationService = (req, res) => {
  try {
    console.log(Date.now())
    const msg = {
      notiType: req.body.notiType,
      recipientId: req.body.recipientId,
      requestId: req.body.requestId,
      openingId: req.body.openingId,
      userPref: req.body.userPref,
      email: req.body.email,
      seen: false,
      createdAt: Date.now(),
      retrySend: 0,
    }
  
    console.log(msg);
  
    sendMessageToQueue(JSON.stringify(msg));

    res.status(201).json({
      message: "Message pushed to queue"
    });

  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error pushing message to queue",
      error: error.message,
    });
  }
}