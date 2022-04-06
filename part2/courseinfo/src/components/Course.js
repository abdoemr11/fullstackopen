const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) =>
{
    // console.log(part);
    return( 
         <p>
        {part.name} {part.exercises}
      </p>
    )
} 

const Content = ({ parts }) => {
    // console.log(parts);
    return(
        <>
        {parts.map((part)=>
            
            <Part key={part.id}part={part}/>
        )}
      </>
    )
}


const Course = ({course}) => {

    let sum = course.parts.reduce((pre, cur) => cur.exercises+pre, 0);
    console.log(sum);
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </div>
  )
}

export default Course