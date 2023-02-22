const Persons = ({ persons, filter, handleDeletePerson }) => {
    return (
      <div>
        {persons.map(person => {
          if(person.name.includes(filter)){
            return (
              <div key={person.id}>
                <span >{person.name} {person.number}</span>
                <button onClick={()=>handleDeletePerson(person.id)}>Delete</button>
              </div>
            )
          }else{
            return null;
          }
        })}
      </div>
    )
}
  
export default Persons