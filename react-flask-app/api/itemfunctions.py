from typing import Collection
import dbfuncs
import json
import cutsiteURL
import collections

def GetItems():
    rows= dbfuncs.readDB('Select * from [Items]')

    objects_list=[]
    for row in rows:
        d= collections.OrderedDict()
        d['id']=row[0]
        d['name']= row[2].capitalize()
        amount=row[3]
        currency= "${:,.2f}".format(amount)
        d['price']= currency
        d['url']=row[7]
        #d['Store']=cutsiteURL.getStore(row[7])
        d['description']= row[4]

        objects_list.append(d)
    j=json.dumps(objects_list)

    with open('../src/items.json','w')as f:
        f.write(j)
    print(j)

    f.close()

    return(objects_list)


def DeleteItems(id):
    id=str(id)
    query="Delete from [Items] where ItemID = "+id
    print(query)
    dbfuncs.modifyDB(query)

def addItemList(request):
    print(request)
    query = """
                INSERT INTO [dbo].[Items] (ItemID, UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL)
                VALUES (?,?,?,?,?,?,?)
                """
                
    dbfuncs.addQuery(query, request)
    return '', 200
