import express from 'express';
import patientService from '../services/patient';
import { Entry, EntryWithoutId, NewPatient, Patient } from '../types';
import { toNewPatientEntry, validateEntries } from '../util';


const patientRouter = express.Router();
patientRouter.get('/', (_req, res) => {
    console.log('getting all patients');
    
    return res.json((patientService.getPatients()));
});
patientRouter.get('/:id', (req, res)=>{
    try {
        const patientId:string = req.params.id;
        const patient: Patient = patientService.findOnePatient(patientId);
        res.json(patient);
        //this suggest installing error handles middleware
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
    
});
patientRouter.post('/', (req, res)=> {
    try {
    const newPatient:NewPatient = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
    
});

patientRouter.post('/:id/entries', (req, res) => {
    try {
        const patientId:string = req.params.id;
        const newEntries: Array<EntryWithoutId> = validateEntries(req.body);
        const addedEntries: Array<Entry> = patientService.addEntryToPatient(patientId,newEntries);
        res.json(addedEntries);
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default patientRouter;