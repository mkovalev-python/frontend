import {Button, Card, Divider, Form, Select, Space, Spin, Table} from "antd";
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Option} from "antd/es/mentions";
import { Row, Col } from 'antd';
import API from "../../API";
import {CaretUpOutlined} from "@ant-design/icons";
import TestTable from "./TestTable";
const { Column } = Table;


function AnalyticsPage(){
    const onFinish = (values: any) => {
        console.log(values)}

    const [isLoading, setIsLoading] = useState(true)

    const [isLogData, setIsLogData] = useState()
    const [isUserData, setIsUserData] = useState()
    const [isTeamData, setIsTeamData] = useState()


    /* Запрос на общие таблицы */
    useEffect(()=>{
        API.get('/get/analytics/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(req=>{
                console.log(req.data)
                setIsLogData(req.data.logger)
                setIsUserData(req.data.rating_user)
                setIsTeamData(req.data.rating_team)
                setIsLoading(false)
            })
            .catch(error=>{
                console.log(error.request)
            })
    },[])

    if (isLoading){
        return (<>
                <Nav />
                <ProfileStaff/>
                <Content style={{width: '100%'}}>
                    <Divider>Аналитика</Divider>
                    <Spin style={{ marginLeft: '50%', marginTop: '5%'}} />
                </Content>
                </>)
    }
    return(
        <>
            <Nav />
            <ProfileStaff/>
            <Content style={{width: '100%'}}>
                <Divider>Аналитика</Divider>
                <h3 style={{marginLeft:'5%'}}>Общие табличные данные и фильтр</h3>
                <Card style={{margin:'5%',marginTop:'-0.5%'}}>
                    <Row>
                          <h3 style={{marginLeft:'20px'}}>История добавления баллов</h3>
                          <Table dataSource={isLogData} style={{margin:'20px'}} bordered>
                                <Column defaultFilteredValue={['Andrew']} title="ФИО" dataIndex="fio" key="fio"/>
                                <Column title="Дата" dataIndex="date" key="date" />
                                <Column title="Баллы" dataIndex="points" key="points"
                                render={tags => (
                                <Space size="middle">
                                    <span style={{color:'green'}}>{tags} <CaretUpOutlined style={{ color: 'green' }} /></span>
                                </Space>
                              )}/>
                                <Column title="Опрос/Тест" dataIndex="polls_test" key="polls_test" />
                          </Table>
                    </Row>
                    <Row>
                      <Col span={12}>
                          <h3 style={{marginLeft:'20px'}}>Рейтинг всех участников</h3>
                          <Table dataSource={isUserData} style={{margin:'20px'}} bordered>
                                <Column width='5%' title="№п/п" dataIndex="num" key="num" />
                                <Column width='30%' title="ФИО" dataIndex="fio" key="fio" />
                                <Column width='10%' title="Баллы" dataIndex="points" key="points" />
                                <Column width='15%' title="Команда" dataIndex="team" key="team" />
                                <Column width='5%' title="Смена" dataIndex="session" key="session" />
                          </Table>
                      </Col>
                      <Col span={12}>
                          <h3 style={{marginLeft:'20px'}}>Рейтинг всех команд</h3>
                          <Table dataSource={isTeamData} style={{margin:'20px'}} bordered>
                                <Column width='5%' title="№п/п" dataIndex="num" key="num" />
                                <Column title="Команда" dataIndex="team" key="team" />
                                <Column title="Смена" dataIndex="session" key="session" />
                                <Column width='15%' title="Баллы" dataIndex="points" key="points" />
                          </Table>
                      </Col>
                    </Row>
                </Card>
                <TestTable/>
            </Content>
        </>
    )
}
export default AnalyticsPage