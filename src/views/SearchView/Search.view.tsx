import { Modal } from "antd";
import React from "react";
import { useLocation, useNavigate, Location } from "react-router-dom";
import SearchComponent from "src/components/SearchComponent/SearchComponent";

const SearchView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let state = location.state as { backgroundLocation?: Location };
  const navigateBack = () =>
    navigate(state.backgroundLocation?.pathname as string, { replace: true });
  return (
    <Modal
      footer={false}
      visible={true}
      width={1000}
      onCancel={navigateBack}
      style={{ top: "20%" }}
    >
      <SearchComponent />
    </Modal>
  );
};

export default SearchView;
