import {
    Alert,
    Button,
    Card,
    Col,
    Divider,
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
import React, {useEffect, useState } from 'react';

import API from "../API";
import zagl from './css/zagl.jpg'
import { Radio } from 'antd';
import TextArea from "antd/es/input/TextArea";
import {EditOutlined} from "@ant-design/icons";


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
                console.log(res.data)
                setPoll(res.data)
                setTitle(res.data.poll_info[0].title)
                setIsLoading(false)

            })
    },[])

    return(
        <Modal
            visible={visible}
            title={title}
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
                        <Radio.Group style={{ width: '100%' }}>
                    {question.answer.map(answer=>(
                            <Radio.Button value={answer}>{answer}</Radio.Button>
                        ))}

                        </Radio.Group>

                            {question.freeAnswer?<><p>Свой вариант</p><TextArea showCount maxLength={100} /></>:null}
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

function ActivePolls(){
    const [polls,setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState([])
    const [visible, setVisible] = useState(false);

    function onClick(id,type, comp){
        setParams({id:id, type:type, comp: comp})
        console.log(comp)
        if(type==='view'){
            message.warning("Просмотр тестов временно не работает")
            setIsModalVisible(true)
        }
        else {
            API.post('/move/polls/', {id:id, type:type, comp: comp})
                .then(res=>{
                    window.location.reload()
                })
                .catch(error=>{})
        }

    }


    useEffect(()=>{
        API.get('/get/active/polls/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                console.log(res.data)
                setPolls(res.data)
                setIsLoading(false)
            })

    },[])

    if(isLoading){
        return <Spin/>
    }




    const onCreate = (values) => {
      console.log('Received values of form: ', values);
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
        <Divider>Активные опросы</Divider>
            <Row gutter={[26, 8]}>
            {polls.map(p=>(
                <Col>
                      <Card style={{ width: 300 }}
                            cover={
                                <>
                                    <img alt="example" src={zagl}/>
                                    <Button onClick={() => {setParams(p);setVisible(true);}} icon={<EditOutlined/>}>Изменить</Button>
                                    <CollectionCreateForm visible={visible} p={params} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
                                </>
                            }
                            actions={[
                                <Button type="primary" ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                <Button onClick={() => onClick(p.id, 'archive', p.num_comp)}>В архив</Button>,
                                <Button danger onClick={() => onClick(p.id, 'delete', p.num_comp)}>Удалить</Button>
                            ]}
                    >
                          <Meta  title={p.title} description={p.description}/>
                          <span>Количество баллов: <b>{p.points}</b> </span>
                          <span>Смена: <b>{p.session}</b></span>

                    </Card>
                </Col>
            ))}
            </Row>
            {isModalVisible?<ModalPoll visible={isModalVisible} params={params} onCancel={() => {setIsModalVisible(false);}} />:null}
        </Content>
    )
}
export default ActivePolls