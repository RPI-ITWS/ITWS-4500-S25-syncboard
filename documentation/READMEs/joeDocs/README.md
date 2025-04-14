# To Do  :
   - Calendar√
   - resources page√
   - make sure task page is good √
   - finish login √
   - hash passwords for signup, edit login √
   - password requirements for it to be good.  √
   - add login checkers to each page 
   - make sure workspace Cards correlate to the actual class (grace)
   - professors randomizing 
   - eventually have calendar pull from our AP I 

# Project requirements: 
   - front end in react
   - Use API
   - Use all technologies talked about in class
   - Have a group and chat API 
   - MERN Stack 
   
# Good Users to create Key: 
   - 174860325: in intro to HCI and Lin alg
      ```
      email: 'test1@rpi.edu'
      password: 'Yo-mama3<'
      ```
   - 435219607: in HCI, Lin Alg, and Web Sci Systems 
      ```
      email: 'test2@rpi.edu'
      password: 'im-Inall3Ha?'
      ```
   - 413682709: just webSci
   - 662018329: Web Sci Systems dev instructor 

   


# VM Configs: 
   - sudo npm install express-session
   - sudo npm install cors
   - change over to VM URL's 
   - set to true when on VM: cookie: { secure: false }  
   - npm install bcrypt

# App Conventions/Descriptions
   - Class data would be scrapped from somewhere so that the professor doesn't have to hardcode that in. 
   - then when a user signs up, the class data is checked for their rin, if that is 

# Things I learned/Citations : 
   - Viewport width= based off of the visible area of the web browser 
   - https://fullcalendar.io/
   - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.sitepoint.com/css-viewport-units-quick-start/%23:~:text%3DViewport%2520width%2520(%2520vw%2520)%2520is%2520a,unit%2520is%2520denoted%2520as%2520vw&ved=2ahUKEwie-Ofk7t2LAxWEFlkFHZ65NosQFnoECBIQAw&usg=AOvVaw2mvCFeWPdkCQBak1h3acVz
   - Browser Router -> aka a single Page Application
      - this works because when we reload it sends back the html page and then the page we are reloading from is handled by the browser: 
         ```
         app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'));
         });
         ``` 

   - this is an absolute path: <link rel="stylesheet" href="/style.css">
   - this is a relative path: <link rel="stylesheet" href="./style.css">
      - reltive breaks browser router when 2 deep like: 'class/resources' 
   - Javascript Session Middleware: 
      - (see comments on server.js on what I learned)
      - https://www.google.com/search?client=safari&rls=en&q=Javascript+session+middleware%3A&ie=UTF-8&oe=UTF-8]
      - app.use runs in between each get call (thus middleware)
      - //cookie links the client to the session, session is not a cookie
   - React Browser, Sessions are stored on server side, so in order to retrieve session variables, react must make API calls 
   - CORS -> Data (like session variables) acsess manager for JS: 
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS&ved=2ahUKEwjNlrPv19eMAxVxvokEHQ1LKegQFnoECBkQAQ&usg=AOvVaw2xmyG8mpAqKyMiOwPBDkob
   - difference between for in and for of: 
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://stackoverflow.com/questions/29285897/difference-between-for-in-and-for-of-statements&ved=2ahUKEwjo2oHj99eMAxWmvokEHSBWFrsQFnoECBgQAQ&usg=AOvVaw1oRcWABDTPWc4BWsFyXsxa
   - Always encrypt passwords on server side: 
      - https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://medium.com/%40patilchetan2110/password-encryption-and-decryption-in-node-js-using-bcrypt-package-5a7b1952d49d&ved=2ahUKEwil-vrr_NeMAxUSl4kEHTO8HzMQFnoECBUQAQ&usg=AOvVaw0i4FlYUanMMrvR79yv5r3X
   - password hadhing in bcrypt 
      - https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/
   - when server restarts session is cleared 

# Code Chunks: 



# Potential future additions 
   - if adding 'teacher page' just add a dropdown for signup/login to specify weather student or teacher 
   - notify users of password requirements so they don't have to trial and error
   - email verification 
   - make session validation a module. 