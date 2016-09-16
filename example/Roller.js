/* eslint-disable */

import React, { Component } from 'react';

export const themes = {
  default: 'Default',
  light: 'Light',
  dark: 'Dark'
};

export const animations = {
  default: 'None',
  fadeIn: 'Fade In',
  zoomIn: 'Zoom In',
  flipIn: 'Flip In',
  popIn: 'Pop In'
};

export default class Roller extends Component {
  getOptions(){
    const options = this.props.options;
    return Object.keys(options).map(k => <option key={options[k].replace(' ','-')} value={k}>{options[k]}</option>);
  }

  render() {
    
    return (
        <div className="form-group">
          <label>{this.props.name}</label>
          <select className="form-control" onChange={this.props.onChange} value={this.props.selectedOption}>
            {this.getOptions()}
          </select>
        </div>
    );
  }
}
