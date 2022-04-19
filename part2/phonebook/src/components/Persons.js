export const Persons = ({persons, handleDelete}) => {
    return <div>
      {persons.map((p)=>
      <li key={p.id}>
        {p.name} :  {p.number}
        <button onClick={()=>handleDelete(p.id)}>delete</button>
      </li>)
      }  
    </div>
  
  }