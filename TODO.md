### Current Focus
* Create the sidebar to show the pages within the selected book
    * I want the left SideBar to open and reveal the pages when you select a book from the Header.
        * If you select a different book, I want the left SideBar to close and then open with the new pages
    * I want the right SideBar to open and reveal the sections when you select a page from the left SideBar
        * If you select a different page, I want the right SideBar to close and then open with the new sections
* Finish styling the SideBars
    * SEE STYLING SECTIONS
* Display the notes in the center of the screen for the selected book and page
    * I would like selecting a section from the right sidebar to scroll the user to that section

### Bugs

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
* Decide if we should remove the GrabberBar and Grabber
    * I don't like the way it looks on the left SideBar but I like the way the right side looks/operates
        * Get them both styled like the right one and see if I still like it.


### What to do later
* Add a note describing how to add multiple styles in react.js
    * there is an example in the Header.js/css and the SideBar.js/css
* Add a note about how position: relative allows you to use z-index to decide what is on top
    * there is an example in the Header.module.css

### Done
* Get the notes from the API
* Decide on a design for the header
    * How should we display the different sections?

### Fixed Bugs
* The width of the right SideBar is preventing content from showing in the middle
    * (the fix) I made the containing div in the App.js width 200px and float right
        * I gave the same styling to the left SideBar except float left
