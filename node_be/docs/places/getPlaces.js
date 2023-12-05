module.exports = {
    // method of operation
    get: {
      tags: ["Places CRUD operations"], // operation's tag.
      description: "Get Placess", // operation's desc.
      operationId: "getPlacess", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Successful", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Todo", // Todo model
              },
            },
          },
        },
      },
    },
  };