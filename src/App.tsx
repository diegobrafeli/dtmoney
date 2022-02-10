import { useState } from 'react';
import Modal from 'react-modal';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { GlobalStyle } from './styles/global';
import { TransactionsProvider } from './TransactionsContext';

Modal.setAppElement('#root');//so para acessibilidade de mostrar q o root n pode ser acessado

export function App() {

  const [isNewTrasnsactionModalOpen, setIsNewTrasnsactionModalOpen] = useState(false);

  function handleOpenNewTrasnsactionModal(){
      setIsNewTrasnsactionModalOpen(true);
  }

  function handleCloseNewTrasnsactionModal(){
      setIsNewTrasnsactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTrasnsactionModal} />
      <Dashboard/>

      <NewTransactionModal 
        isOpen={isNewTrasnsactionModalOpen} 
        onRequestClose={handleCloseNewTrasnsactionModal}
      />
      <GlobalStyle/>
    </TransactionsProvider>
  );
}