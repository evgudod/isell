import React, { Component } from 'react';

let selectedItem = null;
export {selectedItem};
export default class ContextMenu extends Component {

    constructor (props) {
        super(props);
        this.state = {
            visible: false,
            position: {}
        };
    }

    componentDidMount() {
        ContextMenu.setVisibility = (visibilty) => this.setState({visible: visibilty});
        document.getElementsByClassName(this.props.rootName)[0].addEventListener('contextmenu', (event)=>{
            event.preventDefault();
            selectedItem = +event.target.id;
            this.setState((prevState) => {
                return {visible: !prevState.visible,
                        position: {left: event.clientX, top: event.clientY}
                }
            });
        });
    };

    render() {
        return (
            this.state.visible &&
            <div style={this.state.position} className="contextMenu">
                {this.props.data.map((item,key) => <div key={key} onClick={item.action}>
                {item.name}
            </div>)}
            </div>
        );
    }
};

