import axios from "axios";

const API = axios.create();

export const readNotification = async (noti) => {
  try {
    const body = {
      userId: noti.recipientId,
      notificationId: noti.id,
    };

    console.log(body);

    await API.patch(`${process.env.REACT_APP_NOTIFICATION_SERVER_URL}/seenNoti`, body);

    console.log("done readNoti");
  } catch (error) {
    console.log(error);
  }
};
