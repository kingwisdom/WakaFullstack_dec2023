module.exports = {
  //Open Api
    openapi: "3.0.3", // present supported openapi version
    info: {
      title: "Waka API", // short title.
      description: "Public places direction in major cities API", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "ProductDrive", // your name
        email: "vegiorder@gmail.com", // your email
        url: "web.com", // your website
      },
    },

    //Servers
    servers: [
        {
          url: "http://localhost:5000", //url
          description: "Host", // name
        },
      ],

      //Tags
      tags: [
        {
          name: 'Places'
        },
      ],

      //Components/Schemas
      components: {
        schemas: {
          // id model
          id: {
            type: "string", // data type
            description: "An id of a todo", // desc
            example: "tyVgf", // example of an id
          },
          // todo model
          Todo: {
            type: "object", // data type
            properties: {
              id: {
                type: "string", // data-type
                description: "Todo identification number", // desc
                example: "ytyVgh", // example of an id
              },
              title: {
                type: "string", // data-type
                description: "Todo's title", // desc
                example: "Coding in JavaScript", // example of a title
              },
              completed: {
                type: "boolean", // data type
                description: "The status of the todo", // desc
                example: false, // example of a completed value
              },
            },
          },
          // Todo input model
          TodoInput: {
            type: "object", // data type
            properties: {
              title: {
                type: "string", // data type
                description: "Todo's title", // desc
                example: "Coding in JavaScript", // example of a title
              },
              completed: {
                type: "boolean", // data type
                description: "The status of the todo", // desc
                example: false, // example of a completed value
              },
            },
          },
          // error model
          Error: {
            type: "object", //data type
            properties: {
              message: {
                type: "string", // data type
                description: "Error message", // desc
                example: "Not found", // example of an error message
              },
              internal_code: {
                type: "string", // data type
                description: "Error internal code", // desc
                example: "Invalid parameters", // example of an error internal code
              },
            },
          },
        },
      },

      //=============================Places CRUD =============================================//

      //Get Places
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