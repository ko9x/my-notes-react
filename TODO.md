### Current Focus
* Make sure the app looks okay on smaller screens
    * (done) style the header for smaller screens
    * (done) Change the instrucitons text that mentions the sidebars
    * (done) Don't show the sidebars if the screen width is less than 750
    * (done) fix the positioning of the modal for small screens
    * (done) style the dropdown
    * make sure the modal works and is user friendly on small screens
        * horizontal scrolling?


* Host the app on blakes server instead of github pages
    * Or create my own server if it's not too expensive. 


### What to do next
* Make the book names in the header a horizontal flatlist?
    * only if viewport width is larger than 750
* Maybe solve some of the issues in the bugs section
* Maybe do some of the styling TODOs
* Add some loading spinners
    * Usually everything loads really fast and a spinner would not be noticed but sometimes it hangs and spinners would be nice
        * I already installed react-spinners so lets see if that one can do what we want it to
            * Add a loading spinner anywhere we do a setTimeout
            * When you do a search there should be a spinner
            * When you submit the form it hangs sometimes so a loading spinner would be nice
            * When you select reactjs or react native it hangs so a spinner would be nice there
                * I think the renderWhenEmpty from react flatlist would be a place to start for this spinner
            * When the page is autologgin in it displays the login form for a split second
                * Maybe we could add a timeout and a loading spinner to mask that
* refactoring and documentation/commenting the code

### Styling
* The container height on the notes.js needs to be more dynamic
    * If the user is on mobile and goes to landscape mode the container height causes a white gap at the bottom of the screen
* See if Blake has any recommendations styling
* Style the EditModal
* Style the SignUpLoginModal
* Make some themes the user can choose from
    * like an iOS theme
    * a dark mode theme would be cool also

### Bugs
* Resolve all the useEffects that are missing dependencies
* Sometimes when it tries to scroll you to a specific note it scrolls to the top of the next section if it's close enough.
* The cause of a lot of little bugs comes from the way we are passing data as just arrays of strings
    * The correct way is to pass an object that has an id of some sort and the string
        * That way even though 2 pages have a section with the same name the app knows they are different sections
            * This is also mentioned in the reactoring section
    * The real solution is to not use arrays of strings to identify things but to use arrays of objects that contain the string we want to use to identify things
* when you delete the last note in a page or section it doesn't clear it from the sidebar
    * maybe we should do an API call when deleting an item
        * like we do when creating a new note
* (fixed?) The "please complete the form" text doesn't go away when the user starts typing in the fields
* If you switch from one page to another and they have a section with the same name it can cause the selected section to highligh the wrong section for a split second

### What to do later

### Refactoring
* Instead of passing arrays of strings we really should be passing arrays of objects with an id and the string
    * That way the app doesn't get confused when 2 pages have a section with the same name for example
        * This is also mentioned in the bugs section
* We could maybe useReducer in the App.js to clean up the numberous useState calls
    * There is a link in the react folder called useReducer use case that explains why it might make things cleaner
* We could useReducer in the EditModal to clean up the numerous useState calls
    * There is a link in the react folder called useReducer use case that explains why it might make things cleaner
* Create a useContext to pass the user and database where needed?

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
* The search feature only works if you refresh
    * the executeSearch function runs too early in the life cycle.
* Fix these bugs because they break the app and you have to refresh
    * If you have launched the edit modal you need to refresh before search will work
    * If you do a search and then try to edit one of the notes there is an error
        * I removed the delete and edit buttons from the view when a user does a search
            * Not a perfect solution but it will work for now
    * At the moment, you need to reselect your book when editing a searched note and if you have opened the edit modal your search will not work.
* if there is a page name or section name with a space it breaks onto 2 lines when the sidebar closes
* If you use the search feature and try to edit, the page is not getting set even thought the radio button shows a selection
* when creating a new note, the radio buttons aren't showing as selected but if you hit submit the page and section get applied
    * It has something to do with updatedNote in the submit handler or the missingRadioValue function
* If you open the edit modal and then close it, you get scrolled to the top of the page instead of staying on that note
    * Which is kind of annoying if you don't remember where that note was
        * this also happens if you edit the same note more than once
* It is too easy set the wrong section when editing a note because the section get set to where you scrolled to.
    * if you scroll down far enough that the next section gets highlighted, it will set the default section to that next section

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
* (Done) Add the new features
    * (done) Most important is implementing the search feature
* (done) Add validation ensuring each note has:
    * (done) book
    * (done) page
    * (done) section
    * (done) title
    * (done) content
* (done) Add functionality to create a new book
* (done) Add functionality to create a new page
* (done) Add functionality to create a new section
* (done) Finish the form
* (done) Get the correct pages for the selected book and the correct sections for the selected page to show at the top of the modal.
    * (done) Make sure if a book or page or section exists, the radio button defaults to that spot
    * (done) Make sure only one radio button is selected at a time
    * (done) Make sure if a new book or page is selected the list gets updated and displays the correct pages and/or section
* (Done) Add functionality to add new notes with a new book name, page name, and/or section name
    * Allow books, pages, and section names to be multiple words and use unique characters
* (Done) Add edit and remove functionality
    * (done) Allow user to move a note from one book, page, or section to another
    * (Done) After editing a note make sure the view returns to the note you just edited
* Break the helper buttons into a separate component and add them to the side and important notes
* Add buttons to easily code such as:
        * pre-wrap/code-wrap 
        * p tag
        * <br> to add a line break
        * &nbsp to add a non breaking space (so a horizontal gap between stuff)
        * <li>
        * HTML Entities 
            * such as &#60 for < 
* Add a note describing how to add multiple styles in react.js
    * there is an example in the Header.js/css and the SideBar.js/css
* Add a note about how position: relative allows you to use z-index to decide what is on top
    * there is an example in the Header.module.css
* Add a note about making a unique array out of an array with duplicate objects
    * there is an example in the executeSearch function inside the App.js
* Add a note about using scrollIntoView inside a mapped list
    * here is a link https://stackoverflow.com/questions/71261123/how-to-useref-and-scrollintoview-to-scroll-to-specific-element-in-a-mapped-list
* Make a note about HTML Entities
    * use &#60 instead of < in the code and it will show the code and not the HTML result
* Make a note about using the index feature of a map to resolve the "unique key" warning when conditionally rendering an element of a mapped item.
    * there is an example in the Note.js map.
        * if you remove the index from the key you will get the error
* Make a global styles file (It's better to do this early on)
    * add all the colors used to the global
        * this would also make it easier to do themes like light and dark mode
    * add the courierButton class to the global
        * it is used in the RadioManager component and the HelperButtons component
* Make it so anytime < is saved it automatically gets changed to the entity number
* Add an animation when the showNoteDetail function adds the class in the Note.js
* highlight.js makes everything slower. There is probably something I can do to fix that.
    * Using FlatListReact fixed the issue so I don't think highligh.js was the culprit
* Continue testing out FlatList React
    * I think we are all good to merge back with the sean and master branches
        * But maybe I'll think of some other stuff to test first
* If you select a book and a page and then selected a different book, when you return to the original book it won't let you select that page again.
* Figure out how to get Auth working
    * The firebase rules are the problem I think.
* Figure out how to add users to firebase database
    * Only allow the user who created the data to read/write it
* Add auth
    * At least for me so I stop getting those emails every day
* Instead of saying "My Notes" it should maybe say the users name like "Sean's Notes"
* Add a form for new users
    * Make sure all the auth stuff works for the new users
        * capture the users displayName 
* Style the Header
    * If there are only one or two books the buttons clickable area is way too wide
    * Maybe make the "new +" button float right and the other other button in a container that floats left
    * The logout button is also too wide.
        * The text is fine but the clickable area is much wider than the text
* When you create a new account it doesn't show the new users displayName until you refresh
* change color or radio buttons to the seagreen color
* I believe the getBooks, getPages, and getSections functions in the App.js can be one function
    * Just check if the arguement is null or not and act accordingly.
    * This will result in one very large function but overall less code
        * Is less code worth the lack of readability?
        * Maybe break the giant function out into it's own helper function component?
* Add an "all sections" button to the sections sidebar to show all the sections again if the user selected a single section
* Figure out how to get the scrolling to highlight the correct section and the jumping to a section when the button is clicked to work at the same time
* Figure out a way to scroll the user to the top of the page when a new page is selected
    * Make sure the first section is highlighted in the right sidebar
* Can we scroll to the new note when a new note is added?
* Rework sections sidebar
    * have the sections the user is currently viewing highlighted in the sidebar
        * if the user scrolls down or up to another section the highlighted section changes accordingly
            * if the user clicks on a section the screen scrolls to that section
* Scroll to top of page when user does a search?
