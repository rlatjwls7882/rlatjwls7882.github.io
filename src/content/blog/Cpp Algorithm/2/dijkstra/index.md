---
title: "Dijkstra's Algorithm"
pubDate: 2026-06-09
tags: ["그래프", "최단 경로"]
difficulty: "Gold IV"
---

다익스트라는 음수 간선이 없는 그래프에서 시작 정점으로부터의 최단 거리를 구하는 알고리즘이다.

거리가 가장 짧은 후보부터 `priority_queue`에서 꺼내며 탐색한다.

## 동작 원리

다음 그래프에서 `1`번 정점으로부터의 최단 거리를 구한다고 하자.

처음에는 모든 정점의 거리를 무한대로 두고 시작 정점을 `priority_queue`에 넣는다.

```cpp
pq.push({1, 0});
```

`priority_queue`에는 정점과 현재 거리 후보를 저장한다.

![1번 정점에서 탐색을 시작한 상태](1.svg)

거리가 가장 짧은 후보를 꺼낸다.

처음에는 정점 `1`의 거리 $0$을 확정한다.

```cpp
dist[1]=0;
```

`1`번 정점에서 갈 수 있는 간선을 확인한다.

```text
1 → 5 : 1
1 → 3 : 4
1 → 2 : 7
```

새 거리 후보를 `priority_queue`에 넣는다.

![1번 정점과 연결된 간선을 확인한 상태](2.svg)

다음으로 거리 $1$인 정점 `5`를 꺼낸다.

`5`번 정점을 거쳐 `2`번 정점으로 가면 거리는 $3$이다.

```text
1 → 5 → 2 : 3
```

기존 후보 `(2, 7)`이 남아 있어도 더 짧은 후보 `(2, 3)`을 새로 넣는다.

이후 `(2, 3)`을 꺼내면 정점 `2`의 최단 거리는 $3$으로 확정된다.

![5번과 2번 정점을 거쳐 더 짧은 경로를 찾은 상태](3.svg)

## 오래된 후보 무시하기

`priority_queue`에는 더 짧은 경로를 찾기 전에 넣은 후보가 남아 있을 수 있다.

예를 들어 `(2, 7)`보다 짧은 `(2, 3)`이 먼저 확정되면, 나중에 나온 `(2, 7)`은 무시한다.

```cpp
if(dist[cur]<=cost) continue;
```

![오래된 우선순위 큐 항목을 무시하는 상태](4.svg)

오래된 후보를 직접 지울 필요는 없다.

큐에서 꺼냈을 때 이미 더 짧거나 같은 거리가 확정되어 있으면 건너뛰면 된다.

## 간선 완화

현재 정점 `cur`에서 다음 정점 `next`로 가는 가중치가 `weight`라고 하자.

```cpp
long long nextCost=cost+weight;
```

새 거리 후보가 기존 거리보다 짧다면 `priority_queue`에 넣는다.

```cpp
if(nextCost<dist[next]) {
    pq.push({next, nextCost});
}
```

이 구현에서는 후보를 찾을 때 `dist[next]`를 바로 확정하지 않는다.

정점 `cur`이 큐에서 나왔을 때 최단 거리를 확정한다.

```cpp
if(dist[cur]<=cost) continue;
dist[cur]=cost;
```

## 그래프 저장

가중치가 있는 그래프는 인접 리스트로 저장한다.

```cpp
struct element {
    long long u, w;
};
```

```cpp
vector<vector<element>> conn(MAX);
```

방향 간선 `u → v`의 가중치가 `w`라면 다음과 같이 저장한다.

```cpp
conn[u].push_back({v, w});
```

양방향 간선이라면 반대 방향도 함께 저장한다.

```cpp
conn[u].push_back({v, w});
conn[v].push_back({u, w});
```

## 구현

`priority_queue`를 이용해 구현한다. $O((V+E)\log V)$

```cpp
struct element {
    ll u, w;
    bool operator<(const element& e) const {
        return w > e.w;
    }
};

ll dist[MAX];
vector<vector<element>> conn(MAX);

void dijkstra(int start, int n) {
    fill(dist, dist+n+1, LINF);
    priority_queue<element> pq; pq.push({start, 0});
    while(!pq.empty()) {
        auto [cur, cost]=pq.top(); pq.pop();
        if(dist[cur]<=cost) continue;
        dist[cur]=cost;
        for(auto [next, weight]:conn[cur]) {
            ll nextCost=cost+weight;
            if(nextCost<dist[next]) {
                pq.push({next, nextCost});
            }
        }
    }
}
```

`priority_queue`는 기본적으로 큰 값을 먼저 꺼낸다.

비교 연산자를 반대로 설정하면 거리가 작은 후보를 먼저 꺼낼 수 있다.

```cpp
bool operator<(const element& e) const {
    return w > e.w;
}
```

## 음수 간선

다익스트라는 음수 간선이 있으면 사용할 수 없다.

이미 확정한 거리보다 더 짧은 경로가 나중에 나타날 수 있기 때문이다.

## 연습 문제

[https://soj.services/problems/38](https://soj.services/problems/38)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll LINF=0x3f3f3f3f3f3f3f3f;

struct element {
    ll u, w;
    bool operator<(const element& e) const {
        return w > e.w;
    }
};

ll dist[100'001];
vector<vector<element>> conn(100'001);

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m, s; cin >> n >> m >> s;
    while(m--) {
        int u, v, w; cin >> u >> v >> w;
        conn[u].push_back({v, w});
        conn[v].push_back({u, w});
    }

    fill(dist, dist+n+1, LINF);
    priority_queue<element> pq; pq.push({s, 0});
    while(!pq.empty()) {
        auto [cur, cost] = pq.top(); pq.pop();
        if(dist[cur]<=cost) continue;
        dist[cur]=cost;
        for(auto [nxt, w]:conn[cur]) {
            if(dist[nxt]>cost+w) {
                pq.push({nxt, cost+w});
            }
        }
    }
    for(int i=1;i<=n;i++) cout << (dist[i]==LINF ? -1 : dist[i]) << "\n";
}
```

</details>