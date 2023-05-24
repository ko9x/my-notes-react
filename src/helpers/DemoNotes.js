export const demoNotes = [
  {
    book: "coding",
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
        <pre><code>development/javascript-projects</code></pre>
        <p>Then right click (two finger click) and select new folder from the options and name it demoProject</p>
        <p>Now open Visual Studio Code and select File/open from the top menu bar</p>
        <p>Navigate to the folder we just created and hit the "open" button</p>
        <p>Now that we are inside our project directory we can create the files by hovering over the project folder in the left side bar and clicking the file icon</p>
        <p>Make these three files:</p>
        <li>index.html</li><li>styles.css</li><li>app.js</li>
        <p>(Technically we can name these files anything we want but this is the convention)</p>
        <p>Now double click on the index.html and type a single ! followed by the return key</p>
        <p>This will add a basic html template to our index.html</p>
        
        <p>At this point we can actually run this javascript project in the browser by right clicking the index.html and selecting "Open with Live Server" from the dropdown</p>
        
        <p>Just keep in mind that the project we have created so far is completely blank so all you will get is a white screen.</p>
        <p>To make sure it is working, add this between he opening and closing "body" tags in the index.html</p>
        <pre><code>&#60h1>Hello!&#60/h1></code></pre>
        <p>You should now see the word "Hello" in the top left corner of the page.</p>
        `,
    id: "demoNote1",
    important: "",
    page: "javascript",
    section: "setup",
    side: "<p>Refer to the basics section for information about connecting your javascript and css files to the index.html</p>",
    title: "Setting up a javascript project in visual studio code",
  },
  {
    book: "coding",
    content: `<p>Your basic vanilla javascript project is going to consist of at least 2 (but likely more) files</p>
        <p>First is an html file usually named index.html</p>
        <p>Second is a javascript file usually named app.js initially but this can vary depending on the project</p>
        <p>You may also have a css file usually named styles.css but can often be incorporated into the html file if there isn't a lot of styling needed for the project</p>`,
    id: "demoNote2",
    important: "",
    page: "javascript",
    section: "basics",
    side: "",
    title: "The basic layout of a vanilla javascript project",
  },
  {
    id: "-MTnNFsFE7NCJSDvQUcm",
    book: "electronics",
    content:
      '<p>If you are using a button to call a function it needs to be set up in the code a specific way. </p>\n\n<p>Set whichever pin you want as an input with this code BEFORE the setup function (in this example we are setting it to be pin 2) </p>\n\n<pre><code>const int buttonPin = 2; </code></pre>\n\n<p>Now inside the setup function set the pinMode with this code</p>\n\n<pre><code>pinMode(buttonPin, INPUT); </code></pre>\n\n<p>In the loop setup the digitalRead of the button with this code </p>\n\n<pre><code>buttonState = digitalRead(buttonPin); </code></pre>\n\n<p>And finally run a function only when the button is pressed with a function like this </p>\n\n<pre><code>if(buttonState) {\n    Serial.println("buttonState is 1");\n  }  </code></pre>',
    important: "",
    page: "arduino",
    section: "button",
    side: "Serial.println() will print in the serial monitor. It's kind of like the Arduino version of a console log.",
    title: "Button Code",
  },
  {
    id: "-MTnP73WBfXmZUdu5oN7",
    book: "electronics",
    content:
      "<p>To use a button it needs to be wired up in a specific way. </p>\n\n<p>Connect one side of the button to the 5v output of the arduino. </p>\n\n<p>Connect the other side of the button to whichever pin you setup in the code (for example: pin 2) </p>\n\n<p>On the same side of the button that you wired to pin 2 you also need to wire in a 10k ohm resister to the ground pin on the arduino. </p>\n\n<p>So one side of the button is fed 5volts and the other side of the button is split between pin 2 and the 10k resistor going to ground. </p>",
    important: "",
    page: "arduino",
    section: "button",
    side: "Don't run the pin side through the resistor to the pin. It needs to be split between the 2 to achieve the correct voltage drop that will activate the button properly.",
    title: "Button Wiring",
  },
  {
    book: "electronics",
    content: `<p>go to Tools > Board > arduino nano </p>
        <p>go to Tools > Processor > ATMega328</p>
        <p>go to Tools > Port > /dev/tty.wcusbserial1410 </p>`,
    id: "demoNote3",
    important: "",
    page: "arduino",
    section: "upload",
    side: "",
    title: "upload sketch to nano",
  },
  {
    book: "coding",
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
    id: "demoNote4",
    important: "",
    page: "javascript",
    section: "basics",
    side: "",
    title: "Basic html template command in Visual Studio Code",
  },
  {
    book: "coding",
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
    id: "demoNote5",
    important: "",
    page: "javascript",
    section: "basics",
    side: "",
    title: "Connect the javascript file with the html file",
  },
  {
    book: "coding",
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
    id: "demoNote6",
    important: "",
    page: "javascript",
    section: "basics",
    side: "<p>You can do this with any other type of element such as input, text-area, ul, etc...</p>",
    title: "Linking an html element with a variable inside the app.js",
  },
  {
    book: "coding",
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
    id: "demoNote7",
    important: "",
    page: "javascript",
    section: "basics",
    side: "<p>We introduced document.createElement to show how we can manipulate the html from inside the js as well as interacting with it and obtaining values from it.</p>",
    title: "Interacting with and/or obtaining values from html elements",
  },
  {
    book: "coding",
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
    id: "demoNote8",
    important:
      '<p>Notice that we put both the "style" tag and the "link" tag inside the opening and closing "head" tags of the template</p>',
    page: "javascript",
    section: "basics",
    side: "",
    title: "Importing the stylesheet into your index.html",
  },
  {
    book: "electronics",
    content: `<p>go to Tools > Board and select UNO from the drop down </p><p> go to Tools > Port and select /dev/tty.usbmodem14101</p>`,
    id: "demoNote9",
    important: "",
    page: "arduino",
    section: "upload",
    side: "",
    title: "upload sketch to UNO",
  },
  {
    book: "coding",
    content: `<pre><code>
        let myString = sean
        
        myString.slice(0, 1).toUpperCase() + myString.slice(1, myString.length)
         </code></pre>`,
    id: "demoNote10",
    important: "",
    page: "javascript",
    section: "misc",
    side: "",
    title: "Change the first letter of a string to a capital letter",
  },
  {
    book: "coding",
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
    id: "demoNote11",
    important: "",
    page: "javascript",
    section: "misc",
    side: '<p>For more information about splice click <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="_blank">here<a/></p>',
    title: "array.splice",
  },
  {
    book: "coding",
    content: `<pre><code>
        const ids = arrWithDuplicates.map((object) => object.id);
        const uniqueArr = arrWithDuplicates.filter(
              ({ id }, index) => !ids.includes(id, index + 1)
            );
        </code></pre>`,
    id: "demoNote12",
    important:
      "<p>This example requires the objects to have an id property</p>",
    page: "javascript",
    section: "misc",
    side: "",
    title:
      "Make an array of unique objects from an array that has duplicate objects",
  },
  {
    book: "coding",
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
    id: "demoNote13",
    important: "",
    page: "javascript",
    section: "misc",
    side: '<a href="https://bobbyhadz.com/blog/javascript-convert-object-to-array-of-objects" target="_blank">Here is a link with more information about Object.value( )<a/>',
    title:
      "Turn an object of objects into an array of objects with Object.values( )",
  },
  {
    id: "-MtsP4ddjPZ03pfyAgjz",
    book: "coding",
    content:
      "Since you cannot use an if/else inside JSX the convention is to use Ternary Expressions\n\n<pre><code>{array.length === 0 ? \"show this text if array.length === 0 is true\" : \"show this text if array.length === 0 is false\"} </code></pre>\n\n<p>You can also put a property or even a custom html element/component instead of just text if you want. I just used strings for the example </p>\n\n<p>You can also use this inside of hooks and other functions to concatenate a string</p>\n<p>In this example I use the useHistory hook </p>\n<pre><code>\nconst history = useHistory;\nconst isAscending = queryParams.get('sort') === 'asc';\nhistory.push('/quotes?sort=' + (isAscending ? 'desc' : 'asc')); </code></pre>\n\n<p>You just need to use ( ) instead of { } </p>",
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "Ternary Expression for conditional rendering",
  },
  {
    id: "-MtsV2oHHtqcYaMXUi2T",
    book: "coding",
    content:
      "There are a bunch of ways to toggle a boolean but this way uses State. Using State and prevState will ensure you toggle without bugs.\n<pre><code>const switchBoolean = (prevState) => { \n     setSwitchBoolean((prevState)  => !prevState)\n }; </code></pre>",
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "Switch/Toggle a boolean",
  },
  {
    id: "-MtsZFN888MyAoT01y9R",
    book: "coding",
    content:
      "This will show the component/element only if the first statement is true\n\nSo for a component\n<pre><code>{showModal && &#60Modal />} </code></pre>\n\nor for just a regular html element\n<pre><code>{showElement && &#60div>Hello&#60/div >} </code></pre>",
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "Conditionally show a component/element",
  },
  {
    id: "-Mtsm3ja1aQf3vVCG5B6",
    book: "coding",
    content:
      "Here is where you need to add your key attribute\n\n<pre><code>\nreturn (\n    &#60div key={item.id}>\n        &#60ItemInfo title={item.title}/>\n    &#60/div>\n)\n </code></pre>",
    important:
      "<p>In this example ItemInfo is a custom html element being returned by a map</p>\n<p>This way, every time that component gets rendered it will have a unique key so react can identify it as a unique element on the page</p>",
    page: "react",
    section: "examples",
    side: "",
    title:
      "How to fix the error telling you each item needs a unique key attribute",
  },
  {
    id: "-MttNjllPjCAotDkTB7v",
    book: "coding",
    content:
      "<p>In this example the button type is being passed in through props. But we also use the or operator to give a fallback type of \"button\" if props.type is not set. </p>\n\n<pre><code>&#60button className={styles.button} type={props.type || 'button'}>Add new item &#60/button> </code></pre>",
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "Pass a dynamic property and hard-code a fallback property",
  },
  {
    id: "-MuDAi59fCN3f0zu4kAe",
    book: "coding",
    content:
      "<pre><code>useEffect(() => {\n    const identifier = setTimeout(() => {\n      setFormIsValid(\n        enteredPassword.trim().length > 6 && enteredEmail.includes('@')\n      );\n    }, 500);\n\n    return () => {\n      clearTimeout(identifier)\n    };\n  },[enteredEmail, enteredPassword]); </code></pre>",
    important: "",
    page: "react",
    section: "examples",
    side: '<p>A debounce function is used when you want to avoid triggering the function multiple times.</p>\n<p>In this example we have a function that is checking if a form is valid.</p>\n<p>We don\'t want to run the form validation after each key-stroke because that would be inefficient. We want to wait until the user has stopped typing for 500 milliseconds</p>\n<p>The "clearTimeout" function will run if the 500 milliseconds has not elapsed between key-strokes and the setFormIsValid will not run.</p>',
    title: "Debounce Function (inside a useEffect hook)",
  },
  {
    id: "-MuSZDSOHI7o4MsaHf8I",
    book: "coding",
    content:
      'There are 2 common ways to write a function in react:\n\n<pre><code>\nfunction myFunction(args) {\n    console.log("myFunction just ran!")\n}\n </code></pre>\n\n<pre><code>\nconst myFunction = (args) => {\n    console.log("myFunction just ran!")\n}\n </code></pre>',
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "How to write a Function in react",
  },
  {
    id: "-MuUDrxkTeF2ju6NYFh3",
    book: "coding",
    content:
      '<p>On a label you should use this syntax to identify the label </p>\n<pre><code>&#60label htmlFor="name">"Name:"&#60/ label></code></pre>',
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "htmlFor instead of for on a label element",
  },
  {
    id: "-MvRt5fRqWKkFqShwyrs",
    book: "coding",
    content:
      '<pre><code>const useHttp = (applyData) => {\n  const [isLoading, setIsLoading] = useState(false);\n  const [error, setError] = useState(null);\n\n  const sendRequest = useCallback( async (requestConfig) => {\n    setIsLoading(true);\n    setError(null);\n    try {\n      const response = await fetch(requestConfig.url, {\n        method: requestConfig.method ? requestConfig.method : \'GET\',\n        headers: requestConfig.headers ? requestConfig.headers : {},\n        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,\n      });\n\n      if (!response.ok) {\n        throw new Error("Request failed!");\n      }\n\n      const data = await response.json();\n      applyData(data);\n    } catch (err) {\n      setError(err.message || "Something went wrong!");\n    }\n    setIsLoading(false);\n  },[applyData]);\n\n  return {\n    isLoading,\n    error,\n    sendRequest,\n  };\n}; </code></pre>',
    important: "",
    page: "react",
    section: "examples",
    side: '<p>Notice that the useCallback is added after the "=" inside of the sendRequest function </p>\n<p>Notice that applyData is added to the dependency array (just like in useEffect) because the useCallback depends on that data from outside </p>\n<p>Notice how requestConfig is not added to the dependency array because it is a parameter of the sendRequest function that is being wrapped in the useCallback</p>',
    title: "useCallback",
  },
  {
    id: "-MxHjafLCCIrHLOYYOhc",
    book: "coding",
    content:
      '\n<pre><code>\n<p style="color:red;">!IMPORTANT NOTE!</p>\n<p>Make sure you add .json at the end of your http address when hitting a firebase end point</p>\n<p>If you don\'t you will get an error like [Unhandled promise rejection: SyntaxError: JSON Parse error: Unrecognized token \'<\'] </p>\n\n\nconst [quotes, setQuotes] = useState([]);\n\nuseEffect(() => {\n    const fetchQuotes = async () => {\n      const response = await fetch(\n        "https://react-http-max-54195-default-rtdb.firebaseio.com/quotes.json"\n      );\n\n      if (!response.ok) {\n        throw new Error();\n      }\n\n      const data = await response.json();\n\n      const list = [];\n\n      for (const key in data) {\n        list.push({\n          id: key,\n          author: data[key].author,\n          text: data[key].text,\n          comments: data[key].comments,\n        });\n      };\n\n      setQuotes(list);\n    };\n\n    fetchQuotes();\n  }, []);</code></pre>',
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "Format object from firebase (JSON object) into an array",
  },
  {
    id: "-Myk5nwJv64jZgH7sAE-",
    book: "coding",
    content:
      "<p>useRef has some properties that make it similar to useState but there are some key differences </p>\n<p>If you set a useRef like this: </p>\n<pre><code>const currentLow = useRef(1); </code></pre>\n<p>And then you change the value of the ref like this </p>\n<pre><code>currentLow.current = 2; </code></pre>\n<p>The page will NOT re-render. The change will be saved and it will persist through the next render whenever that happens, but changing the value of currentLow.current to 2 does not cause the page to re-render. </p>",
    important: "",
    page: "react",
    section: "examples",
    side: "",
    title: "useRef",
  },
  {
    id: "-MtsapyC2YVCZEiq5VdP",
    book: "coding",
    content:
      "<pre><code>\nconst [items, setItems ] = useState([ ])\nconst addNewItemHandler = (item) => {\n    setItems((prevItems) => {\n        return [item, ...prevItems];\n});\n};\n </code></pre>\n<p>You can also make this code a little cleaner if you only have one expression:  </p>\n<pre><code>const addNewItemHandler = (item) => {\n     setItems(prevItems => [...prevItems, item]);\n}; </code></pre>",
    important:
      "<p>The examples above will return an array with an array of objects inside of it so this:</p>\n<pre><code>items [[{item: shoe}], [{item: hat}]]</code></pre>\n<p>But you may want to return just one array that contains your items not an array that contains arrays of items. so This: </p>\n<pre><code>items [{item: shoe},{item: hat}] </code></pre>\n\n<p>To do this, you want to use concat like so: </p>\n<pre><code>\nconst [items, setItems ] = useState([ ])\nconst addNewItemHandler = (item) => {\n    setItems((prevItems) => {\n        return prevItems.concat(item);\n});\n};\n </code></pre>\n",
    page: "react",
    section: "array",
    side: "Instead of just passing one item you could pass another array and it would get added to the items array.",
    title: "Add new item to an existing array",
  },
  {
    id: "-MtsfadzKphe1ZJlYw08",
    book: "coding",
    content:
      "<pre><code>\nconst [items, setItems] = useState([ ]);\nuseEffect(() => {\n   if(props.item) {\n    setItems((prevItems) => {\n      return [props.item, ...prevItems]\n    });\n   }\n  }, [props.item]); \n</code></pre>",
    important:
      '<p>Since we are waiting for a change on "props.item" we add props.item to the dependency array at the end of the useEffect.</p>\n\n<p>We could add just "props" to the dependency array, but this would not be very efficient. We don\'t need to run the useEffect every time the props object changes. We only need to run useEffect when one part of the props object changes. Specifically "props.item".</p>\n\n<p>If you refer to anything in the useEffect that could change, you should add it to the dependency array.  </p>\n<p>In this example the only thing we refer that could change is the props object, so that is the only thing we add to the dependency array </p>\n<p>If you wanted to you could add "setItems" to the dependency array, It wouldn\'t break anything. But since it is a useState function exposed by react it is redundant and not necessary to add it to the dependency array. </p>',
    page: "react",
    section: "array",
    side: "<p>This is really helpful for when you want to use part of the props object but you don't want to add the component to your return statement. </p>\n\n<p>This useEffect statement will run every time props.item changes. It also checks to make sure props.item is truthy</p> \n<p>So you can hit a button in some other component and pass the data to this component through props, and then use that data.</p>\n<p>In this example I used that data to add a new item to the items array.  </p>",
    title: "use the useEffect  hook  to add an item to an array",
  },
  {
    id: "-MxXSpeP7rehLfyljV_c",
    book: "coding",
    content:
      "<pre><code>\nfor (const key in quote.comments) {\n            setComments(prevState => [{\n              id: key,\n              text: quote.comments[key].text,\n            },...prevState] );\n          }; \n</code></pre>\n\n<p>In this example a key is used to identify comments in a firebase object and then push the id and the text of each comment (in the form of an object) into an array.</p>\n\n<p>The result is an array of objects that can be mapped : </p>\n<pre><code>[{id:1, text: 'comment 1'},{id:2, text: 'comment 2'},{id:3, text: 'comment 3'},{id:4, text: 'comment 4'}]</code></pre>\n",
    important:
      "<p>If your returned array has duplicated items you probably need to reset the array to an empty array at the beginning of the for-in-loop</p>\n<pre><code>setComments([])\n    const quotes = getQuotes();\n    const tryComments = () => {\n      for (let quote of quotes) {\n        if (quote.id === key) {\n          for (const key in quote.comments) {\n            setComments((prevState) => [\n              ...prevState,\n              {\n                id: key,\n                text: quote.comments[key].text,\n              },\n            ]);\n          }\n        }\n      }\n    }; </code></pre>",
    page: "react",
    section: "array",
    side: "<p>Each new object is added to the front of the array in the example. To add each new object to the back of the array just move ...PrevState to the front of the array: </p>\n<pre><code>prevState => [...prevState,{\n              id: key,\n              text: quote.comments[key].text,\n            }] </code></pre>",
    title:
      "How to push items (Or in this case comments) to a state array using useState/setState",
  },
  {
    id: "-Mxc3Ocjs7o7yGuxq_yM",
    book: "coding",
    content:
      "<p>In this example we pass in an array of items and a boolean that will be either true or false.</p>\n<p>Changing the boolean will change the ascending or descending nature of the array that is returned</p>\n<pre><code>\nconst sortArray = (myArray, myBoolean) => {\n  return myArray.sort((arrayItemA, arrayItemB) => {\n    if (myBoolean) {\n      return arrayItemA.id > arrayItemB.id ? 1 : -1;\n    } else {\n      return arrayItemA.id < arrayItemB.id ? 1 : -1;\n    }\n  });\n}; \n\nconst mySortedArray = sortArray(myArray, myBoolean)</code></pre>\n",
    important: "",
    page: "react",
    section: "array",
    side: "<p>This will only work if the id of each item is a number that can be sorted by.  </p>\n<p>You may want to change the code to sort by item.date or item.created_on if something like that is available. </p>",
    title: "Helper function to switch an array from ascending to descending",
  },
  {
    id: "-N-Pbn6JCz0VYmidOY10",
    book: "coding",
    content:
      '<p>In this example the "meals" array is being filtered</p>\n<p>Imagine each meal has a value of true or false for each property in the applied filters object</p>\n<p>Since we are doing the "if" checks inside the filter function, returning "false" just means the the meal is not added to the "updatedFilteredMeals" array</p>\n<p>If a meal makes it through all the "if" checks, it is returned as true and thus is added to the "updatedFilteredMeals" array </p>\n<p>Once the filter function has gone through all the meals in the meals array we use the spread operator to properly update the state object with our new filteredMeals array </p>\n\n\n<pre><code>const appliedFilters = {\n      glutenFree: isGlutenFree,\n      lactoseFree: isLactoseFree,\n      vegan: isVegan,\n      vegetarian: isVegetarian\n    };\n            const updatedFilteredMeals = meals.filter(meal => {\n                if (appliedFilters.glutenFree && !meal.isGlutenFree) {\n                    return false;\n                };\n                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {\n                    return false;\n                };\n                if (appliedFilters.vegan && !meal.isVegan) {\n                    return false;\n                };\n                if (appliedFilters.vegetarian && !meal.isVegetarian) {\n                    return false;\n                }\n                return true;\n            });\n                return {...state, filteredMeals: updatedFilteredMeals}; </code></pre>',
    important: "",
    page: "react",
    section: "array",
    side: "<p>The reason we use the spread operator is to make sure we only update the part of the state object we are targeting. This also ensures we don't directly manipulate the raw data. Using the spread operator and filteredMeals: updatedFilteredMeals lets react update the state for us in the correct way.</p>\n<pre><code>const state = {\n    meals: MEALS,\n    filteredMeals: filteredMeals,\n    favoriteMeals: [],\n} </code></pre>\n<p> </p>",
    title: "Filter for multiple different values and return an array",
  },
  {
    id: "-N6GWfJG-o8I6ZyUFagA",
    book: "coding",
    content:
      "<p>If you need to look through one array of objects to find a match to a value in another array here is an example from NoteWorthy: \n</p>\n<pre><code>\nif (filtersArr?.length) {\n    filteredEvents = response.events.filter(event => {\n        if (!event.categories.length) {\n            return false;\n        }\n        return event.categories.filter(category => {\n            return filtersArr.filter(filter => {\n                return filter === category.name;\n            }).length;\n        }).length;\n    });\n    setEvents(filteredEvents);\n} else {\n    setEvents(response.events);\n}\n </code></pre>",
    important:
      "<p>At the end of each filter you need to add .length or else javascript doesn't return anything.</p>\n<p>This is a very important note because if the filters don't return anything the function is useless</p>",
    page: "react",
    section: "array",
    side: '<p>In the example filtersArr is an array of strings</p>\n<p>response.events is an array of objects that look like this:</p>\n<pre><code>\n{"categories": [{"created_at": "2022-06-28 14:51:53", id: 102, "name": "Expenses", "pivot": [Object], "updated_at": "2022-06-28 14:51:53", "user_id": 6}], "created_at": "202-04-0 22:57:24", "description": "I got them from Buckle. 3 pairs of 32x32 Tyler style and 1 pair 33x32 Tyler style. It cost abou $300." "event_date": "2022-04-10", id: 58, "images": [], title: "Bought 4 pairs of pants", "updated_at": "2022-04-10 22:57:24", "user_id": 6}\n </code></pre><p>Ech object has several properties like description and title, but more importantly for this example they have an array of ategoris .</p>\n<p>These category objects have an id property and a name property that we are focusing on in this example.</p>\n<p>At the heart of the function we are grabbing each category object and then looping through the filtersArr to see if any of the names in the filtersArr match the name of the category we just grabbed. Once we have checked all the filtersArr names agains the category we grabbed, the loop moves onto the next category and does the same thing until there are no more categories to check against the filtersArr</p>\n<p>It\'s kind of complicated but when "filter === category.name" returns "true" it means that the parent function (in this case filtersArr.filter) returns "true". And this child/parent chain of truthy-ness goes all the way to the top until something is done with it. In this case we add the event to the filteredEvents array at the top of this function.</p>\n<p>Basically the whole function is grabbing one event in the response.events array. It then is looping over the categories array inside that event to see if any of the category names match any of the names in the filtersArr. If any of them matches the function will be truthy and it adds the event to the filteredEvents array. if none of them matches at any point it does not get added to the filteredEvents array because it never became truthy and the function moves on to the next event until all the events have been checked. </p>\n',
    title: "Loop over 2 arrays",
  },
  {
    id: "-NI9pRWfPJmmuWiTaCCD",
    book: "coding",
    content:
      "<p>This will add both the item class and the active</p>\n<pre><code>\n&#60button className={`${classes.item} ${classes.active}`}>Click Me&#60/button>\n</code></pre>",
    important: "",
    page: "react",
    section: "styling",
    side: "<p>You may want to add the second class conditionally</p>\n<p>Here is an example:</p>\n<pre><code>\n&#60button \n  className={`${classes.item} ${\n    activeBook === book ? classes.active : null\n  }`}\n>\n  ClickMe \n&#60/button>\n</code></pre>\n<p>In the above example the active class is only added to the button if (activeBook === book) is true.</p>\n",
    title: "Add multiple classes/styles to an element",
  },
  {
    id: "-NI9xuxgQFcZOIFdMFmi",
    book: "coding",
    content:
      "<p>Usually the element closer to the bottom of the script will sit on top of elements closer to the top of the script.</p>\n<p>But if you set a zIndex (z-index), whichever element has the higher zIndex will sit on top of elements with a lower zIndex.</p>\n<p>Regardless of their position in the script.</p>\n\n<pre><code>\n&#60div style={{position: relative, zIndex: 1}}>&#60/div>\n&#60div style={{position: relative, zIndex: 100}}>&#60/div>\n&#60div style={{position: relative, zIndex: 0}}>&#60/div>\n</code></pre> \n<pre><code>\n&#60div style={{position: relative, zIndex: 1}}>&#60/div>\n&#60div style={{position: relative, zIndex: 100}}>&#60/div>\n&#60div style={{position: relative, zIndex: 0}}>&#60/div>\n</code></pre> ",
    important: "",
    page: "react",
    section: "styling",
    side: "<p>You can also use negative numbers for the zIndex</p>\n<pre><code>&#60div style={{position: relative, zIndex: -100}}>&#60/div></code></pre>",
    title:
      "Using position: relative and z-index to decide which element is on top when elements overlap",
  },
  {
    id: "-NIFH4zXxipCOlG1KoxO",
    book: "coding",
    content:
      "<p>Make sure your index.css is imported into your index.js file. (This is usually the file that wraps your app in a root.render)</p>\n<p>The import will look like this</p>\n<pre><code>import './index.css';</code></pre>\n<p>Now any classes you add to the index.css can be accessed globally like this:</p>\n<pre><code>&#60button className='courierButton'>&#60/button></code></pre>\n<p>Notice in the above example we are wrapping the className in quotes. This is how you access the global classes</p>\n<br>\n<p>For local classes (which will override the global if you follow this method) it is implemented by creating a module.css file that you import into your component like this:</p>\n<pre><code>\nimport classes from './MyComponent.module.css';\n\nexport default function MyComponent() {\nreturn (&#60div className={classes.myLocalClass}> &#60/div>)\n}\n</code></pre>\n<p>Notice in the above example that we are wrapping the className in Curley Brackets and also precede the className with classes.</p>",
    important: "",
    page: "react",
    section: "styling",
    side: "",
    title: "How to implement global classes ",
  },
  {
    id: "-NMCYN94QmEojwT-7_dB",
    book: "coding",
    content:
      "<p>Make sure your index.css is imported into your index.js file. (This is usually the file that wraps your app in a root.render)</p>\n<p>The import will look like this</p>\n<pre><code>import './index.css';</code></pre>\n<p>The variables must be written in the index.css in a very specific way.</p>\n<pre><code>\n:root {\n  /* header and footer */\n  --primary-color: #c1c1c1;\n  /* SideBar */\n  --secondary-color: #a9a9a9;\n  /* SideBarWall */\n  --tertiary-color: #8c8a8a;\n  /* background where the notes are displayed */\n  --background-color: #282c34;\n  /* activated button */\n  --activeButton-color: palegreen;\n  /* action button */\n  --actionButton-color: lightseagreen;\n}\n</code></pre>\n<p>Notice that the variables are wrapped in :root { }</p>\n<p>Notice that the variables are written with -- at the beginning. This is required for these global variables to work</p>\n<p>Now these variables you added to the index.css can be accessed globally in any module.css like this:</p>\n<pre><code>\n.myClass {\n    color: var(--primary-color);\n}\n</code></pre>\n<p>Here is how you would add the class to the element in your component.js</p>\n\n<pre><code>\nimport classes from './MyComponent.module.css';\n\nexport default function MyComponent() {\nreturn (&#60div className={classes.myClass}> &#60/div>)\n}\n</code></pre>\n<p>Notice in the above example that we are wrapping the className in Curley Brackets and also precede the className with classes.</p>",
    important: "",
    page: "react",
    section: "styling",
    side: "<p>If you want to refer to the css variable in javascript you can do this:</p>\n<pre><code>const myCSSVariable = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');</code></pre>",
    title: "How to implement global variables ",
  },
  {
    id: "-NP_WmWVyafmiU8cZWNg",
    book: "coding",
    content:
      "<p>You can't actually use float inside a flex container.</p>\n<p>If you have already tried justifyContent/self and alignItems/self try this:</p>\n\n<pre><code>style={{marginLeft: 'auto'}}</code></pre>\n\n<p>This will float the item to the right because 'auto' basically adds the largest laft margin possible while staying inside the container.</p>",
    important: "",
    page: "react",
    section: "styling",
    side: "",
    title: "Making a flex item float right or left",
  },
  {
    id: "-M1DnOis04dj7m2DqL4N",
    book: "coding",
    content: "hold option then hit the left or right arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "option is also sometimes called alt",
    title:
      "move cursor to the left or right one word at a time without highlighting it",
  },
  {
    id: "-M1Dne_yVTVJsWd5axLf",
    book: "coding",
    content: "hold option + shift and then hit the left or right arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "option is also sometimes called alt",
    title:
      "move cursor to the left or right one word at a time and highlight it.",
  },
  {
    id: "-M1E4zyEOl7wM1EI-DRX",
    book: "coding",
    content: "hold option and then hit the up or down arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "move the line that the cursor is on up or down",
  },
  {
    id: "-M1HuaMh5wnyP1qBIb2A",
    book: "coding",
    content: "command + left arrow key or right arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "move cursor to the beginning or end the line you are on",
  },
  {
    id: "-M1HvUdqDhKozpi-6c6A",
    book: "coding",
    content: "Hold command + shift and then hit the right or left arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "highlight everything to the right or left of the cursor",
  },
  {
    id: "-M1Hvhua94lwOAmRmoLj",
    book: "coding",
    content: "command + a",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "highlight everything on the page",
  },
  {
    id: "-M1Hwh5bOwM86fEP-8I8",
    book: "coding",
    content: "command + the up or down arrow key",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "move cursor to the top or bottom of a page",
  },
  {
    id: "-M1I-OdKxmojc2OTDqPv",
    book: "coding",
    content: "command + the number of the tab from left to right",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "switch tabs",
  },
  {
    id: "-M1I1ooHoFVRVSrJQ7TB",
    book: "coding",
    content: "<pre><code>option + delete</code></pre>",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "<pre><code>command + delete </code></pre>\n<p>this command will delete the entire line </p>\n",
    title: "delete the last word you typed on a line",
  },
  {
    id: "-M1I2R6fsihdWeYptFX9",
    book: "coding",
    content: "<pre><code>shift + tab</code></pre>",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "tab backwards",
  },
  {
    id: "-MU_PwakvF9DLs3kHwVT",
    book: "coding",
    content: "command + n",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "launch a new window of something ",
  },
  {
    id: "-MU_Q0Izayh-M4q71OB8",
    book: "coding",
    content: "command + t",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "launch a new tab of something",
  },
  {
    id: "-NRi7XmGF4hIDNQ-vaLu",
    book: "coding",
    content: "<pre><code>shift + option + command + v</code></pre>",
    important: "",
    page: "shortcuts",
    section: "macbook",
    side: "",
    title: "Paste without formatting",
  },
  {
    id: "-M1HeXBnLA2bn2GRjoyv",
    book: "coding",
    content: "hold command + shift and then press d",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title: "copy the line you are currently on to the line below",
  },
  {
    id: "-M1HyXUpmVuC1fBeSJC0",
    book: "coding",
    content: "command + z",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title: "undo the last change",
  },
  {
    id: "-M1HycWFFNwMCL4-TPgo",
    book: "coding",
    content: "command + shift + z",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title: "undo the undoing of a change",
  },
  {
    id: "-M1HzEYWtlaqPL9RxzYA",
    book: "coding",
    content: "command + shift + w",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title:
      "close the instance of visual studio and when you open it again you can choose which project you want to view",
  },
  {
    id: "-M1I-RIWH7Cl3XZRuo2y",
    book: "coding",
    content: "command + the number of the tab from left to right",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title: "switch tabs",
  },
  {
    id: "-M1I0ONbl6tJKq9-_m2V",
    book: "coding",
    content:
      "double click the word to highlight it and then\n\n<pre><code>command + d</code></pre>\n\nthis will keep the first word highlighted and each time you hit command + d you will highlight the next instance of the word",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "",
    title: "find and highlight other instances of a word",
  },
  {
    id: "-M1c8wxFLv4_IeMi9W1g",
    book: "coding",
    content:
      'command + shift + f\n\n<p>for example: just typing the word "console" (no quotes...) will list every console.log in the project.</p>\n<p>as well as every other instance of the word console</p>',
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "command + f \n<p>will search just the file you are in </p>\n<p>command + f works for almost any page ie: web ages,pdf files, etc... </p>",
    title: "search for a word in the whole project",
  },
  {
    id: "-M1cAumhCzAYM-Fzlpwa",
    book: "coding",
    content: "command + p",
    important: "",
    page: "shortcuts",
    section: "visual studio",
    side: "You can just type a few key characters if you want \n<p> for example: typing ix into a project with an index.tml fle will find the index.html</p>\n<p> another good use for this command is to find a file by it's extension</p>\n<p> for example: if you type html it will list every html file in the project</p>",
    title: "search the project for a file name",
  },
  {
    id: "-M1I6FUC762hJ1-4f7vl",
    book: "coding",
    content: "<pre><code>ll</code></pre>",
    important: "",
    page: "shortcuts",
    section: "terminal",
    side: "this is the lowercase letter L typed twice",
    title: "view the directory list with ll",
  },
  {
    id: "-M1qhkJvZAUQxlsEV7k0",
    book: "coding",
    content:
      "<pre><code>!!</code></pre>\n\n<p>this is useful if you typed a command but forgot that it needed something at the beginning. </p>\n<p>for example: If you ran this command </p>\n<pre><code>myFile/myFiles  </code></pre>\n<p>but forgot you need to add cd in order to navigate to that directory </p>\n<p>you can run this command </p>\n<pre><code> cd !!</code></pre>\n<p>and now terminal will see that as  </p>\n<pre><code>cd myFile/myFiles </code></pre>",
    important: "",
    page: "shortcuts",
    section: "terminal",
    side: "<p>You can also use !! If you forgot to add something to the front of the command like sudo. </p>\n<p>For example:</p>\n<p>If you just ran the command</p>\n<pre><code>vim /myFiles/myFileName</code></pre>\n<p>But then you realize you need to edit that file as the root user you can just type </p>\n<pre><code>sudo !!</code></pre>\n<p>And you will get</p>\n<pre><code>sudo vim /myFiles/myFileName</code></pre>",
    title:
      "tell the terminal to run same command you just typed, again with !!",
  },
  {
    id: "-NTVGlCtDci23mYHJvgG",
    book: "coding",
    content:
      "<p>If you are already in the directory you want to create the file in simply run the command:</p>\n<pre><code>touch test.txt</code></pre>\n<p>You can also create multiple files</p>\n<pre><code>touch test1.txt test2.txt test3.txt</code></pre>\n\n<p>If you want to make the file in a directory you are not currently in, just add the path before the command like so:</p>\n<pre><code>touch javascript-projects/snake-game/test.txt</code></pre>\n<p>You can also create multiple files in another directory like so:</p>\n<pre><code>touch javascript-projects/snake-game/test1.txt test2.txt test3.txt</code></pre> ",
    important: "",
    page: "shortcuts",
    section: "terminal",
    side: "",
    title: "create a file with touch",
  },
  {
    id: "-NTVKSoRn1kFcSFZoosu",
    book: "coding",
    content:
      "<p>If you are already in the directory where you want to create the new directory, simply run this command:</p>\n<pre><code>mkdir test</code></pre>\n\n<p>If you want to make the directory in a directory you are not currently in, just add -p and the path before the command like so:</p>\n<pre><code>mkdir -p javascript-projects/snake-game/test</code></pre>\n<p>The -p will either create the directory you listed in your path or just go there if it already exists.</p>\n<p>Really you just put the -p to avoid getting errors when creating a directory in a different location.</p>",
    important: "",
    page: "shortcuts",
    section: "terminal",
    side: "",
    title: "create a directory with mkdir",
  },
  {
    id: "-NTVQDrzssvlCpOIhJaH",
    book: "coding",
    content:
      '<p>To copy a file from one location to another you would use a command like this:</p>\n<pre><code>cp test.txt /javascript-projects/snake-project</code></pre>\n<p>This assumes you are in the directory where the test.txt file lives</p>\n\n<p>To copy a file that is in a different directory you would use a command like this:</p>\n<pre><code>cp ~/development/test.txt ~/development/javascript-projects/snake-project</code></pre>\n\n<p>To copy a directory use a command like this:</p>\n<pre><code>cp ~/development/test ~/development/javascript-projects/snake-project</code></pre>\n<p>Make sure you don\'t put a "/" after test in ~/development/test or else you will just copy the contents of that folder to your destination. Unless of course that is what you want to do.</p>',
    important: "",
    page: "shortcuts",
    section: "terminal",
    side: "",
    title: "Copy a file or directory with cp",
  },
  {
    id: "-M7dW5svWdiF7IJwhTvN",
    book: "electronics",
    content:
      "<p>Remove the SD card from the pi and put it into macbook</p> \n\n<p>You should see the RECOVERY partition. Create a file called autoboot.txt at the root level of this partition. </p>\n\n<p>Put a single line in the text file:</p>\n\n<pre><code>boot_partition=6</code></pre>\n\n<p>Now when the pi is powered up it will start booting instead of asking you how to boot it up.</p>\n",
    important: "",
    page: "raspberry pi",
    section: "misc",
    side: "",
    title: "autoboot",
  },
  {
    id: "-M7dYCa_Y_2Ly6bgaiDI",
    book: "electronics",
    content:
      "<p>The NOOBS folder is located at Desktop/raspberry_pi on my macbook. </p>\n\n<p>Copy all the files from the unzipped NOOBS folder and paste them into the root of the SD card</p>\n\n<p>Connect a mouse and keyboard to the pi, insert the SD card, and supply 5 volts to power it up.</p>\n\n<p>Once it powers up check the box for Raspbian and hit the install button</p>",
    important: "Don't install libreELEC it is not needed for RPIAPI",
    page: "raspberry pi",
    section: "misc",
    side: "",
    title: "install raspbian using NOOBS",
  },
  {
    id: "-M7dh8KBv-XwrEhsfwR_",
    book: "electronics",
    content:
      "<p>in terminal navigate to var/www/rpiapi</p>\n\n<p>run this command  </p>\n\n<pre><code>sudo nano .htaccess</code></pre>\n\n<p>Delete all the text in this file</p>\n\n<p>to exit hold control and press x</p>\n\n<p>then type y to say yes to saving the changes</p>\n\n<p>then press enter to say you want to change the .htaccess file </p>\n\n<p> now run this command to restart the apache server and initiate the changes you just made</p>\n\n<pre><code>sudo service apache2 restart</code></pre>",
    important: "",
    page: "raspberry pi",
    section: "misc",
    side: "<p>You need to use superuser privilege to edit this file</p>\n\n<p>using the sudo terminal command is the only way I know to do that</p>\n",
    title: "remove endpoints password protection",
  },
  {
    id: "-M9yk3RmyqXTDgwySb9m",
    book: "electronics",
    content:
      "<p> To turn a pin on or off at boot</p>\n<li>insert the sd card into macbook</li>\n<li>navigate to boot/config.txt</li>\n<br>\n<p>example code</p>\n<pre><code>gpio=4=op,dl</code></pre>\n<pre><code>gpio=4=op,dh</code></pre>\n<p>in the above examples gpio=4 selects gpio pin 4 (physical pin 7)</p>\n<p>op means output and dl means drive low</p>\n<p>in the second example line it says op,dh this means output, drive high</p>\n<p>in the above example since the drive low command is first the pi will drive low and then drive high. In other words it follows the order in which the commands are listed</p>",
    important: "",
    page: "raspberry pi",
    section: "misc",
    side: 'here is a link to the official documentation <a href="https://www.raspberrypi.org/documentation/configuration/config-txt/gpio.md" target="_blank">GPIO control in config.txt<a/>',
    title: "Turn pins on or off at boot",
  },
  {
    id: "-M9ym-Jn7tIKC9Ng-G6G",
    book: "electronics",
    content:
      '<a href="https://i.stack.imgur.com/yHddo.png" target="_blank">pi nano/zero pinout image<a/>',
    important: "",
    page: "raspberry pi",
    section: "misc",
    side: "",
    title: "raspberry pi nano/zero pinout image",
  },
  {
    id: "-M9ympuGFDu7b7aKO6NH",
    book: "electronics",
    content:
      '<a href="https://www.raspberry pi.org/documentation/usage/gpio/" target="_blank">raspberry pi 3 pinout image<a/>',
    important: "",
    page: "raspberry pi",
    section: "misc",
    side: "",
    title: "raspberry pi 3 pinout",
  },
   {
       id: "-NVr8o87vJg2uqkDVVhR",
       book: "3D printing",
       content: "Fusion 360 is a great resource since it allows users to do everything in one place. With Fusion 360 you can create 3D designs, collaborate, manage data, create toolpaths, and run simulations to validate your designs\n\n<p>If you are just using for non-commercial purposes you can get a free version but it needs to be reinstalled pretty often</p>\n\n<p>You need to create an AutoDesk account and fill out a form <a href=\"https://accounts.autodesk.com/Authentication/LogOn?viewmode=iframe&ReturnUrl=https://www.autodesk.com/products/fusion-360/personal-form#username\" target=\"_blank\">here<a/></p>\n\n\n\n",
       important: "",
       page: "modeling",
       section: "design",
       side: "",
       title: "Fusion 360"
   },
   {
       id: "-NVrD9BUuMf0HB9XAUzU",
       book: "3D printing",
       content: "<p>I wanted something that could handle some fine detail but also had a printing plate over 10 inches and a decent height capability.</p>",
       important: "",
       page: "printer",
       section: "hardware",
       side: "<p>It was easy to assemble and set up. Even the all important bed leveling</p>",
       title: "Creality CR-10S"
   },
   {
       id: "-NVrD9BUuMf0HB9XAU2U",
       book: "3D printing",
       content: "<p>The mother board is an Atmega v2.2 with the upgraded 220uF C4 capacitor to fix the temperature isses</p>\n\n<p>It also has the A4988 Drivers for better linear advance and holding torque</p>",
       important: "",
       page: "printer",
       section: "hardware",
       side: "",
       title: "Atmega v2.2"
   },
   {
       id: "-NVrD9BUuMf0HB9XAUbU",
       book: "3D printing",
       content: "<p>Even though it has a pretty large bed it heats up quickly with no issues</p>",
       important: "",
       page: "printer",
       section: "hardware",
       side: "",
       title: "12v 350w Power Supply"
   },
   {
       id: "-NVrD9BUuMf0HB9XAU3U",
       book: "3D printing",
       content: "<p>Since I have a Creality CR-10S I use TH3D</p>\n\n<p>I followed the steps in <a href=\"https://www.youtube.com/watch?v=17BmvUSKntE\" target=\"_blank\">this youtube video<a/></p>",
       important: "",
       page: "printer",
       section: "firmware",
       side: "<p>The version I installed was U1 R1.5</p>",
       title: "TH3D"
   },
   {
      id: "-NVr7lzTjXOySuQhQQ_1",
      book: "3D printing",
      content: "<p>I prefer Cura. Specifically version 3.4.1 get it <a href=\"https://github.com/Ultimaker/Cura/archive/refs/tags/3.4.1.zip\" target=\"_blank\">here<a/></p>\n\n",
      important: "",
      page: "slicing",
      section: "software",
      side: "<p>If the download link is dead go to the Cura GitHub page and find it under previous releases</p>\n<a href=\"https://github.com/Ultimaker/Cura/releases\" target=\"_blank\">Previous releases<a/>",
      title: "Cura"
  },
];
