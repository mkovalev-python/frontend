import React, {useEffect, useState} from 'react';
import {Button, Modal, Form, Input, Radio, Divider, InputNumber, Select, Spin, Space} from 'antd';
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {LeftOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import {useHistory} from "react-router-dom";
import API from "../../API";
import Text from "antd/es/typography/Text";
import { message } from 'antd';
interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Добавление нового вопроса"
      okText="Добавить"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item name="question" label="Вопрос" rules={[{ required: true, message: 'Please input the title of collection!' }]}>
          <Input />
        </Form.Item>
        <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'answer']}
                  fieldKey={[fieldKey, 'answer']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="Вариант ответа" />
                </Form.Item>
                <Form.Item
                           {...restField}
                           name={[name, 'point']}
                           fieldKey={[fieldKey, 'point']}
                           noStyle rules={[{required: true, message: 'Введите баллы теста!'}]}>
                    <InputNumber min={1} max={25} placeholder={2}/>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Добавить вариант ответа
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [session, setSession] = useState([])
  const [listQuestions, setListQuestions] = useState([])


  useEffect(()=>{
            API.get('get/list/option/', {
        headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}})
                .then(res =>{
                    console.log(res)
                    setIsLoading(false)
                    setSession(res.data.session)

                })
                .catch(error=>{
                    console.log(error.response)
                })
        }, [])

  const onCreate = (values: any) => {
    console.log('Received values of form: ', values);
    setListQuestions([...listQuestions,values])
    setVisible(false);
  };
  const history = useHistory();
  function handleClick(e,index) {
      if(e==='delQuestion'){
          console.log(index)
          delete listQuestions[index]
          listQuestions.length= listQuestions.length -1
          setListQuestions([...listQuestions])
      }
      else{
        console.log(e)
        history.push(e);
        }
      }

  const onFinish = (values: any) => {
        API.post('post/test/', {values,listQuestions})
                .then(res =>{
                    history.push('/');
                    message.success('Тест создан');
                })
                .catch(error=>{
                    console.log(error.response)
                    message.error('Тест НЕ создан!');
                })
  }

  if(isLoading){
        return <Spin />
  }
  const listItems = listQuestions.map((listQuestions, index) => <li key={index}>
      <Text keyboard><Text strong>Вопрос: </Text>{listQuestions.question}<Button onClick={() => handleClick('delQuestion', index)} type='link' danger size="small" >Удалить</Button></Text>
      <ul>
          {listQuestions.answers.map((listQuestions) => <li>
              <Text keyboard><Text strong>Ответ: </Text>{listQuestions.answer} <Text strong>Балл:{listQuestions.point} </Text></Text></li>)}
      </ul>
      </li>)


  return (
    <>
                <Nav/>
                <ProfileStaff/>
                <Content>
                    <Divider>Создать тест</Divider>
                    <Button style={{float: 'left'}} type="link" icon={<LeftOutlined/>} ghost
                            onClick={() => handleClick('')}>
                        На главную
                    </Button>
                    <br/>
                    <Form style={{margin: '2%',marginRight:'25%',marginLeft:'25%', width: '50%'}} name="basic" initialValues={{remember: true}} onFinish={onFinish}>
                        <Form.Item label="Название теста" name="name"
                                   rules={[{required: true, message: 'Введите название теста!'}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Описание теста" name="description"
                                   rules={[{required: true, message: 'Введите описание теста!'}]}>
                            <TextArea showCount maxLength={100} />
                        </Form.Item>
                        <Form.Item label="Баллы за прохождение">
                            <Form.Item name="points" noStyle rules={[{required: true, message: 'Введите баллы теста!'}]}>
                                <InputNumber min={1} max={25} placeholder={2}/>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Смена" name='session' rules={[{ required: true, message: 'Укажите Смену' }]}>
                            <Select>
                                {session.map(c=>(
                                    <Select.Option value={c.number_session}>{c.name_session === 'Универсальное'?
                                        <b style={{ color:"red" }}>{c.name_session}</b>:
                                        <>{c.name_session} <b>(C {c.date_from_session} до {c.date_to_session})</b></>}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Номер компетенции" name="numComp" rules={[{ required: true, message: 'Укажите номер компетенции!!' }]}>
                            <Select>
                                <Select.Option value="1">Компетенция 1</Select.Option>
                                <Select.Option value="2">Компетенция 2</Select.Option>
                                <Select.Option value="3">Компетенция 3</Select.Option>
                                <Select.Option value="4">Компетенция 4</Select.Option>
                            </Select>
                        </Form.Item>
                        <Divider>Вопросы</Divider>
                        {listQuestions!==[]?<ul>{listItems}</ul>:<span>Список вопросов пуст!</span>}
                        <Button type="primary" style={{ width: '100%', marginBottom: '5px' }} onClick={() => {setVisible(true);}}>Добавить вопрос и ответы</Button>
                        <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>


                    <Form.Item>
                        <Button style={{ width: '100%', borderColor:'#54b518' ,backgroundColor: '#54b518' }} type="primary" htmlType="submit">
                          Создать
                        </Button>
                    </Form.Item>
                    </Form>
                </Content>
            </>
  );
};

export default CollectionsPage


