import patientData from '../data/patients.json';
import { NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
let patients: Array<Patient> = patientData as Array<Patient>;
patients = patients.map(p => ({...p, entries: []}));
const getPatients = (): Array<Omit<Patient, 'ssn'>> => {

    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (patientEntry: NewPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newId: string = uuid() ;
    const newPatient: Patient = {
        id: newId,
        ...patientEntry
    };
    patients = patients.concat();
    return newPatient;
};
const findOnePatient = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if(!patient)
        throw new Error('No Patient with this id');
    return patient;
}
export  default{ getPatients, addPatient, findOnePatient};