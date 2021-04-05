import {Collapse, Divider, Spin} from "antd";
import {useEffect, useState} from "react";
import API from "../../API";
const { Panel } = Collapse;

function Polls(){
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        API.get('/get/poll/', {
            headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
        })
            .then(res => {
                console.log(res.data)
                setIsLoading(false)

            })
    },[])

    if (isLoading){
        return <Spin />
    }
    return(
        <>
            <Divider>Активные опросы</Divider>
            <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="This is panel header 1" key="1">
                  <p>text</p>
                </Panel>
            </Collapse>

        </>
    )
}
export default Polls