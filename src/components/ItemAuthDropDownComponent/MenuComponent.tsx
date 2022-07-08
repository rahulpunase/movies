import { faShare } from "@fortawesome/free-solid-svg-icons";
import { Col, Menu, Row, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "src/lib";
import {
  addItemToFavorite,
  removeItemFromFavorite,
} from "src/redux/ducks/profile.slice";
import { AppDispatch, TRootState } from "src/redux/store";

const { Text } = Typography;

const MenuComponent = ({ item, mediaType }: any) => {
  const {
    favorites: { results, isFavLoading },
  } = useSelector((store: TRootState) => store.profilereducer);
  const dispatch = useDispatch<AppDispatch>();

  const isAlreadyInFavorites = () => {
    if (!results.length) {
      return false;
    }
    const p = !!results.find((fav: any) => fav.media_id === item.id);
    return !!p;
  };

  const addToFavorites = () => {
    dispatch(
      addItemToFavorite({
        media_type: mediaType,
        media_id: item.id,
        item_json: JSON.stringify(item),
      })
    );
  };

  const removeFromFavorites = () => {
    dispatch(
      removeItemFromFavorite({
        media_id: item.id,
      })
    );
  };

  return (
    <Menu
      items={[
        {
          key: "addOrRemoveToFavorites",
          label: isFavLoading ? (
            <Text>Loading...</Text>
          ) : !isAlreadyInFavorites() ? (
            <Text onClick={() => addToFavorites()}>Add to favorites</Text>
          ) : (
            <Text onClick={() => removeFromFavorites()}>
              Remove from Favorites
            </Text>
          ),
        },
        {
          key: "Share",
          label: (
            <Row>
              <Col className="mr-2">
                <Icon icon={faShare} />
              </Col>
              <Col>
                <Text>Share</Text>
              </Col>
            </Row>
          ),
        },
      ]}
    />
  );
};

export default MenuComponent;
