import "./appBaner.scss";
import avengers from "../../resource/img/Avengers.png";
import avengersLogo from "../../resource/img/Avengers_logo.png";

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={avengers} alt="Avengers" />
      <div className="app__banner-text">
        New comics every week!
        <br />
        stayTuned
      </div>
      <img src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default AppBanner;
