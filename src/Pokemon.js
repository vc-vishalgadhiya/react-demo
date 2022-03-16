import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [items, setItems] = React.useState([]);
    const [options, setOptions] = React.useState('');
    const [value, setValue] = React.useState('');
    //const [selectedItems, setSelectedItems] = React.useState('');

    React.useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon")
            .then(res => res.json())
            .then((res) => {
                let data = res['results'];
                setItems(data);
                setOptions(data.map((item) =>
                    <option className="text-capitalize" key={item.name}>{item.name}</option>
                ));
            });
    }, []);

    let selectedOptions = [];

    function handleChange(event) {
        selectedOptions.push(event.target.value);
        console.log(selectedOptions);
        setOptions(items.map((item) => {
            if (!selectedOptions.includes(item.name)) {
                return <option className="text-capitalize" key={item.name}>{item.name}</option>
            }
        }));
        setValue('');
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
