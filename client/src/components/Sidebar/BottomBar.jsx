import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Dropdown } from "flowbite-react";
import { clearAuth } from "./../../state";
import { logout } from "./../../utils/auth";

export default function BottomBar({ isExpanded }) {
  const pictureUrl = useSelector((state) => state.auth.user.picture_url);
  const firstName = useSelector((state) => state.auth.user.first_name);
  const lastName = useSelector((state) => state.auth.user.last_name);
  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <Dropdown
        label={
          <div>
            <Avatar img={pictureUrl}>
              {isExpanded ? (
                <div className="space-y-1 font-medium">
                  <p>
                    {firstName} {lastName}
                  </p>
                </div>
              ) : null}
            </Avatar>
          </div>
        }
        arrowIcon={false}
        inline
      >
        <Dropdown.Item
          onClick={() => {
            logout(dispatch);
          }}
        >
          Sign out
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
}
