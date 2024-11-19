import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import CharacterCard from "../component/CharacterCard.js";
import PlanetCard from "../component/PlanetCard.js";

import "../../styles/home.css";

export const Home = () => {
  const { actions, store } = useContext(Context);

  return (
    <>
      <div
        className="d-flex flex-row container overflow-auto my-3"
        style={{ width: "80%" }}
      >
        {store.characters.map((item, index) => {
          return <CharacterCard character={item} key={index} />;
        })}
      </div>
      <div
        className="d-flex flex-row container overflow-auto my-3"
        style={{ width: "80%" }}
      >
        {store.planets.map((item, index) => {
          return <PlanetCard planet={item} key={index} />;
        })}
      </div>
    </>
  );
};
