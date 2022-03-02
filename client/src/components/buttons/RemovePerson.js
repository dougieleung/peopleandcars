import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";

import { filter } from "lodash";

import { GET_PEOPLE_CARS, REMOVE_PERSON } from "../../queries";

const RemovePerson = ({ personId, firstName, lastName }) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(proxy, { data: { removePerson } }) {
      const { people } = proxy.readQuery({ query: GET_PEOPLE_CARS });
      proxy.writeQuery({
        query: GET_PEOPLE_CARS,
        data: {
          people: filter(people, (o) => {
            return o.personId !== removePerson.personId;
          }),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this person?");
    if (result) {
      removePerson({
        variables: {
          personId,
        },
        optimisticResponse: {
          __typename: "Mutation",
          removePerson: {
            __typename: "Person",
            personId,
            firstName,
            lastName,
          },
        },
      });
    }
  };
  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default RemovePerson;
