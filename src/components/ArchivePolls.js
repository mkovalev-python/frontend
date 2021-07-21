import React, {useEffect, useState} from "react";
import API from "../API";
import {
    Button,
    Card,
    Col,
    Collapse,
    Divider, Empty,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Row,
    Select,
    Skeleton,
    Spin
} from "antd";
import {Content} from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
import {Option} from "antd/es/mentions";
import zagl from "./css/zagl.jpg";
import {EditOutlined} from "@ant-design/icons";
const { Panel } = Collapse;


const ModalPoll = ({visible,params, onCancel}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [poll, setPoll] = useState([])
    const [title, setTitle] = useState('Title')

    useEffect(()=>{
        API.get('/get/view/poll/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')},
            params: {id:params.id}
        })
            .then(res => {
                setPoll(res.data)
                setTitle(res.data.poll_info[0].title)
                setIsLoading(false)

            })
    },[])

    return(
        <Modal
            visible={visible}
            title={title}
            okText="Редактировать"
            cancelText="Отмена"
            onCancel={onCancel}>
            {isLoading?<Spin/>:
                <>
                    <img style={{ width: '100%' }} alt="example" src={zagl}/>
                    <Meta description={poll.poll_info[0].description}/>
                    <Divider>Вопросы</Divider>
                    {poll.questions.map(question =>(
                        <>
                        <h4>{question.id}) {question.question}</h4>
                        <Select placeholder='Выберите ответ' style={{ width: '100%' }}>
                    {question.answer.map(answer=>(
                            <Option value={answer}>{answer}</Option>
                        ))}
                        </Select>
                        </>
                    ))}
                </>}
        </Modal>
    )
}

const CollectionCreateForm = ({ visible,p, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [params, setParams] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
      setParams(p)
      setLoading(false)
  })

  return (
    <Modal
      visible={visible}
      title={p.title}
      okText="Изменить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {

          });
      }}
    >{loading?<Skeleton />:
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        fields={[{"name": ["title"], "value": p.title},
                 {"name": ["description"], "value": p.description},
                 {"name": ["points"], "value": p.points},
                 {"name": ["session"], "value": p.session},
                 {"name": ["comp"], "value": p.num_comp},
                 {"name": ["id"], "value": p.id}
        ]}

      >
        <Form.Item name='id' label='ID'>
            <InputNumber disabled/>
        </Form.Item>
        <Form.Item name="title" label="Название">
          <Input value={p.title} />
        </Form.Item>
        <Form.Item name="description" label="Описание">
          <Input.TextArea type="textarea" maxLength={255} />
        </Form.Item>
        <Form.Item name='points' label='Баллы'>
            <InputNumber min={1}/>
        </Form.Item>
        <Form.Item name='session' label='Смена'>
            <InputNumber min={1} max={5}/>
        </Form.Item>
          {p.num_comp &&
          <Form.Item name='comp' label='Компетенция'>
            <InputNumber max={4} min={1}/>
        </Form.Item>}

      </Form>}
    </Modal>
  )
}


function LatePolls(){
    const [polls,setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState([])
    const [visible, setVisible] = useState(false);

    function onClick(id,type, comp){
        setParams({id:id, type:type, comp: comp})
        if(type==='view'){
            setIsModalVisible(true)}
        else {
            API.post('/move/polls/', {id:id, type:type, comp: comp})
                .then(res=>{
                    window.location.reload()
                })
                .catch(error=>{})
        }


    }
    function onClickReport(id,type, comp){
        setParams({id:id, type:type, comp: comp})
        if(type==='view'){
            setIsModalVisible(true)}
        else {
            API.post('/move/polls/', {id:id, type:type, comp: comp})
                .then(res=>{
                    const link = document.createElement('a');
                    link.href = res.data['link'];
                    link.click();
                })
                .catch(error=>{})
        }


    }


    useEffect(()=>{
        API.get('/get/archive/polls/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                console.log(res)
                setPolls(res.data)
                setIsLoading(false)
            })

    },[])

    if(isLoading){
        return <Spin/>
    }

    const onCreate = (values) => {
      API.post('/edit/',values)
            .then(res=>(
                message.success('Изменения сохранены')
            ))
            .catch(error=>(
                message.error('Ошибка')
            ))
      setVisible(false);
    };


    return(
        <Content>
        <Divider>Архивные опросы</Divider>
            <Collapse defaultActiveKey={[]} ghost>
                    <Panel header="Смена 1" key="1">
                        <Row gutter={[26, 8]}>
                            {polls[1].length === 0 && <Empty description={'Опросов в этой смене нет'}/>}
                        {polls[1].map(p=>(
                            <Col>
                                  <Card style={{ width: 350 }}
                                        cover={
                                            <>
                                                <img alt="example" src={zagl}/>
                                                <Button onClick={() => onClickReport(p.id, 'report', p.num_comp)}>Отчет</Button>
                                                <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                                <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                            </>
                                        }
                                        actions={[
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'copy',p.num_comp)}>Копировать</Button>,
                                            <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Публикация</Button>,


                                        ]}
                                >
                                      <Meta title={p.title} description={p.description}/>
                                      <span>Количество баллов: <b>{p.points}</b> </span>
                                      <span>Смена: <b>{p.session}</b> </span>

                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </Panel>
                    <Panel header="Смена 2" key="2">
                        <Row gutter={[26, 8]}>
                            {polls[2].length === 0 && <Empty description={'Опросов в этой смене нет'}/>}
                        {polls[2].map(p=>(
                            <Col>
                                  <Card style={{ width: 350 }}
                                        cover={
                                            <>
                                                <img alt="example" src={zagl}/>
                                                <Button onClick={() => onClickReport(p.id, 'report', p.num_comp)}>Отчет</Button>
                                                <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                                <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                            </>
                                        }
                                        actions={[
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'copy',p.num_comp)}>Копировать</Button>,
                                            <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Публикация</Button>,


                                        ]}
                                >
                                      <Meta title={p.title} description={p.description}/>
                                      <span>Количество баллов: <b>{p.points}</b> </span>
                                      <span>Смена: <b>{p.session}</b> </span>

                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </Panel>
                    <Panel header="Смена 3" key="3">
                        <Row gutter={[26, 8]}>
                            {polls[3].length === 0 && <Empty description={'Опросов в этой смене нет'}/>}
                        {polls[3].map(p=>(
                            <Col>
                                  <Card style={{ width: 350 }}
                                        cover={
                                            <>
                                                <img alt="example" src={zagl}/>
                                                <Button onClick={() => onClickReport(p.id, 'report', p.num_comp)}>Отчет</Button>
                                                <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                                <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                            </>
                                        }
                                        actions={[
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'copy',p.num_comp)}>Копировать</Button>,
                                            <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Публикация</Button>,


                                        ]}
                                >
                                      <Meta title={p.title} description={p.description}/>
                                      <span>Количество баллов: <b>{p.points}</b> </span>
                                      <span>Смена: <b>{p.session}</b> </span>

                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </Panel>
                    <Panel header="Смена 4" key="4">
                        <Row gutter={[26, 8]}>
                            {polls[4].length === 0 && <Empty description={'Опросов в этой смене нет'}/>}
                        {polls[4].map(p=>(
                            <Col>
                                  <Card style={{ width: 350 }}
                                        cover={
                                            <>
                                                <img alt="example" src={zagl}/>
                                                <Button onClick={() => onClickReport(p.id, 'report', p.num_comp)}>Отчет</Button>
                                                <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                                <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                            </>
                                        }
                                        actions={[
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'copy',p.num_comp)}>Копировать</Button>,
                                            <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Публикация</Button>,


                                        ]}
                                >
                                      <Meta title={p.title} description={p.description}/>
                                      <span>Количество баллов: <b>{p.points}</b> </span>
                                      <span>Смена: <b>{p.session}</b> </span>

                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </Panel>
                    <Panel header="Смена 5" key="5">
                        <Row gutter={[26, 8]}>
                            {polls[5].length === 0 && <Empty description={'Опросов в этой смене нет'}/>}
                        {polls[5].map(p=>(
                            <Col>
                                  <Card style={{ width: 350 }}
                                        cover={
                                            <>
                                                <img alt="example" src={zagl}/>
                                                <Button onClick={() => onClickReport(p.id, 'report', p.num_comp)}>Отчет</Button>
                                                <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                                <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                            </>
                                        }
                                        actions={[
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                            <Button type="primary"  ghost onClick={() => onClick(p.id, 'copy',p.num_comp)}>Копировать</Button>,
                                            <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Публикация</Button>,


                                        ]}
                                >
                                      <Meta title={p.title} description={p.description}/>
                                      <span>Количество баллов: <b>{p.points}</b> </span>
                                      <span>Смена: <b>{p.session}</b> </span>

                                </Card>
                            </Col>
                        ))}
                        </Row>
                    </Panel>
            </Collapse>
            {isModalVisible?<ModalPoll visible={isModalVisible} params={params} onCancel={() => {setIsModalVisible(false);}} />:null}
        </Content>
    )
}
export default LatePolls