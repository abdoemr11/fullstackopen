import Avatar from 'boring-avatars'
export const  UserAvatar = (props) => {
  console.log(props.user)
  if(props?.user?.name)
    return (
      <div className="flex flex-col justify-center items-center">
        <Avatar name={props.user.name} variant="beam" />
        {props.user.name}
      </div>
    )
  else
    return (
      <div className="flex flex-col justify-center items-center">
        <Avatar name={'error'} variant="pixel"
          colors={['#92A1C6', '#146A7C', '#FF0000', '#C271B4', '#C20D90']}
        />
        {<del>no user</del>}
      </div>
    )
}