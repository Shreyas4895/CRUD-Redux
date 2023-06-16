import logo from "./logo.svg";
import "./App.css";
import Container from "react-bootstrap/Container";

import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { useState } from "react";
import { add, remove, update } from "./redux/user";

function App() {
  const { users } = useSelector((state) => state.user);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sl.NO</th>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>
                    <button onClick={()=>dispatch(remove(user.id))}>Delete</button>
                  </td>
                  <td>
                    <button onClick={()=>dispatch(update({id:user.id,name:"update"}))}>Update</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <div>
        <label>Id: </label>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            if (!id || !name) {
              return;
            }
            dispatch(add({ id: id, name: name }));
            setId("");
            setName("");
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default App;
