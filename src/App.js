import { getAllpokemonList } from "./api/pokemon";
import { useState, useEffect } from "react";
import './App.css'
function App() {
  const [showAddToHomeScreen, setShowAddToHomeScreen] = useState(true);
  const [pokemonData, setPokemondata] = useState([]);
  let deferredPrompt;
  useEffect(() => {
    async function fetchData() {
      const data = await getAllpokemonList();
      setPokemondata(data?.results);
    }

    fetchData();


    // Event listener for beforeinstallprompt
    const beforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show the button or perform any other UI update
      document.querySelector('.add-to').style.display = 'block';
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPrompt);
    };
  }, []);

  const addToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
        // Update state to hide the button
        setShowAddToHomeScreen(false);
      });
    }
  };
  
  return (
    <div className="App">
      <div className="container">
        <center>
          <div className="add-to">
            <button onClick={addToHomeScreen} style={{ display: showAddToHomeScreen ? 'block' : 'none' }} className="add-to-btn">Add to home screen</button>
          </div>
        </center>
      </div>


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
