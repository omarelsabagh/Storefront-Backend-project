# Storefront Backend Project

## Getting Started

npm install  ---> to install all the dependancies

Port Number = 3000 

## instruction

-create a user.
-login the user to get token.
-put the token in the headers.
-now you can use the other routes to :
     =get the users list.
     =get one user with id.
     =add new product to DB.
     =get the products list.
     =get one product with id.
     =add new order to DB.
     =add products to an order.

# scripts to run the project

npm run migrate     -->  to run the migration and build the DB.
npm run build       -->  to compile the ts files into js in build directory.
npm run start       -->  to run the server in build mode through js files not ts.
npm run testing     -->  to run the Jasmine tests.
npm run watch       -->  to run the server and edit ts files in runtime without restarting the server.
npm run prettier    -->  to clean the code.
npm run lint        -->  to lint the code.


# Environment variables
POSTGRES_HOST=127.0.0.1 
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
BCRYPT_PASSWORD=my-bcrypt-password
SALT_ROUNDS=10
TOKEN_SECRET=my-secret-token
ENV=dev
PORT=3000

# Database Setup

# 1- Create Database through Postgres setup. ===========================================

  -CREATE DATABASE storefront;     //for dev database
   
  -CREATE DATABASE storefront_test   //for test database

# 2- Database Schema and structure. =================================================

 ===users table===

 CREATE TABLE users(
 id SERIAL PRIMARY KEY,
 username VARCHAR(50) NOT NULL,
 password VARCHAR(255) NOT NULL
 );

 # schema 
    user = {
    id: number;
    username: string;
    password: string;
            };

 ===products table=== 

 
CREATE TABLE products(
 id SERIAL PRIMARY KEY,
 name VARCHAR(50) NOT NULL,
 price INTEGER NOT NULL
 );

 # schema
 Product = {
    name: string;
    price: number;
       };

===orders table===

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id BIGINT REFERENCES users(id) NOT NULL
);

 # schema
 Order = {
    status: string;
    user_id: number;
};


=====orderproduct table (joint table between orders and products)=====

CREATE TABLE order_products(
quantity integer,
order_id BIGINT REFERENCES orders(id),
product_id BIGINT REFERENCES products(id)
 );

 # schema
Orderproduct = {
    quantity: number;
    order_id: string;
    product_id: string;
};


# 3- End Points. ===============================================================

 -you should be using the localhost base url : http://localhost:3000

 # users end-point
 ===========================================================
 http://localhost:3000/users

 - verb : POST

 - body : json
       {
        "username":"name",
        "password": "password"
       }

 - response : 
              {
              "message": "user added to DB successfully",
              "addedUser": {
                "id": 1,
                "username": "name",
                "password": "$2b$10$duia6T0SKzeNZl6Kd5EnA.v3lOfBA/WZba0BvkeJdiUiyyRtxd5Ou"
              }  
               }      

  - discreption: adding a new user to database.     
 ===========================================================
 http://localhost:3000/users/signin

 - verb: POST

 - body: json
       {
        "username":"name",
        "password": "password"
       }

 - response:
   {
    "message": "sign in success",
    "signeduser": {
        "id": 1,
        "username": "name",
        "password": "$2b$10$duia6T0SKzeNZl6Kd5EnA.v3lOfBA/WZba0BvkeJdiUiyyRtxd5Ou"
    },
    "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozMCwidXNlcm5hbWUiOiJBZGFzZGFzcyIsInBhc3N3b3JkIjoiJDJiJDEwJGR1aWE2VDBTS3plTlpsNktkNUVuQS52M2xPZkJBL1daYmEwQnZrZUpkaVVpeXlSdHhkNU91In0sImlhdCI6MTY2MDQzMTg2MX0.5YowyVMMPNjxRfw8Ntj83Ppb1gpxhCoFUQ1QBmSYUbk"
    }

- description: checking if the user is created, if yes returning a Token to 
   authraize this user to use the other routes

 ===========================================================

 http://localhost:3000/users

 - verb: GET

 - body: none
       {
       
       }
 - Headers:
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
   {
    "message": "get all users from DB successfully",
    "allUsers": [
        {
            "id": 1,
            "username": "name",
            "password": "$2b$10$eC4l7nXfkSxAT15541Uh/e93HB0jBQEvBqvR50f8l6TUPwM.NhxF2"
        }
                ]
     }           

- description: if autharized get all users from DB.

 ===========================================================
 http://localhost:3000/users/:id

 - verb: GET

 - body: none
       {
       
       }
 - params: id      //give the id for the user you want to show: http://localhost:3000/users/1 
 - Headers:
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
   {
    "message": "get one user from DB successfully",
    "oneUser": [
        {
            "id": 1,
            "username": "Omar",
            "password": "$2b$10$eC4l7nXfkSxAT15541Uh/e93HB0jBQEvBqvR50f8l6TUPwM.NhxF2"
        }
    ]
}        

- description: if autharized get spcefic user  from DB based on id.
 ===========================================================
 
 # products end-point

 ===========================================================
  http://localhost:3000/products

 - verb: POST

 - body: json
       {
       "name" : "Nokia",
       "price" : 2000
       }
 - params: none
 - Headers: 
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
   {
    "message": "product added to DB successfully",
    "addedProduct": [
        {
            "id": 1,
            "name": "Nokia",
            "price": 2000
        }
    ]
}    

- description: if autharized add new product to the DB.
 ===========================================================
 http://localhost:3000/products

 - verb: GET

 - body: none
       {
      
       }
 - params: none
 - Headers: 
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
   {
    "message": "get all products from DB successfully",
    "allProducts": [
        {
            "id": 1,
            "name": "Nokia",
            "price": 2000
        }
    ]
}

- description: if autharized get all products from DB.
 ===========================================================
 http://localhost:3000/products/:id

 - verb: GET

 - body: none
       {
      
       }
 - params: id          //give the id for the product you want to show: http://localhost:3000/products/1 
 - Headers: 
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
   {
    "message": "get one product from DB successfully",
    "oneProduct": [
        {
            "id": 1,
            "name": "Nokia",
            "price": 2000
        }
    ]
}

- description: if autharized get specefic product from DB based on id.

 # orders end-point
 ===========================================================
  http://localhost:3000/orders/:id

 - verb: POST

 - body: json
       {
       "status" : "active",
       }
 - params: id        //give the id for the user who added this order: http://localhost:3000/orders/1 
 - Headers: 
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
{
    "message": "order added to DB successfully",
    "added_order": [
        {
            "id": 1,
            "status": "active",
            "user_id": "1"
        }
    ]
}

- description: if autharized add a new order to DB.

# orderproducts end-point

 ===========================================================
  http://localhost:3000//orders/:id/products

 - verb: POST

 - body: json
       {
       "quantity" : 20,
       "productid" : "1"
       }
 - params: id  //give id for the order you want to add products to: http://localhost:3000/orders/1/products 
 - Headers: 
   key:authorization
   vaule: Bearer <Token>      //Bearer then normal space then the token from the signin in route.

 - response:
{
    "message": "product added to order successfully",
    "addedProduct": {
        "quantity": 20,
        "order_id": "1",
        "product_id": "1"
    }
}

- description: if autharized add products to specefic order through a third table in DB order_products.