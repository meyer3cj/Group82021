from serpapi import GoogleSearch
import collections
import json

def getImages():
    params={
        'q':'rtx 2080',
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
        d['url']=images[i]['thumbnail']
        d['title']=images[i]['title']
        imagelist.append(d)
    j= json.dumps(imagelist)
    print(j)
    return(j)

getImages()