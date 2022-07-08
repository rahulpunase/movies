import { Button, Col, Input, Modal, Row, Typography } from "antd";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, TRootState } from "src/redux/store";
import { Icon } from "src/lib";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "src/services/instance/supabase.instance";

const { Title, Text } = Typography;

const LoginView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigateBack = () =>
    navigate(state.backgroundLocation?.pathname as string, { replace: true });
  const emailRef = useRef<any>();
  const [error, setError] = useState<string>("");
  const [linkSent, setLinkSent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { isUserLoggingIn } = useSelector(
    (store: TRootState) => store.profilereducer
  );

  const sendLoginUser = async () => {
    if (emailRef.current) {
      const email = emailRef.current.input.value;
      if (email) {
        setIsLoading(true);
        const { user, error } = await supabase.auth.signIn({
          email: email,
        });
        setError("");
        setLinkSent(`Confirmation link is sent to your email id, ${email}`);
        setIsLoading(false);
      } else {
        setError("You must provide a email and password.");
      }
    }
  };

  return (
    <Modal
      footer={false}
      visible={true}
      onCancel={navigateBack}
      style={{ top: "20%" }}
    >
      <Row>
        <Col span={24} className="mb-2">
          <Title level={3}>Login</Title>
        </Col>
        <Col span={24} className="mb-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="pa-3 theme-secondary-input-background br-3 mb-1"
            ref={emailRef}
          />
          <Text type="secondary">We'll send a link to your email</Text>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            block
            className="pa-3"
            style={{ height: "unset" }}
            onClick={sendLoginUser}
            loading={isLoading}
          >
            Send Link
          </Button>
        </Col>
      </Row>
      {error && (
        <Col span={24} className="mt-4">
          <Icon icon={faExclamationCircle} />
          <Text className="ml-4">{error}</Text>
        </Col>
      )}
      {linkSent && (
        <Col span={24} className="mt-4">
          <Icon icon={faExclamationCircle} />
          <Text className="ml-4">{linkSent}</Text>
        </Col>
      )}
    </Modal>
  );
};

export default LoginView;
