# Life Calendar
CS465P Final Project

Life Calendar (somewhat ironically) is a form of death clock that allows users to enter certain demographic information after logging in. The information is saved to a database so the user need not enter it on return visits. The app will use the information provided to calculate the average lifespan of the user in weeks and display a grid of boxes where each box represents one week. Filled boxes represent weeks past and empty boxes represent weeks future. The user will be able to make adjustments to their data and the app will adjust to reflect that.

Life Calendar hopes to give users an accurate scale of their life, for better or worse.

<!-- If you are experiencing depression or have thoughts about ending your life please call the National Suicide Prevention Lifeline at 1-800-273-TALK (8255). -->

# Installation
Before getting started, make sure you have `docker` installed. You can find instructions on how to install docker [here](https://www.docker.com/).
You will also need to have `Node v16.x` or newer installed on your system.

Clone this repo and navigate to the top-level directory.

From here, run:
```sh
docker compose up
```

From a web browser, navigate to [http://localhost:3000](http://localhost:3000)

# Team Members
|Frontend Lead|Backend Lead|DevOps Lead|
|---|---|---|
|Sean Humm|Logan Peticolas|James Ressler|

# Contributing
To contribute to this project, fork the repo, clone your fork, and create a new branch for the feature or bug you intend to work on. For more information, see our [coding style requirements](./CONTRIBUTING.md).

## Branch naming conventions:
### Format
```lc-<developer>-<component>-<issue>```

### Developer Options
|Developer Name|Convention|
|---|---|
|James Ressler|`jress`|
|Sean Humm|`shumm`|
|Logan Peticolas|`lpeti`|

### Component Options
|Component Name|Convention|
|---|---|
|UI/UX|`ui`|
|Database|`db`|
|Test Suite|`test`|
|Frontend|`front`|
|Backend|`back`|

### Description Example
|Example Description|Example Convention|
|---|---|
|Adding a button to toggle dark mode|`darkmodebutton`|

### Issue Options
|Issue Name|Convention|
|---|---|
|Feature|`feat`|
|Bug|`bug`|
