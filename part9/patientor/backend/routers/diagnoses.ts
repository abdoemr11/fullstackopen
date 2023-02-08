import express from 'express';
import diagonoseService from '../services/diagnose';
import { Diagnose } from '../types';
import { validateDiagnoses } from '../util';

const diagnoseRouter = express.Router();
diagnoseRouter.get('/', (_req, res) => {
    console.log('getting all diagnoses');
    
    return res.json(diagonoseService.getAllDiagnose());
});
diagnoseRouter.get('/:code', (req, res) => {
    console.log('trying to get one diagnose');
    
    try {
        const diagCode:string = req.params.code;
        const diagnose = diagonoseService.getDiagnose(diagCode); 
        res.json(diagnose);
        //this suggest installing error handles middleware
    } catch (error:unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
diagnoseRouter.post('/', (req, res) => {
    try {
        console.log('diagnoses post', req.body);
        
        const newDiagnose:Diagnose = validateDiagnoses(req.body);
        const addedDiagnose = diagonoseService.addDiagnose(newDiagnose);
        res.json(addedDiagnose);
        } catch (error:unknown) {
            let errorMessage = 'Something went wrong.';
            if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
            }
            res.status(400).send(errorMessage);
        }   
});

export default diagnoseRouter;