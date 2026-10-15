import React from 'react';
import { Modal } from './Modal';
import { buttonClass } from '../utils/styles';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'Delete', onConfirm, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-cocoa/70">{message}</p>
      <div className="mt-8 flex justify-end gap-3">
        <button type="button" onClick={onClose} className={buttonClass('secondary')}>Cancel</button>
        <button type="button" onClick={() => {onConfirm();onClose();}} className={`${buttonClass('primary')} bg-burnt hover:bg-terracotta`}>{confirmLabel}</button>
      </div>
    </Modal>);

}