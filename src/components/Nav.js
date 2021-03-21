import {Header} from "antd/es/layout/layout";
import {Menu} from "antd";
import {PoweroffOutlined} from "@ant-design/icons";
import {Redirect} from "react-router-dom";
import {useState} from "react";
import './css/Nav.css'
import logo from './css/logo.svg'


function Nav(){

    const [isLogout, setIsLogout] = useState(false)
  function handleClick(e) {
    if (e.key === 'logout'){
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
            <Menu onClick={handleClick} mode="horizontal">
                <img src={logo} className='Logo' alt='logo'/>
                <Menu.Item key="logout" icon={<PoweroffOutlined />}/>
            </Menu>
        </Header>

    )
}

export default Nav