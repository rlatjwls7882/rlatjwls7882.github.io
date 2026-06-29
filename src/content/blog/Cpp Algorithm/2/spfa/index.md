---
title: "SPFA (Shortest Path Faster Algorithm)"
pubDate: 2026-06-10
tags: ["그래프", "최단 경로"]
difficulty: "Gold IV"
description: "갱신이 필요한 정점만 큐에 넣어 Bellman-Ford를 최적화하는 최단 거리 알고리즘"
---

`SPFA`는 벨만-포드를 기반으로 시작 정점으로부터의 최단 거리를 구하는 알고리즘이다.

거리가 줄어든 정점만 `queue`에 넣어 다시 확인한다.

음수 간선이 있어도 사용할 수 있고 시작 정점에서 도달 가능한 음수 사이클도 판별할 수 있다.

## 동작 원리

시작 정점 `start`에서 각 정점까지의 최단 거리를 구한다고 하자.

처음에는 시작 정점의 거리를 $0$으로 두고 나머지는 무한대로 둔다.

```cpp
fill(dist, dist+n+1, LINF);
dist[start]=0;
```

시작 정점을 `queue`에 넣는다.

```cpp
queue<int> q; q.push(start);
```

![시작 정점을 큐에 넣은 상태](1.svg)

`queue`에서 정점 `cur`을 꺼낸 뒤 `cur`에서 나가는 간선을 확인한다.

```cpp
int cur=q.front(); q.pop();
```

현재 정점 `cur`을 거쳐 `nxt`로 더 짧게 이동할 수 있으면 거리를 갱신한다.

```cpp
if(dist[nxt]>dist[cur]+w) {
    dist[nxt]=dist[cur]+w;
}
```

![1번 정점에서 나가는 간선을 완화한 상태](2.svg)

거리가 줄어든 정점은 이후 다시 확인해야 하므로 `queue`에 넣는다.

큐가 비면 더 이상 갱신할 정점이 없으므로 탐색을 종료한다.

## 큐 중복 방지

같은 정점이 `queue`에 여러 번 들어가면 불필요한 탐색이 늘어난다.

`inQueue[x]`는 정점 `x`가 현재 `queue` 안에 있는지 저장한다.

```cpp
if(!inQueue[nxt]) {
    q.push(nxt);
    inQueue[nxt]=true;
}
```

정점을 꺼낼 때는 다시 `false`로 바꾼다.

```cpp
int cur=q.front(); q.pop();
inQueue[cur]=false;
```

이미 `queue`에 있는 정점은 거리가 줄어들어도 다시 넣지 않는다.

![이미 큐에 있는 정점을 다시 넣지 않는 상태](3.svg)

## 음수 사이클

`cnt[x]`에는 정점 `x`가 `queue`에 들어간 횟수를 저장한다.

```cpp
if(++cnt[nxt]==n) return false;
```

정점이 $n$개일 때 한 정점이 $n$번 `queue`에 들어갔다면 시작 정점에서 도달 가능한 음수 사이클이 존재한다고 볼 수 있다.

`cnt[nxt]`는 실제로 `queue`에 넣을 때만 증가시킨다.

```cpp
if(!inQueue[nxt]) {
    if(++cnt[nxt]==n) return false;
    q.push(nxt);
    inQueue[nxt]=true;
}
```

시작 정점에서 도달할 수 없는 음수 사이클은 판별하지 않는다.

## 그래프 저장

가중치가 있는 방향 그래프는 인접 리스트로 저장한다.

```cpp
vector<vector<pair<ll, ll>>> conn(MAX);
```

방향 간선 `u → v`의 가중치가 `w`라면 다음과 같이 저장한다.

```cpp
conn[u].push_back({v, w});
```

## 구현

`SPFA`는 다음과 같이 구현한다. 최악 $O(VE)$

```cpp
ll dist[MAX], cnt[MAX], inQ[MAX];
vector<vector<pair<ll, ll>>> conn(MAX);

bool spfa(int start, int n) {
    fill(dist, dist+n+1, LINF);
    dist[start]=0;
    queue<int> q; q.push(start);
    while(!q.empty()) {
        int cur=q.front(); q.pop();
        inQ[cur]=false;
        for(auto [nxt, w]:conn[cur]) {
            if(dist[nxt]<=dist[cur]+w) continue;
            dist[nxt]=dist[cur]+w;
            if(!inQ[nxt]) {
                if(++cnt[nxt]==n) return false;
                inQ[nxt]=true;
                q.push(nxt);
            }
        }
    }
    return true;
}
```

음수 사이클이 없다면 `true`를 반환한다.

시작 정점에서 도달 가능한 음수 사이클이 있다면 `false`를 반환한다.

## 시간복잡도

`SPFA`는 많은 입력에서 벨만-포드보다 빠르게 동작한다.

갱신이 필요한 정점만 `queue`에 넣어 확인하기 때문이다.

하지만 최악의 경우 시간복잡도는 $O(VE)$이다.

## 연습 문제

[https://soj.services/problems/39](https://soj.services/problems/39)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll LINF=0x3f3f3f3f3f3f3f3f;

ll inQ[1001], dist[1001], cnt[1001];
vector<vector<pair<ll, ll>>> conn(1001);

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m, s; cin >> n >> m >> s;
    while(m--) {
        ll u, v, w; cin >> u >> v >> w;
        conn[u].push_back({v, w});
    }

    fill(dist, dist+n+1, LINF);
    dist[s]=0;
    queue<int> q; q.push(s);
    while(!q.empty()) {
        int cur = q.front(); q.pop();
        inQ[cur]=false;
        for(auto [nxt, w]:conn[cur]) {
            if(dist[nxt]<=dist[cur]+w) continue;
            dist[nxt]=dist[cur]+w;
            if(!inQ[nxt]) {
                if(++cnt[nxt]==n) return !(cout << "NEGATIVE CYCLE");
                inQ[nxt]=true;
                q.push(nxt);
            }
        }
    }
    for(int i=1;i<=n;i++) {
        if(dist[i]==LINF) cout << "INF\n";
        else cout << dist[i] << '\n';
    }
}
```

</details>