// import the needed packages from the library
// tried to import them via es6, which didn't work well.
// http library to serve us URL files
const http = require("http")
// path library to triviliaze path finding for everywhere
const path = require("path");
// filesystem to write, read and prepare files for website display
const fs = require('fs');
 
//create a server const that will handle routing and response
const server = http.createServer((req, res) => {
    // Build file path to make sure where the files are.
    // use the __dirname variable to lead to the root folder of the project
    // use the public string to show where the files are located in the dir
    // use ternary conditionals to either post index.html or the requested url.
    let filePath = path.join(
        __dirname,
        "public",
        req.url === "/" ? "index.html":req.url
    );

    // Get the extension of the file
    let extname = path.extname(filePath);
    
    // we do not yet know what content type we have, no assigning of it.
    let contentType;

    // switch statement to make sure that we have dynamically recognize the content type
    switch (extname) {
        case ".html":
            contentType = "text/html";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".css":
            contentType = "text/css";
            break;
        // what if there is an html file without any ending?
        case "" && contentType == "text/html":
            filePath += ".html";
        // in case of missing 
        default:
            console.log("This filename needs to be added: " + extname);
            break;
    }
    console.log(filePath)

    //print the filePath given for debugging reasons:
    // read the given files for display, then call a function.
    fs.readFile(filePath, (err, content) => {
        // errors first
        if (err) {
            // no such file found, also known as "error no entry" from C days
            if (err.code == "ENOENT") {
                //page not found
                fs.readFile( 
                    path.join(__dirname, "public", "404.html"),
                    (err, content) => {
                        //report back to the client what status it receives
                        if (typeof(contentType) === "undefined") 
                        res.writeHead(404, { "Content-Type": "text/html"});
                        // serve the content in utf8
                        res.end(content, "utf8");
                    }
                );
            } else {
                // there was anothe error 
                res.writeHead(500);
                res.end(`We got a Server error which wasn't supposed to happen: ${err.code}`);
            }
        } else {
            // no errors and we can serve the files
            res.writeHead(200, {"Content-Type": contentType});
            res.end(content, "utf8");
        }
    });
});

// I want to try to establish a connection through the port 5000
// IF that doesn't work, it will look for another one, should be unchanging via code.
// or, if that really works, via injection
// Why did PORT not get included in the autocomplete?
const PORT = process.env.PORT || 3000;
//take a look what env content exists for later access.

server.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
