import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, hideNotification } from '../reducers/notificationReducer'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    let anecdotes=[...props.anecdotes].sort((a, b) => {
        return b.votes - a.votes
      }
    )
    const filter = props.filter
    const vote =async (id) => {
      const anecdote = anecdotes.find(a => a.id === id)
      props.voteAnecdote(id);
      props.setNotification(`You voted '${anecdote.content}'`,5)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
            {
                if(anecdote.content.includes(filter)){
                    return(
                        <div key={anecdote.id}>
                            <div>
                                {anecdote.content}
                            </div>
                            <div>
                                has {anecdote.votes}
                                <button style={{marginLeft: 10}} onClick={() => vote(anecdote.id)}>vote</button>
                            </div>
                        </div>
                    )
                }
                return null
            }

            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
}

const mapDispatchToProps = {
    addVote,
    setNotification,
    hideNotification,
    voteAnecdote
}


export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)