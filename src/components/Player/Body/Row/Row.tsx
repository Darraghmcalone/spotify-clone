import React from "react";
import "./Row.css";

type RowDataItem = {
  name: string;
  images: { url: string | undefined }[];
};

type RowData = {
  rowTitle: string;
  rowData: RowDataItem[];
};

function Row({ rowTitle, rowData }: RowData) {
  return (
    <>
      <div className="body__rowTitle">
        <h2>{rowTitle}</h2>
        <h3>SEE ALL</h3>
      </div>
      <div className="body__row">
        {rowData
          ?.map((item, index: number) => (
            <div key={index} className="body__block">
              <img alt="" src={item.images[0].url} />
              <h4>{item.name}</h4>
            </div>
          ))
          .splice(0, 4)}
      </div>
    </>
  );
}

export default Row;
