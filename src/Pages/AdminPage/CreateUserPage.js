import ProfileStaff from "../../components/ProfileStaff";
import {Button, DatePicker, Divider, Form, Input, Select, Spin} from "antd";
import Nav from "../../components/Nav";
import {Content} from "antd/es/layout/layout";
import {Redirect, useHistory} from "react-router-dom";
import {LeftOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import API from "../../API";


function CreateUserPage(){

     const history = useHistory();
     const [permission, setPermission] = useState([])
     const [team, setTeam] = useState([])
     const [country, setCountry] = useState([])
     const [isLoading, setIsLoading] = useState(true)
     const [created, setCreated] = useState(false)
     const [error, setError] = useState('')

    function handleClick(e) {
        console.log(e)
        history.push(e);
        }

        useEffect(()=>{
            API.get('get/list/option/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}})
                .then(res =>{
                    console.log(res)
                    setIsLoading(false)
                    setTeam(res.data.team)
                    setCountry(res.data.country)
                    setPermission(res.data.permission)

                })
                .catch(error=>{
                    console.log(error.response)
                })
        }, [])

        const dateFormat = 'YYYY-MM-DD';

        const onFinish = (values) => {
            console.log('Received values of form: ', values);

            API.post('post/create/user/', values)
             .then(res =>{
                 setCreated(true)
             })
             .catch(error =>{
                 console.log(error.response)
                 setError('Данный логин уже зарегистрирован')
             })
        };


        if(created){
            return <Redirect to="/"/>
        }


        if(isLoading){
            return <Spin />
        }

    return(
        <>
        <Nav />
        <ProfileStaff/>
        <Content>
          <Divider>Добавить пользователя</Divider>
            <Button style={{float: 'left'}} type="link" icon={<LeftOutlined />} ghost onClick={() => handleClick('')}>
                На главную
            </Button>

            <Form name="normlogin"
                    className="logiform"
                  style={{marginTop: 100}} onFinish={onFinish}>
                <span style={{ color:"red" }}>{error}</span>
                <Form.Item name="username" label="Логин" rules={[{required: true, message: 'Введите логин пользователя'}]}>
                    <Input placeholder="Логин" />
                </Form.Item>

                <Form.Item label="Пароль" name="password" rules={[{ required: true, message: 'Введите пароль' }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Имя" name="first_name" rules={[{ required: true, message: 'Введите имя' }]}>
                    <Input placeholder='Имя' />
                </Form.Item>

                <Form.Item label="Фамилия" name="last_name" rules={[{ required: true, message: 'Введите фамилию' }]}>
                    <Input placeholder='Фамилия' />
                </Form.Item>

                <Form.Item label="Город" name='country' rules={[{ required: true, message: 'Укажите город' }]}>
                    <Select>
                        {country.map(c=>(
                            <Select.Option value={c.country}>{c.country}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Дата рождения" name='birthday' rules={[{ required: true, message: 'Укажите дату рождения' }]}>
                    <DatePicker picker='date' format={dateFormat} placeholder='Дата рождения' />
                </Form.Item>

                <Form.Item label="Команда" name='team' rules={[{ required: true, message: 'Укажите команду' }]}>
                    <Select>
                        {team.map(t=>(
                            <Select.Option value={t.name}>{t.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Права" name='permission' rules={[{ required: true, message: 'Укажите права пользователя' }]}>
                    <Select>
                        {permission.map(p=>(
                            <Select.Option value={p.slug}>{p.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">Создать</Button>
                </Form.Item>
            </Form>

        </Content>

        </>
    )
}
export default CreateUserPage