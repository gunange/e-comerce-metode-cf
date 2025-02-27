
export function errorHeandlersMessage(response: any) {
    let detailMessge;
    let summaryMessge;
    if (response.message && !response.errors) {
       detailMessge = response.message;
       summaryMessge = response.message;
    } else if (response.errors && typeof response.errors === "string") {
       summaryMessge = response.message ?? "Error";
       detailMessge = response.errors;
    } else if (response.errors && typeof response.errors === "object") {
       summaryMessge = response.message ?? "Error";
 
       if (Array.isArray(response.errors)) {
          detailMessge = response.errors
             .map((error) =>
                typeof error === "object" &&
                "path" in error &&
                "message" in error
                   ? `error field ${(error.path as string[]).join(".")} [${
                        error.message
                     }]`
                   : "Unknown error"
             )
             .join(",\n");
       } else {
          const allErrors = Object.values(response.errors)
             .flat()
             .map((error) =>
                typeof error === "object" &&
                "path" in error &&
                "message" in error
                   ? `error field ${(error.path as string[]).join(".")} [${
                        error.message
                     }]`
                   : "Unknown error"
             )
             .join(",\n");
 
          detailMessge = allErrors;
       }
    }

    const errors =  detailMessge;
 
    return { summaryMessge, errors };
 }