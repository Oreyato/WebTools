import React from 'react';

class MenuItem extends React.Component {
    render() {
        const label = this.props.label;
        const func = this.props.function;

        return (
            <a href='clickedOnCity' onClick={() => func(label)}>{label}</a>
        );
    }
}

export default MenuItem; 