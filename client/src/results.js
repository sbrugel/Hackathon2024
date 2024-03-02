import './App.css';
import {Table} from 'react-bootstrap';

function results() {
  return (
    <div classname="results-page">
      Results
      <Table>
        <thead>
          <th>Your score was:</th>
          <th>Your time was:</th>
        </thead>
        <tbody>
          <td>"Score"</td>
          <td>"Time"</td>
        </tbody>
      </Table>
    </div>
  );
}

export default results;