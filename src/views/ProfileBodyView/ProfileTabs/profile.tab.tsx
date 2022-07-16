import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, Col, Form, Input, Row, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RenderSmoothly } from "src/components";
import { Icon } from "src/lib";
import { updateProfile } from "src/redux/ducks/profile.slice";
import { AppDispatch, TRootState } from "src/redux/store";
import { CustomThemecontext } from "src/theme/themeContext";

const { Text } = Typography;

const ProfileTab = () => {
  const { getColors } = useContext(CustomThemecontext);
  const { session, profile } = useSelector(
    (store: TRootState) => store.profilereducer
  );
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const onProfileUpdate = async (data: any) => {
    if (!session || !session.user) return;
    setIsUpdatingProfile(true);
    const { username, fullname } = data;
    dispatch(
      updateProfile({
        username,
        fullname,
      })
    ).then((_) => setIsUpdatingProfile(false));
  };

  useEffect(() => {
    if (!profile) return;
    setUsername(profile.username);
  }, [profile]);

  if (!session || !session.user || profile.isLoading) {
    return null;
  }

  return (
    <RenderSmoothly delay={100}>
      <Row>
        <Col span={24}>
          <Form
            name="profile-update"
            layout="vertical"
            initialValues={{
              username: profile.username,
              fullname: profile.fullname,
              email: session.user.email,
            }}
            onFinish={onProfileUpdate}
          >
            <Row>
              <Col span={24} className="mr-4 d-flex justify-center">
                <Avatar
                  size={128}
                  icon={<Icon icon={faUser} color={getColors.dullLink} />}
                />
              </Col>
              <Col span={24}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label={<Text>Username</Text>}
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input
                        className="theme-secondary-input-background pa-3"
                        placeholder="Username"
                        value={username}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={<Text>Email</Text>}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input
                        className="theme-secondary-input-background pa-3"
                        placeholder="Email"
                        type="email"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={<Text>Full name</Text>}
                      name="fullname"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Full name!",
                        },
                      ]}
                    >
                      <Input
                        className="theme-secondary-input-background pa-3"
                        placeholder="Full name"
                        type="text"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24} className="mt-4">
                    <Form.Item>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        className="pa-3"
                        style={{ height: "unset" }}
                        disabled={isUpdatingProfile}
                      >
                        Save
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={10}></Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </RenderSmoothly>
  );
};

export default ProfileTab;
