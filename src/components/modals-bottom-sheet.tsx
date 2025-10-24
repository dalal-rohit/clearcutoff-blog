import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type OverlayProps = {
  onClick: () => void;
};

// A reusable overlay that fades in/out.
const Overlay = ({ onClick = () => {} }: OverlayProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-60 z-[999]"
      onClick={() => onClick()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
    />
  );
};

type ModelProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isHeader?: boolean;
  title?: string;
  subtitle?: string;
  maxWidth?: string;
};

/**
 * CustomModal displays a centered modal with an overlay.
 */
export function CustomModal({
  isOpen = false,
  onClose = () => {},
  children,
  isHeader = false,
  title = "",
  subtitle = "",
  maxWidth = "max-w-sm",
}: ModelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ✅ FIX: use onClose instead of closeModal */}
          <Overlay onClick={() => onClose()} />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1000]"
            initial={{ opacity: 0, scale: 1, y: -250 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1, y: -250 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose} // 🔴 Add here
          >
            <div
              className={`${maxWidth} bg-white rounded-lg p-0 shadow-xl w-full max-h-[90vh] overflow-hidden`}
              onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
            >
              {/* Fixed Header */}
              {isHeader && (
                <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 pt-3 pb-2 flex justify-between items-start">
                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                  </div>

                  {/* Close Button */}
                  <button
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </header>
              )}

              {/* Scrollable Content */}
              <div className="overflow-y-auto no-scrollbar max-h-[80vh]">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * CustomBottomSheet displays a bottom sheet that slides up.
 */
export function CustomBottomSheet({
  isOpen = false,
  onClose = () => {},
  children,
  isHeader = false,
  title = "",
  subtitle = "",
  maxWidth = "max-w-full",
}: ModelProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay onClick={onClose} />
          <motion.div
            className={`${maxWidth} fixed left-0 right-0 bottom-0 z-[1000]`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="bg-white rounded-t-[12px] shadow-xl w-full max-h-[90vh] overflow-auto">
              {/* Fixed Header */}
              {isHeader && (
                <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 pt-3 pb-2 flex justify-between items-start">
                  {/* Title & Subtitle */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {title}
                    </h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                  </div>

                  {/* Close Button */}
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </header>
              )}

              <div className="overflow-y-auto no-scrollbar">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
