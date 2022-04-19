import { useState, useEffect } from 'react';
import personService from './services/persons' ;
const Filter = ({filterName, handleFilterChange})=> {
  return (
    <>
    Filter Shown with: <input type="text" value={filterName} onChange={handleFilterChange}/>

    </>
    );
  
}
const Persons = ({persons, handleDelete}) => {
  return <div>
    {persons.map((p)=>
    <li key={p.name}>
      {p.name} :  {p.number}
      <button onClick={()=>handleDelete(p.id)}>delete</button>
    </li>)
    }  
  </div>

}
const PersonForm = (props) => {
 const {addNewPerson,
    newName,
    handleNewNameChange,
    newNum,
    handleNewNumChange

  } = props;
  return (
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
  )
}
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);
  //fetching the data from the server using effect hook
  const hook = () => {
    console.log('axiosing ');
    personService
      .getAll()
      .then((initialPersons)=>{
        setPersons(initialPersons);
      })
  }
  useEffect(hook, []);
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
    const newPerson = {name : newName, number: newNum, id: persons.length+1};
    personService
      .add(newPerson)
      .then(nPerson => {
        setPersons(persons.concat(nPerson));
        setNewName('');
        setNewNum('');
      })
    
  }
  const deletePerson = (personId)=>{
    if(!window.confirm(`Delete ${persons.filter(p=>p.id ===personId)[0].name}`))
      return;
    personService
      .remove(personId)
      .then(deletedPerson=>{
        setPersons(persons.filter(p=> p.id !== personId))
      })
  }
  return (
    <div>

      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}/>
      <PersonForm 
        addNewPerson={addNewPerson}
        newName = {newName}
        handleNewNameChange = {handleNewNameChange}
        newNum = {newNum}
        handleNewNumChange = {handleNewNumChange}

      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App
