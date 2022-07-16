import {useSelector} from "react-redux";
import {connect} from "react-redux";

const Notification = (props) => {
  // const notification = useSelector(a=>a.notification)
  console.log(props)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {props.notification
        ?

        <div style={style}>
          You voted    "{props.notification}"
        </div>
        :
        <div>

        </div>
      }
    </>


  )
}
const mapStateToProps = (state) => {
  return {notification: state.notification}
}
const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification