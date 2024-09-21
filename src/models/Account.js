export class Account {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.picture = data.picture;
    // TODO add additional properties if needed
    this.bio = data.bio
    this.coverImg = data.coverImg
    this.resume = data.resume
    this.github = data.github
    this.linkedin = data.linkedin
    this.graduated = data.graduated
    this.singUpAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.class = data.class
  }
}

const data = {
  "_id": "66d902cf80b190bb9d97825d",
  "subs": [
    "auth0|66d902cec43e43682549055f"
  ],
  "email": "woahheyv2@ioknow.com",
  "name": "woahheyv2",
  "picture": "https://s.gravatar.com/avatar/1eaaf90059e2ea4fd3aa4313077ec066?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fwo.png",
  "bio": "",
  "coverImg": "https://images.unsplash.com/photo-1586829135343-132950070391?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80",
  "github": "",
  "linkedin": "",
  "resume": "",
  "class": "",
  "graduated": false,
  "createdAt": "2024-09-05T01:01:11.060Z",
  "updatedAt": "2024-09-05T01:01:11.060Z",
  "__v": 0,
  "id": "66d902cf80b190bb9d97825d"
}