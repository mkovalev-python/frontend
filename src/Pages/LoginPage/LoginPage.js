import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './LoginPage.css'
import logo from './logo.svg'
import API from "../../API";


function LoginPage(){


    const onFinish = (values) => {
    console.log('Received values of form: ', values);

    API.post('token/obtain/', values)
        .then(res=> {
                console.log(res)
            }
        )
        .catch(error => {
            console.log(error)
        })
  };


return (

    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
        <img src={logo} alt={logo}/>
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
          Log in
        </Button>
      </Form.Item>
    </Form>

        )

}

export default LoginPage