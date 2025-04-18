import { createContext, useContext } from 'react';
import { RootStore } from '@/stores/RootStore';

const RootStoreContext = createContext<RootStore | null>(null);

const rootStore = new RootStore();

export const RootStoreProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>
  );
};

export const useStores = () => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};