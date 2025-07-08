import React from "react";
import { Typography } from "antd";
import NewLocationForm from "./NewEventForm";
const { Title } = Typography;

function NewLocation() {
  return (
    <div>
      <Title level={3}>New Location</Title>
      <NewLocationForm />
    </div>
  );
}

export default NewLocation;
