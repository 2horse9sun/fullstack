import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const content=event.target.value;
        props.setFilter(content)
    }
  
    return (
      <div style={{marginBottom: 10}}>
        filter <input name="filter" onChange={handleChange} />
      </div>
    )
}

const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }

const mapDispatchToProps = {
    setFilter
}

  
export default connect(mapStateToProps,mapDispatchToProps)(Filter)