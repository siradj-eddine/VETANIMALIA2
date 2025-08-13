import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";


export default function Toaster({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-green-500 text-white shadow-lg px-4 py-3"
        >
          <CheckCircle className="w-6 h-6" />
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
