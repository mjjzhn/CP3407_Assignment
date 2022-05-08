# CP3407_Assignment

Please put your name here: 
- Ung Ta Hoang Tuan 
- Nguyen Hoang Anh
- Dang Nhat Quang
- Chen Runting

# Deploy link (no need to run on localhost): 
- Admin: 
- Client: 

# How to work in local host?
 ## Front-end ReactJS

 > ### Require Node.js and npm version: (install before clone and work):
 > NodeJS v14.7.0 and NPM  v6.14.8
 ```
 https://nodejs.org/download/release/v14.17.0/
 ```
 #### 1. Clone this project 
 #### 2. Go to the packages and go to the client or admin project
	cd packages/client-side 
	cd packages/admin-side
 #### 3. Install package: 
 > Just run in the first time
 ```
 npm install 
 ```
 #### 4. To run the project: 
 ```
 npm start
 ```
 
 ## Back-end Flask
  #### 1. Clone this project
  #### 2. Go to backend folder:
  	cd backend/
  #### 3. (For dev team) select a different branch, not the main branch
  #### 4. Create new venv: 
  	python -m venv venv
  #### 5. Activate the venv
  #### 6. Install necessary files: 
  	pip install -r requirements.txt
  #### 7. Create new .env file (inside /backend) and add this content: 
  	JWT_COOKIE_SECURE=False
	JWT_SECRET_KEY=hello_world
	SECRET_KEY=just-a-random-key
	DATABASE_URL=postgres://nqbtlizkmplaem:ceaf26000c428ca4e360897a3f0b2d1555b240a7ea142c1012ae5ee1ec12db0f@ec2-34-192-210-139.compute-1.amazonaws.com:5432/d3l31dol5kojm8
  ##### For dev team, delete the DATABASE_URL (we should work with sqlite db before deployment)
  #### 8. Upgrade the database (for dev team):
  	flask db upgrade
  #### 9.run Flask app:
  	flask run
