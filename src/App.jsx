import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State initialization
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);
  const [filterType, setFilterType] = useState('');
  const [filterWeakness, setFilterWeakness] = useState('');

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPokemonData(data.pokemon);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  // Filter Pokémon based on the selected criteria
  const filteredPokemon = pokemonData.filter(pokemon => {
    const matchesType = filterType ? pokemon.type.includes(filterType) : true;
    const matchesWeakness = filterWeakness ? pokemon.weaknesses.includes(filterWeakness) : true;
    const matchesName = name ? pokemon.name.includes(name) : true; //
    const matchesNum = num ? pokemon.num.includes(num) : true; //
    return matchesType && matchesWeakness && matchesName && matchesNum;
  });

  return (
    <div className="App">
      <h1>Pokémon List</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!loading && !error && (
        <div>
          <div>
            <label htmlFor="typeFilter">Filter by Type:</label>
            <select
              id="typeFilter"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Fire">Fire</option>
              <option value="Water">Water</option>
              <option value="Grass">Grass</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div>
            <label htmlFor="weaknessFilter">Filter by Weakness:</label>
            <select
              id="weaknessFilter"
              value={filterWeakness}
              onChange={(e) => setFilterWeakness(e.target.value)}
            >
              <option value="">All Weaknesses</option>
              <option value="Water">Water</option>
              <option value="Electric">Electric</option>
              <option value="Grass">Grass</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div>
            <label htmlFor="nameFilter">Filter by Name:</label>
            <input
              id = "nameFilter"
              type = "text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Pokémon name..."
            />
          </div>

          <div>
            <label htmlFor="numFilter">Filter by Number:</label>
            <input
              id = "numFilter"
              type = "integer"
              onChange={(e) => setNum(e.target.value)}
              placeholder="Enter Pokémon index..."
            />
          </div>

          <ul id = "Kanto">
            {filteredPokemon.map((pokemon) => (
              <li key={pokemon.id} class = "pokemon">
                <strong>{pokemon.name}</strong> - Type: {pokemon.type.join(', ')} - Weaknesses: {pokemon.weaknesses.join(', ')} - #: {pokemon.num}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;