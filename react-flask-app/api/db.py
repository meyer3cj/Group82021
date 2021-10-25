import pyodbc
import textwrap


def queryDB(query):
    driver='{ODBC Driver 17 for SQL Server}'

    server_name='kartzserver'
    database_name='KartzDB'
    server='{server_name}.database.windows.net,1433'.format(server_name=server_name)

    username= "Admin5000"
    password= "Pw^?CWu']y}@Ym9g"

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
    cnxn: pyodbc.Connection= pyodbc.connect(connectionString)

    csr: pyodbc.Cursor= cnxn.cursor()

    select= query
    csr.execute(select)
    result=csr.fetchall()
    print(csr.fetchall())
    return str(result)

            