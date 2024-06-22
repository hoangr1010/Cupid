import React from "react";
import { useState } from "react";
import db from "../../utils/firebase";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNotificationList } from "../../state";
import { onSnapshot, collection } from "firebase/firestore";
import { Dropdown } from "flowbite-react";
import { GoDotFill } from "react-icons/go";
import { readNotification } from "../../api/notification.js";

export const NotificationDropdown = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [notiList, setNotiList] = useState([]);

  console.log(notiList);

  // After implementing the push data in backend, change "a" into user._id
  // so the function get all notification of a user.
  useEffect(() => {
    onSnapshot(collection(db, user._id), async (snapshot) => {
      console.log(
        snapshot.docs.map((doc) => {
          console.log("create at: " + doc);
        }),
      );

      var l = [];
      snapshot.docs.map((doc) => {
        l.push(doc.data());
      });

      console.log(l);

      l = l.sort((a, b) => b.createdAt - a.createdAt);

      console.log(l);

      await dispatch(updateNotificationList(l));

      setNotiList(l);
    });

    // const q = collection(db, user._id);
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   snapshot.docChanges().forEach((change) => {
    //     console.log(change);
    //     console.log(change.doc.data());
    //   })
    // })
  }, []);
  return (
    <>
      <Dropdown
        id="notification-dropdown"
        label=""
        className="w-96"
        dismissOnClick={false}
        renderTrigger={() => (
          <span>
            <button className="flex justify-center items-center">
              <div className="w-9 h-9">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  // width="40"
                  // height="40"
                  aria-hidden="true"
                  viewBox="0 0 48 48"
                  strokeWidth="5"
                >
                  <path
                    fill="#00705E"
                    d="M 23.277344 4.0175781 C 15.193866 4.3983176 9 11.343391 9 19.380859 L 9 26.648438 L 6.3496094 31.980469 A 1.50015 1.50015 0 0 0 6.3359375 32.009766 C 5.2696804 34.277268 6.9957076 37 9.5019531 37 L 18 37 C 18 40.295865 20.704135 43 24 43 C 27.295865 43 30 40.295865 30 37 L 38.496094 37 C 41.002339 37 42.730582 34.277829 41.664062 32.009766 A 1.50015 1.50015 0 0 0 41.650391 31.980469 L 39 26.648438 L 39 19 C 39 10.493798 31.863289 3.6133643 23.277344 4.0175781 z M 23.417969 7.0136719 C 30.338024 6.6878857 36 12.162202 36 19 L 36 27 A 1.50015 1.50015 0 0 0 36.15625 27.667969 L 38.949219 33.289062 C 39.128826 33.674017 38.921017 34 38.496094 34 L 9.5019531 34 C 9.077027 34 8.8709034 33.674574 9.0507812 33.289062 C 9.0507812 33.289062 9.0507812 33.287109 9.0507812 33.287109 L 11.84375 27.667969 A 1.50015 1.50015 0 0 0 12 27 L 12 19.380859 C 12 12.880328 16.979446 7.3169324 23.417969 7.0136719 z M 21 37 L 27 37 C 27 38.674135 25.674135 40 24 40 C 22.325865 40 21 38.674135 21 37 z"
                  ></path>
                </svg>
                {notiList.filter((noti) => noti.seen == false).length ? (
                  <GoDotFill
                    style={{ color: "red" }}
                    className="absolute top-2 right-1.5"
                  />
                ) : (
                  <></>
                )}
              </div>
            </button>
          </span>
        )}
      >
        <div className="p-1" style={{ overflowY: "scroll", height: "350px" }}>
          {notiList.map((noti) =>
            noti.seen ? (
              <Dropdown.Item className="rounded-md" key={noti.id}>
                <div>{noti.type}</div>
              </Dropdown.Item>
            ) : (
              <Dropdown.Item
                key={noti.id}
                className="rounded-md flex justify-between"
                onClick={() => {
                  readNotification(noti);

                  // navigate to the notified component
                }}
              >
                <div>{noti.type}</div>
                <div>
                  <GoDotFill style={{ color: "red" }} />
                </div>
              </Dropdown.Item>
            ),
          )}
        </div>
      </Dropdown>
    </>
  );
};
