import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Button, Col, Input, Row, Typography } from "antd";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "src/lib";
import { supabase } from "src/services/instance/supabase.instance";
const { Title, Text } = Typography;

const LoginComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigateBack = () =>
    navigate(state.backgroundLocation?.pathname as string, { replace: true });
  const emailRef = useRef<any>();
  const [error, setError] = useState<string>("");
  const [linkSent, setLinkSent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: "https://www.google.com",
      }
    );
  };

  const sendLoginUser = async () => {
    if (emailRef.current) {
      const email = emailRef.current.input.value;
      if (email) {
        setIsLoading(true);
        const { user, error } = await supabase.auth.signIn(
          {
            email: email,
          },
          {
            redirectTo: window.location.href,
          }
        );
        setError("");
        setLinkSent(`Confirmation link is sent to your email id, ${email}`);
        setIsLoading(false);
      } else {
        setError("You must provide a email and password.");
      }
    }
  };
  return (
    <Row>
      <Col span={24}>
        <Button
          block
          onClick={() => signInWithGoogle()}
          style={{
            background: "transparent",
          }}
        >
          <Text className="mr-4">Login with Google</Text>{" "}
          <Icon icon={faGoogle} />
        </Button>
      </Col>
    </Row>
  );
};

export default LoginComponent;
