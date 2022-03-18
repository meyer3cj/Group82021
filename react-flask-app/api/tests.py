import unittest
from unittest import result

from requests.api import request
import api
import queries
class TestCalculate(unittest.TestCase):
    def testread(self):
        result=api.itemList(5)
        self.assertEqual(result,queries.getItems(5))

    def testadd(self):
        result= queries.addItemList({'usersId':11,'itemName':'test','price':'1.00','description':'test','url':'google.com','imageUrl':'test'})
        self.assertEqual(result, ('', 200))

    def testupdate(self):
        result= queries.editItemList(5,2500,{'userId':3,'itemName':'test','price':'34.00','description':'test','url':'google.com','imageUrl':'google.com'})
        self.assertEqual(result, ('', 200))    
    def testdelete(self):
        result= queries.deleteItems(13)
        self.assertEqual(result,('', 200))
    def testsearch_home(self):
        result= queries.searchItems(3,'shoe')
        self.assertEqual(result,queries.searchItems(3,'shoe'))
    def testsearch_history(self):
        result= queries.searchHistory(3,'shoe')
        self.assertEqual(result,queries.searchHistory(3,'shoe'))
    def testsearch_bought(self):
        result= queries.searchBoughtitems(3,'shoe')
        self.assertEqual(result,queries.searchBoughtitems(3,'shoe'))
    
    def testsignup(self):
        result= queries.signup({'firstName':'test','lastName':'user','email':'test@test.com','password':'test'})
        self.assertEqual(result,('', 200))
    def testchangeemail(self):
        result= queries.updateEmail(11,{'email':'changedEmail@gmail.com'})
    def testdelete_account(self):
        result= queries.deleteAccount(11)
        self.assertEqual(result,queries.deleteAccount(11))
if __name__ == '__main__':
    unittest.main()

