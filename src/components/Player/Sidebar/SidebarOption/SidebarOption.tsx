import React from "react";
import "./SidebarOption.css";
import { SvgIconProps } from "@material-ui/core";

type Props = {
  title: string;
  Icon?: (props: SvgIconProps) => JSX.Element;
};

function SidebarOption({ title, Icon }: Props) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon className="sidebarOption__icon" />}
      {Icon ? <h4>{title}</h4> : <p>{title}</p>}
    </div>
  );
}

export default SidebarOption;
