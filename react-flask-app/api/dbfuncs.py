import pyodbc
import textwrap


def readDB(query, tuple):
    print(query)
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

    csr: pyodbc.Cursor = cnxn.cursor()
    
    
    print(tuple)
    csr.execute(query, tuple)

    myresult = csr.fetchall()

    return (myresult)

def editDB(query, tuple):
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

    csr.close()

    ids = []
    ids.append(0)
    for i in result:
        ids.append(i[0])

    nextId = max(ids) + 1
    
    return (nextId)

