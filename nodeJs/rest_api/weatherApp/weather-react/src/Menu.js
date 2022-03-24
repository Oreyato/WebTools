import React from 'react';
import './Menu.css'
import MenuItem from './MenuItem';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.createMenuItem = this.createMenuItem.bind(this);
    }

    createMenuItem(city, func) {
        return (<span><MenuItem label={city} function={func} /></span>);
    }
    
    render() {
        const menu = this.props.cities.map(city => {
           this.createMenuItem(city, this.props.changeCity); 
        });

        return (
            <div className='Menu'>
                <p><a href="RIRI">RIRI</a> | <a href="FIFI">FIFI</a> | <a href="LOULOU">LOULOU</a></p>
                <p>{menu}</p>
            </div>
        );
    }
}

export default Menu; 