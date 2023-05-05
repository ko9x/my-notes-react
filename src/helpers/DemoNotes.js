export const demoNotes = [
    {
        book: 'coding',
        content: `<p>First we need to decide where our project is going to live.</p>
        <p>If you want to be fancy you can use the command line like so:</p>
        <pre><code>cd development/javascript-projects</code></pre>
        <pre><code>mkdir demoProject</code></pre>
        <p>Now lets navigate into the directory we just created and make the files we need for our javascript project:</p>
        <pre><code>cd demoProject</code></pre>
        <pre><code>touch index.html</code></pre>
        <pre><code>touch styles.css</code></pre>
        <pre><code>touch app.js</code></pre>
        
        <p>We can also create a javascript project using Finder and Visual Studio Code</p>
        <p>In Finder, navigate to:</p>
        <pre><code>sean/development/javascript-projects</code></pre>
        <p>Then right click (two finger click) and select new folder from the options and name it demoProject</p>
        <p>Now open Visual Studio Code and select File/open from the top menu bar</p>
        <p>Navigate to the folder we just created and hit the "open" button</p>
        <p>Now that we are inside our project directory we can create the files by hovering over the project folder in the left side bar and clicking the file icon</p>
        <p>Make these three files:</p>
        <li>index.html</li><li>styles.css</li><li>app.js</li>
        <p>(Technically we can name these files anything we want but this is the convention)</p>
        <p>Now double click on the index.html and type this type a single ! followed by the return key</p>
        <p>This will add a basic html template to our index.html</p>
        
        <p>At this point we can actually run this javascript project in the browser by right clicking the index.html and selecting "Open with Live Server" from the dropdown</p>
        
        <p>Just keep in mind that the project we have created so far is completely blank so all you will get is a white screen.</p>
        <p>To make sure it is working, add this between he opening and closing "body" tags in the index.html</p>
        <pre><code>&#60h1>Hello!&#60/h1></code></pre>
        <p>You should now see the word "Hello" in the top left corner of the page.</p>
        `,
        id: 'demoNote1',
        important: '',
        page: 'javascript',
        section: 'setup',
        side: '<p>Refer to the basics section for information about connecting your javascript and css files to the index.html</p>',
        title: 'Setting up a javascript project in visual studio code'
     },
    {
        book: 'coding',
        content: `<p>Your basic vanilla javascript project is going to consist of at least 2 (but likely more) files</p>
        <p>First is an html file usually named index.html</p>
        <p>Second is a javascript file usually named app.js initially but this can vary depending on the project</p>
        <p>You may also have a css file usually named styles.css but can often be incorporated into the html file if there isn't a lot of styling needed for the project</p>`,
        id: 'demoNote2',
        important: '',
        page: 'javascript',
        section: 'basics',
        side: '',
        title: 'The basic layout of a vanilla javascript project'
     },
    {
        book: 'electronics',
        content: `<p>go to Tools > Board > arduino nano </p>
        <p>go to Tools > Processor > ATMega328</p>
        <p>go to Tools > Port > /dev/tty.wcusbserial1410 </p>`,
        id: 'demoNote3',
        important: '',
        page: 'arduino',
        section: 'upload',
        side: '',
        title: 'upload sketch to nano'
     },
    {
        book: 'coding',
        content: `<p>To quickly generate a basic html layout to populate your index.html just type:</p>
        <pre><code>!</code></pre>
        <p>Followed by the return key</p>
        <p>Visual Studio will output something like this:</p>
        <pre><code>&#60!DOCTYPE html>
        &#60html lang="en">
        &#60head>
          &#60meta charset="UTF-8">
          &#60meta http-equiv="X-UA-Compatible" content="IE=edge">
          &#60meta name="viewport" content="width=device-width, initial-scale=1.0">
          &#60title>Document&#60/title>
        &#60/head>
        &#60body>
          
        &#60/body>
        &#60/html></code></pre>
        `,
        id: 'demoNote4',
        important: '',
        page: 'javascript',
        section: 'basics',
        side: '',
        title: 'Basic html template command in Visual Studio Code'
     },
    {
        book: 'coding',
        content: `<p>In order for the javascript file to interact with the html file we need to tell the html file about our javascript file(s)</p>

        <p>The way we do this is with a "script" tag</p>
        <p>Technically you can put this tag almost anywhere inside the html file but it is conventional to place it somewhere between the opening and closing "head" tags like so:</p>
        <pre><code>&#60!DOCTYPE html>
        &#60html lang="en">
        &#60head>
          &#60meta charset="UTF-8">
          &#60meta http-equiv="X-UA-Compatible" content="IE=edge">
          &#60meta name="viewport" content="width=device-width, initial-scale=1.0">
          &#60title>Document&#60/title>
          &#60script src="app.js">&#60/script>
        &#60/head>
        &#60body>
          
        &#60/body>
        &#60/html>
        &#60!DOCTYPE html></code></pre>
        
        <p>Now our index.html file knows which file is controlling it</p>`,
        id: 'demoNote5',
        important: '',
        page: 'javascript',
        section: 'basics',
        side: '',
        title: 'Connect the javascript file with the html file'
     },
    {
        book: 'coding',
        content: `<p>Now that the index.html and the app.js are linked, we can create variables that are linked to elements in the html</p>

        <p>There are lots of ways to do this but here are a couple of the basic ways:</p>
        
        <h3>Linking the variable with querySelector:</h3>
        <pre><code>const buttonElement = document.querySelector('button');</code></pre>
        <p>With querySelector we can link the variable buttonElement with any button in our html</p>
        <p>The obvious drawback however is we are linking this variable to every button so we are unable to do different things with different buttons if we need to</p>
        
        <h3>Linking the variable with getElementById:</h3>
        <pre><code>const submitButton = document.getElementById('submit');</code></pre>
        <p>Now we can identify a specific element based on the id we give to it like so:</p>
        <pre><code>&#60button id="submit">Submit&#60/button></code></pre>
        <p>Now only the button in our index.html that has the id of 'submit' will be linked to our submitButton variable</p>
        
        `,
        id: 'demoNote6',
        important: '',
        page: 'javascript',
        section: 'basics',
        side: '<p>You can do this with any other type of element such as input, text-area, ul, etc...</p>',
        title: 'Linking an html element with a variable inside the app.js'
     },
    {
        book: 'coding',
        content: `<p>Now that we have javascript variables connected to our html elements we can interact with them and obtain values from them. Here are some examples</p>

        <p>Adding a clickListener to a button so we know when the user has clicked it:</p>
        <pre><code>
        const submitButton = getElementById('submit');
        
        submitButton.addEventListener('click', () => {
            console.log('submit button was clicked')
        })</code></pre>
        
        <p>Obtaining the value of an input</p>
        <pre><code>
        const username = getElementById('name');
        
        console.log('The user entered the name: ', username.value);
        </code></pre>
        
        <p>Now lets create something useful:</p>
        <p>(In the index.html)</p>
        <pre><code>
        &#60h1>List of users&#60/h1>
        &#60ul>&#60/ul>
        &#60input id='name' placeholder='please enter your username'/>
        &#60button id='submit'>Submit&#60/button>
        </code></pre>
        <p>(in the app.js)</p>
        <pre><code>
        const submitButton = getElementById('submit');
        const username = getElementById('name');
        const listElement = document.querySelector('ul');
        
        function addUsernameToList() {
            const enteredName = username.value;
            const listItemElement = document.createElement('li');
            listItemElement.textContent = enteredName;
            listElement.appendChild(listItemElement);
        }
        
        submitButton.addEventListener('click', addUsernameToList);</code></pre>
        
        <p>Now when the user clicks the submit button we will see the username as a list item in the un-ordered list</p>`,
        id: 'demoNote7',
        important: '',
        page: 'javascript',
        section: 'basics',
        side: '<p>We introduced document.createElement to show how we can manipulate the html from inside the js as well as interacting with it and obtaining values from it.</p>',
        title: 'Interacting with and/or obtaining values from html elements'
     },
    {
        book: 'coding',
        content: `<p>There are a couple of ways you can incorporate css into your index.html</p>
        <p>The first example is writing the styles inside the index.html with the"style" tag (Note that this is usually only used if you have a very small amount of simple css)</p>
        
        <pre><code>&#60!DOCTYPE html>
        &#60html lang="en">
        &#60head>
          &#60meta charset="UTF-8">
          &#60meta http-equiv="X-UA-Compatible" content="IE=edge">
          &#60meta name="viewport" content="width=device-width, initial-scale=1.0">
          &#60title>My Example Document&#60/title>
          &#60style>
             body {
                height: 100vh;
                width: 100vw 
            }
            #username {
                border-radius: 1px;
            }
          &#60/style>
        &#60/head>
        &#60body>
          &#60input id="username" />
        &#60/body>
        &#60/html></code></pre>
        
        <p>The next example uses the "link" tag in which you reference the css file you want to use:</p>
        <pre><code>&#60!DOCTYPE html>
        &#60html lang="en">
        &#60head>
          &#60meta charset="UTF-8">
          &#60meta http-equiv="X-UA-Compatible" content="IE=edge">
          &#60meta name="viewport" content="width=device-width, initial-scale=1.0">
          &#60title>Document&#60/title>
          &#60link rel="stylesheet" href="styles.css" />
        &#60/head>
        &#60body>
          &#60input id="username" />
        &#60/body>
        &#60/html></code></pre>
        
        <p>When we use a "link" tag we need to tell the index.html the location of the css file with the href attribute. If the file is nested you need to add that information like:</p>
        <pre><code>href="/folderName/styles.css"</code></pre>
        <p>Also if you are using the href attribute you need to add the rel (relationship) attribute</p>
        <p>This lets the index.html know what type of link we are using the href for. In this example the relationship to the index.html is a "stylesheet"</p>`,
        id: 'demoNote8',
        important: '<p>Notice that we put both the "style" tag and the "link" tag inside the opening and closing "head" tags of the template</p>',
        page: 'javascript',
        section: 'basics',
        side: '',
        title: 'Importing the stylesheet into your index.html'
     },
    {
        book: 'electronics',
        content: `<p>go to Tools > Board and select UNO from the drop down </p><p> go to Tools > Port and select /dev/tty.usbmodem14101</p>`,
        id: 'demoNote9',
        important: '',
        page: 'arduino',
        section: 'upload',
        side: '',
        title: 'upload sketch to UNO'
     },
     {
        book: 'coding',
        content: `<pre><code>
        let myString = sean
        
        myString.slice(0, 1).toUpperCase() + myString.slice(1, myString.length)
         </code></pre>`,
        id: 'demoNote10',
        important: '',
        page: 'javascript',
        section: 'examples',
        side: '',
        title: 'Change the first letter of a string to a capital letter'
     },
     {
        book: 'coding',
        content: `<p>If you want to remove one or more elements from an array, and you have the index of where you want to start, splice is the way to go</p>

        <p>Here is an example:</p>
        <pre><code>
        myArr = ['apple', 'orange', 'grape,];
        
        myArr.splice(0, 1);
        
        console.log(myArr) 
        // result ['orange', 'grape']
        </code></pre>
        
        <p>In the above example we pass to arguments to splice. The first is where we want to start the splice and the second is how many items we are going to splice </p>
        
        <p>You can also replace the removed element by passing in its replacement with a third argument like so:</p>
        <pre><code>
        myArr = ['apple', 'orange', 'grape,];
        
        myArr.splice(1, 1, 'banana');
        
        console.log(myArr) 
        // result ['apple', 'banana', 'grape']
        </code></pre>`,
        id: 'demoNote11',
        important: '',
        page: 'javascript',
        section: 'examples',
        side: '<p>For more information about splice click <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="_blank">here<a/></p>',
        title: 'array.splice'
     },
     {
        book: 'coding',
        content: `<pre><code>
        const ids = arrWithDuplicates.map((object) => object.id);
        const uniqueArr = arrWithDuplicates.filter(
              ({ id }, index) => !ids.includes(id, index + 1)
            );
        </code></pre>`,
        id: 'demoNote12',
        important: '<p>This example requires the objects to have an id property</p>',
        page: 'javascript',
        section: 'examples',
        side: '',
        title: 'Make an array of unique objects from an array that has duplicate objects'
     },
     {
        book: 'coding',
        content: `<p>This is useful if you want to map over the objects inside an object</p>
        <pre><code>
        const obj = {
          friend1: {id: 1, name: 'Fred'},
          friend2: {id: 2, name: 'Bob'},
        };
        
        const arrOfObjects = Object.values(obj);
        </code></pre>
        
        <p>Our new arrOfObjects looks like this</p>
        
        <pre><code>
        [{id: 1, name: 'Fred'}, {id: 2, name: 'Bob'}]
        </code></pre>`,
        id: 'demoNote13',
        important: '',
        page: 'javascript',
        section: 'examples',
        side: '<a href="https://bobbyhadz.com/blog/javascript-convert-object-to-array-of-objects" target="_blank">Here is a link with more information about Object.value( )<a/>',
        title: 'Turn an object of objects into an array of objects with Object.values( )'
     },
  ]