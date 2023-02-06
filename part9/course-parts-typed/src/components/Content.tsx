import { CoursePart } from "../types"
import { Part } from "./Part"


export const Content = ({parts}: {parts: Array<CoursePart>}) => {

    return (
        <div>
        {   
        parts.map( part =>
            <Part key={part.name} part={part}/>
        )}
        </div>

    )
}