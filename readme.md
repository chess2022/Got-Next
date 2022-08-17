# Got Next

### When my oldest moved to Seattle, he didn't know where to go to play a pick-up game. He thought it would be great to have an app to find all the places nearby he could play. This app was created as a simple solution to his idea. 
#### Currently working on iOS only

**Summary**
| Field | Detail |
|-------|--------|
| Project Name | Got Next |
| Description | An app created in React Native for finding local pick-up games (PUGs) and connecting with other players. |
| Developers | [Cheryl](https://github.com/chess2022) |
| Live Website | none yet |


## User Stories

List of stories users should experience when using your application.

- As a user, I can signup/login to access content.
- As a user, my location is detected so nearby courts are displayed right away.
- As a user, I can click on any pinned spot on the map and find the court address.
- As a user, I can enter a location and find basketball courts in other locations.
- As a user, I can chat with friends through the app to organize a game.
- As a user, I can have multiple chat topics to chat with different groups.
- As a user, I can logout.
- As a user, I can update my account name and photo.

## List of technologies used

- Expo React Native
- Javascript
- Firebase Auth
- Firestore
- Google Maps APIs


## ERD
![ERD](/app/assets/erd.png)


## Component Architecture

```mermaid
flowchart LR
App-->Index
Index-->AuthStack
Index-->UserStack
AuthStack-->Welcome
AuthStack-->SignIn
AuthStack-->SignUp
UserStack-->TabBarNav
TabBarNav-->FindPUGs
TabBarNav-->ProfileStack
ProfileStack-->AccountScreen
ProfileStack-->AccountUpdate
TabBarNav-->ChatStack
ChatStack-->ChatHome
ChatStack-->AddChat
ChatStack-->ChatDetail
```

## Screenshots

#### Initial Page
![Welcome](/app/assets/screenshots/welcome.png)

### Signin/Signup
![Sign In](/app/assets/screenshots/signin.png)
![Sign Up](/app/assets/screenshots/signup.png)

### Account
![Account](/app/assets/screenshots/account.png)

### Map
![Map](/app/assets/screenshots/map.png)

### Chat
![Topic List](/app/assets/screenshots/topic_list.png)
![Chat Detail](/app/assets/screenshots/chat_detail.png)







