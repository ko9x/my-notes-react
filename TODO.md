### Current Focus
* Make sure the code in the notes is presented in a readable way
    * Maybe put a border around code?
* Finish styling the SideBars
    * SEE STYLING AND BUGS SECTIONS
* Add an "All" button to the right SideBar so you can scroll through all the sections if you want to.
    
### Bugs
* The text in the SideBars needs to be invisible when the opening or closing transition is happening
    * Currently the text will show outside the SideBar or look smashed while the transition is happening
* If you select a new book while the sections for the previously selected page are still showing the SideBar doesn't close so it displays sctions for a page that is not selected.
    * This may be resolved by the refactoring mentioned in the Refactoring section
        * Or at least the refactored function could provide a solution to pass a null value to the section SideBar and then we could say if the value is null, close the SideBar

### What to do next
* Add functionality to add new pages, sections, and notes
* Add edit and remove functionality
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
* Decide if we should redesign the grabber
    * It looks a bit cheesy so hopefully I can come up with something better
    * Maybe just remove them completely. I don't think there is a point to allowing the user to manually close the SideBars. It doesn't make the content in the middle of the screen stretch or anything.


### What to do later
* Add a note describing how to add multiple styles in react.js
    * there is an example in the Header.js/css and the SideBar.js/css
* Add a note about how position: relative allows you to use z-index to decide what is on top
    * there is an example in the Header.module.css

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

### Fixed Bugs
* The width of the right SideBar is preventing content from showing in the middle
    * (the fix) I made the containing div in the App.js width 200px and float right
        * I gave the same styling to the left SideBar except float left
* Notes that have a pre-code wrap are not being confined to the center of the screen
    * We need to find a good way to present the code wrapped notes.
    * (the fix) There really isn't a fix. I need to make sure the code is written in a way that can be presented on the screen. I will need to edit all the notes that are written in a way that doesn't fit on the screen.
