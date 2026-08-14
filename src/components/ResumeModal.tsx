import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="resume-modal-overlay" onClick={onClose}>
          <motion.div
            className="resume-modal-container"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-title">
                <span>📄</span> Dharmil Panchal — Resume
              </div>
              <div className="resume-modal-actions">
                <a
                  href={pdfUrl}
                  download="Dharmil-Panchal-Resume.pdf"
                  className="btn-modal-action"
                  title="Download PDF"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
                <button
                  className="btn-modal-close"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="resume-modal-body">
              <object
                data={`${pdfUrl}#toolbar=0&navpanes=0`}
                type="application/pdf"
                className="resume-pdf-frame"
              >
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0`}
                  title="Dharmil Panchal Resume"
                  className="resume-pdf-frame"
                >
                  <p>Your browser does not support PDF embedding. <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Click here to view PDF</a></p>
                </iframe>
              </object>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
