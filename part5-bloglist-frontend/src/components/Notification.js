export const Notification = ({notification}) => {
    const errorStyle = {
        color: "red",
        border: "1px solid red",
        background: "#eee"

    }
    const SuccessStyle = {
        color: "green",
        border: "1px solid green",
        background: "#eee"
    }
    const styleType = (notification?.type ==='Success')? SuccessStyle: errorStyle;
    if (notification)
        console.log(notification)
    return(
    <>
        {
            notification
            ?<p style={styleType}>{notification.msg}</p>
            :""
        }

    </>

    );
}