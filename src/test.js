
const { jsonToGrapqhQLMutation, jsonToGrapqhQLQuery } = require("./index.js");

const mutationDataSample = {
  name: "myMutation",
  tableName: "table1",
  returnValues: [
    "id1",
    {
      id2: ["id21", "id22"],
    },
  ],
  jsonData: {
    Book: [
      {
        Title: "ABCDEFGHIJKLMNOPQRSTUVWX",
        Price: 997.5,
        ISBN: "ABCDEFGHIJKLMNOPQRSTUVWX",
        Genre: "ABCD",
        Author: [
          {
            FirstName: "ABCDEFGHIJKLM",
            Surname: "ABCDEFGHIJKLMNOPQRS",
          },
          {
            FirstName: "ABCD",
            Surname: "ABCDEFGHI",
          },
          {
            FirstName: "ABCDEFGHIJKLMNOPQRSTUVWXYZAB",
            Surname: "ABCDEFGHIJKLMNOPQRSTUVWXYZAB",
          },
          {
            FirstName: "ABCDEFGHIJ",
            Surname: "ABCDEFGHIJKLMNOPQRSTUVW",
          },
        ],
      },
      {
        Title: "ABCDEFGHIJKLMNO",
        Price: 115.25,
        ISBN: "ABCDEFGHIJKLMNOPQRSTU",
        Genre: "ABCDEFGHIJKLMNOPQRSTUV",
        Author: [
          {
            FirstName: "ABCDEFGH",
            Surname: "ABCDEFGH",
          },
        ],
      },
    ],
  },
};

const queryDataSample = {
    name: "myQuery",
  jsonData: [
    "item1",
    {
      item2: [
        "item21",
        {
          item22: [
            "item221",
            {
              item222: ["item2221", "item2222"],
            },
          ],
        },
      ],
    },
    "item3",
  ],
};

console.log(jsonToGrapqhQLMutation(mutationDataSample));

console.log(jsonToGrapqhQLQuery(queryDataSample));
