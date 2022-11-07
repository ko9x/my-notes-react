### Current Focus
* Finish the form
* (done) Get the correct pages for the selected book and the correct sections for the selected page to show at the top of the modal.
    * (done) Make sure if a book or page or section exists, the radio button defaults to that spot
    * (done) Make sure only one radio button is selected at a time
    
    * Make sure if a new book or page is selected the list gets updated and displays the correct pages and/or section

* Figure out if we want to use the modal for the edit form
* Add functionality to add new pages, sections, and notes
    * Allow pages and section names to be multiple words and use unique characters
* Add edit and remove functionality
    * Allow user to move a note from one page to another or one book to another
    * Allow user to move a note to a section, page, or book they create when editing the note
    * After editing a note make sure the view returns to the note you just edited
    
### What to do next
* Make a global for colors
    * It's better to do this early on 
        * I'd like to be able to do a light mode and a dark mode
* Add auth
* Add the new features
    * Most important is implementing the search feature
* Make sure the app looks okay on smaller screens
    * move things in the header into a hamburger
    * make the sidebars less wide
        * only allow one sidebar open at a time on smaller screens
* Instead of saying "My Notes" it should maybe say the users name like "Sean's Notes"

### Styling

### Bugs
* The search feature only works if you refresh
    * the searchExecuted function runs too early in the life cycle.
* The first time you select a section the fade in animation doesn't fire
    * Every subsequent time you select a section it work just fine.
* Fix the slowdown caused by highlight.js
    * there are notes in the npm about using web workers to fix the freezing issue I'm having
        * there is a link to the npm in the react folder
    * or only apply the highlight to what is currently on the screen somehow?
        * Make sure the amount of code that gets processed by highlight is always small somehow?
            * Maybe that is what the web worker does. I'm not really sure yet.

### What to do later
* Add an animation when the showNoteDetail function adds the class in the Note.js
* highlight.js makes everything slower. There is probably somehting I can do to fix that.
* Add a note describing how to add multiple styles in react.js
    * there is an example in the Header.js/css and the SideBar.js/css
* Add a note about how position: relative allows you to use z-index to decide what is on top
    * there is an example in the Header.module.css
* Add a note about making a unique array out of an array with duplicate objects
    * there is an example in the executeSearch function inside the App.js
* Add a note about using scrollIntoView inside a mapped list
    * here is a link https://stackoverflow.com/questions/71261123/how-to-useref-and-scrollintoview-to-scroll-to-specific-element-in-a-mapped-list

### Refactoring 
* I believe the getBooks, getPages, and getSections functions in the App.js can be one function
    * Just check if the arguement is null or not and act accordingly.
    * This will result in one very large function but overall less code
        * Is less code worth the lack of readability?
        * Maybe break the giant function out into it's own helper function component?

### Done
* Get the notes from the API
* Decide on a design for the header
    * How should we display the different sections?
* Create the sidebar to show the pages within the selected book
    * I want the left SideBar to open and reveal the pages when you select a book from the Header.
        * If you select a different book, I want the left SideBar to close and then open with the new pages
    * I want the right SideBar to open and reveal the sections when you select a page from the left SideBar
        * If you select a different page, I want the right SideBar to close and then open with the new sections
* Decide if we should remove the GrabberBar
    * I don't like the way it looks on the left SideBar but I like the way the right side looks/operates
        * Get them both styled like the right one and see if I still like it.
* Display the notes in the center of the screen for the selected book and page
    * I would like selecting a section from the right sidebar to result in only that section showing
        * This will require a new function to be created in the App.js
* Add a footer
    * Just something basic to make the bottom of the page look nicer.
* Make sure the code in the notes is presented in a readable way
    * Maybe put a border around code?
* Finish styling the SideBars
* Add search functionality
* Add transition when a user clicks the header to reveal the edit button and details

### Fixed Bugs
* The width of the right SideBar is preventing content from showing in the middle
    * (the fix) I made the containing div in the App.js width 200px and float right
        * I gave the same styling to the left SideBar except float left
* Notes that have a pre-code wrap are not being confined to the center of the screen
    * We need to find a good way to present the code wrapped notes.
    * (the fix) There really isn't a fix. I need to make sure the code is written in a way that can be presented on the screen. I will need to edit all the notes that are written in a way that doesn't fit on the screen.
* The text on the SideBar should stay until the SideBar has closed and only open again once the new text is saved to the state. 
    * This will look nicer than havin the text flash when the user presses a new book or page
* If you select a new book while the sections for the previously selected page are still showing the SideBar doesn't close so it displays sctions for a page that is not selected.
    * This may be resolved by the refactoring mentioned in the Refactoring section
        * Or at least the refactored function could provide a solution to pass a null value to the section SideBar and then we could say if the value is null, close the SideBar
* If a page is selected and then the user does a search and goes back to that same page it doesn't load the sections because the selectedPage state never got cleared




