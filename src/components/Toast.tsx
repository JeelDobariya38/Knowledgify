import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-200">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gray-900 text-white rounded-xl shadow-lg text-sm border border-gray-800">
        {type === 'success' ? (
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle size={16} className="text-blue-400 shrink-0" />
        )}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
