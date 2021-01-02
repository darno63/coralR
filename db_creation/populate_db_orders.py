import psycopg2
from psycopg2 import OperationalError
import random
"""
This script generate 100 rows of randomized data and inserts into my coral database.
"""

# Create Connection to Coral Database
def create_connection(db_name, db_user, db_password, db_host, db_port):
    connection = None
    try:
        connection = psycopg2.connect(
            database = db_name,
            user = db_user,
            password = db_password,
            host = db_host,
            port = db_port,
        )
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return connection

# args may be different depending on your local database
connection = create_connection("coral", "postgres", "pw123", "127.0.0.1", "5432")

# Create Dummy Data function
def dummy_data():
    order_id = range(1002, 1102)
    vessel_ids = [random.choice(range(1,8)) for i in range(0,100)]
    amount = [random.randint(24, 55) for i in range(0,100)]
    order_date = ['2020-12-' + str(random.choice(range(1,31))) for i in range(0,100)]
    return list(zip(order_id, vessel_ids, amount, order_date))

# Create Dummy Data and Insert Query
orders = dummy_data()
order_records = ", ".join(["%s"] * len(orders))
insert_query = (f"INSERT INTO orders (order_id, vessel_id, amount, order_date) VALUES {order_records}")

# Create Cursor Object and Execute Insert Query
connection.autocommit = True
cursor = connection.cursor()
cursor.execute(insert_query, orders)

# Extra Execute Query Function for later use
"""
def execute_read_query(connection, query):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query)
        result = cursor.fetchall()
        return result
    except OperationalError as e:
        print(f"The error '{e}' occurred")
"""
