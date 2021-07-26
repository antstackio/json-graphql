const convertToGraphQL = (data, graphQLQuery, syntaxType) => {
  const dataTypeQueryAdder = (value, graphQLQuery, syntaxType) => {
    if (typeof value == "string") {
      if (syntaxType == "returnValues") return `${value} `;
      else return `"${value}" `;
    } else if (typeof value == "number" || typeof value == "boolean")
      return `${value} `;
    else if (Array.isArray(value)) {
      let queryData = "";
      if (syntaxType == "returnValues") {
        value.forEach((element) => {
          if (typeof element == "string") queryData += ` ${element} `;
          else {
            queryData += `${dataTypeQueryAdder(
              element,
              graphQLQuery,
              syntaxType
            )}`;
          }
        });
      } else {
        if (typeof value[0] == "string") {
          value.forEach((element) => {
            queryData += `"${element}" `;
          });
        } else {
          value.forEach((element) => {
            if (typeof element == "object") {
              queryData += "{";
              for (key in element)
                queryData += `${key}:${dataTypeQueryAdder(
                  element[key],
                  graphQLQuery,
                  syntaxType
                )}`;
              queryData += "}";
            }
          });
        }
      }

      if (syntaxType != "returnValues") queryData = "[" + queryData + "]";

      return queryData;
    } else if (typeof value == "object") {
      if (syntaxType == "returnValues")
        return ` ${convertToGraphQL(value, "", syntaxType)} `;
      else return `{${convertToGraphQL(value, "", syntaxType)}} `;
    } else if (typeof value == undefined) return null;
    else return `${value} `;
  };
  for (key in data) {
    if (syntaxType == "returnValues") {
      if (Array.isArray(data[key]))
        graphQLQuery += `${key} {${dataTypeQueryAdder(
          data[key],
          graphQLQuery,
          syntaxType
        )}}`;
      else
        graphQLQuery += ` ${dataTypeQueryAdder(
          data[key],
          graphQLQuery,
          syntaxType
        )}`;
    } else if (data[key] != undefined)
      graphQLQuery += `${key}:${dataTypeQueryAdder(data[key], graphQLQuery)}`;
  }
  return graphQLQuery;
};

const jsonToGrapqhQLMutation = (data) => {
  return `mutation ${data.name} { ${data.tableName} (${convertToGraphQL(
    { objects: data.jsonData },
    ""
  )}){${convertToGraphQL(data.returnValues, "", "returnValues")}}}`;
};
const jsonToGrapqhQLQuery = (data) => {
  return `query ${data.name} {${convertToGraphQL(data.jsonData, "", "returnValues")}}`;
};

module.exports = {
  jsonToGrapqhQLMutation: jsonToGrapqhQLMutation,
  jsonToGrapqhQLQuery: jsonToGrapqhQLQuery,
};
