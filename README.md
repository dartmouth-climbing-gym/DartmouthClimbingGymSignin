# Dartmouth Climbing Gym Signin Website
This repository houses code for the dartmouth climbing gym's signin tracking system. The site can be broken into 3 main parts: the Signin Page, the Monitor Page, and the OPO page. We describe the function's and code of each portion below. The tech stack of the website is a pure HTML/CSS/JS frontend which connects to a Firebase backend. All javascript functions are housed in [main.js](main.js), and all styling is done in [style.css](style.css).

## Signin Page
This is the climber-facing portion of the site. The main function is to allow climbers to sign in/out of the gym, however it also interfaces with other user facing compenents such as the waiver page and the public count. The main signin page consists of an html form which takes the climber's netid/email as an input and calls the signinsignout function when submitted.

#### Waiver
This page displays a waiver/liability text for the climber and contains a form at the bottom for the climber to enter their netid, name, and dartmouth affiliation (ie undergaduate or community member). When submitted the form calls signwaiver to generate the climber's account. All climbers must sign the waiver with valid details before they're able to sign in.

#### Count
This page displays the current total of climbers in the gym in addition to how long each climber has been signed in for (although it does not display the climber's names). This data is gathered from the public collection in the firebase backend which does not require admin signin to acess.

Key Functions:
- signinsignout()
  - Checks whether a climber has signed the waiver and if they have a term pass or day pass. If so, then signs them in if they aren't already signed in, or signs them out if they are already signed in.
- adminsignin()
  - Signs into the dartmouthclimbinggym@dartmouth.edu firebase account to allow the webpage to edit the proper fields (necessary for the signin and waiver pages to protect user info).
- signwaiver()
  - Generates/updates a document in the users collection of the database with the entered information. Additionally, if the user is an undergrad, checks to ensure the netid is a valid netid patter.
- settablecount()
  - Fetches current public signin information and updates the table in count.html.

## Monitor Page
This is the monitor-facing portion of the site. The page consists of two portions: first, a table describing which climbers are signed in, and how long they've been climbing, and second, a form to approve climbers as having a term/day pass.

Key Functions:
- signout_all()
  - Signs out all signed-in climbers. This function is called when the signout all button below the table is pressed.
- addpayinguser()
  - Marks a climber as having a term pass or creates a day pass for the climber depending on what option the monitor has selected. The climber must have filled out a waiver before this function is called.
- settable()
  - Fetches the current full signin information and updates the climber table.

## OPO Page
This is the opo/manager-facing portion of the site. The page consists of two portions: first, a list describing which climbers have been approved by monitors as having a term pass with checkmarks indicating whether or not this has been crosschecked by an OPO employee. The second portion is the download signin logs button which generates a csv of every gym signin and downloads it.

Key Functions:
- setopotable()
  - Fetches all climbers who are approved by monitors as having a term pass and displays their current OPO approval status.
- downloadcsv()
  - fetches all stored signin/out events and generates a csv with the netid and time of each event.

# Deployment
The site is hosted via firebase, and can be deployed using the firebase CLI following the steps outlined on [firebase's website](https://firebase.google.com/docs/hosting/manage-hosting-resources). Before deploying to production, make sure to change the collection references in [main.js](main.js) to the production versions as follows:
```
const USAGE_LOG_REF = "usage_log";
const PUBLIC_REF = "public";
const USERS_REF = "users";
``` 
To deploy a beta version for testing, first change the collection references in [main.js](main.js) to the test versions as follows:
```
const USAGE_LOG_REF = "usage_log_test";
const PUBLIC_REF = "public_test";
const USERS_REF = "users_test";
```
Then, follow the steps for deploying a [preview channel in firebase](https://firebase.google.com/docs/hosting/manage-hosting-resources).