import FlighList from "../FlightList";
import FlightSearch from "../FlightSearch";
import ".../../../../my-app/src/scss/home.scss";

const Home = () => {
  return (
    <div className="home_main_wrapper">
      <div className="home_container">
        <div className="home_left_wrapper">
          <h1>Flight Search </h1>
          <FlightSearch />
        </div>
        <div className="home_right_wrapper">
          <FlighList />
        </div>
      </div>
    </div>
  );
};

export default Home;
