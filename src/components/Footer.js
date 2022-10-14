import classes from './Footer.module.css';

export default function Footer() {
    return (
        <div className={classes.container}>
            <div className={classes.footerTextContainer}>
                <p className={classes.footerText}>MyNotes 2022</p>
            </div>
        </div>
    )
}