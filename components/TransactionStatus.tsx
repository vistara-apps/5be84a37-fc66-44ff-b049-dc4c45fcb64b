'use client';

import { CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';

interface TransactionStatusProps {
  status: 'pending' | 'success' | 'error';
  txHash?: string;
  message?: string;
  onClose?: () => void;
}

export function TransactionStatus({ 
  status, 
  txHash, 
  message, 
  onClose 
}: TransactionStatusProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <Clock className="w-8 h-8 text-yellow-400 animate-pulse" />;
      case 'success':
        return <CheckCircle className="w-8 h-8 text-accent" />;
      case 'error':
        return <XCircle className="w-8 h-8 text-red-400" />;
    }
  };

  const getStatusTitle = () => {
    switch (status) {
      case 'pending':
        return 'Transaction Pending';
      case 'success':
        return 'Transaction Successful';
      case 'error':
        return 'Transaction Failed';
    }
  };

  const getStatusMessage = () => {
    if (message) return message;
    
    switch (status) {
      case 'pending':
        return 'Your transaction is being processed on the Base network...';
      case 'success':
        return 'Your swap has been completed successfully!';
      case 'error':
        return 'Your transaction failed. Please try again.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg p-6 w-full max-w-md text-center">
        <div className="mb-4">
          {getStatusIcon()}
        </div>
        
        <h3 className="text-lg font-semibold mb-2">
          {getStatusTitle()}
        </h3>
        
        <p className="text-text-secondary mb-4">
          {getStatusMessage()}
        </p>

        {txHash && (
          <a
            href={`https://basescan.org/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200 mb-4"
          >
            View on BaseScan
            <ExternalLink className="w-4 h-4" />
          </a>
        )}

        {status !== 'pending' && onClose && (
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}
