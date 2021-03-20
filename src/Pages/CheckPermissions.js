import {Redirect} from "react-router-dom";

function CheckPermissions(){

    if(sessionStorage.getItem('token')){
        switch (sessionStorage.getItem('permission')){
            case 'SuperAdmin':
                return 'Hi'
                //return <SuperAdminPage />
            case 'Volunteer':
                return 'Hi'
                //return <VolunteerPage />
            case 'ServiceAdmin':
                return 'Hi'
                //return <ServiceAdminPage />
            case 'PollAdmin':
                return 'Hi'
                //return <PollAdminPage />
            case 'ParticipantAdmin':
                return 'Hi'
                //return <ParticipantAdminPage />
            case 'Participant':
                return 'Hi'
                //return <ParticipantPage />
            default: return 'Null'
        }
    }else{
        return <Redirect to="/login"/>
    }
}
export default CheckPermissions