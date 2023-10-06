class userAccount():
    def __init__(self, n, p) -> None: #type annotation
        self.__name = n # __ makes it private
        self.__password = p
    
    def getName(self): 
        return self.__name
    
    def getPassword(self): 
        return self.__password
    
class accountList():
    def __init__(self) -> None: #type annotation
        self.__accounts = []
        
    def addAcc(self,acc): #self is a keyword, refers to the instance of the class
        self.__accounts.append(acc)
    
    def signIn(self, account):
        for acc in self.__accounts:
            if acc.getName == account.getName:
                #successful login
                if acc.getPassword == account.getPassword:
                    return acc
                #wrong password
                else:
                    return None
        
        #account not found
        return None
            
                
    
