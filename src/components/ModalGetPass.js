import {Button, Form, Input, Modal, notification, Spin} from "antd";
import API from "../API";
import {useState} from "react";

export default function ModalGetPass({visible, onCancel}) {
    const [spining, setSpining] = useState(false)
    const onFinish = (values) => {
        setSpining(true)
        API.post('post/password/', values)
            .then(res => {
                    notification.success({
                        message: 'Успешно!',
                        description: 'Пароль отправлен на указанный электронный адрес!',
                    });
                    onCancel()
                    setSpining(false)
                }
            )
            .catch(error => {
                notification.error({
                    message: 'Ошибка',
                    description: error.response.data,
                });
                onCancel()
                setSpining(false)
            })
    }
    return (

        <Modal
            centered
            title="Получение доступа в систему"
            visible={visible}
            onCancel={onCancel}
            footer={null}>
            <Spin spinning={spining} tip="Отправка пароля...">
                <Form
                    onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{required: true, message: 'Пожалуйста, введите электронную почту!'},
                            {type: 'email', message: 'Некоррекно введен E-mail!',}]}>
                        <Input placeholder="Пожалуйста, введите E-mail"/>
                    </Form.Item>
                    <Form.Item>
                        <Button className="button-block" htmlType="submit">
                            Отправить пароль
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    )
}