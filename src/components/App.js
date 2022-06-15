import { useState, useEffect } from "react";
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Container, Navbar, Modal, Button, Form, Table } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [contests, setcontests] = useState([]);
  const [newContest, setNewContest] = useState({
    name: "",
    link: "",
    date: "",
    time: "",
  });
  const contestsCollectionRef = collection(db, "contest");
  const createContest = async () => {
    await addDoc(contestsCollectionRef, newContest);
    handleClose();
    alert("Contest was successfully added");
  };
  const deleteContest = async (id) => {
    const contestDoc = doc(db, "contest", id);
    await deleteDoc(contestDoc);
  }
  useEffect(() => {
    const getcontests = async () => {
      const q = query(contestsCollectionRef, orderBy("date", "asc"));
      onSnapshot(q, (snapshot) => {
        setcontests(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getcontests();
  }, []);
  return (
    <div className='App'>
      <div className='main-home'>
        <Navbar bg='dark' variant="dark" expand='lg'>
          <Container>
            <Navbar.Brand href='/'>Contest Schedules</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse className='justify-content-end'>
              <Button variant="success" className="btn-sm" onClick={handleShow}>
                Add New Contest
              </Button>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Contest</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group className='mb-3'>
                <Form.Label>Contest Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Leetcode weekly 298'
                  onChange={(event) => {
                    setNewContest({ ...newContest, name: event.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Link</Form.Label>
                <Form.Control type='text'
                  onChange={(event) => {
                    setNewContest({ ...newContest, link: event.target.value });
                  }} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Date</Form.Label>
                <Form.Control type='date'
                  onChange={(event) => {
                    setNewContest({ ...newContest, date: event.target.value });
                  }} />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Time</Form.Label>
                <Form.Control type='time'
                  onChange={(event) => {
                    setNewContest({ ...newContest, time: event.target.value });
                  }} />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant='primary' onClick={createContest}>Save changes</Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Container>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Contest Name</th>
              <th>Link</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contests.map(contest => {
              return <tr>
                <td>{contest.name}</td>
                <td><a target="_blank" href={contest.link}>Contest Page</a></td>
                <td>{contest.date}</td>
                <td>{contest.time}</td>
                <td><Button className="btn-sm btn-danger" onClick={() => deleteContest(contest.id)}>Delete</Button></td>
              </tr>
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
