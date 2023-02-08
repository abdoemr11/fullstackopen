import { Diagnose, EntryWithoutId, Gender, NewPatient } from "./types";

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
const parseString = (value: unknown, type: string): string => {
    if(!value || !isString(value) )
        throw new Error('Error validating ' + type);
    return value;
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
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newPatient;
};
export const validateDiagnoses = (object: any): Diagnose => {
    let newDiag:Diagnose =  {
        code: parseString(object.code, 'Diagnose Code'),
        name: parseString(object.name, 'Diagnose name'),
    };
    if(object.latin)
        newDiag = {
            ...newDiag, 
            latin: parseString(object.latin, 'Diagnose Latin'),

        };
    
    return newDiag;
};
const doesContainFields = (object: unknown, fields: Array<string>): boolean => {
    let result = true;
    fields.forEach(f => {
        if(!Object.prototype.hasOwnProperty.call(object, f)) {
            result = false;
            console.log('This field is invalied ', f);
            
        }
    });
    return result;
};
const isValidateEntry =(entry: unknown): entry is EntryWithoutId => {
    if(!entry)
        throw new Error('Invalid entry of the entries array');
    const baseEntriesFields = ['description','date','specialist', 'type'];
    const healthCheckEntryFields = ['healthCheckRating'];
    const hospitalEntryFields = ['discharge'];
    const occupationalHealthcareFields = ['employerName'];

    return doesContainFields(entry, baseEntriesFields) &&
        (doesContainFields(entry,healthCheckEntryFields) || doesContainFields(entry,hospitalEntryFields)
        ||doesContainFields(entry, occupationalHealthcareFields));

};
export const validateEntries= (object: unknown): Array<EntryWithoutId> => {
    
    if(!Array.isArray(object))
        throw new Error('not a valid entries array');
    let resultEntries:Array<EntryWithoutId> = [];
    object.forEach(entry => {
        if(isValidateEntry(entry)) {
            resultEntries = resultEntries.concat(entry);
            
        } else {
            throw new Error('Invalid entry');
        }
    });
    return resultEntries;
};