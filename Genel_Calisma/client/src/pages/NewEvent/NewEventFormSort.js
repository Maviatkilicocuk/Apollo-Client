import React from "react";
import { Form, Input, Button, Checkbox, Select, message } from "antd";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  GET_USERS,
  GET_LOCATIONS,
  NEW_EVENT_MUTATION,
} from "./queries";
import styles from "./styles.module.css";

const { Option } = Select;
function NewEventForm() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [saveEvent, { loading, error, data }] = useMutation(NEW_EVENT_MUTATION);
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);
  const { loading: get_locations_loading, data: locations_data } =
    useQuery(GET_LOCATIONS);

  const handleSubmit = async (values) => {
    console.log("handle submit");
    console.log(values);

    try {
      await saveEvent({
        variables: {
          data: values,
        },
      });

      messageApi.success("Event saved!", 4);
      navigate(`/location/${values.user}`);
    } catch (e) {
      console.log(e);
      messageApi.error("Event not saved!", 5);
    }
  };

  console.log(users_data);
  console.log(locations_data);
  return (
    <>
      {" "}
      {contextHolder}
      <Form
        name="basic"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        /* onFinishFailed={onFinishFailed} */
        autoComplete="off"
      >
        <Form.Item
          name="user"
          rules={[{ required: true, message: "Please select user!" }]}
        >
          <Select
            disabled={get_users_loading || loading}
            loading={get_users_loading}
            placeholder="Select a user"
            size="large"
          >
            {users_data &&
              users_data.users.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.username}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input disabled={loading} size="middle" placeholder="Title" />
        </Form.Item>

        <Form.Item
          name="desc"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input.TextArea
            disabled={loading}
            size="middle"
            placeholder="Description"
          />
        </Form.Item>

        <Form.Item
          name="date"
          rules={[{ required: true, message: "Please input your date!" }]}
        >
          <Input disabled={loading} size="middle" placeholder="yyyy-mm-dd" />
        </Form.Item>

        <Form.Item
          name="from"
          rules={[{ required: true, message: "Please input your from!" }]}
        >
          <Input disabled={loading} size="middle" placeholder="hh:mm" />
        </Form.Item>

        <Form.Item
          name="to"
          rules={[{ required: true, message: "Please input your to!" }]}
        >
          <Input disabled={loading} size="middle" placeholder="hh:mm" />
        </Form.Item>

        <Form.Item
          name="location"
          rules={[{ required: true, message: "Please select location!" }]}
        >
          <Select
            disabled={get_locations_loading || loading}
            loading={get_locations_loading}
            placeholder="Select a location"
            size="large"
          >
            {locations_data &&
              locations_data.locations.map((item) => (
                <Option key={item._id} value={item._id}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item className={styles.buttons} label={null}>
          <Button loading={loading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default NewEventForm;
