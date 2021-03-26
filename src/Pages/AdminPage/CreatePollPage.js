import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";
import {
    Button,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Select,
    Space,
    Switch,
    Table
} from "antd";
import {LeftOutlined, MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Redirect, useHistory} from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import {Option} from "antd/es/mentions";
import {useState} from "react";
import API from "../../API";



const CollectionCreateForm = ({ visible, onCreate, onCancel, category }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Создание нового вопроса"
      okText="Создать"
      cancelText="Отмена"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item name="question" label="Вопрос"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите название вопроса!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {category==='participant'?
            <Form.Item label='Введите вариант ответа от 2 до 100' name={'answer'} fieldKey={'answer'} rules={[{ required: true, message: 'Введите вариант ответа от 2 до 100' }]}>
                <InputNumber min={2} max={100} defaultValue={3} />
            </Form.Item>:
            <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">

                      <Form.Item{...field} name={[field.name, 'answer']} label='Введите вариант ответа' fieldKey={[field.fieldKey, 'answer']} rules={[{ required: true, message: 'Введите вариант ответа' }]}>
                            <Input placeholder="Вариант ответа" />
                      </Form.Item>


                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Добавить еще один вариант ответа
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>}


      </Form>
    </Modal>
  );
};

function ModalQuestions({get_questions, Category}){

    const [visible, setVisible] = useState()
    const [someArray, setSomeArray] = useState([])
    const [delQuestion,setQuestion] = useState()


    function handleCl(e) {
        setQuestion(e)
            }

    function confirm(e) {
      const newList = someArray.filter((item) => item.question !== delQuestion)
        debugger;
        setSomeArray(newList)
        get_questions(newList)
      message.success('Вопрос '+delQuestion+' удален');


    }
    function cancel(e) {

    }

    const columns = [
        {
        title: 'Вопрос',
        dataIndex: 'question',
        key: 'question',
      },

        {
    title: '',
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
          <a onClick={() => handleCl(record.question)}>Удалить</a>
  </Popconfirm>
      </Space>
    ),
  },
    ];

    const onCreate = (values) => {
        someArray.push(values)
        setVisible(false);
        get_questions(someArray)

  }

    return(
        <>
        <Button type="primary" onClick={() => {setVisible(true);}}>Добавить вопрос</Button>
            {!visible?<Table dataSource={someArray} columns={columns} /> :null}
        <CollectionCreateForm visible={visible} onCreate={onCreate} category={Category} onCancel={() => {setVisible(false);}}/>
      </>
    )

}


function CreatePollPage(){

    const history = useHistory();

    const [latePosting, setLatePosting] = useState()
    const [category, setCategory] = useState()
    const [questions, setQuestions] = useState()
    const [created, setCreated] = useState(false)
    const  get_questions = (e) => {
        setQuestions(e)
    }




    function handleClick(e) {
            console.log(e)
            history.push(e);
            }

    const onFinish = (values: any) => {
        console.log(values)
        console.log(questions)

        const data = {info: values, questions:questions}

        console.log(data)

        API.post('/create/new/poll/',data)
            .then(res=>(
                setCreated(true)
            ))
            .catch(error=>(
                console.log(error.response)
            ))
    };


    function handleChange(value) {
        setCategory(value)
    }
    function onChange(checked) {
        setLatePosting(checked)
    }
    if(created){
            return <Redirect to="/"/>
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
                    <ModalQuestions get_questions={get_questions} Category={category}/>
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

        </Content>
        </>
    )
}
export default CreatePollPage