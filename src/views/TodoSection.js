import React, { Component, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import {
  TODO_STATUS_NEW,
  TODO_STATUS_APPROVED,
  TODO_STATUS_DECLINED,
} from "../constants/Todo";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { FaSort } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalIcon from "../assets/pages/create-landing-page.jpg";
import Select from "react-select";

class TodoSection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      todoLists: [],
      modal: false,
      value: "",
      isLoading: false,
      isClearable: true,
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = [...this.state.todoList];
    let isExist = false;
    data.length > 0 &&
      data.forEach((value) => {
        if (value.name.toUpperCase() === this.state.value.toUpperCase()) {
          isExist = true;
        }
      });
    if (!isExist) {
      this.setState({
        todoLists: [],
        todoList: [
          ...this.state.todoList,
          {
            name: this.state.value,
            status: TODO_STATUS_NEW,
            created_At: new Date(),
          },
        ],
      });
      toast.success("Todo successfully added");
      setTimeout(() => {
        this.setState({
          modal: false,
        });
      }, 100);
    } else {
      toast.error("Todo Already Exists");
      setTimeout(() => {
        this.setState({
          modal: false,
        });
      }, 100);
    }
  };

  //status update
  updateTodoStatus = (updateStatus, name) => {
    const statusUpdate = [...this.state.todoList];
    console.log("statusUpdate", statusUpdate);
    let isExists = false;
    statusUpdate.forEach((value) => {
      if (value.name === name) {
        value.status = updateStatus;
        isExists = true;
      }
    });
    if (isExists) {
      this.setState({
        todoList: statusUpdate,
      });
      toast.success("Todo status updated successfully");
    }
  };

  // Remove todo
  handleRemove = (index) => {
    const newTodos = [...this.state.todoList];
    newTodos.splice(index, 1);
    this.setState({
      todoLists: [],
      todoList: newTodos,
    });
    toast.success("Todo successfully Deleted");
  };

  handleStatusChange = (value) => {
    const status = value ? value.value : "";
    if (!status) {
      this.setState({ todoLists: [] });
    }
    const data = [...this.state.todoList];
    const filterTodo = [];
    data.forEach((todo) => {
      if (todo.status === status ? status : "") {
        filterTodo.push(todo);
      }
    });
    this.setState({
      todoLists: filterTodo,
    });
  };

  handleSearch = (e) => {
    let searchValue = e.target.value;
    console.log('searchValue', searchValue);
    const search = [...this.state.todoList];
    const filterTodo = search.filter((todo) => {
      return (
        todo.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
      );
    });
    this.setState({
      todoLists: filterTodo,
    });
  };

  handleTodoSort = (type) => {
    console.log("type", type);
    let types = "name";
    let value = [...this.state.todoList];
    const sort = value.sort((a, b) =>
      (a[types] || "").toString().localeCompare((b[types] || "").toString())
    );
    console.log("sorted", sort);
    this.setState({
      todoLists: sort,
    });
  };

  render() {
    console.log("todolist", this.state.todoList);
    const { isClearable } = this.state;
    const statusOptions = [
      {
        value: TODO_STATUS_NEW,
        label: TODO_STATUS_NEW,
      },
      {
        value: TODO_STATUS_APPROVED,
        label: TODO_STATUS_APPROVED,
      },
      {
        value: TODO_STATUS_DECLINED,
        label: TODO_STATUS_DECLINED,
      },
    ];
    const list =
      this.state.todoLists && this.state.todoLists.length > 0
        ? this.state.todoLists
        : this.state.todoList;
    return (
      <>
        <div className="container">
          <div className="row">
            <div class="col-md-3 mt-3">
              <div class="form-group">
                <input
                  type="text"
                  id="search"
                  class="form-control"
                  name="search"
                  placeholder="Search"
                  onChange={(e) => this.handleSearch(e)}
                />
              </div>
            </div>
            <div class="col-md-3 mt-3">
              <Fragment>
                <Select
                  onChange={this.handleStatusChange}
                  options={statusOptions}
                  placeholder="Select Status"
                  isClearable={isClearable}
                />
              </Fragment>
            </div>
            <div className="col-md-6 mt-3 pull-right">
              <div className="addTodo">
                <Button type="button" color="primary" onClick={this.toggle}>
                  Add Todo
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-1 mb-5">
          <div className="row">
            <div className="col-md-12 col-sm-12  col-xs-12">
              <div
                className="col-md-12 col-xs-12 p-0 mt-2"
                style={{ background: "white" }}
              >
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th data-sort="name" className="text-center">
                        S.No{" "}
                      </th>
                      <th data-sort="name" className="sprintSort text-center">
                        Todo Name{" "}
                        <span onClick={this.handleTodoSort}>
                          <FaSort />
                        </span>
                      </th>
                      <th data-sort="status" className="sprintSort text-center">
                        Status{" "}
                      </th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      list.length > 0 ? list.map((todo, index) => (
                        <tr>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{todo.name}</td>
                          {/* <td className="text-center">{todo.created_At}</td> */}
                          <td className="text-center">
                            {todo.status === TODO_STATUS_NEW ? (
                              <div className="text-info">{todo.status}</div>
                            ) : todo.status === TODO_STATUS_APPROVED ? (
                              <div className="text-success">{todo.status}</div>
                            ) : todo.status === TODO_STATUS_DECLINED ? (
                              <div className="text-danger">{todo.status}</div>
                            ) : (
                              ""
                            )}
                          </td>
                          <td className="text-center">
                            <Dropdown>
                              <Dropdown.Toggle
                                id="dropdown-basic"
                                style={{ background: "coral", border: "none" }}
                              >
                                <FaEdit />
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                {todo.status !== TODO_STATUS_APPROVED && (
                                  <Dropdown.Item
                                    onClick={() =>
                                      this.updateTodoStatus(
                                        TODO_STATUS_APPROVED,
                                        todo.name
                                      )
                                    }
                                  >
                                    Inprogress
                                  </Dropdown.Item>
                                )}
                                {todo.status !== TODO_STATUS_DECLINED && (
                                  <Dropdown.Item
                                    onClick={() =>
                                      this.updateTodoStatus(
                                        TODO_STATUS_DECLINED,
                                        todo.name
                                      )
                                    }
                                  >
                                    Completed
                                  </Dropdown.Item>
                                )}
                                {
                                  <Dropdown.Item
                                    className="text-danger"
                                    onClick={() => this.handleRemove(index)}
                                  >
                                    Delete
                                  </Dropdown.Item>
                                }
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      )) :
                      <div className ="noRecord">No Record Found</div>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle} className="modal_label">
              New Todo
            </ModalHeader>
            <ModalBody>
              <div className="img-wrapper d-flex justify-content-center mb-5">
                <img src={ModalIcon} alt="" width="70" height="60" />{" "}
              </div>
              <div className="form-group mb-5">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.handleChange}
                  placeholder="Todo Name...."
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggle}>
                Cancel
              </Button>
              <div>
                <Button
                  type="submit"
                  value="Submit"
                  color="primary"
                  className="h6-5-important"
                >
                  Add
                </Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
      </>
    );
  }
}
export default TodoSection;
