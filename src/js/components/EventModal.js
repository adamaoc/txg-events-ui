import React, { Component } from 'react';

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.handleBGClick = this._handleBGClick.bind(this);
    this.handleBtnClick = this._handleBtnClick.bind(this);
  }
  _handleBGClick(e) {
    const that = this;
    debugger;
    this.props.closeModal();
  }
  _handleBtnClick(e) {
    debugger;
  }
  render() {
    const { children, closeModal, title } = this.props;
    return (
      <div className="event-modal" onClick={closeModal}>
        <div className="event-modal__body">
          <div className="event-modal__header">
            <h3>{title}</h3>
            <div className="event-modal__closer">
              <button onClick={closeModal}>
                  <svg viewBox="0 0 32 32" className="event-modal__closer-svg">
                  <path className="event-modal__closer-svg" d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z"></path>
                  <path className="event-modal__closer-svg" d="M21 8l-5 5-5-5-3 3 5 5-5 5 3 3 5-5 5 5 3-3-5-5 5-5z"></path>
                </svg>
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default EventModal;
