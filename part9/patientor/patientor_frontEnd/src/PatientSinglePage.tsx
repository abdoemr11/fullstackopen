import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient } from "./types";
const PatientSinglePage = () => {
    const [state, dispatch] = useStateValue();
    const { patientId } = useParams<{ patientId: string }>();
    const patient: Patient | undefined = Object.values(state.patients).find((p: Patient) => p.id === patientId);
    

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
            <h2>{patient.name } {patient.gender}</h2>
            <p>ssn {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            </>
            :<span> No patient with given id</span>}
        </div>
    );
};
export default PatientSinglePage;