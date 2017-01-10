/* eslint-disable */
import assert from 'assert'
import { transform } from 'babel-standalone'

// snippet for defining HTML: <code>&#60;div /&#62</code>

// SET TO TRUE WHEN QA IS COMPLETE:
export const QA = false;

// ---------------------------- define challenge title ----------------------------
export const challengeTitle = `<span class = 'default'>Challenge: </span>Map State to Props`

// ---------------------------- challenge text ----------------------------
export const challengeText = `<span class = 'default'>Intro: </span>The <code>Provider</code> component allows us to
provide <code>state</code> and <code>dispatch</code> to our React components, but we must specify explicitly what
state and actions we want. In this way we can ensure that each component only has access
to the state it needs. We will accomplish this by creating two functions <code>mapStateToProps()</code> and
<code>mapDispatchToProps()</code>. In these functions we will declare exactly what pieces of state we want to have
access to and which action creators we need to be able to dispatch. After writing these functions we will see
how to use the React Redux <code>connect</code> method to connect them to our components. Note: Behind the scenes
React-Redux is using the <code>store.subscribe()</code> method to implement <code>mapStateToProps()</code>.`

// ---------------------------- challenge instructions ----------------------------
export const challengeInstructions = `<span class = 'default'>Instructions: </span>Create a function
<code>mapStateToProps()</code>. This function should take <code>state</code> as an argument and return an object
which maps that state to specific property names. These properties will then become accessible to our component via
<code>props</code>. Here, we are using a simple example where our entire state is a single array so we can pass that
entire state to our component. Do this by mapping <code>state</code> to the property <code>messages</code> in the
object return from <code>mapStateToProps()</code>.`

// ---------------------------- define challenge seed code ----------------------------
export const seedCode = 
`const state = [];

// change code below this line`

// ---------------------------- define challenge solution code ----------------------------
export const solutionCode =
`const state = [];

// change code below this line

const mapStateToProps = (state) => {
  return {
  	messages: state
  }
};`

// ---------------------------- define challenge tests ----------------------------

export const executeTests = (code) => {

	const error_0 = 'Your code was transpiled successfully.';
	const error_1 = 'The const state is an empty array.';
	const error_2 = 'mapStateToProps is a function.';
	const error_3 = 'mapStateToProps returns an object.';
	const error_4 = 'Passing an array as state to mapStateToProps returns this array assigned to a key of messages.';

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
		}
	];

	let es5, reduxCode, passed = true;
	let state, mapStateToProps;

	// this code hijacks the user input to create an IIFE 
	// which returns the store from Redux as an object
	// or whatever you need from the client code
	const prepend = `(function() {`
	const apend = `;\n return { state, mapStateToProps } })()`
	const modifiedCode = prepend.concat(code).concat(apend);
	
	// test 0: try to transpile JSX, ES6 code to ES5 in browser
	try {
		es5 = transform(modifiedCode, { presets: [ 'es2015', 'react' ] }).code;
		testResults[0].status = true;
	} catch (err) {
		passed = false;
		testResults[0].status = false;
	}

	// save the store from redux to test here
	// now you can access the redux store methods
	try {
		reduxCode = eval(es5);

		state = reduxCode.state;
		mapStateToProps = reduxCode.mapStateToProps;

	} catch (err) {
		passed = false;
	}

	// test 1:
	try {
		assert.strictEqual(state.length, 0, error_1)
		testResults[1].status = true;
	} catch (err) {
		passed = false;
		testResults[1].status = false;
	}
	
	// test 2:
	try {
		assert.strictEqual(typeof mapStateToProps, 'function', error_2);
		testResults[2].status = true;
	} catch (err) {
		passed = false;
		testResults[2].status = false;
	}

	// test 3:
	try {

		let mapped = mapStateToProps();
		assert.strictEqual(typeof mapped, 'object', error_3);

		testResults[3].status = true;
	} catch (err) {
		passed = false;
		testResults[3].status = false;		
	}

	// test 4:
	try {

		let testState = ['messages'];
		let mappedState = mapStateToProps(testState);
		assert.strictEqual(mappedState.messages[0], 'messages', error_4);

		testResults[4].status = true;
	} catch (err) {
		passed = false;
		testResults[4].status = false;
	}

	return {
		passed,
		testResults
	}
	
}

// liveRender modifies console.log in user input and returns message data -----------------------
export const liveRender = (code) => {

	// this code modifies the user input to return all
	// console.log statements as a message array to be
	// displayed on the client UI
	const prepend = `
	(function() { 
		let __Custom__Log = []
		const message = (msg) => __Custom__Log.push(msg);
	`
	const apend = `; return __Custom__Log })();`
	const consoleReplaced = code.replace(/console.log/g, 'message');
	const hijackedCode = prepend.concat(consoleReplaced).concat(apend);
	
	let evaluatedCode;
	try {
		evaluatedCode = eval(hijackedCode);
	} catch (err) {
		console.log(err);
	}

	return evaluatedCode;

}
