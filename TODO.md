### Current Focus

### What to do later
* Switch to demo mode directly when hitting the try demo mode button in the desktop header or the mobile dropdown
    * Currently it just logs you out so you can hit the demo mode button in the signUpLoginModal
        * If you make those buttons just run enableDemoMode it doesn't work properly
            * It fails in different ways on desktop and mobile
                * I didn't want to keep spending time trying to figure it out.
* In the editModal (non-mobile) when you select developer the modal jumps
    * We should add a transition to make that smoother
* Add a shadow to the top of the note detail
* Add a card around the notes?
* Maybe solve some of the issues in the bugs section
* refactor and document/comment the code

### Bugs
* As a new user, when you click 'new +' inside the edit modal to create your first book there is an error in the console
    * It doesn't break the app and hopefully it doesn't show up in the console on the production build
* To close the editModal you have to tap outside the modal 2 times
    * This is only on mobile
* If you shrink the edit modal down below 750 width and then back above 750 it doesn't switch back to non-mobile mode
* If the user has lots of books or a book with lots of sections the sidebar can get too long and the background color cuts off
    * This can be recreated by making the screen shorter
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
* Resolve all the useEffects that are missing dependencies
    * or tell the linter not to warn me about them
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
* Mobile only (I think) bug where the notes persist going between a user and demo mode
        * Especially if you selected a book and page before switching

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
* Add the new features
    * Most important is implementing the search feature
* Add validation ensuring each note has:
    * book
    * page
    * section
    * title
    * content
* Add functionality to create a new book
* Add functionality to create a new page
* Add functionality to create a new section
* Finish the form
* Get the correct pages for the selected book and the correct sections for the selected page to show at the top of the modal.
    * Make sure if a book or page or section exists, the radio button defaults to that spot
    * Make sure only one radio button is selected at a time
    * Make sure if a new book or page is selected the list gets updated and displays the correct pages and/or section
* Add functionality to add new notes with a new book name, page name, and/or section name
    * Allow books, pages, and section names to be multiple words and use unique characters
* Add edit and remove functionality
    * Allow user to move a note from one book, page, or section to another
    * After editing a note make sure the view returns to the note you just edited
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
* Make sure the app looks okay on smaller screens
    * style the header for smaller screens
    * Change the instrucitons text that mentions the sidebars
    * Don't show the sidebars if the screen width is less than 750
    * fix the positioning of the modals for small screens
    * style the dropdown
    * make sure the modal works and is user friendly on small screens
    * Fix the are you sure you want to delete screen for mobile
    * Fix the note details for small screens
* Add error message alerts if a user enters the wrong password or an email that doesn't exist
    * Don't give too much detail. Just say login failed, please check your credentials
* Make sure all the validation is correct and working for both login and signup
* Set up password reset
    * sendPasswordResetEmail from firebase/app
* The edit modal has too much padding on the right side.
    * only present on large screens?
* Create My Notes circular logo
    * On the desktop in the MyNotesLogo folder
* Continue with the re-design of the mobile header
    * I drew a rough sketch of what I am thinking
* Add button background to header
    * also add a light background when hovering
* Find better svgs for light mode, dark mode, and signin and out
* Fix cancel button on edit modal
* Create my own server so I can host this app and my portfolio on there
* Style the signupLogin modal
* Figure out how to get background color in status bar area
* Fix the search icon on the server version
    * It just shows a box
* Get mobile looking good
    * Add a close button that is always in the top right corner of the edit modal
    * Change colorscheme based on user preference variable
    * The header shadow needs to be fixed
    * The dropdown colors need to be fixed
    * make sure all the colors are working
* If you search for `var(` with just the opening `(` it crashes the app
* Add some loading spinners
    * Usually everything loads really fast and a spinner would not be noticed but sometimes it hangs and spinners would be nice
        * I already installed react-spinners so lets see if that one can do what we want it to
            * When you do a search there should be a spinner
            * When you submit the form it hangs sometimes so a loading spinner would be nice
* Fix the delete note overlay theme
* Dynamically change the search bar size one there are too many books
    * only if viewport width is larger than 750
* Finish arrow button functionality
    * Only on mobile
    * only show if header is not visible
* When the last note in a book, page, or section is deleted the app needs to be refreshed to remove the empty book, page or section
    * We need to check to see if the note being deleted is the last one and force a refresh
* Make it easier to highlight and copy specific text in the notes
* Show spinner when the user is being logged in
* Need some sort of message when the user tries to use an existing email
* Finish the onboarding flow
    * Add mobile onboarding flow
        * make the "new +" button bump so they know which one to press
    * Style the text 
        * Give it some transition so it's not so jarring when new text shows up
    * Do some testing to make sure the new user flow doesn't change the flow for users who know what to do
* If the user has no existing notes there should be an area above the header saying to try out demo mode
    * add text and button to enter/exit demo mode
* Add a bar above the header that says "you are in demo mode click here to create an account or login"
    * figure out what to do for mobile to alert the user they are in demo mode and they should create an account or login
* If a user is in demo mode and tries to edit or delete a note show an alert telling them to create an account
* Make sure a user in demo mode cannot reset the demo mode user password
    * This is done because there is no password. Demo mode just shows hard coded data that cannot be changed.
* Get new version on the server
    * Make a note about the process!
* Make the demo mode user
    * Add more demo mode notes
        * I think it should have at least 3 books
            * Each book should have at least 2 pages 
                * Each page should have 2 or more sections but multiple pages and books is probably more important
    * Test to make sure the demo mode stuff didn't change anything for regular mode and newUser mode