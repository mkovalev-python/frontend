import {Header} from "antd/es/layout/layout";
import {Button, Menu} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import {Redirect} from "react-router-dom";
import {useState} from "react";
import './css/Nav.css'
import logo from './css/logo3.png'


function Nav(){

    const [isLogout, setIsLogout] = useState(false)
  function handleClick(e) {
    if (e === 'logout'){
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('permission')
        setIsLogout(true)
    }
  }
    if(isLogout){
        return <Redirect to="/login"/>
    }
    return(

        <Header>
            <Menu style={{}}onClick={handleClick} mode="horizontal">
                <a href='/'><img src={logo} style={{marginLeft: '25%'}} className='Logo' alt='logo'/></a>
                <Button style={{color: 'white'}} type='link' onClick={() => handleClick('logout')}>Выход</Button>
                {/*<Menu.Item style={{ color: 'white', marginRight: '25%' }} key="logout" icon={<PoweroffOutlined />}>Выход</Menu.Item>*/}
            </Menu>

        </Header>

    )
}

export default Nav