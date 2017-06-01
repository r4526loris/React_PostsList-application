import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {createPost} from "../actions/index";

class PostsNew extends Component {

  onSubmit(values){
    console.log(values);
    this.props.createPost(values);
    this.props.history.push("/");
  }

  renderField(field){
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input} />
        <div className="text-help"></div>
        {touched ? error : ""}
      </div>
    )
  }

  render(){
    const {handleSubmit} = this.props;
    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}/>
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}/>
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}/>
        <button
          className="btn btn-primary"
          type="submit">Add Post</button>
        <Link to='/' className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values){
  const errors = {};
  if(!values.title || values.title.length < 3){
    errors.title = "Enter a title that is at least 3 characters!";
  }
  if(!values.categories){
    errors.categories = "Enter some categories!";
  }
  if(!values.content){
    errors.content = "Enter some content please.";
  }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: "PostsNewForm"
})(
  connect(null, {createPost})(PostsNew)
);
