import { useQuery } from "@apollo/client";
import { List } from "antd";
import { GET_PEOPLE_CARS } from "../../queries";
import Person from "../listItems/Person";

const getStyles = () => ({
  personlist: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    flex: 0,
  },
});

const People = () => {
  const styles = getStyles();

  const { loading, error, data } = useQuery(GET_PEOPLE_CARS);
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <List style={styles.personlist}>
      {data.people.map(({ personId, firstName, lastName, cars }) => (
        <List.Item key={personId}>
          <Person
            key={personId}
            personId={personId}
            firstName={firstName}
            lastName={lastName}
            cars={cars}
            style={styles.card}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default People;
