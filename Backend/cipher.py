
def encrypt(inputText, N, D):
    reverse1 = ""
    reverse2 = ""
    for i in range(len(inputText) -1, -1, -1):
        reverse1 += inputText[i]

    for i in range(0, len(inputText), 1):
        val = ord(reverse1[i])
        if(val != 95 and val != 33):
            if(D > 0):
                val = N + val
                while(val > 126):
                    val = 34 + (val - 127)
            else:
                val = val - N
                while(val < 34):
                    val = 126 - (33 - val)
        reverse2 += chr(val)

    return reverse2

def decrypt(inputText, N, D):
    D = -D
    reverse = ""
    for i in range(0, len(inputText), 1):
        val = ord(inputText[i])
        if(val != 95 and val != 33):
            if(D > 0):
                val = N + val
                while(val > 126):
                    val = 34 + (val - 127)
            else:
                val = val - N
                while(val < 34):
                    val = 126 - (33 - val)
        reverse += chr(val)
    
    return reverse[::-1]