import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const [personId] = useState(props.personId);
  const [firstName] = useState(props.firstName);
  const [lastName] = useState(props.lastName);
  const [form] = Form.useForm();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        personId,
        firstName,
        lastName,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updatePerson: {
          __typename: "Person",
          personId,
          firstName,
          lastName,
        },
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      size="large"
      className="personForm"
      onFinish={onFinish}
      initialValues={{ firstName: firstName, lastName: lastName }}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name" }]}
      >
        <Input
          placeholder="i.e. Douglas"
          onChange={(e) =>
            props.updateStateVariable("firstName", e.target.value)
          }
        />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name" }]}
      >
        <Input
          placeholder="i.e. Leung"
          onChange={(e) =>
            props.updateStateVariable("lastName", e.target.value)
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="updatePersonButton">
          Update Person
        </Button>
      </Form.Item>
      <Button onClick={props.onButtonClick} className="cancelPersonButton">
        Cancel
      </Button>
    </Form>
  );
};

export default UpdatePerson;
