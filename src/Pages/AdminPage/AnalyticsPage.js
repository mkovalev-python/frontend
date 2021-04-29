import {Button, Divider, Space, Table, Tooltip} from "antd";
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import React, {useEffect, useState} from "react";
import API from "../../API";
import {CaretUpOutlined, FileExcelTwoTone} from "@ant-design/icons";

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
    { title: 'Сессия', dataIndex: 'session', key: 'session' },
    { title: 'Опрос', dataIndex: 'poll', key: 'poll' },
    { title: 'Вопрос', dataIndex: 'question', key: 'question' },
    { title: 'Ответы', dataIndex: 'answer', key: 'answer' },
    ];
    const columns_rating = [
      {
        title: 'Позиция',
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
                console.log(req.data)
            })
            .catch(error=>{
                console.log(error.request)
            })
    },[])

    function handleClick(analytics) {
        console.log(analytics)
        API.get('/get/excel/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {type: analytics}
        })
            .then(req=>{
                console.log(req)
                const link = document.createElement('a');
                link.href = req.data['url'];
                link.click();
            })
            .catch(error=>{
                console.log(error.request)
            })
    }

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },

    };

    return(
        <>
            <Nav />
            <ProfileStaff/>
            <Content>
                <Divider>Аналитика</Divider>
                <div style={{ width: '45%', textAlign:'center', float:'left', marginRight: "10%"}}>
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
                <div style={{ width: '45%', textAlign:'center', float:'left'}}>
                    <h3>Таблица рейтинга участников
                    <Tooltip title="Выгрузить в Excel">
                          <Button style={{marginLeft:'20px'}}
                                  type="dashed"
                                  shape="circle"
                                  icon={<FileExcelTwoTone />}
                                  onClick={() => handleClick('excel_rating')}/>
                        </Tooltip>
                    </h3>
                    <Table dataSource={ratingTable} columns={columns_rating} />
                </div>
                <Table dataSource={userTable} rowSelection={{ ...rowSelection }} columns={columns_Answers} />

            </Content>
        </>
    )
}
export default AnalyticsPage