import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onShow }) => {
  useEffect(() => {
    const handleKey = e => {
      if (e.code === 'Escape') {
        onShow();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onShow]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) onShow();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.object.isRequired,
};
