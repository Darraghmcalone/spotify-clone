import React, { FunctionComponent } from "react";
import "./Genre.css";
import Header from "../../components/Player/Header/Header";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Genre: FunctionComponent<Props> = ({ location }: any) => {
  const { rowTitle, rowData } = location?.state?.data;
  return (
    <div className="body">
      <Header />
      <h1>{rowTitle}</h1>
      <div className="body__rows">
        {rowData?.map((item: any, index: number) => {
          const { type = "playlist" } = item;
          return (
            <Link
              to={{
                pathname: `/${type}/${item.id}`,
                state: {
                  item,
                },
              }}
              key={index}
              className="body__block"
            >
              <img alt="" src={item.images[0].url} />
              <h4>{item.name}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Genre;
