import unittest
from unittest import result

from requests.api import request
import api
import queries
class TestCalculate(unittest.TestCase):
    def test_read(self):
        result=api.itemList(5)
        self.assertEqual(result,queries.getItems(5))

    def test_add(self):
        result= queries.addItemList({'usersId':3,'itemName':'test','price':'1.00','description':'test','url':'google.com','imageUrl':'test'})
        self.assertEqual(result, ('', 200))

    def test_update(self):
        result= queries.editItemList(5,2500,{'userId':3,'itemName':'test','price':'34.00','description':'test','url':'google.com','imageUrl':'google.com'})
        self.assertEqual(result, ('', 200))    
    def test_delete(self):
        result= queries.deleteItems(13)
        self.assertEqual(result,('', 200))
    

if __name__ == '__main__':
    unittest.main()

