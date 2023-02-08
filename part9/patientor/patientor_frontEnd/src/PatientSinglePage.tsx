import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import EntryDetails from "./components/EntryDetails";
const genders = {
    male: <MaleIcon/>,
    female: <FemaleIcon/>,
    other: <TwoWheelerIcon/>
};
const PatientSinglePage = () => {
    const [state, dispatch] = useStateValue();
    const { patientId } = useParams<{ patientId: string }>();
    const patient: Patient | undefined = Object.values(state.patients).find((p: Patient) => p.id === patientId);
    console.log(genders['male'] == <MaleIcon/>);
    

    React.useEffect(()=> {
        console.log(patient);
        //if patient didn't exist in local state fetch it from the server
        if(!patient) {
            const fetchSinglePatient = async() => {
                try {
                    if(!patientId)
                        throw new Error('invalid patientId');
                    const {data : fetchedPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${patientId}`);
                    dispatch({type: 'UPDATE_PATIENT', payload: fetchedPatient});

                } catch (e) {
                    console.log("There is an error when fetching patient with id :  ", patientId);
                    console.log('The error is ', e.message);
                }
            };
            
            void fetchSinglePatient();
        }
    },[]);
    return (
        <div>
            {patient
            ?
            <>
            <h2>{patient.name } {genders[patient.gender]} </h2> 
            <p>ssn {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>Entries</h3>
            {patient.entries.map(e => <EntryDetails key={e.id} entry={e}/>)}
            </>
            :<span> No patient with given id</span>}
        </div>
    );
};
export default PatientSinglePage;