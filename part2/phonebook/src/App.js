import { useState ,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {create,getAll,deletePerson,updatePerson} from './services/phonebookService.js';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange=(event)=>{
    setFilter(event.target.value);
  }

  const handleDelete=(id)=>{
    deletePerson(id)
    .then(response=>{
      setMessage(`${persons.find(person=>person.id===id).name} has already been deleted`)
      setMessageType('success')
      setTimeout(()=>{
        setMessage(null)
        setMessageType(null)
      },5000)
      setPersons(persons.filter(person=>person.id!==id))
    }).catch(error=>{
      setMessage(`Information of ${persons.find(person=>person.id===id).name} has already been removed from server`)
      setMessageType('error')
      setTimeout(()=>{
        setMessage(null)
        setMessageType(null)
      },5000)
    })
  }

  const checkIfNameExists = (name) => {
    return persons.some(person => person.name === name)
  }

  const createPersonNumber = (event) => {
    event.preventDefault();
    if(checkIfNameExists(newName)) {
      const confirmed=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(confirmed){
        const newPerson=persons.find(person=>person.name===newName);
        const personToBeChanged={...newPerson,number:newNumber};
        updatePerson(newPerson.id,personToBeChanged).then(response=>{
          setPersons(persons.map(person=>person.id!==response.id?person:response))
          setMessage(`${newPerson.name}'s phonenumber has been changed to ${newNumber}`)
          setMessageType('success');
          setTimeout(() => {
            setMessage(null)
            setMessageType(null);
          }, 5000)
        }).catch(error=>{
          setMessage(`Information of ${newPerson.name} has already been removed from server`)
          setMessageType('error');
          setTimeout(() => {
            setMessage(null)
            setMessageType(null);
          }, 5000)
        })
      }
      setNewName('')
      setNewNumber('')
    }else{
      const personNumber = {
        name: newName,
        number: newNumber,
      }
      create(personNumber).then(responseData=>{
        setMessage(`Added ${responseData.name}`)
        setMessageType('success');
        setTimeout(() => {
          setMessage(null)
          setMessageType(null);
        }, 5000)
        setPersons(persons.concat(responseData))
        setNewName('')
        setNewNumber('')
      }).catch(error=>{
        setMessage(error.response.data.error)
        setMessageType('error');
        setTimeout(() => {
          setMessage(null)
          setMessageType(null);
        }, 5000)
      })
    }
  }

  useEffect(() => {
    getAll().then(responseData=>{
      setPersons(responseData)
    });
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} createPersonNumber={createPersonNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDelete}/>
    </div>
  )
}

export default App