import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_PERSON } from "../../queries";
import { Divider } from "antd";
import { Link } from "react-router-dom";

function Showpage() {
  const { personId } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { personId },
  });
  if (loading) return "Loading...";
  if (error) return `Error ${error.message}`;

  return (
    <>
      <div
        style={{
          padding: "20px",
          margin: "20px",
          boxShadow: "10px 10px 20px 0.5px",
          border: "2px solid white",
          width: "300px",
          borderRadius: "10px",
          backgroundColor: "#cfd6e4",
        }}
      >
        <>
          <span style={{ fontWeight: "bold" }}>Name: </span>
          {data.person.firstName} {data.person.lastName}
          <p style={{ fontWeight: "bold" }}>Cars owned:</p>
          {data.person.cars.map((car) => {
            return (
              <>
                <ul key={car.carId}>
                  <li>year: {car.year}</li>
                  <li>make: {car.make}</li>
                  <li>model: {car.model}</li>
                  <li>
                    price:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(car.price)}
                  </li>
                  <Divider />
                </ul>
              </>
            );
          })}
          <Link to="/">GO BACK HOME</Link>
        </>
      </div>
    </>
  );
}

export default Showpage;
