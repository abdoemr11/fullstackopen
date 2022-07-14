import {useSelector} from "react-redux";

const Notification = () => {
  const notification = useSelector(a=>a.notification)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <>
      {notification
        ?

        <div style={style}>
          You voted    "{notification}"
        </div>
        :
        <div>

        </div>
      }
    </>


  )
}

export default Notification