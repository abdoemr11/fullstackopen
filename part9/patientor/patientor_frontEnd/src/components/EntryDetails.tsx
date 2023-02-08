import { Entry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import Box from '@mui/material/Box';
const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const EntryDetails = ({entry}: {entry: Entry}) => {

    switch(entry.type) {
        case "Hospital": 
            return(
                <Box>
                    {entry.date} <LocalHospitalIcon/>
                    {entry.description}
                    Discharge {entry.discharge}
                    Diagnose By{entry.specialist} 
                </Box>
            );
        case "HealthCheck": 
                return (
                    <Box>
                        {entry.date} <MedicalServicesIcon/>
                        {entry.description}
                        Health rate {entry.healthCheckRating}
                        Diagnose By{entry.specialist} 
                </Box>
                );
        case "OccupationalHealthcare": 
                    return (
                        <Box >
                        {entry.date} <WorkIcon/>{entry.employerName}
                        {entry.description}
                        
                        Diagnose By{entry.specialist} 
                    </Box>
                    );
        default: 
            assertNever(entry);
    }
    return null;
};

export default EntryDetails;
