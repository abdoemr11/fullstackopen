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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Entry {

}
interface Patient {

    id: string
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
  
}
type NewPatient = Omit<Patient, 'id'>; 
type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export  {
    Gender,
    Diagnose,
    Patient,
    NewPatient,
    Entry,
    PublicPatient
};