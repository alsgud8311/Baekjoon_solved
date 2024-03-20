import sys

n = int(sys.stdin.readline())
stack = []
result = []
no_more_push = 0
is_possible= True
for i in range(1, n + 1):
    num = int(sys.stdin.readline())
    
    while no_more_push < num:
        no_more_push += 1
        stack.append(no_more_push)
        result.append('+')
        
    if stack[-1] == num:
        stack.pop()
        result.append('-')
    else:
        is_possible = False
        
if is_possible:
    for j in result:
        print(j)
else:
    print("NO")