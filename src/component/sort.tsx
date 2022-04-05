import React, { Component } from "react";
export interface SortState {}
export interface SortProps {
  sortNhanVien: Function;
  resetFilter: Function;
}
class Sort extends Component<SortProps, SortState> {
  render() {
    return (
      <>
        <div
          className="col-xs-6 col-sm-6 col-md-6 col-lg-6"
          style={{ display: "flex" }}
        >
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenu1"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="true"
            >
              Lọc Chức Vụ{" "}
              <span className="fa fa-caret-square-o-down ml-5"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
              {/* <li
                onClick={(event: any) => {
                  this.props.sortNhanVien("+");
                }}
              >
                <a role="button">
                  <span className="fa fa-sort-alpha-asc pr-5"> Tên A-Z </span>
                </a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien("-");
                }}
              >
                <a role="button">
                  <span className="fa fa-sort-alpha-desc pr-5"> Tên Z-A </span>
                </a>
              </li> */}
              <li role="separator" className="divider"></li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.firstChild.data);
                }}
              >
                <a role="button">Tổng giám đốc</a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.firstChild.data);
                }}
              >
                <a role="button">Giám đốc</a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.firstChild.data);
                }}
              >
                <a role="button">Quản lý dự án</a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.firstChild.data);
                }}
              >
                <a role="button">Leader</a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.firstChild.data);
                }}
              >
                <a role="button">Nhân viên</a>
              </li>
              <li
                onClick={(event: any) => {
                  this.props.sortNhanVien(event.target.value);
                }}
              >
                <a role="button">Huỷ lọc</a>
              </li>
            </ul>
          </div>
          {/* &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <button
            onClick={() => {
              this.props.resetFilter();
            }}
            type="button"
            className="btn btn-primary"
          >
            <span></span>Làm Mới
          </button> */}
        </div>
      </>
    );
  }
}

export default Sort;
