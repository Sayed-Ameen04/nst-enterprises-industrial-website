import React from 'react';
import { Modal } from '../common/Modal';
import { QuoteForm } from './QuoteForm';
import { Product } from '../../types/product';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  service?: string | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  product,
  service
}) => {
  const modalTitle = product
    ? `Request Quotation: ${product.name}`
    : (service ? `Request Service Quote: ${service}` : "Request Quotation — NST Enterprises");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      subtitle="Fill out the details below to receive competitive pricing and dispatch timelines from Tanveer Ahmed."
      maxWidth="lg"
    >
      <QuoteForm
        initialProduct={product}
        initialService={service}
        onSuccess={onClose}
        onCancel={onClose}
      />
    </Modal>
  );
};
