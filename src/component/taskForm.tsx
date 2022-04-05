import { stringify } from "querystring";
import React, { Component } from "react";
import { NhanVien } from "../obiject__hang-so/nhanVien";
export interface TaskFormProps {
  onClickAdd: Function;
  closeForm: Function;
  dataUpdateNhanVien: NhanVien;
  sendDataUpdate: Function;
}
export interface TaskFormState {
  tenNhanVien: string;
  chucVu: string;
}
class TaskForm extends Component<TaskFormProps, TaskFormState> {
  constructor(props: TaskFormProps) {
    super(props);
    this.state = {
      tenNhanVien: "",
      chucVu: "Nhân viên",
    };
  }
  themNhanVien(event: any) {
    event.preventDefault();
    if (this.props.dataUpdateNhanVien) {
      this.props.sendDataUpdate(
        this.props.dataUpdateNhanVien.Index,
        this.state.tenNhanVien,
        this.state.chucVu
      );
    } else {
      this.props.onClickAdd(this.state.tenNhanVien, this.state.chucVu);
    }
    this.props.closeForm();
  }

  changeDataForm(event: any) {
    let key = event.target.name;
    let value = event.target.value;
    if (key === "tenNhanVien") {
      this.setState({
        tenNhanVien: value,
      });
    } else {
      this.setState({
        chucVu: value,
      });
    }
  }

  async componentWillMount() {
    if (this.props.dataUpdateNhanVien) {
      this.setState({
        tenNhanVien: this.props.dataUpdateNhanVien.Ten,
        chucVu: this.props.dataUpdateNhanVien.ChucVu,
      });
    }
  }
  updateNhanVien(index: number, ten: string, chucVu: string) {
    if (index || ten || chucVu) {
      this.setState({
        tenNhanVien: ten,
        chucVu: chucVu,
      });
    }
  }
  render() {
    return (
      <>
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">
                {this.props.dataUpdateNhanVien
                  ? "Sửa Thông Tin Nhân Viên"
                  : "Thêm Nhân Viên"}{" "}
              </h3>
            </div>
            <div className="panel-body">
              <form onSubmit={(event) => this.themNhanVien(event)}>
                <div className="form-group">
                  <label>Tên :</label>
                  <input
                    value={this.state.tenNhanVien}
                    type="text"
                    name="tenNhanVien"
                    className="form-control"
                    onChange={(event) => this.changeDataForm(event)}
                  />
                </div>
                <label>Chức Vụ :</label>
                <select
                  name="chucVu"
                  value={this.state.chucVu}
                  defaultValue={"Nhân viên"}
                  className="form-control"
                  onChange={(event) => this.changeDataForm(event)}
                  required={true}
                >
                  <option value="Tổng giám đốc">Tổng giám đốc</option>
                  <option value="Giám đốc">Giám đốc</option>
                  <option value="Quản lý dự án">Quản lý dự án</option>
                  <option value="Leader">Leader</option>
                  <option value="Nhân viên">Nhân viên</option>
                </select>
                <br />
                <div className="text-center">
                  <button type="submit" className="btn btn-warning">
                    {this.props.dataUpdateNhanVien ? "Lưu Lại" : "Thêm"}
                  </button>
                  &nbsp;
                  <button
                    onClick={() => {
                      this.props.closeForm();
                    }}
                    type="reset"
                    className="btn btn-danger"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TaskForm;
