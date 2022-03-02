import { Card } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/RemoveCar";

const getStyles = (props) => ({
  miniCard: {
    width: "250px",
    margin: "10px",
  },
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = (props) => {
  const floatprice = parseFloat(props.price);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(floatprice);

  const [personId] = useState(props.personId);
  const [carId] = useState(props.carId);
  const [firstName] = useState(props.firstName);
  const [lastName] = useState(props.lastName);
  const [make, setMake] = useState(props.make);
  const [year, setYear] = useState(props.year);
  const [model, setModel] = useState(props.model);
  const [price, setPrice] = useState(formattedPrice);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "make":
        setMake(value);
        break;
      case "year":
        setYear(value);
        break;
      case "model":
        setModel(value);
        break;
      case "price":
        const floatprice = parseFloat(value);

        const formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(floatprice);
        setPrice(formattedPrice);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {editMode ? (
        <UpdateCar
          personId={personId}
          carId={carId}
          make={make}
          model={model}
          year={year}
          price={price}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          key={carId}
          type="inner"
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar
              personId={personId}
              carId={carId}
              year={year}
              make={make}
              model={model}
              price={price}
            />,
          ]}
          style={styles.miniCard}
        >
          <div>
            {firstName} {lastName}
          </div>
          <div>
            {year} {make} {model} {price}
          </div>
        </Card>
      )}
    </>
  );
};

export default Cars;
