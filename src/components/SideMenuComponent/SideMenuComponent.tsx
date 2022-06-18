import { Col, Divider, Row, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { SideMenuItemComponent } from "./SideMenuItemComponent/SideMenuItemComponent";
import {
  faClock,
  faBookmark,
  faStar,
  faDownload,
  faWrench,
  faCircleInfo,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { CustomThemecontext } from "src/theme/themeContext";
import classNames from "classnames";

const { Title } = Typography;

const whatsPopular = [
  {
    to: "/streaming",
    label: "Streaming",
    image:
      "https://image.tmdb.org/t/p/w220_and_h330_face/keGfSvCmYj7CvdRx36OdVrAEibE.jpg",
  },
  {
    to: "/on-tv",
    label: "On TV",
    image:
      "https://image.tmdb.org/t/p/w220_and_h330_face/keGfSvCmYj7CvdRx36OdVrAEibE.jpg",
  },
  {
    to: "/for-rent",
    label: "For Rent",
    image:
      "https://image.tmdb.org/t/p/w220_and_h330_face/keGfSvCmYj7CvdRx36OdVrAEibE.jpg",
  },
  {
    to: "/in-theatres",
    label: "In Theatres",
    image:
      "https://image.tmdb.org/t/p/w220_and_h330_face/keGfSvCmYj7CvdRx36OdVrAEibE.jpg",
  },
];

const SideMenuComponent = () => {
  const { getColors } = useContext(CustomThemecontext);

  const LibraryItem = (to: string, label: string, icon: IconDefinition) => (
    <Col span={24}>
      <NavLink
        to={to}
        className="d-block pa-2"
        children={({ isActive }) => (
          <Row>
            <Col span={2}>
              <FontAwesomeIcon
                icon={icon}
                color={isActive ? getColors.textColor : getColors.dullLink}
              />
            </Col>
            <Col span={22}>
              <span
                className={classNames("custom-links ml-2", {
                  isActive: "active",
                })}
              >
                {label}
              </span>
            </Col>
          </Row>
        )}
      />
    </Col>
  );

  return (
    <Row className="pr-4 pl-4">
      <Col span={24}>
        <Title level={5}>What's Popular</Title>
      </Col>
      <Col span={24}>
        {whatsPopular.map((data) => (
          <SideMenuItemComponent
            to={data.to}
            label={data.label}
            image={data.image}
          />
        ))}
      </Col>
      <Divider></Divider>
      <Col span={24}>
        <Title level={5}>Library</Title>
      </Col>
      {LibraryItem("/lib/recent", "Recent", faClock)}
      {LibraryItem("/lib/bookmarked", "Bookmarked", faBookmark)}
      {LibraryItem("/lib/top-rated", "Top Rated", faStar)}
      {LibraryItem("/lib/dowloaded", "Downloaded", faDownload)}
      <Divider></Divider>
      {LibraryItem("/settings", "Settings", faWrench)}
      {LibraryItem("/help", "Help", faCircleInfo)}
    </Row>
  );
};

export default SideMenuComponent;
