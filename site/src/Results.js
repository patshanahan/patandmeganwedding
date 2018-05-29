import React, { Component } from 'react';
import './Results.css';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      fetchUrl: 'https://api.patrickandmeganwedding.com/all',
      fetchSuccess: false,
      fetchError: false,
      attending: 0,
      notAttending: 0,
      total: 0,
      children: 0,
      beef: 0,
      chicken: 0,
      veg: 0,
      macNChe: 0
    }
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    fetch(this.state.fetchUrl, {
      method: 'POST'
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        items: responseJson.Items,
        fetchSuccess: true,
        fetchError: false
      });

      this.parseData(responseJson);
    }).catch((error) => {
      this.setState({fetchSuccess: false, fetchError: true});
    });
  }

  parseData(data) {
    var attending = 0,
        notAttending = 0,
        total = 0,
        children = 0,
        attendingChildren = 0,
        totalChildren = 0,
        beef = 0,
        chicken = 0,
        veg = 0,
        macNChe = 0;
        
    for (var i=0,l=data.Items.length; i<l; i++) {
      var item = data.Items[i];
      
      if (item.attending.S === 'true') attending++;
      if (item.firstName1) attending++;
      
      if (item.childCount) children += parseInt(item.childCount.N);

      if (item.attending.S === 'false') notAttending++;

      if (item.entree && item.entree.S === 'Beef') beef++;
      if (item.entree1 && item.entree1.S === 'Beef') beef++;
      if (item.adBeef) beef += parseInt(item.adBeef.N);

      if (item.entree && item.entree.S === 'Chicken') chicken++;
      if (item.entree1 && item.entree1.S === 'Chicken') chicken++;
      if (item.adChicken) chicken += parseInt(item.adChicken.N);

      if (item.entree && item.entree.S === 'Vegetarian') veg++;
      if (item.entree1 && item.entree1.S === 'Vegetarian') veg++;
      if (item.adVegetarian) veg += parseInt(item.adVegetarian.N);

      if (item.childMeals) macNChe += parseInt(item.childMeals.N);
    }

    attendingChildren = attending + children;
    total = attending + notAttending;
    totalChildren = total + children;

    this.setState({
      attending: attending,
      notAttending: notAttending,
      total: total,
      children: children,
      attendingChildren: attendingChildren,
      totalChildren,
      beef: beef,
      chicken: chicken,
      veg: veg,
      macNChe: macNChe
    });
  }

  getStyles(numerator, denominator, height) {
    var barHeight = numerator/denominator*height,
        barMargin = height-barHeight;

    var styles = {
      height: barHeight + "px",
      marginTop: barMargin
    }

    return styles;
  }

  render() {
    return (
      <div className="Results">
        <h1>Attending:</h1>
        <table className="ResultsTable">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Guest First Name</th>
              <th>Guest Last Name</th>
              <th>Entree</th>
              <th>Guest Entree</th>
              <th>Children</th>
              <th>Children's Names and Entrees</th>
              <th>Comments</th>
            </tr>
            {
              this.state.items.map(function(item, index){
                return item.attending.S === 'true' ? <Row item={item} key={index} /> : null;
              })
            }
          </tbody>
        </table>
        <h1>Not Attending:</h1>
        <table className="ResultsTable">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Guest First Name</th>
              <th>Guest Last Name</th>
              <th>Comments</th>
            </tr>
            {
              this.state.items.map(function(item, index){
                return item.attending.S === 'false' ? <Row item={item} key={index} /> : null;
              })
            }
          </tbody>
        </table>
        
        <h1>Attendance:</h1>
        <div className="ResultsGraph bar-5050">
          <div className="ResultBar" style={this.getStyles(this.state.attendingChildren, this.state.totalChildren, 400)}>
            <h3 className="BarLabel">Attending (including children): {this.state.attendingChildren}</h3>
          </div>
          <div className="ResultBar" style={this.getStyles(this.state.notAttending, this.state.totalChildren, 400)}>
            <h3 className="BarLabel">Not Attending: {this.state.notAttending}</h3>
          </div>
        </div>
        
        <h1>Attendance Breakdown:</h1>
        <div className="ResultsGraph bar-5050">
          <div className="ResultBar" style={this.getStyles(this.state.attending, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Adults: {this.state.attending}</h3>
          </div>
          <div className="ResultBar" style={this.getStyles(this.state.children, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Children: {this.state.children}</h3>
          </div>
        </div>
        
        <h1>Meals:</h1>
        <div className="ResultsGraph bar-25">
          <div className="ResultBar" style={this.getStyles(this.state.beef, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Beef: {this.state.beef}</h3>
          </div>
          <div className="ResultBar" style={this.getStyles(this.state.chicken, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Chicken: {this.state.chicken}</h3>
          </div>
          <div className="ResultBar" style={this.getStyles(this.state.veg, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Vegetarian: {this.state.veg}</h3>
          </div>
          <div className="ResultBar" style={this.getStyles(this.state.macNChe, this.state.attendingChildren, 400)}>
            <h3 className="BarLabel">Mac and Cheese: {this.state.macNChe}</h3>
          </div>
        </div>
      </div>
    );
  }
}

class Row extends Component {
  constructor(props) {
    super(props);

    this.state = props;
  }

  render() {
    return (
      <tr>
        <td>{this.state.item.firstName.S}</td>
        <td>{this.state.item.lastName.S}</td>
        {this.state.item.firstName1 ? <td>{this.state.item.firstName1.S}</td> : <td></td>}
        {this.state.item.lastName1 ? <td>{this.state.item.lastName1.S}</td> : <td></td>}
        {this.state.item.entree ? <td>{this.state.item.entree.S}</td> : (
          this.state.item.attending.S === 'true' ? <td></td> : null
        )}
        {this.state.item.entree1 ? <td>{this.state.item.entree1.S}</td> : (
          this.state.item.attending.S === 'true' ? <td></td> : null
        )}
        {this.state.item.childCount ? <td>{this.state.item.childCount.N}</td> : (
          this.state.item.attending.S === 'true' ? <td></td> : null
        )}
        {this.state.item.childNames ? <td>{this.state.item.childNames.S}</td> : (
          this.state.item.attending.S === 'true' ? <td></td> : null
        )}
        {this.state.item.comments ? <td>{this.state.item.comments.S}</td> : <td></td>}
      </tr>
    )
  }
}

export default Results;