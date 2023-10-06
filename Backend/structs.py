import hashlib

class userAccount():
    def __init__(self, n, p) -> None: #type annotation
        self.__name = n # __ makes it private
        hashPassword = hashlib.sha256(p.encode()).hexdigest() #strings must be encoded before hasing
        self.__password = hashPassword
    
    def getName(self): 
        return self.__name
    
    def getPassword(self): 
        return self.__password
    
class accountList():
    def __init__(self) -> None: #type annotation
        self.__accounts = []
        
    def addAcc(self,acc): #self is a keyword, refers to the instance of the class
        self.__accounts.append(acc)
    
    def signIn(self, username, password):
        #gets hashed password from the password to match with available accounts
        hashPassword = hashlib.sha256(password.encode()).hexdigest()
        for acc in self.__accounts:
            if acc.getName == username:
                #successful login
                if acc.getPassword == hashPassword:
                    return acc
                #wrong password
                else:
                    return None
        
        #account not found
        return None
            
                
    
