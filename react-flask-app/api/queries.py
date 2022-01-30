import dbfuncs
import json
import collections
from serpapi import GoogleSearch
def getItems():
    query = '''
                SELECT 
                    *
                FROM 
                    [Items]
                WHERE 
                    userId = ?
            '''
            
    tuple = (userId);

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
        d['url'] = row[6]
        d['description'] = row[4]
        d['image']=row[8]

        objects_list.append(d)

    return json.dumps(objects_list)

def deleteItems(itemId):
    query = """
                DELETE FROM [Items] 
                WHERE 
                    ItemID = ?
                AND
                    userId = ?
            """

    tuple = (str(itemId), 1)

    dbfuncs.editDB(query, tuple)

    return '', 200

def addItemList(request):
    query = """
                INSERT INTO 
                    [dbo].[Items] (itemID, UserID, ItemName, ItemPrice, ItemDescription, Purchased, ItemURL, ItemImage)
                VALUES 
                    (?,?,?,?,?,?,?,?)
            """

    itemId = dbfuncs.getIDs()
    tuple = (itemId, request['userId'], request['itemName'], request['price'], request['description'], False, request['url'], request['imageUrl'])

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
                    itemURL = ?,
                    itemImage = ?
                WHERE 
                    itemID = ? 
                AND 
                    userId = ?
            """

    # Inputs set into tuple for execute function
    tuple = (request['itemName'], request['price'], request['description'], request['url'], request['imageUrl'], itemId, 1)
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
        d['image']=row[8]

        objects_list.append(d)

    return json.dumps(objects_list)

def SearchImages(query):
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
def login(request):
    query = """
                SELECT
                    *
                FROM
                    [dbo].[Users]
                WHERE
                    [dbo].[Users].Email = ?
                AND
                    [dbo].[Users].Password = ?
            """

    tuple = (request['username'], request['password'])

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
    query = """
            INSERT INTO 
                [dbo].[Users] (UserID, FirstName, LastName, Password, DOB, Email, City, State, ZIPCode, CellPhone, HomePhone)
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """

<<<<<<< HEAD
    
=======
    userId = getUserIdQuery()
    print("YO")
    print()
    print()
    print()
    print(request)
    tuple = (userId, request['firstName'], request['lastName'], request['password'], request['dob'], request['email'], request['city'], request['state'], request['zipCode'], request['cellPhone'], request['homePhone'])

    dbfuncs.editDB(query, tuple)

    return '', 200

def getUserIdQuery():
    query = """
                SELECT
                    UserID 
                FROM 
                    Users
            """
            
    userId = dbfuncs.getUserId(query)
    
    return userId
>>>>>>> faf5eae (Added signup feature. Other changes.)
