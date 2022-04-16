import { useState } from 'react'
const Filter = ({filterName, handleFilterChange})=> {
  return (
    <>
    Filter Shown with: <input type="text" value={filterName} onChange={handleFilterChange}/>

    </>
    );
  
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '1231-324235235' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);


  const personsToShow = showAll? persons: persons.filter(p=>p.name.toLowerCase().includes(filterName.toLowerCase()));
  const handleNewNameChange = (event)=>{
    setNewName(event.target.value);
  }
  const handleFilterChange = (e) => {
    setFilterName(e.target.value);
    setShowAll(false);
  }
  const handleNewNumChange = (e) => {
    setNewNum(e.target.value);
  }
  const addNewPerson = (e) => {
    e.preventDefault();
    if(persons.some(p=>p.name === newName)){
      alert(`${newName} is already added to phonebook`);
      return;

    }
    const newPerson = {name : newName, number: newNum};
    setPersons(persons.concat(newPerson));
  }
  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: 
        <input value={newNum} onChange={handleNewNumChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map((p)=><li key={p.name}>{p.name} :  {p.number}</li>)}
    </div>
  )
}

export default App
