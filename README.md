# Moon Raider: "Quick" start

### 1: Clone repository from GitHub

 - Create a private and public SSH keypair using PuTTYgen (cursor position for randomness)
 - Upload public key to GitHub in format "ssh-rsa <key with line breaks removed>"
 - Use SSH URL from GitHub, open GitExtensions and select "Clone Repository"
 - Paste SSH URL into GitExtensions and click Clone, which will ask for our private key
	
### 2: Install dependencies

 - Install NodeJS using the installer on their website (this allows us to run JavaScript directly on our local machine rather than just in a browser. Navigate to a file in command prompt and type `node <filename.js>` to try it out)
 - This installation includes npm; Node Package Manager. All the packages in npm are listed at http://npmjs.com/. In the root directory of the GitHub repository there's a `package.json` file which specifies a list of dependencies which we need before we can compile our typescript files
- Navigate to the directory containing `package.json` in command prompt and run `npm install`. This looks at the package.json file and downloads any dependencies, and places them in a `node_modules` folder

### 3: Compiling TypeScript (.ts) files using "gulp"

 - Now we have our dependencies, we need to use gulp to compile our .ts files. Firstly install gulp from the command line by running `npm install gulp -g`. This installs the gulp package globally (due to the `-g` flag) which means we'll be able to run it from the command line in any directory.
 - Make sure you're in the folder containing `gulpfile.js` and run `gulp` from the command line 
 - This should create a `dist` folder containing `global.js` - this is our compiled JavaScript 
 - Open `index.html` in a web browser - you should see moon raider running. Note that `index.html` references `dist/global.js`
 - Left-click to accelerate and spacebar to shoot 
