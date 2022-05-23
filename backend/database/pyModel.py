from datetime import date
from .model import Model

class model(Model):
    def __init__(self):
        self.comments = []

    def select(self):
        return self.comments
    
    def insert(self, name, comment):
        params = [name, comment, date.today()]
        self.comments.append(params)
        return True