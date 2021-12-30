from typing import Collection
import dbfuncs
import json
import cutsiteURL
import collections

def GetItems():
    rows = dbfuncs.readDB('Select * from [Items]')

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[7]
        d['description'] = row[4]

        objects_list.append(d)

    return json.dumps(objects_list)

def DeleteItems(itemId):
    itemId = str(itemId)
    query = "Delete from [Items] where ItemID = "+ itemId
    dbfuncs.modifyDB(query)

def addItemList(request):
    query = """
                INSERT INTO 
                    [dbo].[Items] (itemID, UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL)
                VALUES 
                    (?,?,?,?,?,?,?)
            """
    itemId = dbfuncs.getIDs()
    tuple = (itemId, request['userId'], request['itemName'], request['price'], request['description'], False, request['url'])

    dbfuncs.addQuery(query, tuple)

    return '', 200

def editItemList(itemId, request):
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
    tuple = (request['itemName'], request['price'], request['description'], request['url'], itemId)
    dbfuncs.addQuery(query, tuple)

    return '', 200

def updateItemList(itemId):
    query = """ 
                SELECT * 
                FROM [dbo].[Items] 
                WHERE itemID = ?
            """
    
    tuple = (str(itemId))
    rows = dbfuncs.updateQuery(query, tuple)

    objects_list = []

    for row in rows:
        d= collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name' ]= row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[7]
        d['description'] = row[4]

        objects_list.append(d)

    return json.dumps(objects_list)


