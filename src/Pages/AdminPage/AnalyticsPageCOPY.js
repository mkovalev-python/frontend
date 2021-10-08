import {Button, Divider, Space, Spin, Table, Tooltip} from "antd";
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import API from "../../API";
import {CaretUpOutlined, FileExcelTwoTone} from "@ant-design/icons";
import { Tabs } from 'antd';
import {Typography } from 'antd';
import TestTable from "./TestTable";
const { TabPane } = Tabs;


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
        key: 'points',
        render: (text, record) => (
              <Space size="middle">
                <span style={{color:'green'}}>{record.points} <CaretUpOutlined style={{ color: 'green' }} /></span>
              </Space>
    ),
      },
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date'
      },
        {
        title: 'Опрос',
        dataIndex: 'poll',
        key: 'poll'
      },

    ]
    const columns_Answers = [
    { title: 'Имя', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Фамилия', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Команда', dataIndex: 'team', key: 'team' },
    { title: 'Смена', dataIndex: 'session', key: 'session' },
    { title: 'Опрос', dataIndex: 'poll', key: 'poll' },
    { title: 'Вопрос', dataIndex: 'question', key: 'question' },
    { title: 'Ответы', dataIndex: 'answer', key: 'answer' },
    ];
    const columns_rating = [
      {
        title: '#',
        dataIndex: 'rating',
        key: 'rating'
      },
      {
        title: 'Участник',
        dataIndex: 'user',
        key: 'user'
      },
        {
        title: 'Команда',
        dataIndex: 'team',
        key: 'team'
      },
                {
        title: 'Смена',
        dataIndex: 'session',
        key: 'session'
      },
     {
        title: 'Баллов',
        dataIndex: 'points',
        key: 'points'
      },]

    const columns_rating_team = [
      {
        title: '#',
        dataIndex: 'rating',
        key: 'rating'
      },
      {
        title: 'Участник',
        dataIndex: 'user',
        key: 'user'
      },
     {
        title: 'Баллов',
        dataIndex: 'points',
        key: 'points'
      },]

    const columns_rating_ = [
      {
        title: '#',
        dataIndex: 'rating',
        key: 'rating'
      },
      {
        title: 'Участник',
        dataIndex: 'user',
        key: 'user'
      },
        {
        title: 'Команда',
        dataIndex: 'team',
        key: 'team'
      },
     {
        title: 'Баллов',
        dataIndex: 'points',
        key: 'points'
      },]

    const [ratingTable, setRatingTable] = useState([])
    const [loggerTable, setLoggerTable] = useState([])
    const [userTable, setUserTable] = useState([])


    useEffect(()=>{
        API.get('/get/analytics/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(req=>{
                setRatingTable(req.data.rating)
                setLoggerTable(req.data.logger)
                setUserTable(req.data.user)
            })
            .catch(error=>{
            })
    },[])

    function handleClick(analytics) {
        API.get('/get/excel/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {type: analytics}
        })
            .then(req=>{
                const link = document.createElement('a');
                link.href = req.data['url'];
                link.click();
            })
            .catch(error=>{
            })
    }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
      },

    };
    const [ratingTable_, setRatingTable_] = useState([])
    const [ratingTableTeam_, setRatingTableTeam_] = useState([])
    const [Team_, setTeam_] = useState([])
    const [loading_, setLoading_] = useState(true)
    const [loading, setLoading] = useState(true)
    function callback(key) {

    API.get('/get/table_rating/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {session:key}
        })
        .then(req=>{
            setLoading_(false)
            setRatingTable_(req.data.rating)
        })
        .catch()
}
    function callback_team(key) {
        setTeam_(key)
    }
    function callback_team_session(key_session, key_team) {
        API.get('/get/table_rating_team/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {session:key_session,team: key_team}
        })
        .then(req=>{
            setLoading(false)
            setRatingTableTeam_(req.data.rating)
        })
        .catch()
    }

    return(
        <>
            <Nav />
            <ProfileStaff/>
            <Content>
                <Divider>Аналитика</Divider>
                <TestTable />
                <div style={{textAlign:'center'}}>
                    <h3>Логгер баллов
                        <Tooltip title="Выгрузить в Excel">
                          <Button style={{marginLeft:'20px'}}
                                  type="dashed"
                                  shape="circle"
                                  icon={<FileExcelTwoTone />}
                                  onClick={() => handleClick('excel_log')}/>
                        </Tooltip>
                    </h3>

                    <Table dataSource={loggerTable} columns={columns_logger} />

                </div>

                <div style={{ textAlign:'center'}}>
                        <h3>Таблица рейтинга по сменам
                            <Tooltip title="Выгрузить в Excel">
                                  <Button style={{marginLeft:'20px'}}
                                          type="dashed"
                                          shape="circle"
                                          icon={<FileExcelTwoTone />}
                                          onClick={() => handleClick('excel_rating')}/>
                            </Tooltip>
                        </h3></div>
                <Tabs defaultActiveKey="0" onChange={callback}>
                    <TabPane tab="Общий" key="0">
                    <Table dataSource={ratingTable} columns={columns_rating} />

                    </TabPane>
                    <TabPane tab="Смена 1" key="1">
                        {loading_?<Spin />:<>
                    <Table dataSource={ratingTable_} columns={columns_rating_} /></>}
                    </TabPane>
                    <TabPane tab="Смена 2" key="2">
                      {loading_?<Spin />:<>

                    <Table dataSource={ratingTable_} columns={columns_rating_} /></>}
                    </TabPane>
                    <TabPane tab="Смена 3" key="3">
                      {loading_?<Spin />:<>
                    <Table dataSource={ratingTable_} columns={columns_rating_} /></>}
                    </TabPane>
                    <TabPane tab="Смена 4" key="4">
                      {loading_?<Spin />:<>
                    <Table dataSource={ratingTable_} columns={columns_rating_} /></>}
                    </TabPane>
                    <TabPane tab="Смена 5" key="5">
                      {loading_?<Spin />:<>
                    <Table dataSource={ratingTable_} columns={columns_rating_} /></>}
                    </TabPane>

                </Tabs>

                <div style={{ textAlign:'center'}}>
                        <h3>Таблица рейтинга по командам

                        </h3></div>
                <Tabs defaultActiveKey="0" onChange={callback_team}>
                    <TabPane tab="Общий" key="0">
                    <Table dataSource={ratingTable} columns={columns_rating} />

                    </TabPane>
                    <TabPane tab="Команда 1" key="1">
                        {Team_===[]?<Spin />:<Space split={<Divider type="vertical" />}>
                                              <Typography.Link onClick={() => callback_team_session(1,Team_)}>Смена 1</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(2,Team_)}>Смена 2</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(3,Team_)}>Смена 3</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(4,Team_)}>Смена 4</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(5,Team_)}>Смена 5</Typography.Link>
                                            </Space>}
                        {loading?<Spin />: <Table dataSource={ratingTableTeam_} columns={columns_rating_team} />}
                    </TabPane>
                    <TabPane tab="Команда 2" key="2">
                        {Team_===[]?<Spin />:<Space split={<Divider type="vertical" />}>
                                              <Typography.Link onClick={() => callback_team_session(1,Team_)}>Смена 1</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(2,Team_)}>Смена 2</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(3,Team_)}>Смена 3</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(4,Team_)}>Смена 4</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(5,Team_)}>Смена 5</Typography.Link>
                                            </Space>}
                        {loading?<Spin />: <Table dataSource={ratingTableTeam_} columns={columns_rating_team} />}
                    </TabPane>
                    <TabPane tab="Команда 3" key="3">
                        {Team_===[]?<Spin />:<Space split={<Divider type="vertical" />}>
                                              <Typography.Link onClick={() => callback_team_session(1,Team_)}>Смена 1</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(2,Team_)}>Смена 2</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(3,Team_)}>Смена 3</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(4,Team_)}>Смена 4</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(5,Team_)}>Смена 5</Typography.Link>
                                            </Space>}
                        {loading?<Spin />: <Table dataSource={ratingTableTeam_} columns={columns_rating_team} />}
                    </TabPane>
                    <TabPane tab="Команда 4" key="4">
                        {Team_===[]?<Spin />:<Space split={<Divider type="vertical" />}>
                                              <Typography.Link onClick={() => callback_team_session(1,Team_)}>Смена 1</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(2,Team_)}>Смена 2</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(3,Team_)}>Смена 3</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(4,Team_)}>Смена 4</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(5,Team_)}>Смена 5</Typography.Link>
                                            </Space>}
                        {loading?<Spin />: <Table dataSource={ratingTableTeam_} columns={columns_rating_team} />}
                    </TabPane>
                    <TabPane tab="Команда 5" key="5">
                        {Team_===[]?<Spin />:<Space split={<Divider type="vertical" />}>
                                              <Typography.Link onClick={() => callback_team_session(1,Team_)}>Смена 1</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(2,Team_)}>Смена 2</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(3,Team_)}>Смена 3</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(4,Team_)}>Смена 4</Typography.Link>
                                              <Typography.Link onClick={() => callback_team_session(5,Team_)}>Смена 5</Typography.Link>
                                            </Space>}
                        {loading?<Spin />: <Table dataSource={ratingTableTeam_} columns={columns_rating_team} />}
                    </TabPane>

                </Tabs>

                <div style={{ textAlign:'center'}}><h3>Таблица ответов</h3></div>
                <Table dataSource={userTable} rowSelection={{ ...rowSelection }} columns={columns_Answers} />
            </Content>
        </>
    )
}
export default AnalyticsPage