export const MyButton = ({ onClick, btnText, className }) => (
  <button onClick={onClick}
    className={` bg-mainBlue rounded-2xl px-2 py-2 text-white cursor-pointer ${className}`}
  >{btnText}</button>
)