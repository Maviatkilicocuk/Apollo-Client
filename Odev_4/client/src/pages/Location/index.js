import React from "react";
import Loading from "components/Loading";
import Events from "./events";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LOCATION } from "./queries";
import { Typography, Image, Divider } from "antd";
const { Title } = Typography;

function Location() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data);

  const { location } = data;

  return (
    <div>
      <Title level={3}>{location.name}</Title>
          <Image
      src={location.location_picture}
    />
      <div>{location.desc}</div>
      <Events event_id={id}/>
    </div>
  );
}

export default Location;
