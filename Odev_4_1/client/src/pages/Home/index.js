import React from "react";
import { Avatar, Typography,  List } from "antd";
import { useQuery } from "@apollo/client";
import Loading from "components/Loading";
import {GET_EVENTS} from './queries';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'

const { Title, Text } = Typography;



function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

 return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <Title level={2}>Event Sync</Title>
      <List
        itemLayout="horizontal"
        dataSource={data.events}
        renderItem={(event) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Link to={`/event/${event.id}`} style={{ fontWeight: "bold" }}>
                  {event.title}
                </Link>
              }
              description={event.desc}
            />
            <div>{event.date}</div>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
