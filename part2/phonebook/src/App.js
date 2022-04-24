import { useState, useEffect } from 'react';
import personService from './services/persons' ;
import {Filter} from './components/Filter';
import { Persons } from './components/Persons';
import {PersonForm} from './components/PersonForm';
import {Notification} from './components/Notification';
const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filterName, setFilterName] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotfication] = useState({});
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
  /**
   * 
   * handle input controlled elements 
   */
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
  /**
   * 
   * add new person or update his informatino if not exist
   */
  const addNewPerson = (e) => {
    e.preventDefault();
    let update = false;
    const alreadyPerson = persons.filter(p=>p.name === newName);
    if(alreadyPerson.length>0){
      // alert(`${newName} is already added to phonebook`);
      if(alreadyPerson[0].number === newNum) {
        alert(`${newName} is already added to phonebook with ${newNum}`);
        return;

      }
      if(!window.confirm(`${newName} is already added to phonebook, replace the old number with the new One?`))
        return;
      update = true;


    }
    if(update){
      const newPersonInfo = {...alreadyPerson[0], number:newNum};
      console.log(newPersonInfo);
      personService
      .update(newPersonInfo)
      .then(nPerson => {
        setPersons(persons.map(person=> person.id === nPerson.id?nPerson:person));
        setNewName('');
        setNewNum('');
        setNotfication({type: 'Success', msg: `updated ${nPerson.name} information successfully`});
        setTimeout(()=>setNotfication({}), 2000);
      })
      .catch(()=>{
        setNotfication({type: 'Error', msg: `Information of  ${newPersonInfo.name} has already been removed from the server`});
        setTimeout(()=>setNotfication({}), 2000);
        setPersons(persons.filter(p=> p.id !== newPersonInfo.id));
      })
    }
    else {
      const newPerson = {name : newName, number: newNum, id: persons.length+1};

      personService
      .add(newPerson)
      .then(nPerson => {
        setPersons(persons.concat(nPerson));
        setNewName('');
        setNewNum('');
        setNotfication({type: 'Success', msg: `added ${nPerson.name} successfully`});
        setTimeout(()=>setNotfication({}), 2000);
      }).catch(error=>{
        console.log(error.response.data.error)
        setNotfication({type: 'Error', msg: error.response.data.error});
        setTimeout(()=>setNotfication({}), 2000);
      })
    }

    
  }
  /**
   * 
   */
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
      <Notification notification={notification}/>
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
