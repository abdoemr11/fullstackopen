import { Diagnose } from "../types";
import diagnoseData from '../data/diagnoses.json';

let diagnoses: Array<Diagnose> = diagnoseData;
const getAllDiagnose =(): Array<Diagnose> => {

    return diagnoses;
};
const getDiagnose =(code: string):Diagnose => {
    const diagnose = diagnoses.find(d => d.code === code);
    if(!diagnose)
        throw new Error("Can't find diagnose with this code "+ code);
    return diagnose;
};
const addDiagnose = (diag: Diagnose): Diagnose => {
    diagnoses = diagnoses.concat(diag);
    return diag;   
};
export  default {
     getAllDiagnose,
     getDiagnose,
     addDiagnose
};