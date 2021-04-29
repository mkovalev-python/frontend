import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {Button, Divider, message, Popconfirm, Space, Spin, Table} from "antd";
import {LeftOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Redirect, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import API from "../../API";

function DeleteUserPage(){

    const history = useHistory();

    function handleClick(e) {
            console.log(e)
            history.push(e);
            }
    function handleCl(e) {
        setDelUser(e)
            }

    function confirm(e) {
      console.log(delUser);
      message.success('Пользователь '+delUser+' удален');

      API.delete('/delete/user/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            data: {username:delUser}
        })
          .then(res=>{
              console.log(res)
          })
          .catch(error=>{
              console.log(error.response)
          })
    }
    function cancel(e) {

    }


    const [isLoading,setIsLoading] = useState(true)
    const [users,setUsers] = useState([])
    const [delUser,setDelUser] = useState()

    useEffect(()=>{
        API.get('/get/user/list/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                console.log(res.data)
                setIsLoading(false)
                setUsers(res.data)
            })
            .catch(error=>{
                console.log(error.response)
            })

    },[])

    const columns = [
  {
    title: 'Логин',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Имя',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Фамилия',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Город',
    dataIndex: 'country',
    key: 'country',
  },
        {
    title: 'Дата Рождения',
    dataIndex: 'birthday',
    key: 'birthday',
  },
        {
    title: 'Команда',
    dataIndex: 'team',
    key: 'team',
  },
        {
    title: 'Права доступа',
    dataIndex: 'permission',
    key: 'permission',
  },
        {
    title: 'Действия',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <Popconfirm
            title="Вы уверены, что хотите удалить"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Да"
            cancelText="Нет"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
          <a onClick={() => handleCl(record.username)}>Удалить</a>
  </Popconfirm>
      </Space>
    ),
  },
];


    if(isLoading){
        return <Spin/>
    }

   if(sessionStorage.getItem('permission')!=='SuperAdmin'){
        return <Redirect to="/"/>
    }

    return(
        <>
        <Nav />
        <ProfileStaff/>
        <Content>
          <Divider>Список пользователей</Divider>
            <Button style={{float: 'left'}} type="link" icon={<LeftOutlined />} ghost onClick={() => handleClick('')}>
                На главную
            </Button>

        <Table dataSource={users} columns={columns} />

        </Content>
        </>
    )
}
export default DeleteUserPage