import express from 'express';
import { addPatient, getPatients } from '../services/patient';
import { NewPatient } from '../types';
import { toNewPatientEntry } from '../util';


const patientRouter = express.Router();
patientRouter.get('/', (_req, res) => {
    console.log('getting all patients');
    
    return res.json((getPatients()));
});
patientRouter.post('/', (req, res)=> {
    try {
    const newPatient:NewPatient = toNewPatientEntry(req.body);
    const addedPatient = addPatient(newPatient);
    res.json(addedPatient);
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
})

export default patientRouter;