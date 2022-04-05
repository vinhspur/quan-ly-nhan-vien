import React, { Component } from "react";
export interface SearchProps {
  search: Function;
}
export interface SearchState {
  key: string;
}
class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      key: "",
    };
  }
  render() {
    return (
      <>
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập từ khóa..."
              onChange={(event) => {
                this.setState({
                  key: event.target.value,
                });
              }}
            />
            <span className="input-group-btn">
              <button
                onClick={() => {
                  this.props.search(this.state.key);
                }}
                className="btn btn-primary"
                type="button"
              >
                <span className="fa fa-search mr-5"></span>Tìm
              </button>
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default Search;
