import {Button} from "antd";
import {useHistory} from "react-router-dom";



function AdminButton(){

    const history = useHistory();

    function handleClick(e) {
        console.log(e)
        history.push(e);
        }


    return(
    <>
        {sessionStorage.getItem('permission')==='SuperAdmin'?
            <>
            <Button style={{ margin: "5px", width: 240 }} type="primary" ghost onClick={() => handleClick('create_user')}>
                Добавить пользователя
            </Button>
            <Button style={{ margin: "5px", width: 240 }} onClick={() => handleClick('list_users')}>
                Список пользователей
            </Button>
            </>
            :null
        }
    </>
    )
}
export default AdminButton