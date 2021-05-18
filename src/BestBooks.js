import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';
import BookFormModal from './component/BookFormModal';



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
      bookStatus: ''
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
    e.preventDefault();
    try {

      const bodyData  = {
        email: this.state.email,
        bookName: this.state.bookName,
        bookDescription: this.state.bookName,
        bookStatus: this.state.bookStatus

      }
      const books = await axios.post(`${this.state.server}/books`, bodyData );
      console.log(books);
      // this.setState ({
      //   books: books.data[0].books
      // });

    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.setState({
      showBestBooksComponent: true,
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
          


          {this.state.showBestBooksComponent &&
            <>

              {this.state.books.map((data, index) => {
                return (
                  <>
                    <Card style={{ width: '18rem' }} key={index}>
                      <Card.Body>
                        <Card.Title>Name: {data.name}</Card.Title>
                        <Card.Text>Description: {data.description}</Card.Text>
                        <Card.Text>Status: {data.status}</Card.Text>                         
                      </Card.Body>
                    </Card>
                   {/*  <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt=""
                      />
                      <Carousel.Caption>
                        <h3>Name: {data.name}</h3>
                        <p>Description: {data.description}</p>
                        <p>Status: {data.status}</p>
                      </Carousel.Caption>
                    </Carousel.Item> */}

                  </>
                );

              })
              }
            </>
          }


        </Jumbotron>
      </>



    )
  }
}

export default withAuth0(MyFavoriteBooks);
