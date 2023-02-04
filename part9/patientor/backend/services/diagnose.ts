import { Diagnose } from "../types";
import diagnoseData from '../data/diagnoses.json';

const diagnoses: Array<Diagnose> = diagnoseData;
const getDiagnose =(): Array<Diagnose> => {

    return diagnoses;
};

export  {
    getDiagnose
};