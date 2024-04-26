import sys

n = int(sys.stdin.readline())
stamina_consume = [0] + list(map(int, sys.stdin.readline().split()))
get_pleasure = [0] + list(map(int, sys.stdin.readline().split()))

dp = [[0] * 101 for _ in range(n + 1)]

for i in range(1, n + 1):
    for j in range(1, 101):
        if stamina_consume[i] <= j:
            dp[i][j] = max(dp[i-1][j], dp[i-1][j - stamina_consume[i]] + get_pleasure[i])
        else:
            dp[i][j] = dp[i-1][j]

print(dp[n][99])