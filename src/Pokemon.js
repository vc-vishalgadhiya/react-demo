import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Pokemon() {
    const [items, setItems] = React.useState([]);
    const [selectedOptions, setSelectedOptions] = React.useState([]);
    const [squads, setSquads] = React.useState([]);
    const [selectedPokemon, setSelectedPokemon] = React.useState({
        image: '',
        name: '',
        stats: []
    });

    React.useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then(res => res.json())
            .then((res) => setItems(res['results']));
    }, []);

    React.useEffect(() => {
        setItems(items.filter(i => !selectedOptions.includes(i.name)));
    }, [selectedOptions]);

    function handleChange(event) {
        if(squads.length === 6) {
            return;
        }
        let value = event.target.value;
        setSelectedOptions(prevState => [...prevState, value]);
        fetch("https://pokeapi.co/api/v2/pokemon/" + value)
            .then(res => res.json())
            .then((res) => {
                res.color = Math.floor(Math.random()*16777215).toString(16);
                setSquads(prevState => [...prevState, res])
                setSelectedPokemon({
                    image: res.sprites.back_default,
                    name: res.name,
                    stats: res.stats
                })
            });
    }

    function handleRemove(name) {
        setSquads(squads.filter(squad => squad.name !== name));
    }

    return (
        <div className="p-2">
            <div className="App">
                <div className="logo"><img src={logo} className="App-logo" alt="logo" /></div>
                <h4 className="mt-4 text-info">Select a Pokemon</h4>
            </div>
            <div className="container col-6">
                <select className="form-select" onChange={handleChange}>
                    <option>Select Pokemon</option>
                    {items.map((item) =>
                        <option className="text-capitalize" key={item.name}>{item.name}</option>
                    )}
                </select>
            </div>
            <div className="App pb-5">
                <h2 className="mt-5 text-info">Selected Pokemon</h2>
                <img src={selectedPokemon.image}  alt=""/>
                <h4>{selectedPokemon.name}</h4>
                <div className="container col-8">
                    <div className="row justify-content-center">
                        {selectedPokemon.stats.map((stat) =>
                            <div key={stat.stat.name} className="col-3 p-2 m-1 bg-secondary text-uppercase">
                                {stat.base_stat} <br/> {stat.stat.name}
                            </div>
                        )}
                    </div>
                </div>
                {squads.length === 6 && <div className="mt-5 col-8 justify-content-center container p-1 border border-warning">Squad is Full</div>}
                <h2 className="mt-5 text-info">Selected Squad</h2>
                <div className="container">
                    <div className="row justify-content-center">
                        {squads.map((squad) =>
                            <div key={squad.name} className="col-2 m-1 rounded" style={{width: "200px", backgroundColor: "#" + squad.color}}>
                                <div className="float-end pt-1"><a href="#" onClick={() => handleRemove(squad.name)}  className="text-decoration-none text-danger">X</a></div>
                                <img className="pt-5" src={squad.sprites.back_default} alt=""/>
                                <div className="text-capitalize">{squad.name}</div>
                                <div className="text-capitalize pb-5 mb-5">{squad.moves[0].move.name}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pokemon;
