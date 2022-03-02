import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import { filter } from "lodash";

import { GET_PEOPLE_CARS, REMOVE_CAR } from "../../queries";

const RemoveCar = ({ personId, carId, year, make, model, price }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(proxy, { data: { removeCar } }) {
      const data = proxy.readQuery({ query: GET_PEOPLE_CARS });
      proxy.writeQuery({
        query: GET_PEOPLE_CARS,
        data: {
          people: data.people.map((person) => {
            if (person.personId === removeCar.personId) {
              const newCarArray = filter(person.cars, (o) => {
                return o.carId !== removeCar.carId;
              });

              return {
                ...person,
                cars: newCarArray,
              };
            }

            return person;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this car?");
    if (result) {
      removeCar({
        variables: {
          personId,
          carId,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removeCar: {
            __typename: "Car",
            personId,
            carId,
            year,
            make,
            model,
            price
          },
        }
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "blue" }}
    />
  );
};

export default RemoveCar;
