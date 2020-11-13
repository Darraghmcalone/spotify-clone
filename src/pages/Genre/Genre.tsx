import React, { FunctionComponent } from "react";
import "./Genre.css";
import Header from "../../components/Player/Header/Header";
import { RouteComponentProps } from "react-router";

type Props = { component: FunctionComponent } & RouteComponentProps;

const Genre: FunctionComponent<Props> = ({ location }: any) => {
  const { rowTitle, rowData } = location?.state?.data;
  return (
    <div className="body">
      <Header />
      <h1>{rowTitle}</h1>
      <div className="body__rows">
        {rowData?.map((item: any, index: number) => (
          <div className="body__block" key={index}>
            <img alt="" src={item.images[0].url} />
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genre;
