import classes from './Note.module.css';

export default function Note({selectedNotes}) {
    console.log('selectedNotes from Note.js', selectedNotes); //@DEBUG
    return (
        
        <div className={classes.container}>
            {selectedNotes.length > 0 && selectedNotes.map((note) => (
                <div key={note.id}><h1 style={{textAlign: 'start'}}>{note.title}</h1>
                <p style={{textAlign: 'start'}} dangerouslySetInnerHTML={{__html: note.content}}></p></div>
            )) }
            
        </div>
    )
}