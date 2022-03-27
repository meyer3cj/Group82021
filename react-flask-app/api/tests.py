import unittest
from unittest import result

from requests.api import request
import api
import queries
class TestCalculate(unittest.TestCase):
    def testread(self):
        result=api.itemList(7)
        self.assertEqual(result,queries.getItems(7))

    def testadd(self):
        result= queries.addItemList({'usersId':7,'itemName':'test','price':'1.00','description':'test','url':'google.com','imageUrl':'test'})
        self.assertEqual(result, ('', 200))

    def testupdate(self):
        result= queries.editItemList(7,2500,{'userId':7,'itemName':'test','price':'34.00','description':'test','url':'google.com','imageUrl':'google.com'})
        self.assertEqual(result, ('', 200))    
    def testdelete(self):
        result= queries.deleteItems(13)
        self.assertEqual(result,('', 200))
    def testsearch_home(self):
        result= queries.searchItems(7,'shoe')
        self.assertEqual(result,queries.searchItems(7,'shoe'))
    def testsearch_history(self):
        result= queries.searchHistory(7,'shoe')
        self.assertEqual(result,queries.searchHistory(7,'shoe'))
    def testsearch_bought(self):
        result= queries.searchBoughtitems(7,'shoe')
        self.assertEqual(result,queries.searchBoughtitems(7,'shoe'))
    
    def testsignup(self):
        result= queries.signup({'firstName':'test','lastName':'user','email':'test@test.com','password':'test'},'dkdskskd')
        self.assertEqual(result,('', 200))
    def testchangeemail(self):
        result= queries.updateEmail(8,{'email':'changedEmail@gmail.com'})
    def testdelete_account(self):
        result= queries.deleteAccount(8)
        self.assertEqual(result,queries.deleteAccount(8))
if __name__ == '__main__':
    unittest.main()

