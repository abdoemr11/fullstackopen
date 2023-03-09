import { Entry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';
const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const EntryDetails = ({entry}: {entry: Entry}) => {
    // const style = {
    //     display: 'flex',
    //     flexDirection : 'column'
    // }
    return (
    <Box style={{display: 'flex', flexDirection: 'column'}}>
    {(() => {
        switch (entry.type) {
        case "Hospital":
            return (
            <>
                <LocalHospitalIcon />
                <span style={{ color: 'red' }}>
                {entry.date} - {entry.description}
                </span>
                <br />
                Discharge: {entry.discharge.date}
                <br />
                Criteria: {entry.discharge.criteria}
            </>
            );
        case "HealthCheck":
            return (
            <>
                <MedicalServicesIcon />
                <span>
                {entry.date} - {entry.description}
                </span>
                <br />
                Health Rating: {entry.healthCheckRating}
            </>
            );
        case "OccupationalHealthcare":
            return (
            <>
                <WorkIcon />
                <span>
                {entry.date} - {entry.description}
                </span>
                Employer: {entry.employerName}

            </>
            );
        default:
            return assertNever(entry);
        }
    })()}
        <ul>
            {entry.diagnosisCodes?.map(c => <li key={c}>{c}</li>)}
        </ul>
    </Box>

    );
};

export default EntryDetails;
