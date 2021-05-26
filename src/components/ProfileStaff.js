import {Content} from "antd/es/layout/layout";
import {Divider, Spin, Statistic} from "antd";
import Avatar from "antd/es/avatar/avatar";
import './css/Profile.css'
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {useEffect, useState} from "react";
import API from "../API";
import AdminButton from "./AdminButton";
import {LikeOutlined, RiseOutlined} from "@ant-design/icons";
import BlockTeamAndPolls from "../Pages/ParticipantPage/BlockTeamAndPolls";



function ProfileStaff(){

    const [userInfo, setUserInfo] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        API.get('/get/user/info/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
        params: {'permission': sessionStorage.getItem('permission')}})
            .then(res=>{
                console.log(res.data)
                setUserInfo(res.data)
                sessionStorage.setItem('user_id', res.data.user[0].id)
                setIsLoading(false)

            })
            .catch(error=>{
                console.log(error.response)
            })
    },[])

    if(isLoading){
        return <Spin />
    }

    return(
    <Content>
        <Divider>Мой профиль {sessionStorage.getItem('permission')==='Participant'?null:(<span style={{color: "red"}}>{userInfo.permission[0].name}</span>)}</Divider>
        <Avatar src={userInfo.user[0].avatar} />
        <div className='container-info'>
            <Title level={3} style={{ marginTop: 20 }}>{userInfo.user[0].first_name} {userInfo.user[0].last_name}</Title>
            <Text><Text strong>Город: </Text>{userInfo.user[0].country}</Text><br/>
            {sessionStorage.getItem('permission')==='Participant'?<>
                <Text><Text strong>Команда: </Text>{userInfo.user[0].team}</Text><br/>
                <Text><Text strong>Смена: </Text>{userInfo.status_session[0].name_session}</Text></>
                :null}
        </div>
        {sessionStorage.getItem('permission')==='Participant'?
            <>
            <div className="container-rate" style={{float:"right"}}>
                {userInfo.rating[0].points > userInfo.rating_team.points? <Statistic title="Баллы команды" value={userInfo.rating_team.points} prefix={<RiseOutlined style={{ color: 'green'}}/>} style={{ float:'left', margin: 25}} />:
                <Statistic title="Баллы команды" value={userInfo.rating_team.points} prefix={<RiseOutlined style={{ color: 'red', transform: 'rotate(180deg)'}}/>} style={{ float:'left', margin: 25}} />}


            </div>
                {userInfo.status_session[0].active_session? <BlockTeamAndPolls /> :<Divider>Ваша смена закрыта! Спасибо за участие!</Divider>}
            </>:null}
        <div className='container-button'>
            <AdminButton />
        </div>

    </Content>


    )
}
export default ProfileStaff