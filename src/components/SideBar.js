import classes from './SideBar.module.css';
import { useState } from 'react';

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);

    return <div className={`${classes.container} ${isOpen ? classes.open : classes.closed}`}>
        <button onClick={() => setIsOpen(prevState => !prevState)}>Toggle</button>
        {isOpen && <p>I am the side bar</p>}
    </div>
}