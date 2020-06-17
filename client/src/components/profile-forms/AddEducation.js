import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile'


const AddEducation = ({addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  });
  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  console.log(formData);

  return (
    <Fragment>
      <section className="container">
        <h1 className="large text-primary">
          Add An Education
      </h1>
        <p className="lead">
          <i className="fas fa-code-branch"></i> Add any school or boot camp that you have attended
      </p>
        <small>* = required field</small>
        <form className="form" onSubmit={
          e=>{
            e.preventDefault();
            addEducation(formData, history);
          }
        }>
          <div className="form-group">
            <input type="text" placeholder="* School or Bootcamp" name="school" onChange={(e) => onChange(e)} value={school} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="* Degree or certificate" name="degree" onChange={(e) => onChange(e)} value={degree} />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Field of study" name="fieldofstudy" onChange={(e) => onChange(e)} value={fieldofstudy} />
          </div>
          <div className="form-group">
            <h4>From Date</h4>
            <input type="date" name="from" onChange={(e) => onChange(e)} value={from} />
          </div>
          <div className="form-group"> 
          {
            //  toggleDisabled(!toDateDisabled);===> reset to true/false}
          }
          <p><input type="checkbox" name="current" checked={current} onChange={e => { setFormData({ ...formData, current: !current }); toggleDisabled(!toDateDisabled); }} value={current} /> Current Job</p>
          </div>
          <div className="form-group">
            <h4>To Date</h4> {/* disabled={toDateDisabled ? 'disabled' : ''} ===> if current JOB is true then disable 'exit date' */}
            <input type="date" name="to" onChange={(e) => onChange(e)} value={to} disabled={toDateDisabled ? 'disabled' : ''} />
          </div>
          <div className="form-group">
            <textarea name="description" cols="30" rows="5" placeholder="Program Description" onChange={(e) => onChange(e)} value={description}> </textarea>
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="dashboard">Go Back</Link>
        </form>
      </section>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(AddEducation); 