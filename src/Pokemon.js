import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [items, setItems] = React.useState([]);
    //const [options, setOptions] = React.useState([]);
    const [value, setValue] = React.useState('');

    React.useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then(res => res.json())
            .then((res) => setItems(res['results']));
    }, []);
    let selectedItems = [];
    let options = [];

    function setOptions()
    {
        options = items.map((item, index) => {
            if (!selectedItems.includes(index)) {
                return <option key={index} value={index}>{item.name}</option>;
            }
        });
    }
    setOptions()
    /*const options = items.map((item, index) => {
        if (!selectedItems.includes(index)) {
            return {
                value: index,
                label: item.name
            }
        }
    });*/
    function handleChange(event) {
        console.log(event.target.value);
        setValue('');
        selectedItems.push(event.target.value);

    }

    return (
        <div>
            <div className="App">
                <div className="logo"><img src={logo} className="App-logo" alt="logo" /></div>
                <h4 className="mt-4 text-info">Select a Pokemon</h4>
            </div>
            <div className="container col-6">
                <select className="form-select" value={value} onChange={handleChange}>
                    <option>Select Pokemon</option>
                    {options}
                </select>
            </div>
            <div className="App">
                <h2 className="mt-5 text-info">Selected Pokemon</h2>
            </div>
        </div>
    );
}

export default App;
