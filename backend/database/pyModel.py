from datetime import date

from colorama import Cursor
from .model import Model
import sqlite3
DB_FILE = 'comments.db'

class model(Model):
    def __init__(self):
        #self.comments = []
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        try:
            cursor.execute("select count(rowid) from comments")
        except sqlite3.OperationalError:
            cursor.execute("create table comments (name text, comment text, date date)")
        cursor.close()
    
    def select(self):
        connection = sqlite3.connect(DB_FILE)
        #connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM comments")
        result = cursor.fetchall()
        return result

    def insert(self, name, comment):
        params = {'name':name, 'comment':comment, 'date':date.today()}
        connection = sqlite3.connect(DB_FILE)
        cursor = connection.cursor()
        cursor.execute("insert into comments (name, comment, date) VALUES (:name, :comment, :date)", params)
        connection.commit()
        cursor.close()
        #self.comments.append(params)
        return True