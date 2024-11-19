import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Details = () => {
  const { actions, store } = useContext(Context);

  const params = useParams();
  const [character] = useState(store.characters[params.id - 1]);
  const [characterDetails, setCharacterDetails] = useState({});

  useEffect(() => {
    let data = actions
      .getCharacterByID(params.id)
      .then((dataProcess) => setCharacterDetails(dataProcess));
  }, []);

  return (
    <div className="card mb-3 container-fluid">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={
              "https://starwars-visualguide.com/assets/img/characters/" +
              // (Number(character.uid) - 1) +
              character.uid +
              ".jpg"
            }
            className="img-fluid rounded-start"
            alt={character.name}
          />
        </div>
        <div className="col-md-8 d-flex flex-column">
          <div className="card-body ">
            <h1 className="card-title">{character.name}</h1>
            <h2 className="card-text">{characterDetails.description}</h2>
          </div>
          <div className="container-fluid">
            <div className="row col-md-12 text-center p-4 mb-0">
              <div className="col-3">
                <h5>Height</h5> {characterDetails.height}
              </div>
              <div className="col-3">
                <h5>Mass</h5> {characterDetails.mass}
              </div>
              <div className="col-3">
                <h5>Hair color</h5> {characterDetails.hair_color}
              </div>
              <div className="col-3">
                <h5>Skin color</h5> {characterDetails.skin_color}
              </div>
            </div>
            <div className="row col-md-12 text-center p-4 mb-2 align-self-baseline">
              <div className="col-3">
                <h5>Birth year</h5> {characterDetails.birth_year}
              </div>
              <div className="col-3">
                <h5>Gender</h5> {characterDetails.gender}
              </div>
              <div className="col-6">
                <h5>Homeworld</h5> {characterDetails.homeworld}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
