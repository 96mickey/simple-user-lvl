## Manual

In the "config" folder put the following in default.json

```json
{
  "dbUrl": "mongodb://localhost/userlvl",
  "secret": "shhh"
}
```

To start the server, first install the dependencies by runing 
`npm i`

Then start the server by running
`npm start`

While signup add an email and type.
type could be of 4 types, namely
1. superadmin
2. admin
3. teacher
4. student

Password will be generated on server and will be sent as response. In production, it should be sent on email.

Expected JSON for signup, 
send a `POST` request at 

http://localhost:3005/api/user/register

```json
{
  "email": "abc@xyz.com",
  "type": "teacher"
}
```

Use this password to sign in to this system,
send a `POST` request at

http://localhost:3005/api/user/login

```json
{
  "email": "abc@xyz.com",
  "password": "password sent you while sign up"
}
```

Once you are logged in,
There are four routes to explore.

send a `GET` request at 

http://localhost:3005/api/user/teacher  

http://localhost:3005/api/user/student  

http://localhost:3005/api/user/admin  

http://localhost:3005/api/user/superadmin


