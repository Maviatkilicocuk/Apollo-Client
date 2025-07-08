import React, { useState, useEffect } from "react";
import Loading from "components/Loading";
import { Avatar, List } from "antd";
import styles from "./styles.module.css";
import { Divider, Button } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_EVENT } from "./queries";

function Events({ event_id }) {
  const [btnIsVisible, setBtnVisible] = useState(true);

  const [loadEvents, { loading, error, data }] = useLazyQuery(GET_EVENT, {
    variables: { id: event_id },
  });

  useEffect(() => {
    if (!loading && data) {
      setBtnVisible(false);
    }
  }, [loading, data]);

  console.log(data);
  return (
    <>
      <Divider>Events</Divider>

      {btnIsVisible && (
        <div className={styles.showEvetsBtnContainer}>
          <Button loading={loading} onClick={() => loadEvents()}>
            Show Events
          </Button>
        </div>
      )}

      {!loading && data && data.event && (
        <List
          dataSource={[data.event]}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<div>{item.title}</div>}
                description={<div>{item.desc}</div>}
              />
            </List.Item>
          )}
        />
      )}
    </>
  );
}

export default Events;
