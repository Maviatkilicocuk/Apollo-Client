import React from "react";
import { Avatar, /* Button, */ List } from "antd";
import { useQuery } from "@apollo/client";

import Loading from "components/Loading";
import {GET_USERS} from './queries';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'



function Home() {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        /*             loadMore={loadMore} */
        dataSource={data.users}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.profile_photo} />}
              title={<Link to={`/location/${item.id}`} className={styles.listTitle}>{item.username}</Link>}
              description={<Link to={`/location/${item.id}`} className={styles.listItem}>{item.email}</Link>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default Home;
