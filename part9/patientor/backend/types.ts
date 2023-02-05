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
interface Patient {

    id: string
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
  
}
type NewPatient = Omit<Patient, 'id'>; 
export  {
    Gender,
    Diagnose,
    Patient,
    NewPatient
};