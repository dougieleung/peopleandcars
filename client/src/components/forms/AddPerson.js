import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PEOPLE_CARS } from "../../queries";

const AddPerson = () => {
  const [personId] = useState(uuidv4());

  const [addPerson] = useMutation(ADD_PERSON);
  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    addPerson({
      variables: {
        personId,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPerson: {
          __typename: "Person",
          personId,
          firstName,
          lastName,
          cars: [],
        },
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE_CARS });
        proxy.writeQuery({
          query: GET_PEOPLE_CARS,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
  };

  return (
    <div className="personFormContainer">
      <Form
        form={form}
        name="add-person-form"
        layout="inline"
        size="large"
        className="personForm"
        onFinish={onFinish}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name" }]}
        >
          <Input placeholder="i.e. Douglas" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name" }]}
        >
          <Input placeholder="i.e. Leung" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="addPersonButton">
            Add Person
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddPerson;
