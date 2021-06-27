import {Button, Form, Select, Table, Tag, Tooltip} from 'antd';
import {Option} from "antd/es/mentions";
import API from "../../API";
import {useState} from "react";
import {FileExcelTwoTone} from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
function TestTable(){
    const [params, setParams] = useState('')
    const onFinish = (values: any) => {
        console.log(values)
    API.get('/get/tests/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {session: values.session, team: values.team, type: values.button}
        })
            .then(req=>{
                console.log(req)
                setParams(req.data)
            })
            .catch(error=>{
                console.log(error.request)
            })
  };

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

    return(
        <>
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
                        <Select placeholder="Выберите команду">
                    <Option value="1">Команда 1</Option>
                    <Option value="2">Команда 2</Option>
                    <Option value="3">Команда 3</Option>
                    <Option value="4">Команда 4</Option>
                    <Option value="5">Команда 5</Option>
                </Select>
                    </Form.Item>
                    <Form.Item style={{marginLeft: '2%', float: 'left'}} >
                        <Button htmlType="submit" type="primary">Применить</Button>
                    </Form.Item>
                    <Tooltip title="Выгрузить в Excel">
                                  <Button style={{marginLeft:'20px'}}
                                          type="dashed"
                                          shape="circle"
                                          icon={<FileExcelTwoTone />}
                                          onClick={() => handleClick('excel_test')}/>
                            </Tooltip>
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
        </>
    )
}
export default TestTable