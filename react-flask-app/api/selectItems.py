from typing import Collection
import db
import json
import collections


def GetItems():
    rows= db.queryDB('Select * from [TEST]')

    objects_list=[]
    for row in rows:
        d= collections.OrderedDict()
        d['id']= row[0]
        d['name']= row[1]
        objects_list.append(d)
    j=json.dumps(objects_list)

    with open('../src/names.json','w')as f:
        f.write(j)
    print(j)

    print('function ran')
    f.close()

    return(objects_list)






GetItems()