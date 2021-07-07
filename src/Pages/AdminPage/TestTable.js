import {Button, Card, Form, Select, Space, Spin, Table, Tag, Tooltip} from 'antd';
import {Option} from "antd/es/mentions";
import API from "../../API";
import React, {useEffect, useState} from "react";



const { Column, ColumnGroup } = Table;
function TestTable(){
    const [params, setParams] = useState('')
    const [isUsers, setIsUsers] = useState()
    const [isTeam, setIsTeam] = useState()
    const [isLink, setIsLink] = useState('')
    const onFinish = (values: any) => {
        console.log(values)
    API.get('/get/tests/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {session: values.session, team: values.team, type: values.button}
        })
            .then(req=>{
                setParams(req.data.test)
                setIsUsers(req.data.users)
                setIsTeam(req.data.team)
                setIsLink(req.data.link)
            })
            .catch(error=>{
                console.log(error.request)
            })
  };
     const [team, setTeam] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
            API.get('get/list/option/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}})
                .then(res =>{
                    setIsLoading(false)
                    setTeam(res.data.team)

                })
                .catch(error=>{
                    console.log(error.response)
                })
        }, [])
    if(isLoading){
            return <Spin />
        }

    return(
        <div style={{marginLeft:'5%', marginRight: '5%'}}>
        <h3 style={{textAlign:'center'}}>Аналитика тестов</h3>
        <h4 style={{float: 'left', marginRight: '2%', marginTop: '0.3%'}}>Фильтр:</h4>
            <div style={{marginLeft:'20px'}}>
                <Form onFinish={onFinish}>
                    <Form.Item style={{width: '180px', float: 'left', marginLeft: '1%'}} name="session" rules={[{ required: true }]}>
                        <Select placeholder="Выберите смену">
                    <Option value="1">Смена 1</Option>
                    <Option value="2">Смена 2</Option>
                    <Option value="3">Смена 3</Option>
                    <Option value="4">Смена 4</Option>
                    <Option value="5">Смена 5</Option>
                </Select>
                    </Form.Item>
                    <Form.Item style={{width: '180px', float: 'left', marginLeft: '1%'}} name="team" rules={[{ required: true }]}>
                        <Select>
                        {team.map(t=>(
                            <Select.Option value={t.id-1}>{t.name}</Select.Option>
                        ))}
                    </Select>
                    </Form.Item>
                    <Form.Item style={{marginLeft: '2%', float: 'left'}} >
                        <Button htmlType="submit" type="primary">Применить</Button>
                    </Form.Item>
                        <Button type="link" href={isLink}>Скачать отчет</Button>
                </Form>

            </div>

        <Table dataSource={params} style={{marginTop: '2%'}} bordered>
            <Column title="ФИО" dataIndex="fio" key="fio" />
            <ColumnGroup title="День 1">
              <Column
                  title="До"
                  dataIndex="to1"
                  key="to1"
                  render={tags => (
                    <>
                        <span style={{color:'blue'}}>{tags}</span>
                    </>
                  )}
              />
              <Column
                  title="После"
                  dataIndex="after1"
                  key="after1"
                  render={tags => (
                        <>
                            <span style={{color:'green'}}>{tags}</span>
                        </>
                  )}/>
              <Column title="Разница"
                      dataIndex="difference1"
                      key="difference1"
                      render={tags => (
                        <>
                            <span style={{color:'red'}}>{tags}</span>
                        </>
                      )}/>
            </ColumnGroup>
            <ColumnGroup title="День 2">
                            <Column
                  title="До"
                  dataIndex="to2"
                  key="to2"
                  render={tags => (
                    <>
                        <span style={{color:'blue'}}>{tags}</span>
                    </>
                  )}
              />
              <Column
                  title="После"
                  dataIndex="after2"
                  key="after2"
                  render={tags => (
                        <>
                            <span style={{color:'green'}}>{tags}</span>
                        </>
                  )}/>
              <Column title="Разница"
                      dataIndex="difference2"
                      key="difference2"
                      render={tags => (
                        <>
                            <span style={{color:'red'}}>{tags}</span>
                        </>
                      )}/>
            </ColumnGroup>
            <ColumnGroup title="День 3">
                            <Column
                  title="До"
                  dataIndex="to3"
                  key="to3"
                  render={tags => (
                    <>
                        <span style={{color:'blue'}}>{tags}</span>
                    </>
                  )}
              />
              <Column
                  title="После"
                  dataIndex="after3"
                  key="after3"
                  render={tags => (
                        <>
                            <span style={{color:'green'}}>{tags}</span>
                        </>
                  )}/>
              <Column title="Разница"
                      dataIndex="difference3"
                      key="difference3"
                      render={tags => (
                        <>
                            <span style={{color:'red'}}>{tags}</span>
                        </>
                      )}/>
            </ColumnGroup>
            <ColumnGroup title="День 4">
                            <Column
                  title="До"
                  dataIndex="to4"
                  key="to4"
                  render={tags => (
                    <>
                        <span style={{color:'blue'}}>{tags}</span>
                    </>
                  )}
              />
              <Column
                  title="После"
                  dataIndex="after4"
                  key="after4"
                  render={tags => (
                        <>
                            <span style={{color:'green'}}>{tags}</span>
                        </>
                  )}/>
              <Column title="Разница"
                      dataIndex="difference4"
                      key="difference4"
                      render={tags => (
                        <>
                            <span style={{color:'red'}}>{tags}</span>
                        </>
                      )}/>
            </ColumnGroup>
        </Table>

        <h3 style={{marginLeft:'20px'}}>Рейтинг участников</h3>
                      <Table dataSource={isUsers} style={{margin:'20px'}} bordered>
                            <Column width='5%' title="№п/п" dataIndex="num" key="num" />
                            <Column width='30%' title="ФИО" dataIndex="fio" key="fio" />
                            <Column width='10%' title="Баллы" dataIndex="points" key="points" />
                            <Column width='15%' title="Команда" dataIndex="team" key="team" />
                            <Column width='5%' title="Смена" dataIndex="session" key="session" />
                      </Table>
        <h3 style={{marginLeft:'20px'}}>Рейтинг команд в смене</h3>
                          <Table dataSource={isTeam} style={{margin:'20px'}} bordered>
                                <Column width='5%' title="№п/п" dataIndex="num" key="num" />
                                <Column title="Команда" dataIndex="team" key="team" />
                                <Column title="Смена" dataIndex="session" key="session" />
                                <Column width='15%' title="Баллы" dataIndex="points" key="points" />
                          </Table>
        </div>
    )
}
export default TestTable