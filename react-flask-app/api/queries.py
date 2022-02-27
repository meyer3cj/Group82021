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
            
    tuple = (userId);

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

def searchItems(Term):
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
                And
                    ItemName LIKE ?
                or
                    ItemDescription LIKE ?
            '''
            
    tuple = (1,'%'+Term+'%','%'+Term+'%')

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
def searchHistory(Term):
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE
                    userId = ?
                AND
                    itemName LIKE ?
                or
                    ItemDescription LIKE ?
                order by ItemID desc
            '''
            
    tuple = (1,'%'+Term+'%','%'+Term+'%')

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
def searchBoughtitems(Term):
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
                or
                    ItemDescription LIKE ?
            '''
            
    tuple = (1,'%'+Term+'%')

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
def deleteItems(usersId, itemId):
    query = '''
                DELETE FROM [Items] 
                WHERE 
                    ItemID = ?
                AND
                    userId = ?
            '''

    tuple = (str(itemId), usersId)

    dbfuncs.editDB(query, tuple)

    return '', 200

def addItemList(request):
    query = '''
                INSERT INTO 
                    [dbo].[Items] (UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL, ItemImage, inlist)
                VALUES 
                    (?,?,?,?,?,?,?)
            '''

    tuple = (request['usersId'], request['itemName'], request['price'], request['description'], False, request['url'], request['imageUrl'])

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

def getBought():
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
            
    tuple = (1)

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
        update Items 
        set Purchased = 1 
        where ItemID = ? 
    '''
    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200    
def setUnbought(itemID):
    query = '''
        update Items 
        set Purchased = 0
        where ItemID = ? 
    '''
    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200
def placeInList(itemID):
    query = '''
        update Items 
        set inlist = 1
        where ItemID = ? 
    '''
    tuple= (str(itemID))

    dbfuncs.editDB(query, tuple)

    return '', 200

def getHistory():
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE
                    userId = ?
                order by ItemID desc
            '''
            
    tuple = (1)

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
                AND
                    [dbo].[Users].Password = ?
            '''

    tuple = (request['email'], request['password'])
    rows = dbfuncs.readDB(query, tuple)

    objects_list = []
    print(rows)

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

def signup(request):
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
    tuple = (request['email'], userId, request['firstName'], request['lastName'], request['email'], request['password'])

    rowsAffected = dbfuncs.addUsersDB(query, tuple)
    
    if rowsAffected == 1:
        return '', 200
    else:
        return '', 212

def getUserIdQuery():
    query = '''
                SELECT
                    UserID 
                FROM 
                    Users
            '''

    userId = dbfuncs.getUserId(query)

    return userId
