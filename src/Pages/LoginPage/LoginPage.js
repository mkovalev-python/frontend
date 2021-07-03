import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.css'
import logo from './logo.png'
import API from "../../API";
import {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";


function LoginPage(){

    const [value, setValue] = useState([])
    const [error, setError] = useState('')

    const onFinish = (values) => {
    console.log('Received values of form: ', values);
    setValue(values)
  };
    useEffect(()=> {
        console.log(value)
            API.post('token/obtain/', value)
                .then(res => {
                        sessionStorage.setItem('token', res.data.token)

                    }
                )
                .catch(error => {
                    console.log(error.response)
                    if(value.length!==0) {
                        setError('Логин или пароль были введены неверно!')
                    }
                })
        },)

    if(sessionStorage.getItem('token')){
        return <Redirect to="/"/>
    }

return (

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <img style={{ width: "100%" }} src={logo} alt={logo}/>
        <h2>Авторизация</h2>
        <h5 style={{ color: "red" }}>{error}</h5>
      <Form.Item name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите логин!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите пароль!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Пароль"
        />
      </Form.Item>


      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
           Войти
        </Button>
      </Form.Item>
        <h5>Забыли пароль? Обратитесь к администратору системы makccom0@gmail.com или модератору форума</h5>
    </Form>

        )

}

export default LoginPage