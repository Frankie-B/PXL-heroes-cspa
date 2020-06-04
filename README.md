### Read me

1 - In root folder (server) install dependencies
2 - cd into client and also install dependencies there
3 - server and client can be run together with the npm package concurrently

### Run the client & server with concurrently

npm run dev

### Run the Express server only

npm run server

### Run the React client only

npm run client

### Server runs on http://localhost:5000 and client on http://localhost:3000

```

## App Info

On the sever side, you will be required to create a .env file a place your BreweryDB API Key there

I chose to take a mobile first approach when think about the layout.

Layout and positioning was done using flexbox.

To handle the routes and  API calls data I created a  NodeJs Express server.

I utilized axios for my requests, i also made use of postman as a means of testing my routes were working.

When I had a working route and working request, i created a method on the front end in order to access it.



********* Challenges I faced and how I overcame them *****************

I find dealing with APIs to be very challenging, this is definitely a weak area for me, and attempting this assignment showed me that it is an area I really need to focus on. I did reading the documentation as well as running tests on my routes with Postman to see if the route worked as expected and if I was returning the expected data.

I tried to be ambitious and learned that there is a lot of growth needed in this area.


```

<b>Task</b>

Make use of the BreweryDB API to list breweries per country, provide a search field for them by name and filter/group them by country and by
type.

I created a page to list all the beers, from there the user can click on a name of beer and be redirected to a detail page for that beer.

I also created a page where I list all the breweries, and the user can search for a brewery by name, or filter the results out by country and type.

<br/>

<b>Screenshots:</b>

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061960/PXL-Assets/home.png" height="350px" />

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061950/PXL-Assets/home-desktop.png" />

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061955/PXL-Assets/breweries.png" height="350px" />

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061950/PXL-Assets/breweries-desktop.png" />

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061950/PXL-Assets/beers.png" height="350px" />

<img src="https://res.cloudinary.com/frankie-dev/image/upload/v1590061950/PXL-Assets/beers-desktop.png" />
