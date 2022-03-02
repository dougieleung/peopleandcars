import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [personId] = useState(props.personId);
  const [carId] = useState(props.carId);
  const [make] = useState(props.make);
  const [model] = useState(props.model);
  const [year] = useState(props.year);
  const [price] = useState(props.price);
  const [form] = Form.useForm();
  const [updateCar] = useMutation(UPDATE_CAR);

  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { make, model, year, price } = values;

    updateCar({
      variables: {
        personId,
        carId,
        year,
        make,
        model,
        price,
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateCar: {
          __typename: "Car",
          personId,
          carId,
          year,
          make,
          model,
          price,
        },
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      size="large"
      className="carForm"
      onFinish={onFinish}
      initialValues={{ make: make, model: model, year: year, price: price }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "flex-end",
        gap: 15,
      }}
    >
      <Form.Item
        label="make"
        name="make"
        rules={[{ required: true, message: "Please input the car's Make" }]}
      >
        <Input
          placeholder="i.e. Volkswagen"
          onChange={(e) => props.updateStateVariable("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="model"
        name="model"
        rules={[{ required: true, message: "Please input the car's Model" }]}
      >
        <Input
          placeholder="i.e. Passat"
          onChange={(e) => props.updateStateVariable("model", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="year"
        name="year"
        rules={[{ required: true, message: "Please input the car's Year" }]}
      >
        <Input
          placeholder="20xx"
          onChange={(e) => props.updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="price"
        name="price"
        rules={[{ required: true, message: "Please input the car's price" }]}
      >
        <Input
          placeholder="1xxxxx"
          onChange={(e) => props.updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="updateCarButton">
          Update Car
        </Button>
      </Form.Item>
      <Button onClick={props.onButtonClick} className="cancelCarButton">
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
