import sys

N, L = map(int, sys.stdin.readline().split())
tape = list(map(int, sys.stdin.readline().split()))
tape.sort()
taped = 0

while tape:
    taped += 1
    popped = tape.pop(0)
    while tape and tape[0] <= popped + L-1:
        tape.pop(0)

print(taped)
