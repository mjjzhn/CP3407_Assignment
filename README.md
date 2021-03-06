# CP3407_Assignment

Please put your name here: 
- Ung Ta Hoang Tuan 
- Nguyen Hoang Anh
- Dang Nhat Quang
- Chen Runting

# Deploy link (no need to run on localhost): 
- Admin: https://shopka-admin-side.herokuapp.com
- Client: https://shopka-client-side.herokuapp.com

# How to work in local host?
Please using visual studio code.
 ## Front-end ReactJS

 > ### Require Node.js and npm version: (install before clone and work):
 > NodeJS v14.7.0 and NPM  v6.14.8
 ```
 https://nodejs.org/download/release/v14.17.0/
 ```
 #### 1. Clone this project 
 #### 2. Go to the packages, then:
 > Go to client side
```
cd packages/shopka-app
```
 > Go to admin side
```
cd packages/admin-side
```
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
download python 3.10
  #### 1. Clone this project
  #### 2. Go to backend folder:
  	cd backend/
  #### 3. (For dev team) select a different branch, not the main branch
  #### 4. Create new venv: 
  	python -m venv venv
  #### 5. Activate the venv using terminal
  - for cmd: venv/Scripts/activate 
  - for git bash: source venv/Scripts/activate 
  #### 6. Install necessary files: 
  	pip install -r requirements.txt
  #### 7. Create new .env file (inside /backend) and add this content: 
JWT_COOKIE_SECURE=False
JWT_SECRET_KEY=hello_world
SECRET_KEY=just-a-random-key
CLOUD_NAME=df5cmvx1g
API_KEY=889399675492336
API_SECRET=UP2CF9s_B_lmwMa4alSjxnzSJQw
CLOUDINARY_URL=cloudinary://889399675492336:UP2CF9s_B_lmwMa4alSjxnzSJQw@df5cmvx1g
STRIPE_API_KEY=sk_test_51L0yhzEoCtaUFlhaMUo7jhXY09zxE4hdAxRIXay2odk01659nGEE7AUeSYoOqinXgH2jjCy7PpXOYlixOMUX79me00hN55tMJn
ENDPOINT_SECRET=whsec_BTKS261w6fs7SGcVVFGlLTrONlKR8BQY
  #### 8. Upgrade the database (for dev team):
  	flask db upgrade
  #### 9.run Flask app:
  	flask run
