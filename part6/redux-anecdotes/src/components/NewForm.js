import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'


const NewForm = (props) => {

    const createNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`You created '${content}'`,5)
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
            <div><input name="anecdote"/></div>
            <button style={{marginTop: 10}} >create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    setNotification,
    createAnecdote
}

export default connect(null, mapDispatchToProps)(NewForm)