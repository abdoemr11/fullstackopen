export const Filter = ({filterName, handleFilterChange})=> {
    return (
      <>
      Filter Shown with: <input type="text" value={filterName} onChange={handleFilterChange}/>
  
      </>
      );
    
  }