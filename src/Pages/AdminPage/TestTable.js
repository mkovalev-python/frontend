import {Button, Form, Select, Table} from 'antd';
import {Option} from "antd/es/mentions";
import API from "../../API";

const { Column, ColumnGroup } = Table;
function TestTable(){
    const onFinish = (values: any) => {
    API.get('/get/tests/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {session: values.session, team: values.team}
        })
            .then(req=>{
                console.log(req)
            })
            .catch(error=>{
                console.log(error.request)
            })
  };

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
                    <Form.Item>
                        <Button style={{marginLeft: '2%'}} htmlType="submit" type="primary">Применить</Button>
                    </Form.Item>
                </Form>
            </div>
            <span>*Для получения данных выберите параметры фильтра и нажмите "Применить" </span>
        <Table style={{marginTop: '2%'}} bordered>
            <Column title="ФИО" dataIndex="fio" key="fio" />
            <ColumnGroup title="День 1">
              <Column title="До" dataIndex="to1" key="to1" />
              <Column title="После" dataIndex="after1" key="after1" />
              <Column title="Разница" dataIndex="difference1" key="difference1" />
            </ColumnGroup>
            <ColumnGroup title="День 2">
              <Column title="До" dataIndex="to2" key="to2" />
              <Column title="После" dataIndex="after2" key="after2" />
              <Column title="Разница" dataIndex="difference2" key="difference2" />
            </ColumnGroup>
            <ColumnGroup title="День 3">
              <Column title="До" dataIndex="to3" key="to3" />
              <Column title="После" dataIndex="after3" key="after3" />
              <Column title="Разница" dataIndex="difference3" key="difference3" />
            </ColumnGroup>
            <ColumnGroup title="День 4">
              <Column title="До" dataIndex="to4" key="to4" />
              <Column title="После" dataIndex="after4" key="after4" />
              <Column title="Разница" dataIndex="difference4" key="difference4" />
            </ColumnGroup>
        </Table>
        </>
    )
}
export default TestTable