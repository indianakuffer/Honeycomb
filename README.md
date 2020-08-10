# Buoy

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Challenges](#challenges)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

**Buoy** is a social app in which users journal their thoughts and anonymously cast them out to 'sea' for others to view. Users can choose the color of their thought to represent how they're feeling, and give their thought any helpful tags. While at sea, a user can watch the anonymous thoughts of others drift by based on color, tag, or location. Buoy aims to remove showmanship and clout from social media while encouraging users to be empathetic and open about their emotions.

<br>

## MVP

The **Buoy** MVP will provide frontend user account creation, deletion, and updating. Users will be able to write, view, and delete thoughts, with a separate screen for viewing the thoughts of others. User account information, thoughts, colors, and tags will be stored on a Ruby on Rails backend.

<br>

### Goals

- _Ruby on Rails backend for storing user info, thought info, colors, tags, and likes._
- _Frontend user account management (full CRUD)._
- _User can create, customize, and delete thoughts (CRD)._
- _Screen showing thoughts of other users._

<br>

### Challenges

- _Buoy's data requires more complex relationships than I've made before._
- _Creating a strong visual design._
- _Implementing location for thoughts, and filtering sea of thoughts based on user location._

<br>

### Libraries and Dependencies


|     Library      | Description                                |
| :--------------: | :----------------------------------------- |
|      Rails       | Web app framework used for the restful API backend. |
|      Rack-Cors   | Cross-Origin Resource Sharing support for Rails. |
|      Pry-Rails   | Replace Rails console default IRB with Pry. |
|      React       | Frontend framework. |
|      Axios       | Promise based HTTP client for the browser and Node.js. |
|   React Router   | Routing for frontend. |
|Styled Components | Styling management for React components.   |
|   React Spring   | Physics-based animation library for React. |

<br>

### Client (Front End)

#### Wireframes

<details>
<Summary>Full Wireframe</Summary>

![Buoy - Full](https://i.imgur.com/pgOf8US.png)
</details>

<details>
<Summary>Landing</Summary>

![Buoy - Landing](https://i.imgur.com/3ApTugn.png)
</details>

<details>
<Summary>Login</Summary>

![Buoy - Login](https://i.imgur.com/H5m3C4x.png)
</details>

<details>
<Summary>Register</Summary>

![Buoy - Register](https://i.imgur.com/medHXAE.png)
</details>

<details>
<Summary>Account Details</Summary>

![Buoy - Account Details](https://i.imgur.com/sHb87rB.png)
</details>

<details>
<Summary>Account Edit</Summary>

![Buoy - Account Edit](https://i.imgur.com/ugZ8cmo.png)
</details>

<details>
<Summary>Create Thought</Summary>

![Buoy - Create Thought](https://i.imgur.com/V5eGwfk.png)
</details>

<details>
<Summary>Thoughts</Summary>

![Buoy - Thoughts](https://i.imgur.com/EakPflI.png)
</details>

<details>
<Summary>Sea</Summary>

![Buoy - Sea](https://i.imgur.com/uyVMeXN.png)
</details>

[Full Album](https://imgur.com/a/gxED2hg)

<br>

#### Component Tree

![Component Tree](https://i.imgur.com/OT8BbAw.png)
> Dashed lines indicate shared components

<br>

#### Component Hierarchy


``` structure

src
|__ App.jsx
|__ screens/
      |__ Landing.jsx
      |__ Login.jsx
      |__ Register.jsx
      |__ AccountDetails.jsx
      |__ AccountEdit.jsx
      |__ CreateThought.jsx
      |__ Thoughts.jsx
      |__ Sea.jsx
|__ components/
      |__ Header.jsx
      |__ Nav.jsx
      |__ NavMenu.jsx
      |__ SearchBar.jsx
      |__ shared/
            |__ Button.jsx
            |__ Input.jsx
            |__ ProfilePic.jsx
            |__ Popup.jsx
            |__ ThoughtListing.jsx
|__ services/
      |__ api-config.js
      |__ auth.js
      |__ users.js
      |__ thoughts.js
      |__ likes.js
      |__ tags.js
      |__ colors.js

```

<br>

#### Component Breakdown

> _All components are functional components._

|    Component    | state | props | Description                                                      |
|  :----------:   | :---: | :---: | :--------------------------------------------------------------- |
| App             |   y   |   n   | _Renders the Header and handles routing. Keeps state for UserInfo and UserThoughts._|
| Landing         |   n   |   y   | _Splash page pre-login/registration. Does not show if site visited with valid JWT._|
| Login           |   y   |   y   | _Form for logging in. Redirects to Sea upon successful login._|
| Register        |   y   |   y   | _Form for registration. Redirects to CreateThought on successful registration._|
| AccountDetails  |   n   |   y   | _Shows basic account info with link to AccountEdit and button for account deletion._|
| AccountEdit     |   y   |   y   | _Form for updating account info._|
| CreateThought   |   y   |   y   | _Form for creating new thoughts. Adds to UserThoughts state of App._|
| Thoughts        |   n   |   y   | _Shows reverse-chronological list of user's thoughts. Ability to delete thoughts. Pulls info from UserThoughts state of App._|
| Sea             |   y   |   y   | _Shows a feed of user thoughts, filterable by color, location, and tag._|
| Header          |   n   |   y   | _Header renders Nav, NavMenu, and SearchBar when needed._|
| Nav             |   y   |   y   | _Render user icon and login/register/logout links.._|
| NavMenu         |   n   |   y   | _Links for navigating Buoy._|
| Button          |   n   |   y   | _Shared button with props for onClick, Link, color, content, etc._|
| Input           |   n   |   y   | _Shared input with props for name, type, placeholder, etc._|
| ProfilePic      |   n   |   y   | _Shared icon displays user icon from UserInfo state of App._|
| Popup           |   n   |   y   | _Shared popup for user alerts with props for content, color, button, etc._|
| ThoughtListing  |   n   |   y   | _Shared component for showing a thought with props for thought content, info, etc._|

<br>

#### Time Estimates

> Use this section to estimate the time necessary to build out each of the components you've described above.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Add Contact Form    |    L     |     3 hrs      |     2 hrs     |    3 hrs    |
| Create CRUD Actions |    H     |     3 hrs      |     1 hrs     |     TBD     |
| TOTAL               |          |     6 hrs      |     3 hrs     |     TBD     |

> _Why is this necessary? Time frames are key to the development cycle. You have limited time to code your app, and your estimates can then be used to evaluate possibilities of your MVP and post-MVP based on time needed. It's best you assume an additional hour for each component, as well as a few hours added to the total time, to play it safe._

<br>

### Server (Back End)

#### ERD Model

![Buoy ERD](https://i.imgur.com/7d95EQG.png)

***

## Post-MVP

> Ideas I've had that would be fun (or necessary) for my Post-MVP.

- Custom user icons to select from.
- Email verification.
- Forgot password feature.

***

## Code Showcase

> A brief code snippet of functionality that I'm proud of and a brief description.

## Code Issues & Resolutions

> A of all major issues encountered and their resolution.
