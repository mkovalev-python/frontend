import {Button, Card, Col, Collapse, Divider, Form, Modal, Row, Select, Spin} from "antd";
import {useEffect, useState} from "react";
import API from "../../API";
import Meta from "antd/es/card/Meta";
import zagl from "../css/zagl.jpg";
import Radio from "antd/es/radio/radio";
import {useHistory} from "react-router-dom";
const { Panel } = Collapse;


const ModalPoll = ({visible,params, onCancel, onCreate}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [poll, setPoll] = useState([])
    const [title, setTitle] = useState('Title')
    const [form] = Form.useForm();

    useEffect(()=>{
        API.get('/get/poll/team/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {id:params.id, type: params.type}
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
            width={1000}
            onOk={() => {
                form
                  .validateFields()
                  .then((values) => {
                    form.resetFields();

                    const data={'answers': values,
                                'id_poll':poll.poll_info.id,
                                'user_id':sessionStorage.getItem('user_id'),
                                'type':poll.type}
                    onCreate(data);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}>
            {isLoading?<h1>Прохождение опроса недоступно</h1>:

                <Form form={form}>
                    {poll.questions.map(question =>(
                            <Form.Item name={question.question} rules={[{ required: true, message: 'Вы не ответили на вопрос' }]}>
                                <p style={{ wordWrap: "break-word", width: "30%" }}>{question.question}</p>
                                <Radio.Group style={{ width: '100%' }}>
                            {question.answer.map(answer=>(
                                    <Radio value={answer}>{answer}</Radio>
                                ))}
                                </Radio.Group>

                            </Form.Item>

                    ))}
                </Form>}
        </Modal>
    )
}


function Polls() {
    const [isLoading, setIsLoading] = useState(true)
    const [polls, setPolls] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState([])

        function onClick(id, type){
        setParams({id:id, type: type})
        setIsModalVisible(true)


    }
    const history = useHistory();
    const onCreate = (values: any) => {
        API.post('/check/poll/team/',values)
            .then(res=>{

            })
            .catch(error=>{

            })

        setIsModalVisible(false);
        history.push('/');
    };


    useEffect(() => {
        API.get('/get/poll/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res => {
                setPolls(res.data)
                setIsLoading(false)

            })
    }, [])

    if (isLoading) {
        return <Spin/>
    }
    return (
        <>
            <Divider>Активные опросы</Divider>
            <Collapse defaultActiveKey={['1','3']} ghost>
                {polls['service'] === null ? null :
                    <Panel header="Службы" key="1">
                        <Row gutter={[26, 8]}>
                            {polls['service'].map(p => (
                                <Col>
                                    <Card style={{width: 300}}
                                          cover={
                                              <img
                                                  alt="example"
                                                  src={zagl}
                                              />
                                          }
                                          actions={[
                                              <Button type="primary" ghost onClick={() => onClick(p.id, 'service')}>Пройти опрос</Button>,
                                          ]}
                                    >
                                        <Meta title={p.title} description={p.description}/>
                                        <span>Количество баллов: <b>{p.points}</b> </span>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Panel>}
                    {polls['spiker']===null?null:
                    <Panel header= "Оценка спикера" key="2">
                        <Row gutter={[26, 8]}>
                            {polls['spiker'].map(p=>(
                                <Col>
                                  <Card style={{ width: 300 }}
                                        cover={
                                          <img
                                            alt="example"
                                            src={zagl}
                                          />
                                        }
                                        actions={[
                                            <Button type="primary" ghost onClick={() => onClick(p.id, 'spiker')}>Пройти опрос</Button>,
                                        ]}
                                >
                                          <Meta title={p.title} description={p.description}/>
                                          <span>Количество баллов: <b>{p.points}</b> </span>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Panel>}
                {polls['test']===null?null:
                    <Panel header= "Тестирование по Компетенциям" key="3">
                        <Row gutter={[26, 8]}>
                            {polls['test'].map(p=>(
                                <Col>
                                  <Card style={{ width: 300 }}
                                        cover={
                                          <img
                                            alt="example"
                                            src={zagl}
                                          />
                                        }
                                        actions={[
                                            <Button type="primary" ghost onClick={() => onClick(p.id, 'test')}>Пройти тест</Button>,
                                        ]}
                                >
                                          <Meta title={p.title} description={p.description}/>
                                          <span>Количество баллов: <b>{p.points}</b> </span>
                                    </Card>
                                </Col>

                            ))}
                        </Row>
                    </Panel>}
            </Collapse>
            {isModalVisible?<ModalPoll visible={isModalVisible}
                                       onCreate={onCreate}
                                       params={params} onCancel={() => {setIsModalVisible(false);}}/>:null}
        </>
    )
}
export default Polls