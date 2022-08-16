# Got Next

**Summary**
| Field | Detail |
|-------|--------|
| Project Name | Got Next |
| Description | An app created in React Native for finding local pick-up games (PUGs) and connecting with other players. |
| Developers | [Cheryl](https://github.com/chess2022) |
| Live Website | none yet |


## User Stories

List of stories users should experience when using your application.

- As a user, I can enter a location and find nearby basketball courts.
- As a user, I can get directions to a nearby court.
- As a user, I can signup/login to access content.
- As a user, I can chat with friends through the app to organize a game.
- As a user, I can have multiple chat topics to chat with different groups.
- As a user, I can logout.
- As a user, I can delete my account.

## List of technologies used

- Expo React Native
- Javascript
- Firebase
- Google Maps


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

## User Interface Mockups

#### Initial Page
![Welcome](/app/assets/screenshots/welcome.png)

### Signin/Signup
![Signin](/app/assets/screenshots/signin.png.png)
![PUG Screen](/app/assets/screenshots/signup.png)

### Account
![Account](/app/assets/screenshots/account.png)

### Map
![Map](/app/assets/screenshots/map.png)

### Chat
![Topic List](/app/assets/screenshots/topic_list.png)
![Chat Detail](/app/assets/screenshots/chat_detail.png)







