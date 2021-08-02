# Final Assignment - TODO Project
Goal: Implement a TODO web application from scratch, including a backend with in-memory datastore and front a web UI.

## TODO JSON Model
The data that gets POSTed to the server and retuned in GETs should have this structure:

{
	id: unique ID per entry
	dateTime: ISO Date Time strting
	description: the actual TODO content
}

## Backend
The TODO app will use a Node.js Express server as its backend. This standalone server should provide the following routes:

POST /todo
Adds a new TODO
Parameters: JSON TODO model, ID should be assigned by the server
Response: status code

GET /todo
List all TODOs
Parameters: None
Response: array of TODOs

DELETE /todo/id
Delete a specific TODO
Parameters:
Response: status code

GET /
Serve frontend index.html

Enable CORS support in Express.js
Use an in-memory data structure to store TODOs
No authentication required

## Frontend
The web UI for the TODO app must include an input form to add new TODOs. Only the description is required as IDs and date/time should be assigned upon creation.
In addition to adding new items, all existing TODOs must be listed. Each item should display its date/time and description, with a delete button on top. A data attribute should be used to store the ID. Clicking the delete button causes the TODO item to be removed. All API calls must be performed client-side, with no form submission.

- Input form for TODO content
- Button to add TODO
- List of TODOs
- Presentation of each TODO content with date and delete button
- Clicking delete button should remove a TODO
- Frontent should call Backend via Ajax/XHR/Fetch

# Tips
- Use the server's own memory to store TODOs (array of TODO objects)
- Use JSON middleware to automatically parse JSON body: https://expressjs.com/en/api.html#express.json
- Use CORS middleware: https://www.npmjs.com/package/cors
- Start with the backend and test API calls with Insomnia or Postman