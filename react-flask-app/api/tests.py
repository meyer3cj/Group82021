import unittest
from unittest import result

from requests.api import request
import api
import queries
class TestCalculate(unittest.TestCase):
    def test_calculate(self):
        x=1
        y=2
        result= x+y
        self.assertEqual(result,3)
    def test_read(self):
        result=api.itemList()
        self.assertEqual(result,queries.getItems())

    def test_add(self):
        result= queries.addItemList({'userId':3,'itemName':'test','price':'1.00','description':'test','url':'google.com','imageUrl':'test'})
        self.assertEqual(result, ('', 200))

    def test_update(self):
        result= queries.editItemList(13,{'userId':3,'itemName':'test','price':'34.00','description':'test','url':'google.com','imageUrl':'google.com'})
        self.assertEqual(result, ('', 200))    
    def test_delete(self):
        result= queries.deleteItems(13)
        self.assertEqual(result,('', 200))
    def test_getitemName(self):
        result= api.getImagedata('test')

        self.assertEqual(result,queries.SearchImages('test'))
    

if __name__ == '__main__':
    unittest.main()

