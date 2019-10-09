import React, { Component } from "react";
import { MDBBadge, MDBIcon } from "mdbreact";

class Event extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="media mt-1">
          <h3 className="h3-responsive font-weight-bold mr-3">
            {this.props.time}
          </h3>
          <div className="media-body mb-3 mb-lg-3">
            <MDBBadge
              color="danger"
              className="ml-2 float-right click-del"
              onClick={() => this.props.onDelete(this.props.id)}
            >
              Delete
            </MDBBadge>
            <h6 className="mt-0 font-weight-bold">{this.props.title} </h6>{" "}
            <hr className="hr-bold my-2" />
            {this.props.location && (
              // it means IF this.props.location THEN dsplay wats in d bracket
              <React.Fragment>
                <p className="font-smaller mb-0">
                  <MDBIcon icon="location-arrow mr-2" />
                  {this.props.location}
                </p>
              </React.Fragment>
            )}
          </div>
        </div>
        {this.props.description && (
          <p className="p-2 mb-4 blue-grey lighten-5 blue-grey lighten-5">
            {this.props.description}
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default Event;
