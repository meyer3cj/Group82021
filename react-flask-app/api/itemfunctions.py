import dbfuncs
import json
import collections

def getItems():
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    userId = ?
            '''
            
    tuple = (1);

    rows = dbfuncs.readDB(query, tuple);

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['image_url']=row[8]
        d['url'] = row[7]
        d['description'] = row[4]

        objects_list.append(d)

    return json.dumps(objects_list)

def deleteItems(itemId):
    query = '''
                DELETE FROM [Items] 
                WHERE 
                    ItemID = ?
                AND
                    userId = ?
            '''
    tuple = (str(itemId), 1)

    dbfuncs.editDB(query, tuple)

    return '', 200

def addItemList(request):
    query = """
                INSERT INTO 
                    [dbo].[Items] (itemID, UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL)
                VALUES 
                    (?,?,?,?,?,?,?)
            """
    itemId = dbfuncs.getIDs()
    tuple = (itemId, request['userId'], request['itemName'], request['price'], request['description'], False, request['url'])

    dbfuncs.editDB(query, tuple)

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
                AND 
                    userId = ?
            """
    # Inputs set into tuple for execute function
    tuple = (request['itemName'], request['price'], request['description'], request['url'], itemId, 1)
    dbfuncs.editDB(query, tuple)

    return '', 200

def getItemList(itemId):
    query = """ 
                SELECT 
                    * 
                FROM 
                    [dbo].[Items] 
                WHERE 
                    itemID = ?
                AND
                    userId = ?
            """
    
    tuple = (str(itemId), 1)
    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d= collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name' ]= row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]

        objects_list.append(d)

    return json.dumps(objects_list)


