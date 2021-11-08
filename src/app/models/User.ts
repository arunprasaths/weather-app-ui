export interface User{
    FirstName: string,
    LastName: string,
    UserName: string,
    Password: string;
}

export interface JwtUser {
    UserName: string,
    Token: string,
    Name: string
}