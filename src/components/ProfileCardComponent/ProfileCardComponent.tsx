import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button, Col, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "src/lib";
import { TRootState } from "src/redux/store";
import { supabase } from "src/services/instance/supabase.instance";
import styles from "./ProfileCardComponent.module.scss";

const { Text } = Typography;

const ProfileCardComponent = () => {
  const { profile } = useSelector((store: TRootState) => store.profilereducer);
  const logout = () => supabase.auth.signOut();
  return (
    <Row
      className={`pa-4 theme-primary w-100 br-2 ${styles.ProfileCardComponent}`}
    >
      <div className={styles.edit}>
        <Link to="/u/profile/">
          <Icon icon={faEdit} />
        </Link>
      </div>
      <Col>
        <div className={styles.profilePic} />
      </Col>
      <Col className="ml-4">
        <div>
          <Text strong>{profile.fullname}</Text>
        </div>
        <div>
          <Text type="secondary">{profile.email}</Text>
        </div>
        <div>
          <Text type="secondary">@{profile.username}</Text>
        </div>
        <div className="mt-4">
          <Button onClick={() => logout()} type="default">
            Logout
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProfileCardComponent;
