This program is written in node.js and express.js using MVC model

As a start, do install the dependancies using command "npm install"

This program how an example how to use API to do signup and login. You can use Postman or equivalent to send POST & GET commands. For examle as follow:

POST        127.0.0.1:8000/account/api/signup

Body    x-www-form-urlencoded

Key                     Value

name                    John

email                   john@gmail.com

password                12345



The login is using jwt. 

The program build a user interface to do login and to upload image file (jpeg format).

Please remember to do signup first. The user information will be stored in SQLite database.

To run the program, run command "node app.js" The port is 8000. Go to Chrome browser and type "127.0.0.1:8000"
