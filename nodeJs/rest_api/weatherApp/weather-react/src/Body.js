import React from 'react';

class Body extends React.Component {
    render() {
        return (
            <div>
                <p><b>Temps:</b> {this.props.summary}</p>
                <p><b>Température:</b> {this.props.temperature}</p>
                <p><b>Risque de précip.:</b> {this.props.precip*100}%</p>
            </div>
        );
    }
}

export default Body; // Don't forget to export to be able to use the component