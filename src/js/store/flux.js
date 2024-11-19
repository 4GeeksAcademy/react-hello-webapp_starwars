const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      contacts: [],
      characters: [],
      planets: [],
      favCharacters: [],
      favPlanets: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => {
        /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      getCharacters: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "people");
          if (resp.status === 200) {
            const data = await resp.json();
            setStore({ characters: data.results });
            return true;
          } else {
            console.log("status error: " + resp.status);
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      getCharacterByID: async (id) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "people/" + id);
          if (resp.status === 200) {
            const data = await resp.json();
            const retorno = await data.result;
            console.log(retorno);
            return { ...retorno.properties, description: retorno.description };
          } else {
            console.log("status error: " + resp.status);
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      getPlanetByID: async (id) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "planets/" + id);
          if (resp.status === 200) {
            const data = await resp.json();
            const retorno = await data.result;
            console.log(retorno);
            return { ...retorno.properties, description: retorno.description };
          } else {
            console.log("status error: " + resp.status);
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      getPlanets: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "planets");
          if (resp.status === 200) {
            const data = await resp.json();
            console.log(data.results);
            setStore({ planets: data.results });
            return true;
          } else {
            console.log("status error: " + resp.status);
            return false;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      },
      setFavCharacters: (character) => {
        if (!getStore().favCharacters.includes(character)) {
          setStore({ favCharacters: [...getStore().favCharacters, character] });
          return true;
        }
        return false;
      },
      setFavPlanets: (planets) => {
        if (!getStore().favPlanets.includes(planets)) {
          setStore({ favPlanets: [...getStore().favPlanets, planets] });
          return true;
        }
        return false;
      },
      deleteFavCharacter: (id) => {
        let newArr = getStore().favCharacters.filter(
          (char, index) => index != id
        );

        setStore({ favCharacters: newArr });
        return true;
      },
      deleteFavPlanet: (id) => {
        let newArr = getStore().favPlanets.filter((char, index) => index != id);

        setStore({ favPlanets: newArr });
        return true;
      },
      createUser: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "jgutierrez/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          });
          if (resp.status === 201) {
            getActions().getContacts();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      deleteContact: async (id) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "jgutierrez/contacts/" + id,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );

          if (resp.status === 204) {
            getActions().getContacts();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      createContact: async (newContact) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "jgutierrez/contacts",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newContact),
            }
          );
          if (resp.status === 201) {
            getActions().getContacts();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      editContact: async (newContact) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "jgutierrez/contacts/" + newContact.id,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newContact),
            }
          );
          if (resp.status === 200) {
            getActions().getContacts();
            return true;
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      },
      searchData: (inputData) => {
        let newArr = [...getStore().characters, ...getStore().planets];
        let aver = newArr.filter((item, index) =>
          item.name.toLowerCase().includes(inputData.toLowerCase())
        );
        console.log(aver);
        return aver;
      },
    },
  };
};

export default getState;
