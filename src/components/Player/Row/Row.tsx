import React from "react";
import { Link } from "react-router-dom";
import "./Row.css";

type RowDataItem = {
  id: any;
  name: string;
  images: { url: string | undefined }[];
  type?: string | undefined;
};

type RowData = {
  rowTitle: string;
  rowData: RowDataItem[];
  link: string;
  itemCount: number;
};

function Row({ rowTitle, rowData, link }: RowData) {
  const data = { rowTitle: rowTitle, rowData: rowData };
  console.log("rowData:", rowData);

  return (
    <>
      <div className="body__rowTitle">
        <h2>{rowTitle}</h2>
        <Link
          to={{
            pathname: `/genre/${link}`,
            state: {
              data,
            },
          }}
        >
          {" "}
          <h3>SEE ALL</h3>{" "}
        </Link>
      </div>

      <div className="body__row">
        {rowData
          ?.map((item, index: number) => {
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
          })
          .splice(0, 5)}
      </div>
    </>
  );
}

export default Row;
