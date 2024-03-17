import sys

N, S = map(int,sys.stdin.readline().split())
sequence = list(map(int,sys.stdin.readline().split()))
result = 0

def subset(index, sum):
    global result
    
    if index >= N:
        return
    sum += sequence[index]

    if sum == S:
        result += 1

    # 해당 index를 선택했을 경우
    subset(index+1, sum)
    # 해당 index를 선택하지 않았을 경우
    subset(index+1, sum - sequence[index])

subset(0,0)
print(result)