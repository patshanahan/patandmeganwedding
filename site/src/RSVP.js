import React, { Component } from 'react';
import MenuItem from './MenuItem';
import './RSVP.css';

class RSVP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addlInfoPlusHidden: true,
      addlInfoChildrenHidden: true,
      formSuccess: false,
      action: 'https://api.patrickandmeganwedding.com/rsvp/',
      email: '',
      attending: false,
      attendingReception: false,
      firstName: '',
      lastName: '',
      entree: '',
      firstName1: '',
      lastName1: '',
      entree1: '',
      childCount: 0,
      childNames: '',
      childMeals: 0,
      kidsMeal: 0,
      adChicken: 0,
      adBeef: 0,
      adVegetarian: 0,
      comments: '',
      formItems: ['email', 'attending', 'attendingReception', 'firstName', 'lastName', 'entree', 'firstName1', 'lastName1', 'entree1', 'childCount', 'childNames', 'childMeals', 'adChicken', 'adBeef', 'adVegetarian', 'comments'],
      errors: {},
      hasErrors: true,
      hasSubmitted: false,
      submitError: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.validate = this.validate.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  handleChange(event) {
    const node = event.target;
    const stateKey = node.name;
    let returnObj = {};

    returnObj[stateKey] = node.value;

    if(this.state.hasSubmitted) {
      this.validate(node);
    }

    this.setState(returnObj);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({"hasSubmitted": true});
    this.validateAll(this.submitForm.bind(this));
  }

  submitForm() {
    if(!this.state.hasErrors) {
      let data = {};

      for(var i=0;i<this.state.formItems.length;i++) {
        const key = this.state.formItems[i];

        if(this.state[key] !== '' && this.state[key] !== 0) {
          data[key] = this.state[key];
        }
      }

      fetch(this.state.action, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }).then((response) => {
        this.setState({formSuccess: true, submitError: false});
      }).catch((error) => {
        this.setState({formSuccess: false, submitError: true});
      });
    }
  }

  handleToggle(event) {
    const targetRef = event.currentTarget.dataset['target'];
    const newState = !this.state[targetRef];
    const returnObj = {};
    
    returnObj[targetRef] = newState;
    
    this.setState(returnObj, () => {
      if(targetRef === 'attending' && this.state.attending) {
        this.setState({attendingReception: true});
      } else if(targetRef === 'attending' && !this.state.attending) {
        this.setState({attendingReception: false});
      }
    });
  }

  validate(node) {
    const errors = this.state.errors;

    for(var validator in node.dataset) {
      switch(validator) {
        case('required'):
          if(!node.value.toString().trim().length) {
            errors[node.name+validator] = true;
          } else {
            errors[node.name+validator] = false;
          }

          this.setState({"errors": errors})
        break;
        case('email'):
          const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

          if(!emailReg.test(node.value)) {
            errors[node.name+validator] = true;
          } else {
            errors[node.name+validator] = false;
          }

          this.setState({"errors": errors})
        break;
        default:
          return false;
      }
    }

    this.hasErrors(errors);

    return true;
  }

  hasErrors(errors, callback) {
    let hasErrors = false;

    for(var validator in errors) {
      if(errors[validator]) {
        hasErrors = true;
      }
    }

    this.setState({"hasErrors": hasErrors}, () => {
      if(typeof callback === 'function' && !hasErrors) {
        callback();
      }
    });

    return hasErrors;
  }

  validateAll(callback) {
    const form = this.refs.rsvp;
    let newErrors = this.state.errors;

    for(var errorKey in this.state.errors) {
      newErrors[errorKey] = false;
    }
    
    this.setState({"errors": newErrors});

    for(var i=0;i<this.state.formItems.length;i++) {
      if(form[this.state.formItems[i]]) {
        this.validate(form[this.state.formItems[i]]);
      }
    }

    this.hasErrors(this.state.errors, callback);
  }

  resetForm(event) {
    event.preventDefault();

    this.setState({formSuccess: false});
  }

  render() {
    return (
      <div className="App-rsvp">
        <h2>Attending the Wedding</h2>
        <div className="App-rsvpForm style-backdrop">
          <p className="style-centered">
            Please let us know if you will be able to join us on this occasion by <strong>June 14th, 2018</strong>.<br />
            One email address per household/couple attending is required in case we need to get back to you with further details.  <strong>Your email address will not be shared with anyone else!</strong>
          </p>
          <p>If you are having trouble submitting your RSVP via the form below, please feel free to reach out to <a href="mailTo:prshanahan@gmail.com?Subject=Wedding%20RSVP">Patrick</a> or <a href="mailTo:megan.k.sirois@gmail.com?Subject=Wedding%20RSVP">Megan</a>.  Please include your name, any other family members (including children) or significant others that will be joining you along with their meal choice (see the menu below).</p>
          {this.state.formSuccess ? (
            <div className="success">
              <p>Your RSVP has been received!</p>
              <p>If you need to submit for another guest or update your RSVP information (be sure to use the same email address), click the link below to return to the form.  You can re-submit the form at any time to update your information <strong>as long as you use the same email address</strong>.</p>
              <p><a href={null} onClick={this.resetForm}>Return to Form</a></p>
            </div>
          ) : (
            <form id="rsvp" ref="rsvp" action={this.state.action} onSubmit={this.handleSubmit}>
              <h3>RSVP</h3>
              {this.state.submitError ? (
                <div>
                  <p><span className="style-error">Our apologies</span>, it appears there was an error submitting your RSVP form.  Please try again later.  We apologize for the inconvenience.  If your're still having trouble, please reach out to either <a href="mailTo:prshanahan@gmail.com?Subject=Wedding%20RSVP">Patrick</a> or <a href="mailTo:megan.k.sirois@gmail.com?Subject=Wedding%20RSVP">Megan</a> via email.</p>
                </div>
              ) : null}
              <label>Email: (required)<br />
                <input name="email" type="email" placeholder="name@domain.com" onChange={this.handleChange} value={this.state.email} data-required="true" data-email="true" />
                {this.state.errors.emailrequired && <FormError errorMsg="Required" />}
                {this.state.errors.emailemail && <FormError errorMsg="Email address is not properly formatted (ex: name@domain.com)" />}
              </label><br />
              <label>First Name: (required)<br />
                <input name="firstName" type="text" placeholder="First Name" onChange={this.handleChange} value={this.state.firstName} data-required="true" />
                {this.state.errors.firstNamerequired && <FormError errorMsg="Required" />}
              </label><br />
              <label>Last Name: (required)<br />
                <input name="lastName" type="text" placeholder="Last Name" onChange={this.handleChange} value={this.state.lastName} data-required="true" />
                {this.state.errors.lastNamerequired && <FormError errorMsg="Required" />}
              </label><br />
              <h4 className="style-addlInfoHeader">Will you be gracing us with your presence for the ceremony and dinner?</h4>
              <label className="style-shortLabel"><input type="radio" name="attending" value="true" onChange={this.handleToggle} data-target="attending" checked={this.state.attending} />Graciously Accept</label><br />
              <label className="style-shortLabel"><input type="radio" name="attending" value="false" onChange={this.handleToggle} data-target="attending" checked={!this.state.attending} />Regretfully Decline</label>
              {this.state.attending && <AddlInfoSectionMain handleChange={this.handleChange} entree={this.state.entree} errors={this.state.errors} />}
              {this.state.attending ? null : (
                <div>
                  <h4 className="style-addlInfoHeader">Will you be celebrating with us during the post-dinner reception?</h4>
                  <label className="style-shortLabel"><input type="radio" name="attendingReception" value="true" onChange={this.handleToggle} data-target="attendingReception" checked={this.state.attendingReception} />Graciously Accept</label><br />
                  <label className="style-shortLabel"><input type="radio" name="attendingReception" value="false" onChange={this.handleToggle} data-target="attendingReception" checked={!this.state.attendingReception} />Regretfully Decline</label>
                </div>
              )}
              {this.state.attending ? (
                <div>
                  <h4 className="style-addlInfoHeader">Will you be bringing a guest, spouse or significant other?</h4>
                  <label className="style-shortLabel"><input type="radio" name="plusOne" value="false" onChange={this.handleToggle} data-target="addlInfoPlusHidden" checked={this.state.addlInfoPlusHidden} />No</label>
                  <label className="style-shortLabel"><input type="radio" name="plusOne" value="true" onChange={this.handleToggle} data-target="addlInfoPlusHidden" checked={!this.state.addlInfoPlusHidden} />Yes</label>
                  {!this.state.addlInfoPlusHidden && <AddlInfoSectionPlusOne handleChange={this.handleChange} firstName1={this.state.firstName1} lastName1={this.state.lastName1} entree1={this.state.entree1} errors={this.state.errors} />}
                  <h4 className="style-addlInfoHeader">Do you have any children that will be attending?</h4>
                  <label className="style-shortLabel"><input type="radio" name="children" value="false" onChange={this.handleToggle} data-target="addlInfoChildrenHidden" checked={this.state.addlInfoChildrenHidden} />No</label>
                  <label className="style-shortLabel"><input type="radio" name="children" value="true" onChange={this.handleToggle} data-target="addlInfoChildrenHidden" checked={!this.state.addlInfoChildrenHidden} />Yes</label>
                  {!this.state.addlInfoChildrenHidden && <AddlInfoChildren handleChange={this.handleChange} childCount={this.state.childCount} childNames={this.state.childNames} childMeals={this.state.childMeals} adBeef={this.state.adBeef} adChicken={this.state.adChicken} adVegetarian={this.state.adVegetarian} />}
                </div>
              ) : null}
              <h4 className="style-addlInfoHeader">Any comments for the bride and groom? Any details we may have missed on the RSVP form? Take a moment to tell us here!</h4>
              <textarea name="comments" placeholder="Let us know what's on your mind!" onChange={this.handleChange} value={this.state.comments} />
              <p><button type="submit">Submit</button></p>
            </form>
          )}
          <div className="App-menuInfo">
            <h2>Menu</h2>
            <p>All entrées include a house salad (ranch and red wine vinagrette dressings available) as well as bread and butter.  Hors d'oeuvres (vegetarian and non-vegetarian) will be served between the ceremony and reception.</p>
            <MenuItem 
              entreeName="Grilled Sirloin"
              description="8-ounce sirloin delicately seasoned and grilled to juicy perfection with a demi glaze (*Gluten Friendly without demi glaze)"
              sides="Rosemary red potatoes and green bean almondine."
            />
            <MenuItem 
              entreeName="Absolutely Vodka Chicken"
              description="Chicken breast with roasted garlic in a rich creamy vodka sauce with sundried tomatoes."
              sides="Rosemary red potatoes and green bean almondine."
            />
            <MenuItem 
              entreeName="Spinach Tortelloni"
              description="Roasted garlic and spinach-filled tortelloni tossed with sundried tomatoes in a tomato garlic cream sauce. Garnished with fresh parmesan cheese."
              sides="Does not include any sides (aside from salad and bread)"
            />
            <MenuItem 
              entreeName="Kids Meal"
              description="Macaroni and Cheese (for children ages 12 and under)"
              sides="Does not include any sides"
            />
          </div>
        </div>
      </div>
    );
  }
}

class AddlInfoSectionMain extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    return (
      <div className="addlInfoSection style-addlInfoSection">
        <label>Entrée Choice: (required)<br />
          <select name="entree" onChange={this.props.handleChange} value={this.props.entree} data-required="true">
            <option value="">Select Entrée</option>
            <option value="Beef">Sirloin Steak (beef)</option>
            <option value="Chicken">Vodka Chicken (chicken)</option>
            <option value="Vegetarian">Spinach Torteloni (vegetarian)</option>
          </select>
          {this.props.errors.entreerequired && <FormError errorMsg="Required" />}
        </label>
      </div>
    )
  }
}

class AddlInfoSectionPlusOne extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    return (
      <div className="addlInfoSection style-addlInfoSection">
        <label>First Name:<br />
          <input name="firstName1" type="text" placeholder="First Name" onChange={this.props.handleChange} value={this.props.firstName1} data-required="true" />
          {this.state.errors.firstName1required && <FormError errorMsg="Required" />}
        </label><br />
        <label>Last Name:<br />
          <input name="lastName1" type="text" placeholder="Last Name" onChange={this.props.handleChange} value={this.props.lastName1} data-required="true" />
          {this.state.errors.lastName1required && <FormError errorMsg="Required" />}
        </label><br />
        <label>Entrée Choice:<br />
          <select name="entree1" onChange={this.props.handleChange} value={this.props.entree1} data-required="true">
            <option value="">Select Entrée</option>
            <option value="Beef">Sirloin Steak (beef)</option>
            <option value="Chicken">Vodka Chicken (chicken)</option>
            <option value="Vegetarian">Spinach Torteloni (vegetarian)</option>
          </select>
          {this.state.errors.entree1required && <FormError errorMsg="Required" />}
        </label>
      </div>
    )
  }
}

class AddlInfoChildren extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    return (
      <div className="addlInfoSection style-addlInfoSection">
        <label>How many children will be attending?<br />
          <input className="style-intInput" name="childCount" type="number" placeholder="0" onChange={this.props.handleChange} value={this.props.childCount} />
        </label><br />
        <label>Children's Names and Meal Choice: ([Name] - [Meal], comma separated)<br />
          <textarea name="childNames" placeholder="Robb - Steak, Sansa - Chicken, Bran - Vegetarian, Arya - Pasta, Rickon - Kids Meal..." onChange={this.props.handleChange} value={this.props.childNames} />
        </label>
        <p>Total for each meal option (kids only):</p>
        <table className="App-kidsTable">
          <tbody>
            <tr>
              <th><label htmlFor="childMeals">Kids Meal<br />(Mac and Cheese)</label></th>
              <th><label htmlFor="adBeef">Sirloin Steak<br />(Beef)</label></th>
              <th><label htmlFor="adChicken">Vodka Chicken<br />(Chicken)</label></th>
              <th><label htmlFor="adVegetarian">Spinach Torteloni<br />(Vegetarian)</label></th>
            </tr>
            <tr>
              <td><input id="childMeals" name="childMeals" type="number" placeholder="0" onChange={this.props.handleChange} value={this.props.childMeals} /></td>
              <td><input id="adBeef" name="adBeef" type="number" placeholder="0" onChange={this.props.handleChange} value={this.props.adBeef} /></td>
              <td><input id="adChicken" name="adChicken" type="number" placeholder="0" onChange={this.props.handleChange} value={this.props.adChicken} /></td>
              <td><input id="adVegetarian" name="adVegetarian" type="number" placeholder="0" onChange={this.props.handleChange} value={this.props.adVegetarian} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

class FormError extends Component {
  render() {
    return <span className="style-error error">{this.props.errorMsg}</span>
  }
}

export default RSVP;