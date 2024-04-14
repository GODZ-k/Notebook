
# User Authentication Note Application

This is a simple full-stack note application with user authentication built using React, Express, MongoDB, and Node.js. Users can create, update, edit, and delete notes, as well as upload images. Twilio is used for SMS authentication of users, and Cloudinary along with Multer is used for image uploading.

### Features

* __User Authentication__ : Users can sign up, log in, and log out securely.
* __Note CRUD Operations__ : Users can create, read, update, and delete notes.
* __Image Upload__ : Users can upload images along with their notes, powered by Cloudinary and Multer.
* __Jwt authentication__ : Server will provide a access and refresh jwt token for identify the user identity on every request . 
* __SMS Authentication__ : Users can verify their identity using Twilio's SMS authentication.

### Technologies Used

* __Frontend__ : React
* __Backend__ : Express, Node.js
* __Database__ : MongoDB
* __Image Upload__ : Cloudinary, Multer
* __Authentication__ : Twilio , Jwt , bcrypt js

### Installation

#### 1. Clone the repository:

```bash
git clone https://github.com/GODZ-k/Notebook.git

```
#### 2. Install dependencies for both frontend and backend:

```bash
cd frontend 
npm install

cd ../backend
npm install

````

#### 3. Set up environment variables:

* Create a `.env` file in the backend directory.

* Define the following environment variables in the `.env` file:

```makefile

PORT=your_port
SECRET_KEY=your_secret_key
TOKEN_EXPIRY=token_expiry
REFRESH_TOKEN_SECRET_KEY=secret_key
REFRESH_TOKEN_EXPIRY=token_expiry
CORS_ORIGIN=origin
MONGODB_URI=your_mongodb_uri
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

#### 4. Run the application:

```bash 

# Run the backend server
cd backend
npm run dev

# Run the frontend server
cd ../frontend
npm run dev

```

 __5__. Open your browser and navigate to `http://localhost:3000` to view the application backend for frontend `http://localhost:5173` .

### Usage
* Sign up or log in to your account.
* Create, update, edit, or delete notes as desired.
* Upload images along with your notes.
* Verify your identity using SMS authentication if prompted.

### Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.