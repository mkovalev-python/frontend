import {Divider} from "antd";
import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import {Content} from "antd/es/layout/layout";

function AnalyticsPage(){
    return(
        <>
            <Nav />
            <ProfileStaff/>
            <Content>
                <Divider>Аналитика</Divider>
                <h1>Аналитические данные</h1>
            </Content>
        </>
    )
}
export default AnalyticsPage