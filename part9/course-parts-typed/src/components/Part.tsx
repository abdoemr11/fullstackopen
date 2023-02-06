import { CoursePart } from "../types";
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
export const Part = ({part}: {part: CoursePart}): JSX.Element| null => {
    let outputElement = null;
    switch (part.type) {
        case 'normal':
            outputElement = <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <i>{part.description}</i>
            </div>
            break;
        case 'groupProject':
            outputElement = <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <i>group exercises {part.groupProjectCount}</i>
                
            </div>
            break;
        case 'submission':
            outputElement = <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <i>submit to  {part.exerciseSubmissionLink}</i>
                <i>{part.description}</i>

            </div>
            break;
        case 'special':
            outputElement = <div>
                <h2>{part.name} {part.exerciseCount}</h2>
                <i>{part.description}</i>
                <p>required skills:  {part.requirements.join(" ")}</p>
            </div>
            break;
        default:
            assertNever(part)
            break;
    }
    return outputElement;
}