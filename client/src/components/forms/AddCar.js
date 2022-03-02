import { useQuery, useMutation } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_PEOPLE_CARS } from "../../queries";

const { Option } = Select;

const AddCar = () => {
  const [carId] = useState(uuidv4());

  const [addCar] = useMutation(ADD_CAR);
  const [form] = Form.useForm();
  const [, forcedUpdate] = useState();

  useEffect(() => {
    forcedUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE_CARS);
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  const onFinish = (values) => {
    const { personId, year, make, model, price } = values;

    addCar({
      variables: {
        personId,
        carId,
        make,
        model,
        year,
        price
      },
      optimisticResponse: {
        __typename: "Mutation",
        addCar: {
          __typename: "Car",
          personId,
          carId,
          make,
          model,
          year,
          price
        },
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_PEOPLE_CARS });
        proxy.writeQuery({
          query: GET_PEOPLE_CARS,
          data: {
            ...data,
            people: data.people.map((person) => {
              if (person.personId === addCar.personId) {
                return { ...person, cars: [...person.cars, addCar] };
              }
              return person;
            })
          }
        });
      }
    });
  };

  return (
    <div className="carFormContainer">
      <Form
        form={form}
        name="add-car-form"
        layout="inline"
        size="large"
        className="addCarForm"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please enter year" }]}
        >
          <Input placeholder="20xx" />
        </Form.Item>
        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Please input make" }]}
        >
          <Input placeholder="i.e. Audi" />
        </Form.Item>
        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please input model" }]}
        >
          <Input placeholder="i.e. Q5" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input price" }]}
        >
          <Input placeholder="0.00" />
        </Form.Item>
        <Form.Item
          label="Person ID"
          name="personId"
          rules={[{ required: true, message: "Please input person ID" }]}
        >
          <Select style={{ width: "150px" }}>
            {data.people.map((person) => (
              <Option key={person.personId} value={person.personId}>
                {person.firstName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button type="primary" htmlType="submit" className="addCarButton">
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
