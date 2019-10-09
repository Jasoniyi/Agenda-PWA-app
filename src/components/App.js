import React, { Component } from "react";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBContainer,
  MDBRow,
  MDBCol
} from "mdbreact";

import Event from "./Event";
import Notification from "./Notification";
import WeatherForecast from "./WeatherForecast";

class App extends Component {
  state = {
    notification: "",
    modal: false,
    events: [
      {
        id: 1,
        time: "10:00",
        title: "Breakfast with Simon",
        location: "Discuss 03 targets"
      },
      {
        id: 2,
        time: "10:30",
        title: "Daily Standup Meeting (recurring)",
        location: "Warsaw Spire Office"
      },
      { id: 3, time: "11:00", title: "Call with HRs" },
      {
        id: 4,
        time: "12:00",
        title: "Lunch with Timmoty",
        location: "Canteen",
        description:
          "Project evalutation ile declaring a variable and using an if statement is a fine way to conditionally render a component, sometimes you might want to use a"
      }
    ]
  };

  componentDidMount() {
    window.addEventListener("online", () => {
      this.setState({ notification: "online" });
    });

    window.addEventListener("offline", () => {
      this.setState({ notification: "offline" });
    });
  }

  addEvent = () => {
    let newEvent = [...this.state.events];
    newEvent.push({
      id: newEvent.length ? newEvent[newEvent.length - 1].id + 1 : 1,
      time: this.state.time,
      title: this.state.title,
      location: this.state.location,
      description: this.state.description
    });
    this.setState({
      events: newEvent
    });
    this.setState({
      time: "",
      title: "",
      location: "",
      description: ""
    });
  };

  handleInputChange = inputName => value => {
    const nextValue = value;
    this.setState({
      [inputName]: nextValue
    });
  };

  handleDelete = eventId => {
    const events = this.state.events.filter(e => e.id !== eventId);
    this.setState({
      events
    });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    const { events, modal, notification } = this.state;
    return (
      <>
        <MDBContainer>
          <Notification notification={notification} />
          <MDBRow>
            <MDBCol md="9" className="mb-r">
              <h2 className="text-uppercase my-3">Today:</h2>
              <div id="events">
                {this.state.events.map(event => (
                  <Event
                    key={event.id}
                    id={event.id}
                    time={event.time}
                    title={event.title}
                    location={event.location}
                    description={event.description}
                    onDelete={this.handleDelete}
                  />
                ))}
              </div>
              <MDBRow className="mb-4">
                <MDBCol xl="3" md="6" className="mx-auto text-center">
                  <MDBBtn color="info" rounded onClick={this.toggleModal}>
                    Add Event
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <WeatherForecast length={events.length} />
          </MDBRow>
        </MDBContainer>
        {/* creating the modal */}
        <MDBModal isOpen={this.state.modal} toggle={this.toggleModal}>
          <MDBModalHeader
            className="text-center"
            titleClass="w-100 font-weight-bold"
            toggle={this.toggleModal}
          >
            Add new event
          </MDBModalHeader>
          <MDBModalBody>
            <form className="mx-3 grey-text">
              <MDBInput
                name="time"
                label="Time"
                icon="clock"
                hint="12:30"
                group
                type="text"
                getValue={this.handleInputChange("time")}
              />
              <MDBInput
                name="title"
                label="Title"
                icon="edit"
                hint="Briefing"
                group
                type="text"
                getValue={this.handleInputChange("title")}
              />
              <MDBInput
                name="location"
                label="Location (optional)"
                icon="map"
                group
                type="text"
                getValue={this.handleInputChange("location")}
              />
              <MDBInput
                name="description"
                label="Description (optional)"
                icon="sticky-note"
                group
                type="textarea"
                getValue={this.handleInputChange("description")}
              />
            </form>
          </MDBModalBody>
          <MDBModalFooter className="justify-content-center">
            <MDBBtn
              color="info"
              onClick={() => {
                this.toggleModal();
                this.addEvent();
              }}
            >
              Add
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  }
}

export default App;
