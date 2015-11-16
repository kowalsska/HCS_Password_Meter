with open('words.txt') as f:
    words = f.readlines()

fNew = open("wordsNew.txt", 'w')

for word in words:
    if(len(word) > 3):
        fNew.write(word)
