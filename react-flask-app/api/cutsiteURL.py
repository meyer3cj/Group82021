
def getStore(urlInput):
    #Gets the store the user is planning on buying their item from
    slashes= []
    for idx, value in enumerate(urlInput):
        if value == '/':
            slashes.append(idx)
            print(idx,value)
    
    
    out= urlInput[slashes[1]+5:slashes[2]-4]
    
    
    return(out.capitalize())
    




