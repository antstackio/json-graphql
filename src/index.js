const convertToGraphql =(data,graphQlQuery,syntaxType)=>{
    const dataTypeQueryAdder = (value,graphQlQuery,syntaxType)=>{
        if (typeof value == "string"){
            if (syntaxType == "returnValues")
                return `${value} `
            else
                return `"${value}" `
        }
        else if (typeof value == "number" || typeof value == "boolean")
            return `${value} `
        else if (Array.isArray(value)){
            let queryData = ""
            if (typeof value[0]== "string"){
                if (syntaxType == "returnValues"){
                    value.forEach(element=>{
                        queryData+= `${element} `
                    }) 
                }else{
                    value.forEach(element=>{
                        queryData+= `"${element}" `
                    })
                }
            }
            else{
                value.forEach(element=>{
                    if (typeof element == "object"){
                        queryData+="{"
                        for (key in element) queryData+=`${key}:${dataTypeQueryAdder(element[key],graphQlQuery,syntaxType)}`
                        queryData+="}"
                    }  
                }) 
            }
            if (syntaxType != "returnValues")
                queryData = "["+ queryData +"]"
            
            return queryData 
        }
        else if (typeof value == "object"){
            if (syntaxType=="returnValues")
                return `${convertToGraphql(value,"",syntaxType)} `
            else
                return `{${convertToGraphql(value,"",syntaxType)}} `
        }
            
        else if (typeof value == undefined)
            return null
        else
            return `${value} `
    }
    for (key in data){
        if (syntaxType == "returnValues"){
            if (Array.isArray(data[key]) )
                graphQlQuery+=`${key} {${dataTypeQueryAdder(data[key],graphQlQuery,syntaxType)}}`
            else
                graphQlQuery+=`${dataTypeQueryAdder(data[key],graphQlQuery,syntaxType)}`
        }
        else if (data[key] != undefined)
            graphQlQuery+=`${key}:${dataTypeQueryAdder(data[key],graphQlQuery)}`
    }
    return graphQlQuery
}




const jsonToGrapqhQl=(data)=>{
    return `${data.type} ${data.name} { ${data.tableName} (${convertToGraphql({objects:data.jsonData},"")}){${convertToGraphql(data.returnValues,"","returnValues")}}}` 
}