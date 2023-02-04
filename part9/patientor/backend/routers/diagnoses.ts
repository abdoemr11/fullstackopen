import express from 'express';
import { getDiagnose } from '../services/diagnose';

const diagnoseRouter = express.Router();
diagnoseRouter.get('/', (_req, res) => {
    console.log('getting all diagnoses');
    
    return res.json(getDiagnose());
});

export default diagnoseRouter;