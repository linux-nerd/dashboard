# Dashboard

## Introduction

The dashboard is implemented using React, Typescript and Ant Design UI library.
It can be accessed here - https://dashboard-os0g.onrender.com/

### List of features

1. The data can be filtered globally based on the filters on the top
2. The selected filters are added to the query params and the dashboard can be shared with different people
3. High level details are showed in cards below the filters
4. Aggregated data in a tabular format, with sorting functionality on number fields
5. Chart showing gross sales per channel. There is an option to choose different value for the X-axis (Channel, ChannelGroup and Campaign)
6. The UI is responsive.

## Run locally

This repo consists of client and a server. The server needs to be created as the api endpoint provided does have CORS enabled. Inorder to run the app in local env, follow the following steps - 

- Run `npm i` on root
- Start the server by running `npm start`. This will spin up a server on port 3030
- Start the client by running `npm run serve`. This will serve the client app on port 3000
- To run the tests `npm test`