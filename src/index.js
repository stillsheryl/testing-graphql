// the file to boot up the server.
// In this file we set up the startup script by importing our server and listening on a port.

const app = require("./server");

const port = process.env.PORT || "4000";

app.listen(port);

console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
