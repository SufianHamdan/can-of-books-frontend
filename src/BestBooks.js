import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import { CardColumns } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import BookFormModal from './component/BookFormModal';
import UpdateBookForm from './component/UpdateBookForm';



class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBestBooksComponent: false,
      server: process.env.REACT_APP_SERVER_URL,
      showFormPage: false,
      email: '',
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      showUpdateForm: false,
      index: 0
    }
  }
  getBooks = async () => {
    const { user } = this.props.auth0;
    try {

      const paramsObj = {
        email: user.email
      }
      const books = await axios.get(`${this.state.server}/books`, { params: paramsObj });

      console.log(books);


      this.setState({        
        books: books.data[0].books,
        showBestBooksComponent: true,
        emeil: user.email
      });
    } catch (error) {
      console.log(error);
    }
   
  }

  updateBookName = (e) => this.setState({ bookName: e.target.value });
  updateBookDescription = (e) => this.setState({ bookDescription: e.target.value });
  updatebookStatus = (e) => this.setState({ bookStatus: e.target.value });

  getNewBook = async (e) => {
    const { user } = this.props.auth0;
    e.preventDefault();
    try {

      const bodyData  = {
        email: user.email,
        bookName: this.state.bookName,
        bookDescription: this.state.bookName,
        bookStatus: this.state.bookStatus

      }
      const books = await axios.post(`${this.state.server}/books`, bodyData );
      console.log(books);
      this.setState ({
        books: books.data[0].books
      });

    } catch (error) {
      console.log(error);
    }
  }
  
  deleteBook = async (index) => {
    // console.log(index);
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((book, idx) => {
      return idx !== index;
    });
    
    console.log(newArrayOfBooks);
    this.setState({
      books: newArrayOfBooks
    });

    const query = {
      email: user.email
    }

    await axios.delete(`${this.state.server}/books/${index}`, { params: query });

  }

  updateFormText = (idx) => {

    const newUpdatedBookArr = this.state.books.filter((value, index) => {
      return idx === index
    });

    console.log(newUpdatedBookArr);
    this.setState({
      index: idx,
      bookName: newUpdatedBookArr[0].name,
      bookDescription: newUpdatedBookArr[0].description,
      bookStatus: newUpdatedBookArr[0].status,
      showUpdateForm: true,
    });
  }

  updateBook = async (e) => {
    e.preventDefault();
    const reqBody = {
      bookName: this.state.bookName,
      bookDescription: this.state.bookDescription,
      bookStatus: this.state.bookStatus,
      email: this.state.email
    }
    const books = await axios.put(`${this.state.server}/books/${this.state.index}`, reqBody);

    this.setState({
      books: books.data
    });

  }


  componentDidMount() {
    const { user } = this.props.auth0;
    this.setState({
      showBestBooksComponent: true,
      email: user.email
    });

    this.getBooks();
    console.log(this.getBooks);
  }

 
  showForm = () => {
    this.setState({
      showFormPage: true,
    });
    console.log('sd');
  }

  closeForm = () => {
    this.setState({
      showFormPage: false,
    });
  }
  

  render() {
    console.log(this.state.books);
    return (
      <>

        <Jumbotron>
          <h1>My Favorite Books</h1>
          <p>
            This is a collection of my favorite books
            </p>
            </Jumbotron>
            <button onClick={this.showForm}>Add Books</button>
            {this.state.showFormPage &&
            <>
            <BookFormModal
              getBookName= {this.updateBookName}
              getBookDescription= {this.updateBookDescription}
              getBookStatus= {this.updatebookStatus}       
              ShowForm = {this.state.showFormPage}
              closeForm = {this.closeForm}
              getNewBook = {this.getNewBook}

            />
            </>
            }
            <>
            {this.state.showUpdateForm &&
              <UpdateBookForm
                updateBookName = {this.updateBookName}
                updateBookDescription = {this.updateBookDescription}
                updatebookStatus = {this.updatebookStatus}
                bookName={this.state.bookName}
                bookDescription={this.state.bookDescription}
                bookStatus={this.state.bookStatus}
                updateBook = {this.updateBook}
                
              />
            }
          </>
          


          {this.state.showBestBooksComponent &&
            <>
              
               <div class="container">
                <Row className="justify-content-md-center">
                  <CardColumns>
              {this.state.books.map((data, index) => {
                return (
                  <>
                    <Col md="auto">
                      <Card style={{ width: '24rem' }} key={index}>
                        <Card.Body>
                          <Card.Title>Name: {data.name}</Card.Title>
                          <Card.Text>Description: {data.description}</Card.Text>
                          <Card.Text>Status: {data.status}</Card.Text>
                          <button onClick={() => {this.deleteBook(index)}}>Delete</button>
                          <button onClick={() => {this.updateFormText(index)}}>Update</button>                          
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                );

              })
              }
                  </CardColumns>
                </Row>
              </div>
            </>
          }


          
      </>


    )
  }
}

export default withAuth0(MyFavoriteBooks);
