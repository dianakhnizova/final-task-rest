import { Button } from './components/ui/button/Button';
import { messages } from './sources/messages';

function App() {
  return (
    <div>
      <h1>Init project</h1>
      <Button>{messages.buttons.testButton}</Button>
    </div>
  );
}

export default App;
