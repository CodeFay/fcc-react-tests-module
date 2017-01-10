/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Connect Redux to our Messages App`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Now that we've learned how to use <code>connect</code> to
connect React to Redux let's apply what we've learned to our React component that handles messages. Here we will connect
Redux to this component.

In the last lesson we called the component we were connecting <code>Presentational</code> and this wasn't arbitrary. This term
<i>generally</i> refers to React components which are not directly connected to Redux. They are simply responsible
for the presentation of UI and do this as a function of the props they receive. By contrast, container components are
connected to Redux. These are typically responsible for dispatching actions to the store and will often pass store
state to child components as props.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Here we've provided all the code we've
been working on so far. The only change is that we've renamed our React component to <code>Presentational</code>. Create a new
component called <code>Container</code> using <code>connect</code> to connect the <code>Presentational</code> component to Redux.
Then, in the <code>AppWrapper</code>, render the React Redux <code>Provider</code> component, passing in our Redux
<code>store</code> as a prop and <code>Container</code> as a child. Once everything is setup you will see our messages app
rendered to the page again, awesome!`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
	return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return state.concat(action.message);
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
		const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
    		<button onClick={this.submitMessage}>Submit</button>
    		<ul>
		    	{this.state.messages.map( (message, idx) => {
		    			return (
		    			 	<li key={idx}>{message}</li>
		    			)
		    		})
	    		}
	    	</ul>
    	</div>
    );
  }
};

// React-Redux: 
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return { 
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// define the Container component here:

class AppWrapper extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// complete the return statement:
		return (

		);
	}
};`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
	return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return state.concat(action.message);
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
class Presentational extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: '',
      messages: []
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
		const currentMessage = this.state.input;
    this.setState({
      input: '',
      messages: this.state.messages.concat(currentMessage)
    });
  }
  render() {
    return (
    	<div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
    		<button onClick={this.submitMessage}>Submit</button>
    		<ul>
		    	{this.state.messages.map( (message, idx) => {
		    			return (
		    			 	<li key={idx}>{message}</li>
		    			)
		    		})
	    		}
	    	</ul>
    	</div>
    );
  }
};

// React-Redux: 
const mapStateToProps = (state) => {
  return { messages: state }
};

const mapDispatchToProps = (dispatch) => {
  return { 
    submitNewMessage: (newMessage) => {
       dispatch(addMessage(newMessage))
    }
  }
};

const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		// complete the return statement:
		return (
			<Provider store={store}>
				<Container/>
			</Provider>
		);
	}
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your JSX code was transpiled successfully.';
	const error_1 = 'The AppWrapper is rendered to the page.';
	const error_2 = 'The Presentational component is rendered to the page.';
	const error_3 = 'The Presentational component renders an h2, input, button, and ul elements.';
	const error_4 = 'The Presentational component receives messages from the Redux store as a prop.';
	const error_5 = 'The Presentational component receives the submitMessage() action creator as a prop.';

	let testResults = [
		{
			test: 0,
			status: false,
			condition: error_0
		},
		{
			test: 1,
			status: false,
			condition: error_1
		},
		{
			test: 2,
			status: false,
			condition: error_2
		},
		{
			test: 3,
			status: false,
			condition: error_3
		},
		{
			test: 4,
			status: false,
			condition: error_4
		},
		{
			test: 5,
			status: false,
			condition: error_5
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	
	const exportScript = '\n export default AppWrapper'
	const modifiedCode = code.concat(exportScript);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}
	
	// now we will try to shallow render the component with Enzyme's shallow method
	// you can also use mount to perform a full render to the DOM environment
	// to do this you must import mount above; i.e. import { shallow, mount } from enzyme
	try {
		mockedComponent = mount(React.createElement(eval(es5)));
	} catch (err) {
		passed = false;
	}

	// run specific tests to verify the functionality
	// that the challenge is trying to assess:

	// test 1:
	try {
		assert.strictEqual(mockedComponent.find('AppWrapper').length, 1, error_1);
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}

	// test 2:
	try {
		assert.strictEqual(mockedComponent.find('Presentational').length, 1, error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;		
	}

	let PresentationalComponent, props;

	// test 3:
	try {

		PresentationalComponent = mockedComponent.find('Presentational');		
		assert(
			PresentationalComponent.find('div').length === 1 &&
			PresentationalComponent.find('h2').length === 1 &&
			PresentationalComponent.find('button').length === 1 &&
			PresentationalComponent.find('ul').length === 1,
			error_3
		);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;
	}

	// test 4:
	try {
		props = PresentationalComponent.node.props;
		assert.strictEqual(Array.isArray(props.messages), true, error_4);
		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	// test 5:
	try {
		assert.strictEqual(typeof props.submitNewMessage, 'function', error_5);
		testResults[5].status = true;
	} catch (err) {
		passed = false;
		testResults[5].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default AppWrapper'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}