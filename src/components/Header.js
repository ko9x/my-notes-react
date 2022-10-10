import classes from './Header.module.css';

export default function Header({pageNames}) {
    function ShowBooks() {
    }
    function ShowPages() {
        console.log('this ran',pageNames ); //@DEBUG
        if (pageNames.length > 0) {
          return pageNames.map((page, index) => <p key={index}>{page}</p>)
        }
        if (pageNames.length < 0) {
            return <div style={{color: 'white'}}>No Pages</div>
        }
      }
    return (
        <div className={classes.container}>
          <ShowPages />
        </div>
    )
}