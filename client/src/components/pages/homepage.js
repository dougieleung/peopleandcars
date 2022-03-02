import Title from "../layout/Title";
import AddPerson from "../forms/AddPerson";
import AddCar from "../forms/AddCar";
import People from "../lists/People";

function Homepage() {
  return (
    <>
      <Title />
      <div className="wrapper">
        <div className="Forms">
          <AddPerson />
          <AddCar />
        </div>
        <div className="CardsList">
          <People />
        </div>
      </div>
    </>
  );
}

export default Homepage;
