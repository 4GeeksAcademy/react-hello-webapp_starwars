import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions, store } = useContext(Context);
  const [inputData, setInputData] = useState("");
  const [show, setShow] = useState([]);

  return (
    <nav className="navbar navbar-dark bg-dark mb-3 p-2">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">StarWars Wiki 🪐</span>
      </Link>

      <ul className=" d-flex">
        <form className="d-flex" role="search">
          <input
            onSubmit={(e) => e.preventDefault()}
            className="form-control me-2"
            value={inputData}
            type="search"
            placeholder="Search Character or Planet"
            aria-label="Search"
            onChange={(e) => {
              setInputData(e.target.value);
              console.log(inputData);
              const searchResponse = actions.searchData(inputData);
              setShow(searchResponse);
            }}
          />
          <ul>
            {show.map((item, index) => (
              <li key={index}>
                <button
                  className="btn dropdown-item d-flex  justify-content-between align-items-center"
                  onClick={(e) => {
                    // actions.deleteFavPlanet(index);
                    console.log(item.name);
                  }}
                >
                  {item.name} <i className="fa fa-add"></i>
                </button>
              </li>
            ))}
          </ul>
        </form>
        <li className="nav-item dropdown" style={{ listStyleType: "none" }}>
          <a
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="btn btn-primary mx-1 nav-item dropdown-toggle"
          >
            My Characters
          </a>
          <ul className="dropdown-menu position-relative">
            {store.favCharacters.map((fCharacter, index) => (
              <li key={index}>
                <button
                  className="btn dropdown-item d-flex  justify-content-between align-items-center"
                  onClick={(e) => {
                    actions.deleteFavCharacter(index);
                  }}
                >
                  {fCharacter.name} <i className="fa fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li className="nav-item dropdown" style={{ listStyleType: "none" }}>
          <a
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            className="btn btn-primary mx-1 dropdown-toggle"
          >
            My Planets
          </a>
          <ul className="dropdown-menu">
            {store.favPlanets.map((fPlanet, index) => (
              <li key={index}>
                <button
                  className="btn dropdown-item d-flex  justify-content-between align-items-center"
                  onClick={(e) => {
                    actions.deleteFavPlanet(index);
                  }}
                >
                  {fPlanet.name} <i className="fa fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <Link to="/" className="mx-1">
            <button className="btn btn-primary">Main Page</button>
          </Link>
        </li>
      </ul>
      {/* */}

      {/*  */}
    </nav>
  );
};
