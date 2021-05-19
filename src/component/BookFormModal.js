import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BookFormModal extends Component {

    render() {
        return (
            <div>
                <h3>Fill the boxes with your desired book</h3>
                 <Form style={{ width: '20rem' }}>
                <Form.Group>
                  <Form.Label>Book Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Book Name" 
                  onChange={(e) => {this.props.getBookName(e)}} 
                  />
                </Form.Group>
                
                <Form.Group>
                  <Form.Label>Book Status</Form.Label>
                  <Form.Control type="text" placeholder="Enter Status" 
                  onChange={(e) => {this.props.getBookStatus(e)}}
                  />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Book Description</Form.Label>
                  <Form.Control as="textarea" rows={3} 
                   onChange={(e) => {this.props.getBookDescription(e)}}
                  />
                </Form.Group>
                <Button onClick={this.props.getNewBook}>Add</Button>
                <Button onClick={this.props.closeForm}>Close Form</Button>
              </Form>
                {/* <form>
                    <label>Book Name: </label>
                    <input type="text" onChange={(e) => {this.props.getBookName(e)}}/>
                    <br />
                    <label>Book Description: </label>
                    <input type="text" onChange={(e) => {this.props.getBookDescription(e)}}/>
                    <br />
                    <label>Book Status: </label>
                    <input type="text" onChange={(e) => {this.props.getBookStatus(e)}}/>
                    <br />
                    <button onClick={this.props.getNewBook}>Add</button>
                    <button onClick={this.props.closeForm}>Close Form</button>
                </form> */}
            </div>
        )
    }
}

export default BookFormModal
