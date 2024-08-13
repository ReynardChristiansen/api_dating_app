
# Dating App Api

The Dating App API offers a comprehensive set of endpoints for managing user information. This API allows users to register, log in, update their profile, delete their account, add other users to their "likes" list, and fetch user data.


## Features

- Register User (POST): https://api-dating-app.vercel.app/api/users/register

- Login User (POST): https://api-dating-app.vercel.app/api/users/login

- Get All Users (GET): https://api-dating-app.vercel.app/api/users

- Get User by Id (GET): https://api-dating-app.vercel.app/api/users/{id}

- Update User (PATCH): https://api-dating-app.vercel.app/api/users/{id}

- Delete User (DELETE): https://api-dating-app.vercel.app/api/users/{id}

- Like User by Id (PATCH): https://api-dating-app.vercel.app/api/users/addLike/{id}



## Request Body

Updating and Register a user require a request body in the following format:

    {
            "user_name": "STRING",
            "user_password": "STRING",
            "user_dob": "STRING",
            "user_gender": "STRING",
            "user_age": "STRING",
            "user_image": "STRING",
            "user_role": "STRING",
            "user_location": "STRING",
            "user_like": []
    }

Login a user require a request body in the following format:

    {
            "user_name": STRING,
            "user_password": STRING,
    }


Like user by id require a request body in the following format:

    {
            "user_id" : "STRING"
    }


## Feedback

If you have any feedback, please reach out to me at reynard.satria@gmail.com


