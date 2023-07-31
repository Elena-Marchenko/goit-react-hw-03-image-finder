import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      console.log(e.code);
      if (e.code === 'Escape') {
        this.props.onClose();
      }
    });
  }
  componentWillUnmount() {}

  render() {
    return createPortal(
      <div className={s.overlay}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
