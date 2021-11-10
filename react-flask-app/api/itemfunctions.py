from typing import Collection
import readdb
import json
import cutsiteURL
import collections
import deleteItemsdb

def GetItems():
    rows= readdb.queryDB('Select * from [Items]')

    objects_list=[]
    for row in rows:
        d= collections.OrderedDict()
        d['id']=row[0]
        d['name']= row[2].capitalize()
        amount=row[3]
        currency= "${:,.2f}".format(amount)
        d['price']= currency
        d['url']=row[7]
        d['Store']=cutsiteURL.getStore(row[7])
        d['description']= row[4]

        objects_list.append(d)
    j=json.dumps(objects_list)

    with open('../src/items.json','w')as f:
        f.write(j)
    print(j)

    print('function ran')
    f.close()

    return(objects_list)



def DeleteItems(id):
    id=str(id)
    query="Delete from [Items] where ItemID = "+id
    print(query)
    deleteItemsdb.queryDB(query)

GetItems()