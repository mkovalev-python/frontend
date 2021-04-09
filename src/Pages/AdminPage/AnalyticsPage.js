import {Divider, Table} from "antd";
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {useEffect} from "react";
import API from "../../API";

function AnalyticsPage(){

    const columns_logger = [
      {
        title: 'Участник',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: 'Баллы',
        dataIndex: 'points',
        key: 'points'
      },
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date'
      },

    ]
    const columns_rating = [
      {
        title: 'Позиция',
        dataIndex: 'position',
        key: 'position'
      },
      {
        title: 'Участник',
        dataIndex: 'name',
        key: 'name'
      },
     {
        title: 'Баллов',
        dataIndex: 'points',
        key: 'points'
      },]

    useEffect(()=>{
        API.get('/get/analytics/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(req=>{
                console.log(req.data)
            })
            .catch(error=>{
                console.log(error.request)
            })
    },[])

    return(
        <>
            <Nav />
            <ProfileStaff/>
            <Content>
                <Divider>Аналитика</Divider>
                <div style={{ width: '45%', textAlign:'center', float:'left', marginRight: "10%"}}>
                    <h3>Логгер баллов</h3>
                    <Table columns={columns_logger} />
                </div>
                <div style={{ width: '45%', textAlign:'center', float:'left'}}>
                    <h3>Таблица рейтинга участников</h3>
                    <Table columns={columns_rating} />
                </div>

            </Content>
        </>
    )
}
export default AnalyticsPage