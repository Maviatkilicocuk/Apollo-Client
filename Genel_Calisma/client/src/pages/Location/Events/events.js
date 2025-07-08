import React, { useState, useEffect } from "react";
// import Loading from "components/Loading";
import { List } from "antd";
import styles from "../styles.module.css";
import { Divider, Button } from "antd";
import { useLazyQuery } from "@apollo/client";
import { GET_EVENT, EVENT_SUBSCRIPTIONS } from "../queries";
import NewEventFormSort from "pages/NewEvent/NewEventFormSort";

function Events({ user }) {
  const [btnIsVisible, setBtnVisible] = useState(true);

  const [loadEvents, { called, loading, data, subscribeToMore }] = useLazyQuery(GET_EVENT);

  useEffect(() => {
    if (!loading && called) {
      subscribeToMore({
        document: EVENT_SUBSCRIPTIONS,
        variables: { _id: user },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }

          const newEventItem = subscriptionData.data.eventCreated;

          return {
            user: {
              ...prev.user,
              events: [...prev.user.events, newEventItem],
            },
          };
        },
      });
    }
  }, [loading, called, subscribeToMore, user]);

  useEffect(() => {
    if (!loading && data) {
      setBtnVisible(false);
    }
  }, [loading, data]);

  return (
    <>
      <Divider>Events</Divider>

      {btnIsVisible && (
        <div className={styles.showEvetsBtnContainer}>
          <Button loading={loading} onClick={() => loadEvents({ variables: { _id: user } })}>
            Show Events
          </Button>
        </div>
      )}

      {!loading && data?.user?.events && (
        <>
          <List
            dataSource={data.user.events}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={<div>{item.title}</div>} description={<div>{item.desc}</div>} />
              </List.Item>
            )}
          />
          <Divider>New Events</Divider>
          <NewEventFormSort />
        </>
      )}
    </>
  );
}

export default Events;
