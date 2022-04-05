import React, { Component } from "react";
import { NhanVien } from "../obiject__hang-so/nhanVien";
import TaskItem from "./taskItem";
export interface TaskListProps {
  dataSourceNhanVien: NhanVien[];
  deleteNhanVien: Function;
  updateNhanVien: Function;
  keyWord: string;
  sort: string;
}
export interface TaskListState {}
class TaskList extends Component<TaskListProps, TaskListState> {
  render() {
    if (this.props.keyWord && this.props.sort) {
      var nhanVien = this.props.dataSourceNhanVien.filter((item) => {
        if (
          (item.Ten.toLocaleLowerCase().includes(this.props.keyWord) ||
            item.ChucVu.toLocaleLowerCase().includes(this.props.keyWord)) &&
          item.ChucVu == this.props.sort
        ) {
          return true;
        } else {
          return false;
        }
      });
    } else if (this.props.keyWord && !this.props.sort) {
      var nhanVien = this.props.dataSourceNhanVien.filter((item) => {
        if (
          item.Ten.toLocaleLowerCase().includes(this.props.keyWord) ||
          item.ChucVu.toLocaleLowerCase().includes(this.props.keyWord)
        ) {
          return true;
        } else {
          return false;
        }
      });
    } else if (!this.props.keyWord && this.props.sort) {
      var nhanVien = this.props.dataSourceNhanVien.filter((item) => {
        if (item.ChucVu == this.props.sort) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      var nhanVien = this.props.dataSourceNhanVien;
    }
    console.log("nhanVien");
    console.log(nhanVien);
    let elementTaskItem = nhanVien.map((value, index) => {
      return (
        <TaskItem
          updateNhanVien={(index: number, ten: string, chucVu: string) => {
            this.props.updateNhanVien(index, ten, chucVu);
          }}
          dataSourceNhanVien={value}
          index={index}
          deleteNhanVien={(index: number) => {
            this.props.deleteNhanVien(index);
          }}
        ></TaskItem>
      );
    });
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Chức Vụ</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>{elementTaskItem}</tbody>
          </table>
        </div>
      </>
    );
  }
}

export default TaskList;
