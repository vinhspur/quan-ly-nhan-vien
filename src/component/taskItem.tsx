import React, { Component } from "react";
import { NhanVien } from "../obiject__hang-so/nhanVien";
export interface TaskItemProps {
  dataSourceNhanVien: NhanVien;
  index: number;
  deleteNhanVien: Function;
  updateNhanVien: Function;
}
export interface TaskItemState {}
class TaskItem extends Component<TaskItemProps, TaskItemState> {
  deleteNhanVien(index: number) {
    this.props.deleteNhanVien(index);
  }

  render() {
    let tenNhanVien = this.props.dataSourceNhanVien.Ten;
    let chucVu = this.props.dataSourceNhanVien.ChucVu;
    let index = this.props.index;

    return (
      <>
        <tr>
          <td>{index + 1}</td>
          <td>{tenNhanVien}</td>
          <td>{chucVu}</td>
          <td className="text-center">
            <button
              onClick={() => {
                this.props.updateNhanVien(index, tenNhanVien, chucVu);
              }}
              type="button"
              className="btn btn-warning"
            >
              <span className="fa fa-pencil mr-5"></span>Sửa
            </button>
            &nbsp;
            <button
              onClick={() => {
                this.deleteNhanVien(index);
              }}
              type="button"
              className="btn btn-danger"
            >
              <span className="fa fa-trash mr-5"></span>Xóa
            </button>
          </td>
        </tr>
      </>
    );
  }
}

export default TaskItem;
