import { Skeleton } from "antd";
const BigLoadingItem = () => {
  return (
    <div
      className="d-flex justify-center align-center"
      style={{ height: "431px" }}
    >
      <Skeleton.Image />
    </div>
  );
};

export default BigLoadingItem;
