import {Button} from "antd";
import {useHistory} from "react-router-dom";
import API from "../API";



function AdminButton() {

    const history = useHistory();

    function handleClick(e) {
        if (e !== 'upload_user') {
            history.push(e);
        }
        if (e === 'upload_user') {
            API.get('/upload_user/', {
                headers: {'Authorization': "JWT " + sessionStorage.getItem('token')}
            })
                .then(req => {
                    alert('Пользователи добавлены')
                })
                .catch(error => {
                    alert('Произошла ошибка')
                })
        }
    }


    return (
        <>
            {sessionStorage.getItem('permission') === 'SuperAdmin' ?
                <>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('create_user')}>
                        Добавить пользователя
                    </Button>
                    <Button style={{margin: "5px", width: 240}} onClick={() => handleClick('list_users')}>
                        Список пользователей
                    </Button><br/>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('create_poll')}>
                        Создать опрос
                    </Button>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('create_test')}>
                        Создать тест
                    </Button><br/>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('analytics')}>
                        Аналитика
                    </Button>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('upload_user')}>
                        Загрузить пользователей
                    </Button>
                </>
                : null
            }
            {sessionStorage.getItem('permission') === 'PollAdmin' ?
                <>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('create_poll')}>
                        Создать опрос
                    </Button>
                    <Button style={{margin: "5px", width: 240}} type="primary" ghost
                            onClick={() => handleClick('create_test')}>
                        Создать тест
                    </Button>
                </> : null}
        </>
    )
}
export default AdminButton