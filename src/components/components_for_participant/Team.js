import {Avatar, Button, Col, Divider, Empty, Form, message, Modal, Row, Select, Spin} from "antd";
import {useEffect, useState} from "react"
import API from "../../API";
import Title from "antd/es/typography/Title";

import avatar from '../css/avatar.jpg'
import Radio from "antd/es/radio/radio";

const ModalPoll = ({visible,params, onCancel, onCreate}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [poll, setPoll] = useState([])
    const [title, setTitle] = useState('Увы..Опрос недоступен или Вы его прошли!')
    const [form] = Form.useForm();

    useEffect(()=>{
        API.get('/get/poll/team/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {id:params.id}
        })
            .then(res => {
                console.log(res.data)
                setPoll(res.data)
                setTitle(res.data.poll_info.title)
                setIsLoading(false)
            })
            .catch(error => {
                console.log(error.request)
            })
    },[])

    return(
        <Modal
            visible={visible}
            title={title}
            okText="Ответить"
            cancelText="Отмена"
            onCancel={onCancel}
            onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();

                    const data={'answers': values,
                                'id_poll':poll.poll_info.id,
                                'user_id':sessionStorage.getItem('user_id'),
                                'user_poll_id':params.id}
                    onCreate(data);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}>
            {isLoading?<h1>Прохождение опроса недоступно</h1>:

                <Form form={form}>
                    {poll.questions.map(question =>(
                        <><p style={{ wordWrap: "break-word",fontSize:'1.2em',fontWeight:'bold', width: "100%", padding: '0.5%' }}>{question.question}</p>
                            <Form.Item name={question.question} rules={[{ required: true, message: 'Вы не ответили на вопрос' }]}>
                                <Radio.Group style={{ width: '100%' }}>
                            {question.answer.map(answer=>(
                                    <Radio value={answer}>{answer}</Radio>
                                ))}
                                </Radio.Group>

                            </Form.Item></>

                    ))}
                </Form>}
        </Modal>
    )
}

function Team(){
    const [team, setTeam] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState([])

    function onClick(id){
        setParams({id:id})
        setIsModalVisible(true)


    }

    const onCreate = (values: any) => {
        API.post('/check/poll/team/',values)
            .then(res=>{
                    message.success('Опрос пройдет успешно')
                window.location.reload();

            })
            .catch(error=>{
                    message.error('Упс.. Что-то пошло не так!')
            })

        setIsModalVisible(false);

    };

    useEffect(()=>{
        API.get('/get/team/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                setTeam(res.data)
                console.log(res.data)
                })
            .catch(error=>{
                console.log(error.response)
            })

    },[])
    return(
        <div>
            <Divider>Моя команда</Divider>
            <Row>
            {team.length === 0?<Empty />:
                team.map(t=>(
                <Col order={4} style={{ width: 180, margin: 20, padding: 10, border: '1px solid lightgray' }}>
                        <Avatar shape="square" src = {avatar} size ={ 160 }/>
                  <Title level={5} style={{ marginTop: 20, textAlign: 'center' }}>{t.first_name} {t.last_name}</Title>
                  <Button style={{width: '100%'}} type="primary" ghost onClick={() => onClick(t.id)}>Оценить</Button>
                </Col>
                ))
               }
            </Row>
            {isModalVisible?<ModalPoll visible={isModalVisible} onCreate={onCreate} params={params} onCancel={() => {setIsModalVisible(false);}}/>:null}

        </div>
    )
}

export default Team