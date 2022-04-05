import React, { Component } from "react";
import "./App.css";
import Control from "./component/control";
import TaskForm from "./component/taskForm";
import TaskList from "./component/taskList";
import { NhanVien } from "./obiject__hang-so/nhanVien";
import axios from "axios";
export interface AppMainProps {}
export interface AppMainState {
  dataSourceNhanVien: NhanVien[];
  isDisplayFormAddEmloye: boolean;
  dataUpdateNhanVien: NhanVien | null;
  keyWord: string;
  sort: string;
}
class App extends React.Component<AppMainProps, AppMainState> {
  TaskForm: React.RefObject<TaskForm>;
  constructor(props: AppMainProps) {
    super(props);
    this.TaskForm = React.createRef<TaskForm>();
    this.state = {
      dataSourceNhanVien: [],
      isDisplayFormAddEmloye: false,
      dataUpdateNhanVien: null,
      keyWord: "",
      sort: "",
    };
  }
  // test git
  componentWillMount() {
    axios({
      url: "https://624c66e6e80949c26970447a.mockapi.io/nhanvien/employes",
      method: "GET",
      data: null,
    })
      .then((data) =>
        this.setState({
          dataSourceNhanVien: data.data,
        })
      )
      .catch((err) => console.log(err));
  }
  toggleForm() {
    this.setState({
      isDisplayFormAddEmloye: !this.state.isDisplayFormAddEmloye,
    });
  }
  closeForm() {
    this.setState({
      isDisplayFormAddEmloye: false,
    });
  }
  /**
   * hàm nhận data từ Taskform để update data ở taskList
   * @param id : là id nhân viên cần update (id phải tăng thêm 1 vì đếm từ 0)
   * @param ten : Tên mới
   * @param chucVu : Chức vụ mới
   */
  sendDataUpdate(id: number, ten: string, chucVu: string) {
    debugger;
    if (id || ten || chucVu) {
      axios({
        //id phải tăng thêm 1 vì đếm từ 0
        url: `https://624c66e6e80949c26970447a.mockapi.io/nhanvien/employes/${id +
          1}`,
        method: "PUT",
        data: {
          Ten: ten,
          ChucVu: chucVu,
        },
      })
        .then((data) => {
          // đoạn này gán lại giá trị mới vào dataSourenhânviên
          // (hoặc có thể get lại data mới set vào datasourcenhânviên)
          let newData = this.state.dataSourceNhanVien.map((value, index) => {
            if (id === index) {
              return { Ten: ten, ChucVu: chucVu };
            } else {
              return value;
            }
          });
          this.setState({
            dataSourceNhanVien: newData,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  onClickAdd(tenNhanVien: string, chucVu: string) {
    // let nhanVienMoi: NhanVien = { Ten: tenNhanVien, ChucVu: chucVu };
    // this.state.dataSourceNhanVien.push(nhanVienMoi);
    // let newDataNhanVien = this.state.dataSourceNhanVien;
    // this.setState({
    //   dataSourceNhanVien: newDataNhanVien,
    // });
    // let task = JSON.stringify(newDataNhanVien);
    // localStorage.setItem("task", task);

    axios({
      url: "https://624c66e6e80949c26970447a.mockapi.io/nhanvien/employes",
      method: "POST",
      data: {
        Ten: tenNhanVien,
        ChucVu: chucVu,
      },
    })
      .then((data) => {
        this.state.dataSourceNhanVien.push(data.data);
        let newDataNhanVien = this.state.dataSourceNhanVien;
        this.setState({
          dataSourceNhanVien: newDataNhanVien,
        });
      })
      .catch((e) => console.log(e));
  }
  componentDidMount() {
    let task = localStorage.getItem("task");
    if (task) {
      let dataSourceNhanVien = JSON.parse(task);
      this.setState({
        dataSourceNhanVien,
      });
    }
  }
  /**
   * hàm dùng để xóa nhân viên
   * @param index là Id nhân viên muốn xóa
   */
  deleteNhanVien(index: number) {
    // let newDataSourceNhanVien = this.state.dataSourceNhanVien.filter(
    //   (item, stt) => {
    //     if (index !== stt) {
    //       return true;
    //     }
    //   }
    // );
    // this.setState({
    //   dataSourceNhanVien: newDataSourceNhanVien,
    // });
    // let task = JSON.stringify(newDataSourceNhanVien);
    // localStorage.setItem("task", task);
    axios({
      url: `https://624c66e6e80949c26970447a.mockapi.io/nhanvien/employes/${index +
        1}`,
      method: "DELETE",
      data: null,
    })
      //có thể dùng 2 cách :
      // dùng filter lọc phần sử đã xóa
      // get lại data 1 lần rồi gán lại cho datasourcenhanvien de render lại
      .then(() => {
        // let newDataSourceNhanVien = this.state.dataSourceNhanVien.filter(
        //   (item, stt) => {
        //     if (index !== stt) {
        //       return true;
        //     }
        //   }
        // );
        // this.setState({
        //   dataSourceNhanVien: newDataSourceNhanVien,
        // });
        axios({
          url: `https://624c66e6e80949c26970447a.mockapi.io/nhanvien/employes`,
          method: "GET",
          data: null,
        })
          .then((data) => {
            this.setState({
              dataSourceNhanVien: data.data,
            });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => {
        console.log(e);
      });
  }
  updateNhanVien(index: number, ten: string, chucVu: string) {
    let dataUpdateNhanVien = { Index: index, Ten: ten, ChucVu: chucVu };
    this.setState({
      isDisplayFormAddEmloye: true,
      dataUpdateNhanVien: dataUpdateNhanVien,
    });
    // this.TaskForm.current?.updateNhanVien(index, ten, chucVu);
  }
  search(key: string) {
    if (key) {
      this.setState({
        keyWord: key,
      });
    } else {
      this.setState({
        keyWord: "",
      });
    }
  }
  sortNhanVien(chucVu: string) {
    if (chucVu) {
      this.setState({
        sort: chucVu,
      });
    } else {
      this.setState({
        sort: "",
      });
    }
  }
  resetFilter() {
    this.setState({
      keyWord: "",
      sort: "",
    });
  }

  render() {
    let taskForm =
      this.state.isDisplayFormAddEmloye == true ? (
        <TaskForm
          closeForm={() => this.closeForm()}
          onClickAdd={(tenNhanVien: string, chucVu: string) =>
            this.onClickAdd(tenNhanVien, chucVu)
          }
          dataUpdateNhanVien={this.state.dataUpdateNhanVien!}
          ref={this.TaskForm}
          sendDataUpdate={(id: number, ten: string, chucVu: string) => {
            this.sendDataUpdate(id, ten, chucVu);
          }}
        ></TaskForm>
      ) : (
        ""
      );
    let colTaskList =
      this.state.isDisplayFormAddEmloye == true
        ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
        : "col-xs-12 col-sm-12 col-md-12 col-lg-12";
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Nhân Viên</h1>
          <hr />
        </div>
        <div className="row">
          {taskForm}
          <div className={colTaskList}>
            <button
              onClick={() => {
                this.toggleForm();
              }}
              type="button"
              className="btn btn-primary"
              style={{ marginBottom: "16px" }}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Nhân Viên
            </button>
            <Control
              search={(key: string) => {
                this.search(key);
              }}
              sort={(chucVu: string) => {
                this.sortNhanVien(chucVu);
              }}
              resetFilter={() => this.resetFilter()}
            ></Control>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="row mt-15">
              <TaskList
                updateNhanVien={(index: number, ten: string, chucVu: string) =>
                  this.updateNhanVien(index, ten, chucVu)
                }
                dataSourceNhanVien={this.state.dataSourceNhanVien}
                deleteNhanVien={(index: number) => {
                  this.deleteNhanVien(index);
                }}
                keyWord={this.state.keyWord}
                sort={this.state.sort}
              ></TaskList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
