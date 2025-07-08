import React from "react";
import Loading from "components/Loading";
import Events from "./Events/events";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LOCATION } from "./queries";
import { Typography, Image } from "antd";
const { Title } = Typography;

function Location() {
  const { _id } = useParams();

  const { loading, error, data } = useQuery(GET_LOCATION, {
    variables: { _id: _id },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { user } = data;

  if (!user?.events?.length || !user.events[0]?.location) {
    return <div>Konum bilgisi bulunamadı.</div>;
  }

  const locevent = user.events[0];
  const location = locevent.location;

  return (
    <div>
      <Title level={3}>{location.name}</Title>
      <Image src={location.location_picture} />
      <div>{location.desc}</div>
      <Events user={_id} />
    </div>
  );
}

export default Location;
