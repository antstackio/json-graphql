# JSON to GraphQL Query / Mutation

Creating dynamic GraphQL queries can be quite cumbersome. This package addresses this problem and generates GraphQL syntax-based queries / mutation based on JSON data.

## Installation

Use the package manager npm to install the package


```bash
npm i <TBD>
```

## Usage

```nodejs
const { jsonToGrapqhQLMutation, jsonToGrapqhQLQuery } = require("<TBD>");

// sample JSON data for creating a mutation
const mutationDataSample = {...};

// sample JSON data for creating a query
const queryDataSample = {...}

// returns GraphQL Mutation
console.log(jsonToGrapqhQLMutation(mutationDataSample));

// returns GraphQL Query
console.log(jsonToGrapqhQLQuery(queryDataSample));

```
## Sample Data

### Json to GraphQL Mutation Input
```
{
  name: "myMutationName",
  tableName: "tableName",
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
}
```


### Json to GraphQL Mutation Output
```
mutation myMutationName {
  tableName(
    objects: {
      Book: [
        {
          Title: "ABCDEFGHIJKLMNOPQRSTUVWX"
          Price: 997.5
          ISBN: "ABCDEFGHIJKLMNOPQRSTUVWX"
          Genre: "ABCD"
          Author: [
            { FirstName: "ABCDEFGHIJKLM", Surname: "ABCDEFGHIJKLMNOPQRS" }
            { FirstName: "ABCD", Surname: "ABCDEFGHI" }
            {
              FirstName: "ABCDEFGHIJKLMNOPQRSTUVWXYZAB"
              Surname: "ABCDEFGHIJKLMNOPQRSTUVWXYZAB"
            }
            { FirstName: "ABCDEFGHIJ", Surname: "ABCDEFGHIJKLMNOPQRSTUVW" }
          ]
        }
        {
          Title: "ABCDEFGHIJKLMNO"
          Price: 115.25
          ISBN: "ABCDEFGHIJKLMNOPQRSTU"
          Genre: "ABCDEFGHIJKLMNOPQRSTUV"
          Author: [{ FirstName: "ABCDEFGH", Surname: "ABCDEFGH" }]
        }
      ]
    }
  ) {
    id1
    id2 {
      id21
      id22
    }
  }
}
```

### Json to GraphQL Query Input
```
{
  name: "myQueryName",
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
}
```

### Json to GraphQL Query Output
```
query myQueryName {
  item1
  item2 {
    item21
    item22 {
      item221
      item222 {
        item2221
        item2222
      }
    }
  }
  item3
}

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)