import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {Button, Divider, Form, Input, InputNumber, Select, Space} from "antd";
import {LeftOutlined, MinusCircleOutlined, PlusOutlined,} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import {useState} from "react";


function CreatePollPage(){

    const history = useHistory();
    const [categoryset, setCategorySet] = useState()

    function handleClick(e) {
            console.log(e)
            history.push(e);
            }

            const onFinish = (values: any) => {
                console.log(values);
            };
    function handleChange(value) {
        setCategorySet(value)
    }

    return(
        <>
        <Nav />
        <ProfileStaff/>
        <Content>
          <Divider>Создать опрос</Divider>
            <Button style={{float: 'left'}} type="link" icon={<LeftOutlined />} ghost onClick={() => handleClick('')}>
                На главную
            </Button>

            <Form onFinish={onFinish}>
                <Form.Item name='title' label='Заголовок опроса'>
                    <Input placeholder='Введите заголовок опроса'/>
                </Form.Item>

                <Form.Item name='description' label='Описание опроса'>
                    <TextArea maxLength={255} rows={4} placeholder='Введите описание опроса'/>
                </Form.Item>

                <Form.Item name='category' label='Категория опроса'>
                   <Select placeholder="Укажите категорию" onChange={handleChange}>
                       <Option value='participant'>Участники</Option>
                       <Option value='service'>Службы</Option>
                   </Select>
                </Form.Item>

                {categoryset==='participant'?
                    <Form.List name="questions">
                        {(fields, { add, remove }) => (
                              <>
                                    {fields.map(field => (
                                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                              <span>{field.key + 1}</span>
                                                <Form.Item
                                                  {...field}
                                                  name={[field.name, 'question']}
                                                  fieldKey={[field.fieldKey, 'question']}
                                                >
                                                  <Input placeholder="Вопрос" />
                                                </Form.Item>

                                                <Form.Item label='Укажите вариант ответа'
                                                           name={[field.name, 'answer']}
                                                           fieldKey={[field.fieldKey, 'answer']}>
                                                        <InputNumber defaultValue={0} min={5} max={100} step={5}/>
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                          </Space>
                                    ))}
                                    <Form.Item>
                                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Добавить вопрос
                                      </Button>
                                    </Form.Item>
                              </>
                        )}
                    </Form.List>
                    :
                <Form.List name="questions">
                        {(fields, { add, remove }) => (
                              <>
                                    {fields.map(field => (
                                          <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                <Form.Item name={[field.name, 'question']}>
                                                  <Input placeholder="Вопрос" />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                          </Space>
                                    ))}

                                    <Form.Item>
                                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Добавить вопрос
                                      </Button>
                                    </Form.Item>

                              </>
                        )}
                    </Form.List>}

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                          Создать
                        </Button>
                      </Form.Item>


            </Form>

        </Content>
        </>
    )
}
export default CreatePollPage