import React, { Component} from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input, InputGroup, InputGroupAddon, InputGroupText,
  Button
} from 'reactstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import $ from 'jquery';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {urlUsers} from '../../Constant'
const moment = require('moment');

class Tables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      currentPage: 1,
      resultsPerPage: 40,
      rangePicker: {},
      show : false,
      stream : null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleRegister = () => {
    window.location.href = '/register';  
  }
  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  updateTugas(accountId){
    this.setState({
      idAccount : accountId,
      showEdit : true
    })

    const Header = {
      'Content-Type': 'application/json',
      //Authorization : `Bearer ` + localStorage.getItem('token'),
      // 'Content-Type' : 'application/json-patch+json'
    };

    axios({
      method: 'get',
      url: urlUsers + '/spesific/' + accountId,
      headers: Header,
    })
      .then(data => {
        console.log(data.data)
        this.setState({
          "username": data.data.username,
          "name": data.data.name,
          "role": data.data.role,
        });
      })
      .catch(err => {
        console.log(err);
      });
}


handlesubmitUpdate = () => {
  const Headers = {
    //'accept' : 'application/json',
    'Content-Type' : 'application/json'
  };
  const Data = {
    "username" : this.state.username,
    "name": this.state.name,
    "role": this.state.role,
  }

  axios({
    method: 'post',
    url: urlUsers + '/update/' + this.state.idAccount,
    headers: Headers,
    data : Data
  })
    .then(data => {
      console.log(data);
      alert("berhasil");
     window.location.reload();
    })
   
    .catch(err => {
     alert(err)
    });
    
}
  /* handle untuk form */
  handelsubmitform = () => {
    const Headers = {
      //'accept' : 'application/json',
      'Content-Type' : 'application/json'
    };
    const Data = {
      "username" : "MUSLIM",
      "description": this.state.description,
      "matkul": this.state.matkul,
      "date": this.state.date,
    }

    axios({
      method: 'post',
      url: urlUsers +  '/add',
      headers: Headers,
      data : Data
    })
      .then(data => {
        console.log(data);
        alert("berhasil");
       window.location.reload();
      })
     
      .catch(err => {
       alert(err)
      });
      
  }

  handleName = (evt) => {
      this.setState ({
        name : evt.target.value,
      });
    
  }

  handleDescription = (evt) => {
     this.setState ({
      description : evt.target.value,
     });
 }

 handleDeadline = (evt) =>{
  this.setState({
    date : evt.target.value
  })
 }

  handleJS = () => {
   // function filterRows() {
    var from = $('#datefilterfrom').val();
    var to = $('#datefilterto').val();

    if (!from && !to) {
      // no value for from and to
      return;
    }

    from = from || '2020-02-25'; // default from to a old date if it is not set
    to = to || '2020-02-25';

    var dateFrom = moment(from);
    var dateTo = moment(to);

    $('#myTable tr').each(function(i, tr) {
      var val = $(tr)
        .find('td:nth-child(3)')
        .text();
      var dateVal = moment(val, 'YYYY/MM/DD');

      var visible = dateVal.isBetween(dateFrom, dateTo, null, []) ? '' : 'none'; // [] for inclusive
      $(tr).css('display', visible);

      console.log(dateVal);
    });

   // $('#datefilterfrom').on("change", filterRows);
   // $('#datefilterto').on("change", filterRows);
 // };
}
  componentDidMount() {

      var Role = localStorage.getItem("Role")
      var status = localStorage.getItem("token");
      if(!status){
          alert('harap login terlebih dahulu');
          this.props.history.push('/login');
      }else{
          if(Role !== "admin"){
              alert('anda tidak punya akses ke sini');
              this.props.history.push('/user');
          }
      }
  
    const value = localStorage.getItem('token');
    this.setState({
      token: value,
    });
    const Header = {
     // accept: 'application/json',
      //Authorization : `Bearer ` + value,
      // 'Content-Type' : 'application/json-patch+json'
      'Content-Type' : 'application/json',
      
    };

    // axios({
    //   method: 'get',
    //   url: urlUsers,
    //   headers: Header,
    //   "params": { "username": 'muslim'} 
    // })
    axios.get(urlUsers + '/', {headers: Header}, )
      .then(data => {
        console.log(data.data)
        this.setState({
          results: data.data,
          loading: true,
        });
      })
     
      .catch(err => {
        console.log(err);
      });
  }

  handleDateChange = (event) =>{
    this.handleJS();
  }

  filterList = event => {
    //var updatedList = this.state.results;
    // updatedList = updatedList.filter(function(item){
    //   return item.toString().toLowerCase().search(
    //     event.target.value.toLowerCase()) !== -1;
    // });
    // this.setState({results: updatedList});
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('myTable');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName('td')[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = '';
        } else {
          tr[i].style.display = 'none';
        }
      }
    }
  };

  handleAddTugas = () => {
    this.setState({
      show : true
    })
  }


  handleClose = () => {
		this.setState({ show: false, showEdit : false});
	}

	handleShow = () => {
		this.setState({ show: true });
  }

  handleSelect = range => {
    console.log(range);
    // An object with two keys,
    // 'startDate' and 'endDate' which are Momentjs objects.
  };

  deleteAccount(accountId) {
    const Header = {
      accept: 'application/json',
    };
    axios({
      method: 'delete',
      url:  urlUsers + '/delete/' + accountId,
      headers: Header,
    })
      .then(data => {
        console.log(data);
        alert('berhasil dihapus');
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    const { results, currentPage, resultsPerPage } = this.state;
    const indexOfLastTodo = currentPage * resultsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - resultsPerPage;
   const currentresults = results.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderresults = currentresults.map((results, index) => {
      //return <li key={index}>{todo.username}</li>;

      return (
        <tr key={results._id} data-category={results._id}>
         <td>{results._id}</td>
         <td>{results.name}</td>
         <td>{results.username}</td>
         <td>{results.role}</td>
         <td>
            {/* <Button className="brn btn-success" onClick={() => this.approveAbsensi(results.Id)}>Approve</Button>
            &nbsp; */}
            <Button
              className="btn btn-info"
              onClick={() => this.updateTugas(results._id)}>
              Edit
            </Button>
            {/* <Link
              to={'/account/editaccount/' + results.id}
              className="btn btn-primary">
              Edit
            </Link> */}
            &nbsp;
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteAccount(results._id)}>
              Delete
            </Button>
          </td>
        
        </tr>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(results.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li style={{backgroundColor : 'white'}}
          key={number}
          id={number}
          onClick={this.handleClick}
          className="page-link">
          {number}
        </li>
      );
    });

    if (this.state.loading === false) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
            	<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Add Tugas</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
        
          Nama Matkul
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleMatkul} placeholder="matkul" autoComplete="matkul" />
          </InputGroup>
          
          Description
          <InputGroup className="mb-3">
          <Input type="text" onChange={this.handleDescription} placeholder="description" autoComplete="description" />
          </InputGroup>
          
          Deadline
          <InputGroup className="mb-3">
          <Input type="datetime-local" onChange={this.handleDeadline} placeholder="deadline" autoComplete="deadline" />
          </InputGroup>

          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
						<Button className="btn btn-info" onClick={this.handelsubmitform}>
							Save Changes
            </Button>
					</Modal.Footer>
				</Modal>


        {/*modal edit */}
        <Modal show={this.state.showEdit} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Account</Modal.Title>
					</Modal.Header>
					<Modal.Body>
          
          <Form>
        
          Nama
          <InputGroup className="mb-3">
          <Input type="text" value={this.state.name} onChange={this.handleName} />
          </InputGroup>
          
          Username
          <InputGroup className="mb-3">
          <Input type="text" disabled onChange={this.handleDescription} value={this.state.username} placeholder="description" autoComplete="description" />
          </InputGroup>
          
          Role
          <InputGroup className="mb-3">
          <Input type="text" disabled value={this.state.role} onChange={this.handleDeadline} placeholder="deadline" autoComplete="deadline" />
          </InputGroup>

          </Form>
          </Modal.Body>
					<Modal.Footer>
						<Button className="btn btn-secondary" onClick={this.handleClose}>
							Close
            </Button>
						<Button className="btn btn-info" onClick={this.handlesubmitUpdate}>
							Save Changes
            </Button>
					</Modal.Footer>
				</Modal>

        <div className="row">
          {/* <div class="col-md-3">
            <h4>Date from</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterfrom"
              data-date-split-input="true"
              onChange={this.handleDateChange}
            />
          </div> */}
          {/* <div class="col-md-3">
            <h4>Date to</h4>
            <input
              type="date"
              class="form-control"
              id="datefilterto"
              data-date-split-input="true"
            />
          </div> */}
          {/* <div>
            <h4>Date to</h4>
            <button onClick={this.handleJS}>filter date</button>
          </div> */}
        </div>

        <div className="animated fadeIn">
          {this.state.loading && (
            <Row>
              <Col xs="12" lg="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col>
                        <i className="fa fa-user" /> <b>&nbsp;List Account</b>
                        <Button
                          style={{ marginLeft: 10 }}
                          color="success"
                          className="px-4"
                          onClick={this.handleRegister}>
                          Add Account
                        </Button>

                  
                      </Col>
                      <Col>
                        <input
                          type="text"
                          id="myInput"
                          className="form-control form-control-md"
                          style={{ width: '100%' }}
                          placeholder="Search By Name"
                          onChange={this.filterList}
                        />
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* <DateRange
              format="DD/MM/YYYY"
              startDate={rangePicker["startDate"]}
              endDate={rangePicker["endDate"]}
              linkedCalendars={true}
              disableDaysBeforeToday={true}
              date={now => now}
              onInit={this.handleChange}
              onChange={this.handleChange} /> */}

                    <Table id="myTable" responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th> 
                          <th>Name</th>
                          <th>Username</th>
                          <th>Role</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>{
                       renderresults
                        }</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </div>
        {/* <Pagination>
                  <PaginationItem>
                  {renderPageNumbers}
                     </PaginationItem>
    </Pagination>
         */}
        <ul className="pagination" style={{backgroundColor : 'white'}}>{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default Tables;
