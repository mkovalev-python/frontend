import {Divider, Empty, Select} from "antd";
import {useEffect, useState} from "react"
import API from "../../API";


function Team(){
    const [team, setTeam] = useState([])

    useEffect(()=>{
        API.get('/get/team/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                setTeam(res.data)
                console.log(res.data)
                })
            .catch(error=>{
                console.log(error.response)
            })

    },[])
    return(
        <div>
            <Divider>Моя команда</Divider>
            {team.length === 0?<Empty />:
                team.map(t=>(
                    <>
                        <span>{t.first_name}</span>
                        <span>{t.last_name}</span>
                        <span>{t.avatar}</span>
                    </>
                ))
               }

        </div>
    )
}

export default Team