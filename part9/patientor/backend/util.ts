import { Gender, NewPatient } from "./types";

// interface UnVerifiedData {
//     name: unknown,
//     dateOfBirth: unknown,
//     ssn: unknown,
//     gender: unknown,
//     occupation: unknown
// }
const isString = (str: unknown) :str is string =>{
    return typeof str === 'string' || str instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (g: any): g is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(g);
};
const parseName = (name: unknown): string => {
    if(!name || !isString(name) )
        throw new Error('Incorrect or missing Value');
    return name;
};
const parseSsn = (ssn: unknown): string => {
    //I think it's sufficient in this case
    return parseName(ssn);
};
  
const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender))
        throw new Error('Incorrect or missing gender ' + gender);
    return gender;
};
const parseOccupation = (occup : unknown): string => {
    return parseName(occup);
};
export const toNewPatientEntry = (object: any):NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation)
    };
    return newPatient;
};
