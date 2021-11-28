import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalIcon from "../assets/pages/create-landing-page.jpg";

class addTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      value: "",
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  handleChange = (event) => {
    console.log("this.state.value", this.state.value);
    this.setState({ value: event.target.value });
  };

  handleSubmit = () => {
    console.log('state', this.state.value);
  };

  render() {
    return (
      <>
        <div className="addTodo">
          <Button type="button" color="primary" onClick={this.toggle}>
            {this.props.buttonLabel}
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader toggle={this.toggle} className="modal_label">
              New Todo
            </ModalHeader>
            <ModalBody>
              <div className="img-wrapper d-flex justify-content-center">
                <img src={ModalIcon} alt="" width="70" height="60" />{" "}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.value}
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
export default addTodo;
