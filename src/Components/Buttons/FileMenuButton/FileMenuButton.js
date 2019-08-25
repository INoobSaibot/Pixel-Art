import React, { Component } from 'react';
import './fileMenuButton.css';
import Menu from './Menu';


class FileMenuButton extends Component {
    constructor(props) {
      super(props);
      
      this.state = {
        showMenu:true
      }
    }
    
    render() {
        let style= {height:'50px'};
        let iconStyle = {fontSize:'44px'};
        const menuOptions = <Menu handleClick={this.handleClick}
         selectArtKey={this.props.selectArtKey} handleSave={this.props.handleSave} new={this.props.new}/>;

        return (
          <div className="w3-dropdown-hover">
            <button className='btn row toolButton' style={style} onClick={this.handleClick}>
              <i className="fa fa-save" style={iconStyle}></i>menu
            </button>
              {this.state.showMenu && menuOptions}
          </div>
        )
    }

    handleClick = (e) => {
        this.setState({showMenu: !this.state.showMenu})
    }
}


export default FileMenuButton;