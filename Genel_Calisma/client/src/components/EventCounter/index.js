import React from "react";
import styless from "./styles.module.css";
import { Badge, Avatar } from "antd";
import { useSubscription } from "@apollo/client";
import { EVENTS_COUNT_SUBSCRIPTION } from "./queries";

function EventCounter() {
  const { loading, data } = useSubscription(EVENTS_COUNT_SUBSCRIPTION);


  return (
    <div className={styless.container}>
      <Badge count={loading ? '?' : data.eventCount} size="small">
        <Avatar shape="square" size="medium">
          <span className={styless.counterEvent}>Events</span>
        </Avatar>
      </Badge>
    </div>
  );
}

export default EventCounter;
