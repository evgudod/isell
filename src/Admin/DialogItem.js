import React, { Component } from 'react';
export default class DialogItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: true,
            value: props.value === null ? this.defaultValue : props.value
        }
        this.handleBlur = (event) => event.target.value === "" ? this.setState({value:this.defaultValue}) : this.setState({value:event.target.value});
        this.handleChange = (event) => this.setState({value: event.target.value});
        this.handleFocus = (event) => event.target.value === this.defaultValue ? this.setState({value:""}) : null;
        this.handleClickOK = () => {
                                    if (this.state.value !== this.defaultValue) {
                                        this.props.postAddAction(this.state.value === this.defaultValue ? null : this.state.value);
                                        this.setState({value: this.defaultValue})
                                    }
                                   };
        this.handleClickCancel = () => {
            this.setState({value: this.defaultValue});
            this.props.postCancelAction(props.value);
        }
        this.doNothing = (e) => {e.preventDefault();
                                 this.handleClickOK();
                                }
    }

    defaultValue = "Category name:";

    componentDidMount() {
    }

    render() {

        return this.state.visible &&
            <form style={this.state.position} onSubmit={this.doNothing}>
                <label>
                    <input type="text" value={this.state.value}
                           onFocus={this.handleFocus}
                           onChange={this.handleChange}
                           onBlur={this.handleBlur}
                    />
                </label>
                <input type="button" value="OK" onClick={this.handleClickOK}/>
                <input type="button" value="Cancel" onClick={this.handleClickCancel} />
            </form>
    }
}