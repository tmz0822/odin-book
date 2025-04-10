import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Dialog({ isOpen, onClose, title, children }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return createPortal(
    // Maybe set a z-index?
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 "
      onClick={handleOverlayClick}
    >
      <div className=" bg-white rounded-xl shadow-lg relative w-full max-w-lg max-h-11/12 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b-1 border-b-gray-300 flex text-xl items-center justify-center ">
          <h1 className="text-center font-semibold">{title}</h1>
          <button
            className="absolute top-3 right-3 text-gray-400 rounded-full w-9 h-9 hover:bg-gray-300"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>,
    document.body
  );
}
