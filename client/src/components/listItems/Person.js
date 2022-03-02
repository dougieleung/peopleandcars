import { Card, List } from "antd";

import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";

import UpdatePerson from "../forms/UpdatePerson";
import RemovePerson from "../buttons/RemovePerson";

import { Link } from "react-router-dom";

import Cars from "./Cars";

const getStyles = (props) => ({
  card: {
    width: "300px",
  },
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Person = (props) => {
  const [personId] = useState(props.personId);
  const [cars] = useState(props.cars);
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [editMode, setEditMode] = useState(false);

  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  const updateStateVariable = (variable, value) => {
    switch (variable) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {editMode ? (
        <UpdatePerson
          personId={personId}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
          updateStateVariable={updateStateVariable}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson
              personId={personId}
              firstName={firstName}
              lastName={lastName}
              cars={cars}
            />,
          ]}
          style={styles.card}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {firstName} {lastName}
          </div>
          {cars.length > 0 ? (
            <List grid={{ gutter: 20, column: 2, row: 1 }} style={styles.list}>
              {cars.map((car) => (
                <List.Item key={car.carId}>
                  <Cars
                    firstName={firstName}
                    lastName={lastName}
                    personId={car.personId}
                    carId={car.carId}
                    make={car.make}
                    model={car.model}
                    price={car.price}
                    year={car.year}
                  />
                </List.Item>
              ))}
            </List>
          ) : (
            ""
          )}
          <div style={{ alignSelf: "flex-start" }}>
            <Link to={`/people/${personId}`}>LEARN MORE</Link>
          </div>
        </Card>
      )}
    </>
  );
};

export default Person;
