import {useEffect, useState} from "react";
import API from "../API";
import {Button, Card, Col, Divider, Modal, Row, Select, Spin} from "antd";
import {Content} from "antd/es/layout/layout";
import Meta from "antd/es/card/Meta";
import {Option} from "antd/es/mentions";


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
                    <img style={{ width: '100%' }} alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
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


function LatePolls(){
    const [polls,setPolls] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [params, setParams] = useState([])

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


    useEffect(()=>{
        API.get('/get/archive/polls/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res=>{
                setPolls(res.data)
                setIsLoading(false)
            })

    },[])

    if(isLoading){
        return <Spin/>
    }


    return(
        <Content>
        <Divider>Архивные опросы</Divider>
            <Row gutter={[26, 8]}>
            {polls.map(p=>(
                <Col>
                      <Card style={{ width: 300 }}
                            cover={
                              <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                              />
                            }
                            actions={[
                                <Button type="primary" disabled ghost onClick={() => onClick(p.id, 'view')}>Просмотр</Button>,
                                <Button onClick={() => onClick(p.id, 'public', p.num_comp)}>Опубликовать</Button>,

                            ]}
                    >
                          <Meta title={p.title} description={p.description}/>
                          <span>Количество баллов: <b>{p.points}</b> </span>
                    </Card>
                </Col>
            ))}
            </Row>
            {isModalVisible?<ModalPoll visible={isModalVisible} params={params} onCancel={() => {setIsModalVisible(false);}} />:null}
        </Content>
    )
}
export default LatePolls