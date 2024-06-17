import axios from "axios";

const service = axios.create();

/**
 * sendNoti
 * Input:
 *    noti:   a class Notification type variable
 *
 * Output: None
 *
 * Description:
 *    The function make an API call to the Notification microservice
 *    to send notification to the users.
 */
export const sendNoti = async (noti) => {
  try {
    await service.post(
      `${process.env.NOTIFICATION_MICROSERVICE_URL}/notiServcice`,
      noti,
    );

    // console.log("done noti")
  } catch (error) {
    console.log(error);
  }
};
