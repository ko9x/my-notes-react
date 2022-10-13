import classes from './Note.module.css';

export default function Note({selectedNotes}) {
    console.log('selectedNotes from Note.js', selectedNotes); //@DEBUG
    return (
        
        <div className={classes.container}>
            {selectedNotes.length > 0 && selectedNotes.map((note) => (
                <div key={note.id}><h1>{note.title}</h1>
                <p>{note.content}</p></div>
            )) }
            
        </div>
    )
}