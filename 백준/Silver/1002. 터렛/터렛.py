import sys, math

case = int(sys.stdin.readline())
for i in range(case):
    choX, choY, choR, baekX, baekY, baekR = list(map(int,sys.stdin.readline().split()))
    distance = math.sqrt((baekX-choX)**2 + (baekY-choY)**2)
    if distance == 0 and choR==baekR:
        print(-1)
    elif abs(choR-baekR) == distance or choR+baekR==distance:
        print(1)
    elif abs(choR-baekR) < distance < choR + baekR:
        print(2)
    else:
        print(0)       
    