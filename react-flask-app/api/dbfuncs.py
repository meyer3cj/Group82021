import pyodbc
import textwrap


def readDB(query):
    """Connects to database and queries based on input"""
    #sql driver
    driver='{ODBC Driver 17 for SQL Server}'
    
    
    #server and database information
    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
    
    
    #password to database
    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

    #generate connection string
    connectionString= textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        Connection Timeout=30;


    '''.format(
        driver=driver,
        server=server,
        database=database_name,
        username=username,
        password=password

    ))
    #connect to database
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()
    

    
    select= query
    csr.execute(select)
    result=csr.fetchall()
    print(csr.fetchall())
    csr.close()
    return (result)



def modifyDB(query):
    '''allows the application to modify database.
    Connects to database and queries based on input'''
    #sql driver
    driver='{ODBC Driver 17 for SQL Server}'
    
    
    #server and database information
    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
    
    
    #password to database
    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

    #generate connection string
    connectionString= textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        Connection Timeout=30;


    '''.format(
        driver=driver,
        server=server,
        database=database_name,
        username=username,
        password=password

    ))
    #connect to database
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()
    '''nocount= """SET NOCOUNT ON """'''

    
    select= query
    '''nocount+''+'''
    csr.execute(select)
    cnxn.commit()
    
    print (query)
    csr.close()
    return('done')

def updateQuery(query):
    """Connects to database and queries based on input"""
    #sql driver
    driver='{ODBC Driver 17 for SQL Server}'
    
    
    #server and database information
    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
    
    
    #password to database
    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

    #generate connection string
    connectionString= textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        Connection Timeout=30;


    '''.format(
        driver=driver,
        server=server,
        database=database_name,
        username=username,
        password=password

    ))
    #connect to database
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()

    result = csr.execute(query)

    cnxn.commit()
    
    return (result)



def addQuery(query, tuple):
    """Connects to database and queries based on input"""
    #sql driver
    driver='{ODBC Driver 17 for SQL Server}'
    
    
    #server and database information
    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
    
    
    #password to database
    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

    #generate connection string
    connectionString= textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        Connection Timeout=30;


    '''.format(
        driver=driver,
        server=server,
        database=database_name,
        username=username,
        password=password

    ))
    #connect to database
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()
    print(query)
    result = csr.execute(query, tuple)
    cnxn.commit()

    return (result)


def getIDs():
    """Connects to database and queries based on input"""
    #sql driver
    driver='{ODBC Driver 17 for SQL Server}'
    
    
    #server and database information
    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)
    
    
    #password to database
    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

    #generate connection string
    connectionString= textwrap.dedent('''
        Driver={driver};
        Server={server};
        Database={database};
        Uid={username};
        Pwd={password};
        Encrypt=yes;
        Connection Timeout=30;


    '''.format(
        driver=driver,
        server=server,
        database=database_name,
        username=username,
        password=password

    ))
    #connect to database
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()
    

    
    select= 'select ItemID from Items'
    csr.execute(select)
    result=csr.fetchall()
    print(csr.fetchall())
    csr.close()
    print(result)
    ids=[]
    for i in result:
        ids.append(i[0])
    print(ids)
    nextId=max(ids)+1
    print(nextId)

    
    
    
    return (nextId)

