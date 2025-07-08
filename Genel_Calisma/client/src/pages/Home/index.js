import React, { useEffect } from "react";
import { Avatar, List } from "antd";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

import Loading from "components/Loading";
import { GET_USERS, USERS_SUBSCRIPTION } from "./queries";
import styles from "./styles.module.css";

function Home() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_USERS);

  useEffect(() => {
    console.log("subscribeToMore çağrılıyor");

    const unsubscribe = subscribeToMore({
      document: USERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        console.log("Subscription data geldi:", subscriptionData);
        if (!subscriptionData.data) return prev;

        const newUser = subscriptionData.data.userCreated;

        if (prev.users.some(user => user._id === newUser._id)) {
          return prev;
        }

        return {
          users: [newUser, ...prev.users],
        };
      },
    });

    return () => {
      console.log("Subscription iptal ediliyor");
      unsubscribe();
    };
  }, [subscribeToMore]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Query data:", data);

  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={data.users}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.profile_photo} />}
            title={
              <Link to={`/location/${item._id}`} className={styles.listTitle}>
                {item.username}
              </Link>
            }
            description={
              <Link to={`/location/${item._id}`} className={styles.listItem}>
                {item.email}
              </Link>
            }
          />
        </List.Item>
      )}
    />
  );
}

export default Home;
