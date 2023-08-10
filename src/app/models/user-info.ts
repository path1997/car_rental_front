export class AuthenticateUser{
  jwt: string
  userInfoResponse: UserInfo


  constructor(jwt: string, userInfoResponse: UserInfo) {
    this.jwt = jwt;
    this.userInfoResponse = userInfoResponse;
  }
}


export class UserInfo{
  id: number
  username: string
  email: string
  roles: Array<string>

  constructor(id: number, username: string, email: string, roles: Array<string>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }
}
