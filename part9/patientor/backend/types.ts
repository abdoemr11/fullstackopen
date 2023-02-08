interface Diagnose { 
    code: string;
    name: string;
    latin?: string;    
}
enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }
export enum HealthCheckRating {
"Healthy" = 0,
"LowRisk" = 1,
"HighRisk" = 2,
"CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}
export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
        date: string,
        criteria: string,
      },

}
export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string
    sickLeave?: {
        startDate: string
        endDate: string
      },
}
export type Entry =
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

interface Patient {

    id: string
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
  
}
// Define special omit for unions
export type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
type NewPatient = Omit<Patient, 'id'>; 
type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export  {
    Gender,
    Diagnose,
    Patient,
    NewPatient,
    PublicPatient
};