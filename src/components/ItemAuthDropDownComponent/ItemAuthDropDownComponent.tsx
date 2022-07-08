import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Icon } from "src/lib";
import { TRootState } from "src/redux/store";
import MenuComponent from "./MenuComponent";
import styles from "./ItemAuthDropDownComponent.module.scss";

const ItemAuthDropDownComponent = ({ item, type }: any) => {
  const { isAuthenticated } = useSelector(
    (store: TRootState) => store.profilereducer
  );
  return isAuthenticated ? (
    <div
      className={`position-absolute mr-2 mt-2 pa-1 ${styles.ItemAuthDropDownComponent} theme-primary-background-op`}
    >
      <Dropdown
        overlay={<MenuComponent mediaType={type} item={item} />}
        placement="bottomRight"
        trigger={["click"]}
      >
        <div className="custom-cursor-pointer">
          <Icon icon={faEllipsis} />
        </div>
      </Dropdown>
    </div>
  ) : null;
};

export default ItemAuthDropDownComponent;
