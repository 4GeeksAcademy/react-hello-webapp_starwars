import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";

let PlanetCard = ({ planet }) => {
  const { actions, store } = useContext(Context);

  return (
    <div
      className="p-0 card text-light bg-dark col-3"
      style={{ width: "400px", maxWidth: "800px" }}
    >
      <div className="row g-0">
        <div className="col-md-7">
          <img
            style={{ width: "100%" }}
            src={
              planet.uid == 1
                ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/"
                : "https://starwars-visualguide.com/assets/img/planets/" +
                  planet.uid +
                  ".jpg"
            }
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-md-5">
          <div className="card-body">
            <h5 className="card-title">{planet.name}</h5>

            <button
              type="button"
              onClick={() => {
                actions.setFavPlanets(planet);
              }}
              className="btn btn-primary"
            >
              <i className="fa fa-star"></i>
            </button>
            <Link
              to={"/details/" + planet.name}
              type="button"
              className="btn btn-primary mx-2"
            >
              <i className="fa fa-eye"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetCard;
