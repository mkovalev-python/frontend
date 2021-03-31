import {Redirect} from "react-router-dom";
import API from "../API";
import {useEffect, useState} from "react";
import {Spin} from "antd";
import AdminPage from "./AdminPage/AdminPage";
import ParticipantPage from "./ParticipantPage/ParticipantPage";


function CheckPermissions(){

    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
            API.get('/check/permission/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
    })
        .then(res =>{
            sessionStorage.setItem('permission',res.data[0].permission)
            setIsLoading(false)
        })
                .catch(error=>{
                    console.log(error)
                })

    },[])


    console.log(sessionStorage.getItem('token'))
    if(sessionStorage.getItem('token')){
            if(isLoading){
                return <Spin />
            }

        switch (sessionStorage.getItem('permission')){
            case 'SuperAdmin':
            case 'Volunteer':
            case 'ServiceAdmin':
            case 'PollAdmin':
            case 'ParticipantAdmin':
                return <AdminPage />
            case 'Participant':
                return <ParticipantPage />
            default: return 'Null'
        }
    }else{
        return <Redirect to="/login"/>
    }
}
export default CheckPermissions