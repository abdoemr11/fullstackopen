import express from 'express';
import { getPatients } from '../services/patient';


const patientRouter = express.Router();
patientRouter.get('/', (_req, res) => {
    console.log('getting all patients');
    
    return res.json((getPatients()));
});

export default patientRouter;