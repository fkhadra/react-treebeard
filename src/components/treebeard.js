'use strict';

import React from 'react';

import TreeNode from './node';
import defaultDecorators from './decorators';
import defaultTheme from '../themes/default';
import defaultAnimations from '../themes/animations';
import { menuProvider } from 'react-contexify';


class TreeBeard extends React.Component {
    constructor(props){
        super(props);
        this.node = props.contextMenuId !== false ? menuProvider(props.contextMenuId)(TreeNode) : TreeNode;
    }

    renderNodes(data){
        return data.map((node, index) =>
          <this.node
            key={node.id || index}
            node={node}
            onToggle={this.props.onToggle}
            animations={this.props.animations}
            decorators={this.props.decorators}
            style={this.props.style.tree.node}
          />
            );
    }

    render(){
        let data = this.props.data;
        // Support Multiple Root Nodes. Its not formally a tree, but its a use-case.
        if(!Array.isArray(data)){ data = [data]; }
        return (
            <ul style={this.props.style.tree.base} ref="treeBase">
                {this.renderNodes(data)}
            </ul>
        );
    }
}

TreeBeard.propTypes = {
    style: React.PropTypes.object,
    data: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.array
    ]).isRequired,
    animations: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]),
    onToggle: React.PropTypes.func,
    decorators: React.PropTypes.object,
    contextMenuId: React.PropTypes.string
};

TreeBeard.defaultProps = {
    style: defaultTheme,
    animations: defaultAnimations,
    decorators: defaultDecorators,
    contextMenuId: false
};

export default TreeBeard;
