import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card';


class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBestBooksComponent: false,
      server: process.env.REACT_APP_SERVER_URL
    }
  }

  componentDidMount() {
    this.setState({
      showBestBooksComponent: true,
    });

    this.getBooks();
    console.log(this.getBooks);
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
        showBestBooksComponent: true
      });
    } catch (error) {
      console.log(error);
    }
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
