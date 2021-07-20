import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {Button, Divider, Drawer, Form, InputNumber, message, Popconfirm, Skeleton, Space, Spin, Table} from "antd";
import {LeftOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Redirect, useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import API from "../../API";
import Search from "antd/es/input/Search";
const { Column } = Table;

function DeleteUserPage(){

    const history = useHistory();
    const [copyListUsers, setCopyListUser] = useState('')


    function handleClick(e) {
            console.log(e)
            history.push(e);
            }

    function handleCl(e) {
        setDelUser(e)
            }

    function confirm(e) {
      console.log(delUser);
      API.delete('/delete/user/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            data: {username:delUser}
        })
          .then(res=>{
              message.success('Пользователь '+delUser+' удален, обнови страницу!');
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
                setCopyListUser(res.data)
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
          <a onClick={() => showDrawer(record.username)}>Подробнее</a>

      </Space>
    ),
  },
];

    const [visible, setVisible] = useState(false);
    const [infoUser, setInfoUser] = useState('')
    const [addUser, setAddUser] = useState(false)
    function showDrawer(e){
        API.get('/get/users/info/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {username: e}
        })
            .then(res=>{
                console.log(res.data)
                setInfoUser(res.data)
            })
            .catch(error=>{
                console.log(error.response)
            })
    setVisible(true);

    }
    const onClose = () => {
    setInfoUser('')
    setVisible(false);
  };

    if(isLoading){
        return <Spin/>
    }

   if(sessionStorage.getItem('permission')!=='SuperAdmin'){
        return <Redirect to="/"/>
    }

   const onFinish = (values) => {
       API.get('/pull/points/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {points: values['points'], username: infoUser.username}
        })
            .then(res=>{
                message.success('Баллы успешно добавлены!')
                infoUser.points = res.data.points
                setAddUser(false);

            })
            .catch(error=>{
                message.error('Баллы не изменены!')
                setAddUser(false);
            })
   }
   const onSearch = value => {
       API.get('/search/user/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {value}
        })
            .then(res=>{
                console.log(res.data)
                setUsers(res.data)
            })
            .catch(error=>{

            })
   }

   const sendNewPassword = value => {
    API.get('/send/new/password', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {value}
        })
            .then(res=>{
                message.success('Пароль успешно отправлен')
            })
            .catch(error=>{
                message.error('Возможно у пользователя нет электронного адреса')
            })
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
                <Search style={{width: '30%'}} placeholder="Поиск по Фамилии или Имени" enterButton onSearch={onSearch}/>
                <Button onClick={() => {setUsers(copyListUsers)}} type='link'>Сброс поиска</Button>

            <Table dataSource={users} columns={columns} />
                <Drawer width='30%' title={infoUser === ''?<Skeleton.Input style={{ width: 250 }} active={false} size={'default'} />:<p>{infoUser.FirstLastName}</p>} placement="right" closable={false} onClose={onClose} visible={visible}>
                    {infoUser === ''?<Skeleton />:
                        <div>
                            <h3>Информация о пользователе</h3>
                            <p>Логин: {infoUser.username}</p>
                            <p>Дата Рождения: {infoUser.birthday}</p>
                            <p>Город: {infoUser.country}</p>
                            <p>Дата регистрации: {infoUser.dataJoin}</p>
                            <p>Команда: {infoUser.team}</p>
                            <p>Смена: {infoUser.session}</p>
                            <p>Баллы: {infoUser.points}</p>
                            {addUser?<Form onFinish={onFinish}>
                                <Divider>Начисление баллов</Divider>
                                <Form.Item name="points" style={{float: 'left', marginRight: 20}}>
                                    <InputNumber placeholder='Баллы'/>
                                </Form.Item>
                                <Form.Item style={{float: 'left'}}>
                                    <Button type="" htmlType="submit">+</Button>
                                </Form.Item>
                            </Form>:null}
                            <Button style={{width: '100%'}} type='primary' onClick={() => {setAddUser(true);}} >Добавить баллов</Button>
                            <Button style={{marginTop: '2%', width: '100%'}} type='primary' onClick={() => {sendNewPassword(infoUser.username)}}>Отправить новый пароль</Button>

                            <h3>Список пройденных опросов</h3>
                            <Table dataSource={infoUser.name_polls} scroll={{ y: 1500 }}>
                                <Column width='20%' title="№п/п" dataIndex="num" key="num" />
                                <Column title="Название опроса" dataIndex="name" key="name" />
                            </Table>
                            <h3>Список пройденных тестов</h3>
                            <Table dataSource={infoUser.name_test} scroll={{ y: 1500 }}>
                                <Column width='20%' title="№п/п" dataIndex="num" key="num" />
                                <Column title="Название теста" dataIndex="name" key="name" />
                            </Table>
                        </div>}
                </Drawer>
            </Content>
        </>
    )
}
export default DeleteUserPage