import dbfuncs
import json
import collections
from serpapi import GoogleSearch

def getItems(userId):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    userId = ?
                And
                    Purchased= 0
                And 
                    inlist = 1
            '''
            
    tuple = (userId)

    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)

def searchItems(userID,Term):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    UserId = ?
                And
                    Purchased= 0
                And 
                    inlist = 1
                And
                    ItemName LIKE ?
            '''
            
    tuple = (userID,'%'+Term+'%')

    rows = dbfuncs.readDB(query, tuple)



    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)
def searchHistory(userID,Term):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE
                    userId = ?
                AND
                    itemName LIKE ?

                order by ItemID desc
            '''
            
    tuple = (userID,'%'+Term+'%')

    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)
def searchBoughtitems(userID,Term):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    userId = ?
                And
                    Purchased= 1
                And
                
                    ItemName LIKE ?
            '''
            
    tuple = (userID,'%'+Term+'%')

    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)

def removeItems(itemId):
    query= '''
        update Items set inlist=0 where ItemID=?
        '''
    tuple = (str(itemId))
    dbfuncs.editDB(query, tuple)
    return '', 200
def deleteItems(itemId):
    query = '''
                DELETE FROM [Items] 
                WHERE 
                    ItemID = ?
            '''

    tuple = (str(itemId))

    dbfuncs.editDB(query, tuple)

    return '', 200

def deleteAllitems(usersId):
    query = '''
                DELETE FROM [Items]
                WHERE
                    userId = ?
            '''
    tuple = (usersId)
    
    dbfuncs.editDB(query, tuple)

    return '', 200

def deleteAccount(usersId):
    deleteAllitems(usersId)
    query = '''
                DELETE FROM [Users]
                WHERE
                    userId = ?
            '''
    tuple = (usersId)
    
    dbfuncs.editDB(query, tuple)

    return '', 200

def addItemList(request):
    query = '''
                INSERT INTO 
                    [dbo].[Items] (UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL, ItemImage, inlist)
                VALUES 
                    (?,?,?,?,?,?,?, ?)
            '''

    tuple = (request['usersId'], request['itemName'], request['price'], request['description'], False, request['url'], request['imageUrl'], True)

    dbfuncs.editDB(query, tuple)

    return '', 200

def editItemList(usersId, itemId, request):
    query = '''
                UPDATE 
                    [dbo].[Items]
                SET 
                    itemName = ?,
                    itemPrice = ?,
                    itemDescription = ?,
                    itemURL = ?,
                    itemImage = ?
                WHERE 
                    itemID = ? 
                AND 
                    userId = ?
            '''

    # Inputs set into tuple for execute function
    tuple = (request['itemName'], request['price'], request['description'], request['url'], request['imageUrl'], itemId, usersId)
    dbfuncs.editDB(query, tuple)

    return '', 200

def getItemList(userId, itemId):
    query = '''
                SELECT 
                    * 
                FROM 
                    [dbo].[Items] 
                WHERE 
                    itemID = ?
                AND
                    userId = ?
            '''
    
    tuple = (str(itemId), str(userId))
    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d= collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name' ]= row[2].capitalize()
        amount = row[3]
        currency = "{:0.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)

def getAccountInfo(usersId):
    query = '''
                SELECT 
                    * 
                FROM 
                    [dbo].[Users] 
                WHERE 
                    userId = ?
            '''
    
    tuple = (usersId)
    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d= collections.OrderedDict()
        d['password'] = row[3]
        d['email'] = row[4]

        objects_list.append(d)

    return json.dumps(objects_list)
    
def searchImages(query):
    params={
        'q': query,
        'tbm':'isch',
        'ijn':'0',
        'api_key':"6d709e08b52e4f66b86d034ac87b3315ad5f976887a72d82afea5559a1053f87"

    }

    search = GoogleSearch(params)
    results = search.get_dict()
    images = results['images_results']

    """for i in range(1):
        print(images[i])
    """

    imagelist=[]
    for i in range(15):
        d= collections.OrderedDict()
        d['id']= i
        d['url']=images[i]['thumbnail']
        d['title']=images[i]['title']
        imagelist.append(d)

    j= json.dumps(imagelist)
    return j
    # FIX: This isnt going to get called after return value?
'''
    with open('images.txt','w') as f:

        for i in range (15):
            f.write ('<img src='+images[i]['thumbnail']+' height=100>'+'\n')
'''

def getBought(usersId):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    userId = ?
                AND
                    Purchased= 1
            '''
            
    tuple = (usersId)

    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list) 

def setBought(itemID):
    query = '''
                UPDATE 
                    Items 
                SET 
                    Purchased = 1 
                WHERE 
                    ItemID = ? 
            '''
    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200

def setUnbought(itemID):
    query = '''
                UPDATE 
                    Items 
                SET 
                    Purchased = 0
                WHERE 
                    ItemID = ? 
            '''

    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200

def placeInList(itemID):
    query = '''
                UPDATE 
                    Items 
                SET 
                    inlist = 1
                WHERE 
                    ItemID = ? 
            '''

    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200

def getHistory(userId):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE
                    userId = ?
                order by ItemID desc
            '''
            
    tuple = (userId)

    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    for row in rows:
        d = collections.OrderedDict()
        d['itemId'] = row[0]
        d['userId'] = row[1]
        d['name'] = row[2].capitalize()
        amount = row[3]
        currency = "{:,.2f}".format(amount)
        d['price'] = currency
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[7]

        objects_list.append(d)

    return json.dumps(objects_list)
    
def login(request):

    query = '''
                SELECT
                    *
                FROM
                    [dbo].[Users]
                WHERE
                    [dbo].[Users].Email = ?
            '''

    tuple = (request['email'])
    rows = dbfuncs.readDB(query, tuple)

    objects_list = []

    try:
        # If rows is not an empty array then populate and return
        if rows:
            for row in rows:
                d= collections.OrderedDict()
                d['userId'] = row[0]
                objects_list.append(d)
        else:
            # Raise an exception to return a 401
            raise Exception("Yes")

        return json.dumps(objects_list)
    except:
        return '', 401

def passHash(request):

    query = '''
                SELECT
                    *
                FROM
                    [dbo].[Users]
                WHERE
                    [dbo].[Users].Email = ?
            '''

    tuple = (request['email'])
    rows = dbfuncs.readDB(query, tuple)

    try:
        # If rows is not an empty array then populate and return
        if rows:
            for row in rows:
                return row[3]
        else:
            # Raise an exception to return a 401
            raise Exception("Yes")
    except:
        return '', 401

def signup(request, hashed_password):

    query = '''
                BEGIN
                    IF NOT EXISTS (SELECT * FROM [dbo].[Users] 
                        WHERE Email = ?)
                    BEGIN
                        INSERT INTO [dbo].[Users] 
                            (UserID, FirstName, LastName, Email, Password)
                        VALUES 
                            (?, ?, ?, ?, ?)
                    END
                END
            '''

    userId = getUserIdQuery()
    tuple = (request['email'], userId, request['firstName'], request['lastName'], request['email'], hashed_password)

    rowsAffected = dbfuncs.addUsersDB(query, tuple)
    
    if rowsAffected == 1:
        return '', 200
    else:
        return '', 212

def updateEmail(usersId, request):
    query = '''
                BEGIN
                    IF NOT EXISTS (SELECT * FROM [dbo].[Users] 
	                    WHERE Email = ?)
                    BEGIN
	                    UPDATE [dbo].[Users] 
                        SET
                            Email = ?
                        WHERE
                            userId = ?
                    END
                END
            '''
    tuple = (request['email'], request['email'], usersId)

    rowsAffected = dbfuncs.addUsersDB(query, tuple)
    
    if rowsAffected == 1:
        return '', 200
    else:
        return '', 212

def updatePassword(usersId, hashed_password):
    query = '''
                 UPDATE 
                    [dbo].[Users]
                SET 
                    Password = ?
                WHERE
                    userId = ?
            '''
    tuple = (hashed_password, usersId)

    dbfuncs.editDB(query, tuple)

    return '', 200

def getUserIdQuery():
    query = '''
                SELECT
                    UserID 
                FROM 
                    Users
            '''

    userId = dbfuncs.getUserId(query)

    return userId
