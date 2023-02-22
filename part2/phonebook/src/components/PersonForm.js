const PersonForm = ({ createPersonNumber, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
      <form onSubmit={createPersonNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
  
export default PersonForm