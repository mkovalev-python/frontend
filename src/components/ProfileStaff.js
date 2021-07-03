import {Content} from "antd/es/layout/layout";
import {Card, Col, Divider, Spin, Statistic} from "antd";
import Avatar from "antd/es/avatar/avatar";
import './css/Profile.css'
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {useEffect, useState} from "react";
import API from "../API";
import AdminButton from "./AdminButton";
import {ArrowDownOutlined, ArrowUpOutlined, LikeOutlined, RiseOutlined} from "@ant-design/icons";
import BlockTeamAndPolls from "../Pages/ParticipantPage/BlockTeamAndPolls";
import avatar from './css/avatar.jpg'
import Row from "antd/es/descriptions/Row";


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
        <Avatar src={avatar} />
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

                {/*<Statistic title="Мои баллы" value={userInfo.rating[0].points} style={{ float:'left', margin: 5}} />*/}
                {/*<Statistic title="Коэф. команды" value={userInfo.rating[0].points} style={{ float:'left', margin: 5}} />*/}
                {/*<Statistic title="Коэф. участника" value={userInfo.rating[0].points} style={{ float:'left', margin: 5}} />*/}

            </div>
                <Divider>Рейтинг</Divider>
                       <Card style={{width: '100%'}}>
                          <Statistic title="Мои баллы"
                                     value={userInfo.rating[0].points}
                                     valueStyle={{ color: '#3f8600', textAlign: 'center'}}
                                     style={{textAlign: 'center', float: 'left'}}/>
                          {userInfo.koef_user >= 1?
                           <Statistic title="Коэффициент участника"
                                     value={userInfo.koef_user}
                                      precision={2}
                                     valueStyle={{ color: '#3f8600', textAlign: 'center'}}
                                     prefix={<ArrowUpOutlined />}
                                     style={{textAlign: 'center',float: 'left',marginLeft:'16%'}}/>:
                           <Statistic title="Коэффициент команды"
                                     value={userInfo.koef_user}
                                      precision={2}
                                     valueStyle={{ color: '#e51515', textAlign: 'center'}}
                                     prefix={<ArrowDownOutlined />}
                                     style={{textAlign: 'center',float: 'left',marginLeft:'16%'}}/>}

                           {userInfo.koef_team >= 1?
                           <Statistic title="Коэффициент команды"
                                     value={userInfo.koef_team}
                                     valueStyle={{ color: '#3f8600', textAlign: 'center'}}
                                     prefix={<ArrowUpOutlined />}
                                     style={{textAlign: 'center',float: 'left',marginLeft:'16%'}}/>:
                           <Statistic title="Коэффициент команды"
                                     value={userInfo.koef_team}
                                     valueStyle={{ color: '#e51515', textAlign: 'center'}}
                                     prefix={<ArrowDownOutlined />}
                                     style={{textAlign: 'center',float: 'left',marginLeft:'16%'}}/>}
                       </Card>

                {userInfo.status_session[0].active_session? <BlockTeamAndPolls /> :<Divider>Ваша смена закрыта! Спасибо за участие!</Divider>}
            </>:null}
        <div className='container-button'>
            <AdminButton />
        </div>


    </Content>


    )
}
export default ProfileStaff