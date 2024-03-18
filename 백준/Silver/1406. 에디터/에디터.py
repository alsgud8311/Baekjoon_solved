import sys

text1 = list(sys.stdin.readline().rstrip('\n'))
text2 = []

for _ in range(int(sys.stdin.readline())):
    command = sys.stdin.readline().split()
    if command[0] == "L":
        if text1:
            text2.append(text1.pop())
    elif command[0] == "D":
        if text2:
            text1.append(text2.pop())        
    elif command[0] == "B":
        if text1:
            text1.pop()
    else:
        text1.append(command[1])

text1.extend(reversed(text2))
print("".join(text1))
    