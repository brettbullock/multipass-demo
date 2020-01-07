# multipass-demo
A single page demo app that walks through multipass functionality.

The app is currently running at multipass-demo.herokuapp.com and is deployed from the master branch.

## Running Locally
To run the app locally, clone the branch, and make the following changes:

- ~/index.js
uncomment lines 11, 26-28
comment out lines 13, 20-23

- ~/client/src/components/Main.js
prepend `http://localhost:4000` to the urls passed as function arguments on lines 35, 96, and 100

~/models/user.model.js
uncomment line 43
comment out line 45

~/routes/users.route.js
uncomment line 18
comment out line 20

You'll then need to install the dependencies by running `yarn install` in your terminal.

From there, create a folder in the root (`~/`) folder of the project named `config`, and a file within the folder named `default.json`. In the `default.json` file, include the following: 
`
{
  "myprivatekey": "<YOUR_PRIVATE_KEY>",
  "multipasskey": "<YOUR_MULTIPASS_KEY>"
}
`

Where `<YOUR_PRIVATE_KEY>` is a secret string defined by you and `<YOUR_MULTIPASS_KEY>` is the multipass key generated from the store in which you will be authenticating to. To get this string, follow step 1 of the instructions here: https://help.shopify.com/en/api/reference/plus/multipass

To be continued...
