import './App.css';
import {Table} from 'react-bootstrap'

function App() {
  return (
    <div>
    <p>hello world!</p>
    <div classname="results-page">
      Results
      <p>Congratulations you have completed the problem set!</p>
      <Table>
        <thead>
          <th>Your score was:</th>
          <th>Your time was:</th>
        </thead>
        <tbody>
          <td style={{color: /*user.score*/ >= 50 ? 'green' : 'red'}}>"Score"</td>
          <td>"Time"</td>
        </tbody>
      </Table>
    </div>
    </div>
  );
}

export default App;
