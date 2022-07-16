import {connect, useDispatch} from "react-redux";
import {updateFilter} from "../reducers/filterReducer";

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    const value = event.target.value;
    props.updateFilter(value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
// const mapDispatchtoProps = (dispatch) =
const connectedFilter = connect(null, {updateFilter})(Filter)
export default connectedFilter