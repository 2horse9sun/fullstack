const Header = ({ courseName }) => {
    return (
        <h1>{courseName}</h1>
    )
} 

const Total = ({ sum }) => {
    return (
        <h3 style={{fontWeight:"bold"}}>Number of exercises {sum}</h3>
    )
} 

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}


const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}    
        </div>
    )
}

const Course= ({ course }) => {
    const sum = course.parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
      <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total sum={sum} />
      </>
    )
  }

  export default Course;