import { useState, useCallback } from 'react';
import { ModalState } from '@/types';

export function useModal() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    data: undefined,
    type: undefined,
  });

  const openModal = useCallback((data?: unknown, type?: 'view' | 'edit' | 'delete' | 'create') => {
    setModalState({
      isOpen: true,
      data,
      type,
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalState({
      isOpen: false,
      data: undefined,
      type: undefined,
    });
  }, []);

  const updateModalData = useCallback((data: unknown) => {
    setModalState(prev => ({
      ...prev,
      data,
    }));
  }, []);

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    type: modalState.type,
    openModal,
    closeModal,
    updateModalData,
  };
} 