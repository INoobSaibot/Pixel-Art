import React, { Component } from 'react';
import { EventEmitter } from '../../../EventEmitter/events';
import './menu.css';


class Menu extends Component {
    constructor(props) {
      super(props);

      this.state = {
        fileMenuOpen:true,
        showFiles:false,
        showDeleteList:false,
        fileList:['for','me']
      }
      this.options = ['new','open','save','save as','delete'];
      this.node = undefined;
    }

    render() {
        const options = <this.renderMenu options={this.options} handleClick={this.handleClick}/>;
        const fileList = <this.renderMenu options={this.getFileList()} handleClick={this.handleClick} classList={'file'}/>;
        const deleteFiles = <this.renderMenu options={this.getFileList()} handleClick={this.handleClick} classList={'deleteFile'}/>;
        const back = <span id='menu-back' className="back" onClick={this.clickBack}>&lt;<span className="backText">-back</span></span>

        return (
        <div ref={node => this.node = node} className="menu w3-dropdown-content w3-bar-block w3-border">
          {this.state.fileMenuOpen && options}
          {(this.state.showFiles || this.state.showDeleteList) && back}
          {this.state.showFiles && fileList}
          {this.state.showDeleteList && deleteFiles}
        </div>
        )
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }

    handleOutsideClick = (e) => {
      if (this.node.contains(e.target)) {
        // the click is inside, chill
        return;
      }
      // the click is outside, do something
      this.handleClickOutside();
    }

    handleClickOutside(){
      this.props.outsideClick();
    }

    handleClick = (e) => {
      //todo
      let element = e.target;
      let selectedOption = element.getAttribute('name');

      if (selectedOption === 'new') {
        this.newClicked(e);
      }
      else if (selectedOption === 'open') {
        this.handleOpenClick(e);
      }
      else if (selectedOption === 'save') {
        this.props.handleSave("save");
      }
      else if (selectedOption === "save as") {
        this.props.handleSave('saveAs');
      }
      else if (selectedOption === 'delete') {
        this.showDeleteList();
      }

      else if (element.classList.contains('file')) {
        this.handleOpenFile(selectedOption);
      }
      else if (element.classList.contains('deleteFile')) {
        this.handleDeleteFile(selectedOption);
        // same as this.setState({state:this.state})
        // proper way was failing for some reason, messing up
        // delete menu, and crashing or not rerendering (deleted items visible till rerender)
        this.forceUpdate();
      }
  }

  newClicked =(e) => {
    EventEmitter.dispatch('newArtClicked', e);
    this.handleClickOutside();
  }

  clickBack =(e)=> {
    this.setState({showFiles:false,showDeleteList:false, fileMenuOpen:true});
  }

  renderMenu = (props) => {
      const menu = props.options.map( (entry) => {
        return <this.menuOption item={entry} key={entry} classList={props.classList}></this.menuOption>;
      })
      return menu;
  }

    forEachKey(arr) {
      let localStorage = window.localStorage;
      for (var i = 0; i < localStorage.length; i++) {
        arr.push(localStorage.key(i));
      }
    }

    getFileList() {
      let arts = [];
      this.forEachKey(arts);
      return arts;
    }

    handleOpenFile(key) {
      this.props.selectArtKey(key);
    }

    handleDeleteFile(key) {
      window.localStorage.removeItem(key);
    }

    handleOpenClick(e) {
      this.setState({showFiles:true, fileMenuOpen:false});
    }

    showDeleteList() {
      this.setState({showDeleteList:true, fileList:false, fileMenuOpen:false})
    }

    handleSaveClick() {
      this.handleSaveFile();
    }

    menuOption = (props)=>  {
      //not hover issue here
      let deleteFiles = '';
      if (props.classList === 'deleteFile') {
        deleteFiles = <span className="delete" onClick={this.handleClick}>&times;</span>
      }
        let item = props.item;
        let defaultClasses = 'menuItem w3-bar-item w3-button'
        let classList = props.classList ? defaultClasses + ' ' +props.classList : defaultClasses;

        return <div id={item} className={classList} key={item} name={item} onClick={this.handleClick}>{item}{deleteFiles}</div>;
    }
}


export default Menu;