import React, { Component } from "react";
import TodoSection from "./TodoSection";
import Logo from "../assets/pages/logo1.jpg";

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      todoList: [],
    };
  }

  render() {
    return (
      <>
        <nav class="navbar navbar-dark navBar-color ">
          <p className="To-header">
            <img src={Logo} alt="" width="60" height="50" /> My Todo List
          </p>
        </nav>
        <div className="background">
          <div className="container">
            <div className="mt-1">
              <TodoSection />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default index;
