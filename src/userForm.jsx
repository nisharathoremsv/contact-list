import React, {Component} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { editUser, saveUser } from "./redux/user/action"


class UserForm extends Component {
  constructor(){
    super();
    this.state = { 
      id:'',
      name:'',
      email:'',
      contactNo:'',
      isError:false,
      errorMessage:'',
      user: []
    }
  }

  componentDidMount() {
    const { isEdit } = this.props
    if (isEdit) {
      this.setUserData()
    }
  }

  handleInputField = (e) => { 
    this.setState({ [e.target.name]: e.target.value })
  }
  
  validateForm = () => {
    const { name, email, contactno, id } = this.state
    if ((name === '') || (email === '') || (contactno === '') || (id === '')) 
    {
      this.setState({ isError: true, errorMessage: "all fields are required" });
      return false;
    } // if we write 'return' in a if block then 'else' part starts from the next line of if block
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) 
    {
     this.setState({ isError: true, errorMessage: "please enter a valid email"});
     return false;
    }
    // else all fields are validated successfully
    this.setState({ isError: false, errorMessage: '' });
    return true;
  }
  
  onSubmit = (e) => {
    e.preventDefault()
    const { id, name, email, contactNo } = this.state;
    const { saveUser, editUser, history } = this.props
    const isvalidate = this.validateForm();
    if (isvalidate) {
      const user = {
        name,
        email,
        contactNo,
        id,
      }
      saveUser(user)
      editUser(false)   
      this.resetForm()
      history.push('/home')
    }
  }

  resetForm = () => {
    this.setState({
      id:'',
      name:'',
      email:'',
      contactNo:'',
    })
  }

  generateId = () => {
    const a = Math.random() * 100000
    const id = Math.floor(a)
    this.setState({id})
  }

  setUserData = () => {
    const { currentUser: { id, name, email, contactNo }, isEdit } = this.props
    if(isEdit){
      this.setState({
        id,
        name,
        email,
        contactNo,
      })
    }
  }

  componentDidUpdate(prevProps){
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setUserData();
    }
  }

  render(){
    const {
      state: { id, name, email, contactNo, errorMessage },
      props: { isEdit }
    } = this
    return(
      <Form className="user-form">
        <Row form>
          <Col >
            <FormGroup>
              <Label for="exampleName">Name</Label>
              <Input
                onChange={this.handleInputField} 
                type="text"
                value={name}
                name="name" 
                id="exampleName" 
                placeholder="Enter Name" 
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col >
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input 
                onChange={this.handleInputField}
                type="text" 
                value={email} 
                name="email" 
                id="exampleEmail" 
                placeholder="Enter Email" 
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleContactNo">ContactNo</Label>
          <Input 
            onChange={this.handleInputField}
            type="number"  
            value={contactNo} 
            name="contactNo" 
            id="exampleContactNo" 
            placeholder="Enter ContactNo"
          />
        </FormGroup>
        <Row form>
          <Col md={3}>
            <FormGroup>
              <Label for="exampleId">Id</Label>
              <Input 
                onChange={this.handleInputField}
                type="number"  
                value={id}
                name="id" 
                id="exampleId" 
                placeholder="Click GenerateId "
                disabled
              />
            </FormGroup>
          </Col>
          <Row>
            <Col md={3}>
              <Label for="exampleId"></Label>
              {id === '' &&
                <Button
                  onClick={this.generateId}>
                  GenerateId
                </Button>
              }
            </Col>
          </Row> 
        </Row>
        <Row >
            <Col>
              <Label for="exampleId"></Label>
                <Button onClick={this.onSubmit}>
                {isEdit? "Save" : "Add"}
                </Button>
            </Col> 
          </Row>
          <Row>
            <Col>
              <Button 
                onClick={this.resetForm}>
                Clear
              </Button>
            </Col>
        </Row>
        <div className="error-text mt-4">
          {errorMessage}
        </div>
      </Form>
    );
  }
}

const mapStateToProps = state =>  (
  {
    isEdit: state.userReducer.isEdit,
    currentUser: state.userReducer.currentUser
  }
)

const mapDispatchToProps = {
  saveUser,
  editUser
} 

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)