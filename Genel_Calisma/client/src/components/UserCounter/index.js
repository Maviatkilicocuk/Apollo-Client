import React from "react";
import styless from "./styles.module.css";
import { Badge, Avatar } from "antd";
import { useSubscription } from "@apollo/client";
import { USERS_COUNT_SUBSCRIPTION } from "./queries";

function UserCounter() {
  const { loading, data } = useSubscription(USERS_COUNT_SUBSCRIPTION);


  return (
    <div className={styless.container}>
      <Badge count={loading ? '?' : data.userCount} size="small">
        <Avatar shape="square" size="medium">
          <span className={styless.counterUser}>Users</span>
        </Avatar>
      </Badge>
    </div>
  );
}

export default UserCounter;
