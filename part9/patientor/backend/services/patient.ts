import patientData from '../data/patients.json';
import { NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
let patients: Array<Patient> = patientData as Array<Patient>;

const getPatients = (): Array<Omit<Patient, 'ssn'>> => {

    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (patientEntry: NewPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newId: string = uuid() as string;
    const newPatient: Patient = {
        id: newId,
        ...patientEntry
    };
    patients = patients.concat();
    return newPatient;
};
export  { getPatients, addPatient};