---
title: "DFS (Depth First Search)"
pubDate: 2026-06-05
tags: ["그래프", "탐색"]
---

DFS는 그래프에서 한 경로를 가능한 깊게 탐색하는 알고리즘이다.

더 이상 방문할 수 있는 정점이 없으면 이전 정점으로 돌아가 다른 경로를 탐색한다.

## 동작 원리

다음과 같은 그래프를 DFS로 탐색한다고 하자.

![DFS 탐색을 시작하는 상태](1.svg)

탐색은 `1`번 정점에서 시작한다.

여러 정점을 방문할 수 있다면 번호가 작은 정점부터 방문한다고 가정한다.

`1`번 정점과 연결된 정점은 `2`, `3`, `5`이다. 이 중 번호가 가장 작은 `2`번 정점으로 이동한다.

`2`번 정점에서는 아직 방문하지 않은 `4`번 정점으로 이동한다.

`4`번 정점에서는 아직 방문하지 않은 `3`번 정점으로 이동한다.

![한 경로를 가능한 깊게 탐색한 상태](2.svg)

`3`번 정점에서는 더 이상 방문할 수 있는 정점이 없다.

따라서 `4`, `2`, `1`번 정점으로 차례대로 돌아간다.

`1`번 정점으로 돌아오면 아직 방문하지 않은 `5`번 정점으로 이동한다.

![이전 정점으로 돌아간 뒤 다른 경로를 탐색한 상태](3.svg)

모든 정점을 방문했으므로 탐색을 종료한다.

방문 순서는 다음과 같다.

```text
1  2  4  3  5
```

## 그래프 저장

그래프는 인접 리스트를 이용해 저장할 수 있다.

```cpp
vector<vector<int>> conn(200'001);
```

양방향 간선으로 연결된 두 정점 `u`, `v`는 다음과 같이 저장한다.

```cpp
conn[u].push_back(v);
conn[v].push_back(u);
```

## 방문 확인

이미 방문한 정점을 다시 탐색하면 같은 경로를 반복할 수 있다.

따라서 각 정점을 방문했는지 배열에 저장한다.

```cpp
int visited[200'001];
```

`visited[cur]`이 `0`이라면 아직 방문하지 않은 정점이다.

방문한 정점에는 방문 순서를 저장할 수 있다.

```cpp
visited[cur]=++cnt;
```

## 구현

DFS는 재귀 함수를 이용해 다음과 같이 구현할 수 있다. $O(V+E)$

```cpp
int cnt, visited[200'001];
vector<vector<int>> conn(200'001);

void dfs(int cur) {
    visited[cur]=++cnt;
    for(int next:conn[cur]) {
        if(!visited[next]) {
            dfs(next);
        }
    }
}
```

현재 정점과 연결된 정점을 하나씩 확인한다.

아직 방문하지 않은 정점을 찾으면 해당 정점에서 DFS를 다시 수행한다.

더 이상 방문할 정점이 없다면 재귀 함수가 종료되며 이전 정점으로 돌아간다.

## 방문 순서

인접 리스트에 저장된 순서에 따라 방문 순서가 달라질 수 있다.

번호가 작은 정점부터 방문하려면 각 인접 리스트를 정렬한다.

```cpp
for(int i=1;i<=n;i++) {
    sort(conn[i].begin(), conn[i].end());
}
```

## 시간복잡도

각 정점은 한 번만 방문한다.

각 간선도 인접 리스트에서 한 번씩 확인하므로 DFS의 시간복잡도는 $O(V+E)$이다.

여기서 $V$는 정점의 개수이고 $E$는 간선의 개수이다.

## 연습 문제

[https://soj.services/problems/27](https://soj.services/problems/27)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

bool vis[100'001];
vector<vector<int>> conn(100'001);

void dfs(int cur) {
    vis[cur]=true;
    cout << cur << ' ';
    for(int next:conn[cur]) {
        if(!vis[next]) {
            dfs(next);
        }
    }
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m, s; cin >> n >> m >> s;
    while(m--) {
        int u, v; cin >> u >> v;
        conn[u].push_back(v);
        conn[v].push_back(u);
    }
    for(int i=1;i<=n;i++) sort(conn[i].begin(), conn[i].end());
    dfs(s);
}
```

</details>
