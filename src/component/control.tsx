import React, { Component } from "react";
import Search from "./search";
import Sort from "./sort";
export interface ControlProps {
  search: Function;
  sort: Function;
  resetFilter: Function;
}
export interface ControlState {}
class Control extends Component<ControlProps, ControlState> {
  constructor(props: ControlProps) {
    super(props);
  }
  render() {
    return (
      <>
        <div className="row mt-15">
          <Search
            search={(key: string) => {
              this.props.search(key);
            }}
          ></Search>
          <Sort
            sortNhanVien={(chucVu: string) => {
              this.props.sort(chucVu);
            }}
            resetFilter={() => this.props.resetFilter()}
          ></Sort>
        </div>
      </>
    );
  }
}

export default Control;
