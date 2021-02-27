# Labor Hours API

HERE ARE SOME CHANGES from the local machine and from remote  
and  
HERE ARE SOME FROM GITHUB  
change 2

Final purpose will be to grab orders from a database and calculate the required labor hours based off the forecasted sales input by the user.  
modeled after [Real Python Tutorial 1,](https://realpython.com/flask-connexion-rest-api/)
[ 2,](https://realpython.com/flask-connexion-rest-api-part-2/)
[ 3,](https://realpython.com/flask-connexion-rest-api-part-3/)
[ 4](https://realpython.com/flask-connexion-rest-api-part-4/)  

## How to run locally

download the required libraries with 

```(venv) $ pip install -r requirements.txt```


I still have my postgresql db running locally, so you must create your own using the files in the `db_create` folder. The .sql file should create a new db, create two new tables, and populate the vessels table. The .py file should populate the orders table with 100 randomized orders. You will also have to change the connection in `models.py` to your local db.

when you have the database connected run the server.

```(venv) $ python server.py```

# Backend

Build using:  
Flask to build the server  
Connexion to handle HTTP requests  
SQLAlchemy to interface with the database  
Marshmallow to transform database objects into JSON 

## Database
**TODO**: Integrate orders table and create SQLalchemy objects containing the required information to calculate labor hours

                    Table "public.vessels"             Table "public.orders"
                |   Column    |   Type       |       |   Column    |  Type   |                  
                +-------------+--------------+       +-------------+---------+
                | vessel_id   | integer  -pk |       | order_id    | int -pk |                        
                | vessel_name | character 10 |       | vessel_id   | int     |                        
                | region      | character 20 |       | amount      | money   |                          
                | preptime    | integer      |       | order_date  | date    |                    
                

## API Interaction
Using Connexion which is built on Swagger to handle http requests. tbh I don't know how it works, I followed the instructions.

# Frontend
Using a combination of HTML, CSS, and JS to create a single page application capable of getting information from the databases.

## JavaScript
**TODO:** Improve method of returning results instead of using the table.

Uses JQuery to build an AJAX model within a Model-View-Controller pattern. 

Model:  
Stores functions that interact with the server and receives JSON data  

View:  
Stores functions that interact with the webpage

Controller:  
Handles events that trigger view and model functions

JS resources:  
[jQuery Selectors](https://www.tutorialspoint.com/jquery/jquery-selectors.htm)

## HTML

## CSS
**TODO:** Needs to be badly updated.
