import { useState } from 'react';
import { Button } from './components/ui/button/Button';
import { Input } from './components/ui/input/Input';
import { Modal } from './components/ui/modal/Modal';
import { Select } from './components/ui/select/Select';

import { messages } from './sources/messages';

function App() {
  const [isModalOpen, setModalOpen] = useState(true);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h1>Init project</h1>
      <Button>{messages.buttons.testButton}</Button>

      <Input id={'test'} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {'test content'}
      </Modal>

      <Select
        setSelectedValue={value => console.log('Selected:', value)}
        options={['apple', 'banana']}
      />
    </div>
  );
}

export default App;
