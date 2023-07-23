function getAllUrlParams(url?: string): any {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                // @ts-ignore
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    // @ts-ignore
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    // @ts-ignore
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    // @ts-ignore
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                // @ts-ignore
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    // @ts-ignore
                    obj[paramName] = paramValue;
                    // @ts-ignore
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    // @ts-ignore
                    obj[paramName] = [obj[paramName]];
                    // @ts-ignore
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    // @ts-ignore
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}

export {
    getAllUrlParams
}