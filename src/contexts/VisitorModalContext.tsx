import { createContext } from 'react';

export const VisitorModalContext = createContext<{
  isVisitorModalOpen: boolean;
  setVisitorModalOpen: (open: boolean) => void;
}>({
  isVisitorModalOpen: false,
  setVisitorModalOpen: () => {},
});
