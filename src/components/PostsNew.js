import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
	renderField(field) {
		const {
			meta: { touched, error },
		} = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
				<div className="text-help">{touched ? error : ''}</div>
			</div>
		);
	}

	onSubmit(values) {
		console.log(values);
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" component={this.renderField} />
				<Field
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
				<Link to="/" className="btn btn-danger">
					Cancel
				</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	// Validate the inputs
	if (!values.title || values.title.length <= 3) {
		errors.title = 'Enter a Title, minimum 3 characters long ';
	}
	// if (values.title.length < 3) {
	// 	errors.title = 'Enter a Title that is at least 3 characters';
	// }

	if (!values.categories) {
		errors.categories = 'Enter a Catagory';
	}

	if (!values.content) {
		errors.content = 'Enter some Content please';
	}
	// If errors is empty, the form is fine to submit
	// If error has any propertys redux form assumes form is invalid
	return errors;
}

export default reduxForm({
	validate,
	form: 'PostsNewForm',
})(PostsNew);
