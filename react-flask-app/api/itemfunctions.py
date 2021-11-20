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

    f.close()

    return(objects_list)


def DeleteItems(id):
    id=str(id)
    query="Delete from [Items] where ItemID = "+id
    dbfuncs.modifyDB(query)

def addItemList(request):
    query = """
                INSERT INTO 
                    [dbo].[Items] (itemID, UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL)
                VALUES 
                    (?,?,?,?,?,?,?)
            """
    id= dbfuncs.getIDs()
    tuple = (id, 1, request['itemName'], request['price'], request['description'], False, request['url'])

    dbfuncs.addQuery(query, tuple)

    return '', 200

def editItemList(id, request):
    query = """
                UPDATE 
                    [dbo].[Items]
                SET 
                    itemName = ?,
                    itemPrice = ?,
                    itemDescription = ?,
                    itemURL = ?
                WHERE 
                    itemID = ?
            """
    # Inputs set into tuple for execute function
    tuple = (request['itemName'], request['price'], request['description'], False, request['url'], str(id))

    dbfuncs.addQuery(query, tuple)

    return '', 200

def updateItemList(id):
    query = """
                SELECT * FROM [dbo].[Items]
                WHERE itemID = ?
            """
    tuple = (str(id))

    dbfuncs.readDB(query)
    
    return '', 200