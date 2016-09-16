/* eslint-disable */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { StyleRoot } from 'radium';
import {Treebeard, decorators} from '../src/index';

import data from './data';
import styles from './styles';
import * as filters from './filter';

import ContextMenu, { menuId } from './ContextMenu';
import Roller, { animations, themes } from './Roller';

const HELP_MSG = 'Select A Node To See Its Data Structure Here...';

// Example: Customising The Header Decorator To Include Icons
decorators.Header = (props) => {
    const style = props.style;
    const iconType = props.node.children ? 'folder' : 'file-text';
    const iconClass = `fa fa-${iconType}`;
    const iconStyle = { marginRight: '5px' };
    return (
        <div style={style.base}>
            <div style={style.title}>
                <i className={iconClass} style={iconStyle}/>
                {props.node.name}
            </div>
        </div>
    );
};

class NodeViewer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const style = styles.viewer;
        let json = JSON.stringify(this.props.node, null, 4);
        if(!json){ json = HELP_MSG; }
        return (
            <div style={style.base}>
                {json}
            </div>
        );
    }
}

NodeViewer.propTypes = {
    node: React.PropTypes.object
};





class DemoTree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data,
            ctxTheme: 'dark',
            ctxAnimation: 'zoomIn'
        };
        this.onToggle = this.onToggle.bind(this);
        this.handleAnimationChange = this.handleAnimationChange.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }
    onToggle(node, toggled){
        if(this.state.cursor){this.state.cursor.active = false;}
        node.active = true;
        if(node.children){ node.toggled = toggled; }
        this.setState({ cursor: node });
    }
    onFilterMouseUp(e){
        const filter = e.target.value.trim();
        if(!filter){ return this.setState({data}); }
        var filtered = filters.filterTree(data, filter);
        filtered = filters.expandFilteredNodes(filtered, filter);
        this.setState({data: filtered});
    }

    handleThemeChange(e){
        this.setState({ctxTheme: e.target.value});
    }

    handleAnimationChange(e){
        this.setState({ctxAnimation: e.target.value});
    }

    render(){
        return (
            <StyleRoot>
                <form className="form-inline" style={styles.searchBox}>
                        <Roller
                          name="Themes : "
                          options={themes}
                          onChange={this.handleThemeChange}
                          selectedOption={this.state.ctxTheme}
                        />
                        <Roller
                          name="Animations : "
                          options={animations}
                          onChange={this.handleAnimationChange}
                          selectedOption={this.state.ctxAnimation}
                        />
                </form>

                <div style={styles.searchBox}>
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-search"></i>
                        </span>
                        <input type="text"
                            className="form-control"
                            placeholder="Search the tree..."
                            onKeyUp={this.onFilterMouseUp.bind(this)}
                        />
                    </div>
                </div>
                <div style={styles.component}>
                    <h2>Right click on a node</h2>
                    <Treebeard
                        data={this.state.data}
                        onToggle={this.onToggle}
                        decorators={decorators}
                        contextMenuId={menuId}
                    />
                </div>
                <div style={styles.component}>
                    <NodeViewer node={this.state.cursor}/>
                </div>
                <ContextMenu animation={this.state.ctxAnimation} theme={this.state.ctxTheme}/>
            </StyleRoot>

        );
    }
}

const content = document.getElementById('content');
ReactDOM.render(<DemoTree/>, content);
