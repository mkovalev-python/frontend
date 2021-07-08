import Nav from "../../components/Nav";
import ProfileStaff from "../../components/ProfileStaff";
import ActivePolls from "../../components/ActivePolls";
import LatePolls from "../../components/LatePolls";
import ArchivePolls from "../../components/ArchivePolls";
import {Footer} from "antd/es/layout/layout";

function AdminPage(){

    return(
        <>
            <Nav />
            <ProfileStaff />
            <ActivePolls/>
            <LatePolls />
            <ArchivePolls />
            <Footer style={{ textAlign: 'center' }}>MVP Territory of Meanings ©2021 1.3 Version</Footer>
        </>
    )

}

export default AdminPage