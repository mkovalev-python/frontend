import {useState} from "react";
import {Button, Modal, Form, Input, Space} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
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

          <Form.List name="answers">
        {(fields, { add, remove }) => (
          <>
            {fields.map(field => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...field}
                  name={[field.name, 'answer']}
                  fieldKey={[field.fieldKey, 'answer']}
                  rules={[{ required: true, message: 'Введите вариант ответа' }]}
                >
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
      </Form.List>


      </Form>
    </Modal>
  );
};


function ModalQuestions(){

    const [visible, setVisible] = useState()
    const [someArray, setSomeArray] = useState([])

    const onCreate = (values) => {
    console.log('Received values of form: ', values);





        console.log('SOME: ',someArray)
    setVisible(false);
  };

    return(
        <>
        <Button type="primary" onClick={() => {setVisible(true);}}>
        New Collection
      </Button>
        <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={() => {setVisible(false);}}/>
      </>
    )

}
export default ModalQuestions