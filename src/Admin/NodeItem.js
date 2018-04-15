import React, { Component } from 'react';


export default class NodeItem extends Component {
    render() {
        const divStyle = {
           marginLeft: this.props.level*20 + 'px',
        };

        const dragStartHandler = (e) => e.dataTransfer.setData("text/plain", e.target.id);
        const onDragOverHandler = (e) => e.preventDefault();

        const onDropHandler = (e) => {
            e.preventDefault();
            let data = e.dataTransfer.getData("text");
            e.dataTransfer.clearData();
            this.props.postAction(+data, +e.target.id);
        }

        return (
            <div draggable={true} onDragStart={dragStartHandler} onDrop={onDropHandler} onDragOver={onDragOverHandler}
                 style={divStyle} key={this.props.id} id={this.props.id} parentid={this.props.parentid}
                 className={this.props.clazz}> {this.props.name} </div>
        );
    }}