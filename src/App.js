import { getAllpokemonList } from "./api/pokemon";
import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [pokemonData, setPokemondata] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllpokemonList();
      setPokemondata(data?.results);
    }
    fetchData();
  }, []);

  if ("serviceWorker" in navigator && "PushManager" in window) {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();

      const deferredPrompt = e;

      const installButton = document.createElement("button");
      installButton.textContent = "Install App";
      installButton.style.position = "fixed";
      installButton.style.top = "10px";
      installButton.style.left = "50%";
      installButton.style.transform = "translateX(-50%)";
      installButton.style.zIndex = "9999";
      installButton.style.padding = "10px 20px";
      installButton.classList.add("btn-grad");
      installButton.style.color = "red";
      installButton.style.border = "none";
      installButton.style.borderRadius = "5px";
      installButton.style.cursor = "pointer";

      installButton.addEventListener("click", () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === "accepted") {
            console.log("App installed");
          } else {
            console.log("App installation declined");
          }

          installButton.style.display = "none";
        });
      });

      document.body.appendChild(installButton);
    });
  }

  return (
    <div className="App">
      {/* <div className="container">
        <center>
          <div className="add-to">
            <button  style={{ display: showAddToHomeScreen ? 'block' : 'none' }} className="add-to-btn">Add to home screen</button>
          </div>
        </center>
      </div> */}

      <div
        style={{
          marginTop: "40px",
          justifyContent: "space-around",
          display: "flex",
          flexWrap: "wrap",
          width: "90%",
          margin: "auto",
        }}
      >
        <div style={{ padding: "5px 10px" }}>
          <p style={{ fontWeight: "bold", textTransform: "capitalize" }}></p>
        </div>
        {pokemonData.map((poke, i) => (
          <div
            style={{
              width: "400px",
              height: "330px",
              border: "2px solid #000000",
              margin: "30px 10px",
            }}
            key={i}
          >
            <img
              style={{ heigth: "300px", width: "300px" }}
              src={`https://img.pokemondb.net/artwork/large/${poke.name}.jpg`}
              alt="pokemon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
