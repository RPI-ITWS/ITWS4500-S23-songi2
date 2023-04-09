How to run lab5!

cd into /var/www/html/ITWS4500-S23-songi2/lab5/server
and TYPE node server.js and everything should be hosted in https://songi2.eastus.cloudapp.azure.com/node

Overall, this lab5 took me really long time to convert everything to react, conect DB and have it working with the frontend and backend, and hosting the node in the azure. However, this lab really helped me a lot with learning how to use react and node with the azure server!

For creativity: I have put a reset button so that user can reset the database after playing with the buttons. I also have used aos for cool looking pop ups and bootstrap so that it works on mobile with card features when user click on the GET button. I have recreated the lab3 into react app.

Hardest Part:
The hardest part about this lab was to understand how node server woks within azure. It took me a lot of time to figure out how to convert the compiled react-app as well as server.js in order to make this hosted in the vm.
I also had only limit of 100 api calls for my api. Therefore, I had to separately create a json object so that I can reset the entire database.

Solution for my sake: After you compile a react-app, you need to go to index.html and put /node to your script link and the css link. Also for pictures, you have to manually add the link after you compiled it with this code src={`${process.env.PUBLIC_URL}/node/static/media/betting.f5a290d290e1ee3a35dc.png`}

Reference & Help:
Basic Simple Questions - https://stackoverflow.com/
Connecting MongoDB with Node - https://www.youtube.com/watch?v=bxsemcrY4gQ&ab_channel=TheNetNinja
Conversion of HTML/CSS to React - https://dev.to/menard_codes/converting-static-html-css-site-to-react-app-263e

Sean H.
Dr. Callahan

Working Process:

Made lots of initial commit. It took a while for me to convert pretty much everything from lab 3 to react.js. I had trouble with converting javascript file and html file and combining them. Thankfully finished the converting. I also realized that I have to serve the server side on the other port and client side on the other port. So I set the client to be on 3000 and server side to be on 3001. I had to use cors in order for client side to talk to the port in server side port. I have learend so many things through this lab.

The problem I had with my API is that it will charge me if it requests for more than 100 request per day. Therefore, I had to upload a json file for my database and instead of calling my api whenever I want to reset the database, I will just iterate through the json files and reset the database. This was hard but I realized this package called "fs" which really helped to read the file and right them out to the MongoDB database. Ultimately, I took a lot of time to get the GET and DELETE request fully working as well as the reset request which I used POST for. I would have to work with creating a form for POST and PUT request for the data.

Map for looping through database. Promise.All to make sure every function has been run before database closes. I had to find a way to compile a the frontend so that I can directly host the backend and frontend at the same time. I compiled it with using npm run build which is a built-in function.

Toughest part was to make sure the frontend is compiled and can be used. For this I had to go through every single fetch and put /node in front of it. Also in the compiled index.html, I had to put /node in front of every js and css link. For the images, I had to manually check the compiled version of the img's name and hard-coded it into the corresponding src.
