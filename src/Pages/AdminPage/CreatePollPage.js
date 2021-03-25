import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {Button, DatePicker, Divider, Form, Input, Select, Switch} from "antd";
import {LeftOutlined,} from "@ant-design/icons";
import {useHistory} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import {useState} from "react";
import ModalQuestions from "../../components/ModalQuestions";



function CreatePollPage(){

    const history = useHistory();

    const [latePosting, setLatePosting] = useState()

    function handleClick(e) {
            console.log(e)
            history.push(e);
            }

    const onFinish = (values: any) => {
        console.log(values);

    };

    function handleChange(value) {


    }
    function onChange(checked) {
        setLatePosting(checked)
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
                <Form.Item>

                </Form.Item>

                <Form.Item name='latePosting' label='Отложный постинг:'>
                    <Switch defaultUnChecked onChange={onChange} />
                </Form.Item>
                    {latePosting?
                        <Form.Item name='datePosting'>
                            <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                        </Form.Item>:null}

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Создать
                    </Button>
                  </Form.Item>


            </Form>
            <ModalQuestions />
        </Content>
        </>
    )
}
export default CreatePollPage