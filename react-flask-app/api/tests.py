import unittest
import api
import itemfunctions
class TestCalculate(unittest.TestCase):
    def test_calculate(self):
        x=1
        y=2
        result= x+y
        self.assertEqual(result,3)
    def test_read(self):
        result=api.get_item_list()
        self.assertEqual(result,200)
    def test_delete(self):
        result=api.delete(2)
        self.assertEqual(result,200)
'''    def test_add(self):
        self.assertEqual()
    def test_update(self):
        self.assertEqual()'''

if __name__ == '__main__':
    unittest.main()

