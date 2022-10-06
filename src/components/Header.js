export default function Header({pageNames}) {
    function ShowPages() {
        console.log('this ran', ); //@DEBUG
        if (pageNames.length > 0) {
          return pageNames.map((page, index) => <p key={index}>{page}</p>)
        }
        if (pageNames.length < 0) {
            return <div style={{color: 'white'}}>No Pages</div>
        }
      }
    return (
        <ShowPages />
    )
}