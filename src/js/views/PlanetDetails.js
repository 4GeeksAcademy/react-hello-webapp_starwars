import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Details = () => {
  const { actions, store } = useContext(Context);

  const params = useParams();
  const [planet] = useState(store.planets[params.id - 1]);
  const [planetDetails, setPlanetDetails] = useState({});

  useEffect(() => {
    let data = actions
      .getPlanetByID(params.id)
      .then((dataProcess) => setPlanetDetails(dataProcess));
  }, []);

  return (
    <div className="card mb-3 container-fluid">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              planet.uid == 1
                ? "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/"
                : "https://starwars-visualguide.com/assets/img/planets/" +
                  planet.uid +
                  ".jpg"
            }
            className="img-fluid rounded-start w-100"
            alt={planet.name}
          />
        </div>
        <div className="col-md-8 d-flex flex-column">
          <div className="card-body ">
            <h1 className="card-title">{planet.name}</h1>
            <h2 className="card-text">{planetDetails.description}</h2>
          </div>
          <div className="container-fluid">
            <div className="row col-md-12 text-center p-4 mb-0">
              <div className="col-3">
                <h5>Diameter</h5> {planetDetails.diameter}
              </div>
              <div className="col-3">
                <h5>Orbital Period</h5> {planetDetails.orbital_period}
              </div>
              <div className="col-3">
                <h5>Gravity</h5> {planetDetails.gravity}
              </div>
              <div className="col-3">
                <h5>Population</h5> {planetDetails.population}
              </div>
            </div>
            <div className="row col-md-12 text-center p-4 mb-2 align-self-baseline">
              <div className="col-4">
                <h5>Climate</h5> {planetDetails.climate}
              </div>
              <div className="col-4">
                <h5>Terrain</h5> {planetDetails.terrain}
              </div>
              <div className="col-4">
                <h5>Surface Water</h5> {planetDetails.surface_water}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
