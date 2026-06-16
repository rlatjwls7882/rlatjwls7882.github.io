---
title: "Dinic's Algorithm"
pubDate: 2026-06-11
tags: ["그래프", "최대 유량"]
difficulty: "Platinum II"
---

`Dinic`은 `source`에서 `sink`까지 보낼 수 있는 최대 유량을 구하는 알고리즘이다.

`Edmonds-Karp`는 `BFS`로 증가 경로를 하나씩 찾지만 `Dinic`은 레벨 그래프에서 여러 증가 경로를 한 번에 처리한다.

## 레벨 그래프

다음과 같은 유량 네트워크가 있다고 하자.

![초기 유량 네트워크](1.svg)

그림의 `f/c`에서 `f`는 현재 유량이고 `c`는 간선의 용량이다.

먼저 잔여 용량이 있는 간선만 따라가며 `BFS`를 수행한다.

```cpp
if(c[cur][next]-f[cur][next] && level[next]==-1) {
    level[next]=level[cur]+1;
}
```

`level[i]`에는 `source`에서 정점 `i`까지의 거리를 저장한다.

![BFS로 만든 레벨 그래프](2.svg)

`DFS`에서는 `level`이 정확히 $1$ 증가하는 간선만 따라간다.

```cpp
if(level[next]!=level[cur]+1) continue;
```

따라서 `DFS`는 `source`에서 `sink` 방향으로만 이동한다.

## 차단 유량

현재 레벨 그래프에서 더 이상 `source`에서 `sink`까지 유량을 보낼 수 없는 상태를 차단 유량이라고 한다.

처음에는 다음 경로를 찾는다.

```text
S → 1 → 2 → E
```

![첫 번째 경로에 유량을 보낸 상태](3.svg)

이 경로를 통해 유량 $2$를 보낼 수 있다.

같은 레벨 그래프에서 `DFS`를 다시 수행하면 다음 경로를 찾는다.

```text
S → 3 → 4 → E
```

![두 번째 경로에 유량을 보낸 상태](4.svg)

이 경로를 통해 유량 $1$을 추가로 보낼 수 있다.

![현재 레벨 그래프에서 차단 유량을 구한 상태](5.svg)

차단 유량을 구한 뒤에는 `BFS`를 다시 수행해 새로운 레벨 그래프를 만든다.

![다시 BFS를 수행해도 sink에 도달할 수 없는 상태](6.svg)

새로운 레벨 그래프에서도 `sink`에 도달할 수 없다면 더 이상 증가 경로가 존재하지 않는다.

따라서 알고리즘을 종료한다.

예시에서 최대 유량은 $3$이다.

## 현재 간선 최적화

`DFS`에서 한 번 확인한 간선을 매번 처음부터 다시 확인할 필요는 없다.

`work[cur]`에는 `cur`번 정점에서 다음으로 확인할 간선의 인덱스를 저장한다.

```cpp
for(int &i=work[cur];i<conn[cur].size();i++) {
    ...
}
```

이미 유량을 보낼 수 없다고 확인한 간선은 이후 `DFS`에서도 건너뛴다.

`i`를 참조자로 선언했으므로 반복문이 끝난 뒤에도 확인한 위치가 `work[cur]`에 남는다.

새로운 레벨 그래프를 만들 때마다 `work` 배열을 초기화한다.

```cpp
memset(work, 0, sizeof work);
```

## 구현

`Dinic`은 다음과 같이 구현할 수 있다. $O(V^2E)$

```cpp
int s, t;
ll f[MAX][MAX], c[MAX][MAX];
int level[MAX], work[MAX];
vector<vector<int>> conn(MAX);

bool bfs() {
    queue<int> q; q.push(s);
    memset(level, -1, sizeof level);
    level[s]=0;
    while(!q.empty()) {
        int cur=q.front(); q.pop();
        for(int next:conn[cur]) {
            if(c[cur][next]-f[cur][next] && level[next]==-1) {
                level[next]=level[cur]+1;
                q.push(next);
            }
        }
    }
    return level[t]!=-1;
}

ll dfs(int cur, ll curFlow) {
    if(cur==t) return curFlow;
    for(int &i=work[cur];i<conn[cur].size();i++) {
        int next=conn[cur][i];
        if(level[next]==level[cur]+1 && c[cur][next]-f[cur][next]) {
            ll flow = dfs(next, min(curFlow, c[cur][next]-f[cur][next]));
            if(flow) {
                f[cur][next]+=flow;
                f[next][cur]-=flow;
                return flow;
            }
        }
    }
    return 0;
}

ll dinic() {
    ll ret=0;
    while(bfs()) {
        memset(work, 0, sizeof work);
        while(ll flow=dfs(s, LINF)) ret+=flow;
    }
    return ret;
}
```

방향 간선 `u → v`의 용량이 `w`라면 다음과 같이 추가한다.

```cpp
conn[u].push_back(v);
conn[v].push_back(u);
c[u][v]+=w;
```

역방향 간선도 인접 리스트에 넣어야 기존 유량을 취소하는 경로를 찾을 수 있다.

일반적인 유량 네트워크에서 `Dinic`의 시간복잡도는 $O(V^2E)$이다.

`Edmonds-Karp`의 시간복잡도 $O(VE^2)$보다 빠르게 동작한다.

## 연습 문제

[https://soj.services/problems/46](https://soj.services/problems/46)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll LINF = 0x3f3f3f3f3f3f3f3f;
const int MAX = 2001;

int s, t;
ll f[MAX][MAX], c[MAX][MAX];
int level[MAX], work[MAX];
vector<vector<int>> conn(MAX);

bool bfs() {
    queue<int> q; q.push(s);
    memset(level, -1, sizeof level);
    level[s]=0;
    while(!q.empty()) {
        int cur = q.front(); q.pop();
        for(int next:conn[cur]) {
            if(c[cur][next]-f[cur][next] && level[next]==-1) {
                level[next]=level[cur]+1;
                q.push(next);
            }
        }
    }
    return level[t]!=-1;
}

ll dfs(int cur, ll curFlow) {
    if(cur==t) return curFlow;
    for(int &i=work[cur];i<conn[cur].size();i++) {
        int next=conn[cur][i];
        if(level[next]==level[cur]+1 && c[cur][next]-f[cur][next]) {
            ll flow = dfs(next, min(curFlow, c[cur][next]-f[cur][next]));
            if(flow) {
                f[cur][next]+=flow;
                f[next][cur]-=flow;
                return flow;
            }
        }
    }
    return 0;
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m; cin >> n >> m >> s >> t;
    while(m--) {
        ll u, v, w; cin >> u >> v >> w;
        conn[u].push_back(v);
        conn[v].push_back(u);
        c[u][v]+=w;
    }

    ll res=0;
    while(bfs()) {
        memset(work, 0, sizeof work);
        while(ll ret=dfs(s, LINF)) {
            res+=ret;
        }
    }
    cout << res;
}
```

</details>