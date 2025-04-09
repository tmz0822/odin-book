import { createPortal } from 'react-dom';

export default function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    // Maybe set a z-index?
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 "
      onClick={handleOverlayClick}
    >
      <div className=" bg-white rounded-xl shadow-lg relative w-full max-w-md">
        <button
          className="absolute text-xl top-3 right-3 text-gray-400 rounded-full w-9 h-9 hover:bg-gray-300"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
