/* eslint-disable */
import React from 'react'
import assert from 'assert'
import { mount } from 'enzyme'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&lt;div /&gt;</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Extract Local State into Redux`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>Great work! We're almost done here. Let's recall that
we wrote all this Redux code so that Redux could takeover the state management of our React messages app. Now that we have
Redux connected we need to extract our state management out of the <code>Presentational</code> component and into Redux. Currently, 
although we have Redux connected, we are still handling our state locally within the <code>Presentational</code> component. Let's
extract this state into Redux now.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Let's inspect the <code>Presentational</code> component.
First, let's get rid of the <code>messages</code> property in the local <code>state</code>. These messages will now be
managed by Redux. Next, modify the <code>submitMessage()</code> method so that we dispatch <code>submitNewMessage()</code>
from <code>this.props</code>, passing in the current message input from local <code>state</code>. Because we've removed
<code>messages</code> from local state, we can remove it from the call to <code>this.setState()</code> here as well. Finally,
we just have to modify our <code>render()</code> method so that we map over the messages received from <code>props</code>
rather than <code>state</code>.<br><br>

Once these changes are made the app will continue to function just the same except Redux is now managing our state for us.
This example also illustrates how a component may have local <code>state</code>: our component is still tracking user input
locally in its own <code>state</code>, while still maintaining app state globally with Redux. Moreover, you can now see how
Redux provides a useful state management framework on top of React. We achieved the same result using only React's local state at first
and this is usually possible with simple apps. However, as your apps become larger and more complex so does your state management and this
is exactly the problem Redux solves for us.`

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
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
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
    this.setState({
      input: '',
      messages: this.state.messages.concat(this.state.input)
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
// Change code above this line

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return { 
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Container/>
			</Provider>
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
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      input: ''
    }
	}
  handleChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }
	submitMessage = () => {
    this.props.submitNewMessage(this.state.input);
    this.setState({
      input: ''
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
		    	{this.props.messages.map( (message, idx) => {
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
// Change code above this line

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return { 
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
	render() {
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
	const error_6 = 'The Presentational component\' state contains one property, \'input\', which is initialized to an empty string.';
	const error_7 = 'Typing in the input element updates the state of the Presentational component.';
	const error_8 = 'Dispatching the submitMessage() on the Presentational component updates Redux store and clears the input in local state.';
	const error_9 = 'The Presentational component renders the messages from the Redux store.';

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
		},
		{
			test: 6,
			status: false,
			condition: error_6
		},
		{
			test: 7,
			status: false,
			condition: error_7
		},
		{
			test: 8,
			status: false,
			condition: error_8
		},
		{
			test: 9,
			status: false,
			condition: error_9
		}
	];

	let es5, mockedComponent, passed = true;

	// this applies an export to the user's code so
	// we can access their component here for tests
	
	const exportScript = '\n export default AppWrapper;'
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

	// test 6:
	try {
		let PresentationalState = mockedComponent.find('Presentational').node.state;
		assert(
				typeof PresentationalState.input === 'string' &&
				Object.keys(PresentationalState).length === 1,
				error_6
		);
		testResults[6].status = true;
	} catch (err) {
		passed = false;
		testResults[6].status = false;
	}

	// test 7:
	try {
		let initialState = mockedComponent.find('Presentational').node.state;
		mockedComponent.find('input').simulate('change', {target: {value: '__MOCK__INPUT__'}});
		let updatedState = mockedComponent.find('Presentational').node.state;
		assert(
			initialState.input === '' &&
			updatedState.input === '__MOCK__INPUT__',
			error_7
		);
		testResults[7].status = true;
	} catch (err) {
		passed = false;
		testResults[7].status = false;
	}

	// test 8:
	try {

		let beforeProps = mockedComponent.find('Presentational').node.props;
		mockedComponent.find('input').simulate('change', {target: {value: '__TEST__MESSAGE__'}});
		mockedComponent.find('Presentational').node.submitMessage();
		let afterProps = mockedComponent.find('Presentational').node.props;
		let afterState = mockedComponent.find('Presentational').node.state;

		assert(
			beforeProps.messages[0] !== afterProps.messages[0] &&
			afterProps.messages[0] === '__TEST__MESSAGE__' &&
			afterState.input === '',
			error_8
		);
		
		testResults[8].status = true;
	} catch (err) {
		passed = false;
		testResults[8].status = false;
	}

	// test 9:
	try {

		let ulBefore = mockedComponent.find('ul').children();
		mockedComponent.find('input').simulate('change', {target: {value: '__TEST__MESSAGE__2__'}});
		mockedComponent.find('Presentational').node.submitMessage();
		let ulAfter = mockedComponent.find('ul').children();

		assert(
			code.replace(/\s/g,'').includes('this.props.messages.map') === true &&
			ulAfter.length === ulBefore.length + 1 &&
			ulBefore.node.innerText === '__TEST__MESSAGE__' &&
			ulAfter.nodes[1].innerText === '__TEST__MESSAGE__2__',
			error_9
		);

		testResults[9].status = true;
	} catch (err) {
		passed = false;
		testResults[9].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// ---------------------------- define live render function ----------------------------

export const liveRender = (code) => {

	try {
		const exportScript = '\n export default AppWrapper;'
		const modifiedCode = code.concat(exportScript);
		const es5 = transform(modifiedCode, { presets: [ 'es2015', 'stage-2', 'react' ] }).code;
		const renderedComponent = React.createElement(eval(es5));
		return renderedComponent;
	} catch (err) {
		console.log(err);
	}

}