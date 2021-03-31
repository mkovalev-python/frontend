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
            <Text><Text strong>Дата Рождения: </Text>{userInfo.user[0].birthday}</Text><br/>
            {sessionStorage.getItem('permission')==='Participant'?<Text><Text strong>Команда: </Text>{userInfo.user[0].team}</Text>:null}
        </div>
        {sessionStorage.getItem('permission')==='Participant'?
            <div className="container-rate" style={{float:"right"}}>

                  <Statistic title="Рейтинг" value={userInfo.rating[0].rating} prefix={<RiseOutlined />} style={{ float:'left', margin: 25}}/>
                  <Statistic title="Баллы" value={userInfo.rating[0].points} prefix={<LikeOutlined />} style={{ float:'left', margin: 25}} />

            </div>:null}
        <div className='container-button'>
            <AdminButton />
        </div>
    </Content>


    )
}
export default ProfileStaff