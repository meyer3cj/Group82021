import pyodbc
import textwrap


def queryDB(query):
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
    nocount= """
    SET NOCOUNT ON
    
    """

    
    select= nocount+''+query
    csr.execute(select)
    result=csr.fetchall()
    print(csr.fetchall())
    return (result)

            