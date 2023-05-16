import React, { Component } from "react";

class Square extends Component {
  leftClick = () => {
    this.props.leftClick(this.props.x, this.props.y);
  };

  rightClick = (e) => {
    e.preventDefault();
    this.props.rightClick(this.props.x, this.props.y);
  };

  render() {
    switch (this.props.display) {
      case 0:
        return <div className="button1 clicked" />;
      case 1:
        return (
          <div className="button1 clicked">
            <img src={require("../images/1.png")} alt="this" />
          </div>
        );
      case 2:
        return (
          <div className="button1 clicked">
            <img src={require("../images/2.png")} alt="this" />
          </div>
        );
      case 3:
        return (
          <div className="button1 clicked">
            <img src={require("../images/3.png")} alt="this" />
          </div>
        );
      case 4:
        return (
          <div className="button1 clicked">
            <img src={require("../images/4.png")} alt="this" />
          </div>
        );
      case 5:
        return (
          <div className="button1 clicked">
            <img src={require("../images/5.png")} alt="this" />
          </div>
        );
      case 6:
        return (
          <div className="button1 clicked">
            <img src={require("../images/6.png")} alt="this" />
          </div>
        );
      case 7:
        return (
          <div className="button1 clicked">
            <img src={require("../images/7.png")} alt="this" />
          </div>
        );
      case 8:
        return (
          <div className="button1 clicked">
            <img src={require("../images/8.png")} alt="this" />
          </div>
        );
      case 9: // blank button
        return (
          <button
            className="button1"
            onClick={() => this.leftClick()}
            onContextMenu={(e) => this.rightClick(e)}
          />
        );
      case 10: // flag
        return (
          <button className="button1" onContextMenu={(e) => this.rightClick(e)}>
            <img src={require("../images/flag.png")} alt="this" />
          </button>
        );
      case 11: // visible mine after game over
        return (
          <button className="button1">
            <img src={require("../images/mine.png")} alt="this" />
          </button>
        );
      case 12: // mine with x through it, i.e. wrongly placed flag, after game over
        return (
          <button className="button1">
            <img src={require("../images/x mine.png")} alt="this" />
          </button>
        );
      default:
        return (
          <div className="button1 clicked">
            <img src={require("../images/smile.png")} alt="goober" />
          </div>
        );
    }
  }
}

export default Square;
