export const PersonForm = (props) => {
    const {addNewPerson,
       newName,
       handleNewNameChange,
       newNum,
       handleNewNumChange
   
     } = props;
     return (
       <form onSubmit={addNewPerson}>
           <div>
             name: <input value={newName} onChange={handleNewNameChange}/>
           </div>
           <div>
             number: 
           <input value={newNum} onChange={handleNewNumChange}/>
           </div>
           <div>
             <button type="submit" >add</button>
           </div>
         </form>
     )
   }