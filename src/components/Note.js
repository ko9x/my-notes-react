import classes from "./Note.module.css";

export default function Note({ selectedNotes }) {
  console.log("selectedNotes from Note.js", selectedNotes); //@DEBUG
  return (
    <div className={classes.container}>
      {selectedNotes.length > 0 &&
        selectedNotes.map((note) => (
          <div className={classes.note} key={note.id}>
            <h1>{note.title}</h1>
            <p dangerouslySetInnerHTML={{ __html: note.content }}></p>
            {note.important.length > 0 && (
              <>
                <h3 style={{color: 'red'}}>Important Note</h3>
                <p dangerouslySetInnerHTML={{ __html: note.important }}></p>
              </>
            )}
            {note.side.length > 0 && (
              <>
                <h3 style={{color: 'orange'}}>Side Note</h3>
                <p dangerouslySetInnerHTML={{ __html: note.side }}></p>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
