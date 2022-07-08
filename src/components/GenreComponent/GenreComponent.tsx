import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./GenreComponent.module.scss";
import { Typography } from "antd";

interface IGenreComponent {
  id: number;
  name: string;
  type: "movie" | "tv";
}

const { Text } = Typography;

const GenreComponent: FC<IGenreComponent> = ({ id, name, type }) => {
  return (
    <Link
      to={`/discover/${type}/?with_genres=${id}`}
      className="d-flex mr-1 mb-1"
    >
      <div className={`${styles.GenreComponent} pa-2`}>
        <Text>{name}</Text>
      </div>
    </Link>
  );
};

export default GenreComponent;
