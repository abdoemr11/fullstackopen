import '../index.css';
export const Notification = ({notification})=>{
    let renderdContent = "";
    if (notification === undefined)
        console.log('There is no notification');
    else if(notification.type === "Success")
    {
        
        renderdContent = <div className='successNotifi'>{notification.msg}</div>;
        console.log(renderdContent);
    }
    else if (notification.type === "Error")
        renderdContent = <div className='errorNotifi'>{notification.msg}</div>;

    return renderdContent;
}