---
title: "Bellman-Ford Algorithm"
pubDate: 2026-06-10
tags: ["그래프", "최단 경로"]
---

벨만-포드는 시작 정점으로부터의 최단 거리를 구하는 알고리즘이다.

다익스트라와 달리 가중치가 음수인 간선이 있어도 사용할 수 있으며 시작 정점에서 도달 가능한 음수 사이클의 존재 여부도 판별할 수 있다.

## 동작 원리

다음과 같은 방향 그래프에서 시작 정점 `s`로부터의 최단 거리를 구한다고 하자.

처음에는 시작 정점의 거리를 `0`으로 두고 나머지 정점의 거리를 무한대로 둔다.

```cpp
fill(dist, dist+n+1, LINF);
dist[s]=0;
```

`dist[i]`는 현재까지 발견한 `s`번 정점에서 `i`번 정점까지의 가장 짧은 거리를 의미한다.

벨만-포드는 모든 정점을 순서대로 확인하며 각 정점에서 나가는 간선을 모두 살펴본다.

현재 정점 `j`까지 도달할 수 있고 `j → nxt` 간선을 이용해 더 짧게 이동할 수 있다면 `dist[nxt]`를 갱신한다.

```cpp
for(int j=1;j<=n;j++) {
    if(dist[j]==LINF) continue;

    for(auto [nxt, w]:conn[j]) {
        if(dist[nxt]>dist[j]+w) {
            dist[nxt]=dist[j]+w;
        }
    }
}
```

이처럼 더 짧은 경로를 찾았을 때 거리를 갱신하는 과정을 간선 완화라고 한다.

그림에서는 다음 순서로 간선을 확인한다.

```text
3 → 4
2 → 3
1 → 2
1 → 3
2 → 4
```

첫 번째 반복이 끝나면 거리는 다음과 같다.

![첫 번째 반복이 끝난 상태](1.svg)

```text
dist[1] = 0
dist[2] = 4
dist[3] = 5
dist[4] = 10
```

`2 → 3` 간선은 `1 → 2`보다 먼저 확인했다.

따라서 첫 번째 반복에서는 `1 → 2 → 3` 경로가 아직 반영되지 않았다.

두 번째 반복에서 `dist[3]`은 `2`로 줄어든다.

세 번째 반복에서는 `3 → 4` 간선까지 갱신이 전파되어 `dist[4]`가 `5`로 줄어든다.

![최단 거리가 완성된 상태](2.svg)

최종 거리는 다음과 같다.

```text
0  4  2  5
```

거리 배열은 간선을 확인하는 즉시 갱신한다.

따라서 정점을 확인하는 순서에 따라 같은 반복 안에서도 여러 간선을 거쳐 거리가 갱신될 수 있다.

음수 사이클이 없다면 최단 경로는 같은 정점을 두 번 이상 지날 필요가 없으므로 최대 `n-1`개의 간선으로 이루어진다.

따라서 모든 간선을 최대 `n-1`번 확인하면 최단 거리를 구할 수 있다.

한 번의 반복에서 거리 갱신이 발생하지 않았다면 이후에도 값은 바뀌지 않으므로 바로 종료할 수 있다.

```cpp
if(!update) break;
```

## 음수 사이클

음수 사이클은 간선 가중치의 합이 음수인 사이클이다.

음수 사이클을 반복해서 돌면 경로의 길이를 계속 줄일 수 있다.

음수 사이클이 없다면 `n-1`번의 반복 이후에는 더 이상 거리가 줄어들지 않는다.

따라서 `n`번째 반복에서도 갱신이 발생한다면 시작 정점에서 도달 가능한 음수 사이클이 존재한다.

```cpp
for(int i=0;i<n;i++) {
    bool update=false;

    ...

    if(!update) break;
    if(i==n-1) return !(cout << "NEGATIVE CYCLE");
}
```

도달할 수 없는 정점은 건너뛰므로 시작 정점과 연결되지 않은 음수 사이클은 판별하지 않는다.

```cpp
if(dist[j]==LINF) continue;
```

## 구현

벨만-포드는 다음과 같이 구현할 수 있다. $O(VE)$

```cpp
ll dist[MAX];
vector<vector<pair<ll, ll>>> conn(MAX);

bool bellmanFord(int start, int n) {
    fill(dist, dist+n+1, LINF);
    dist[start]=0;
    for(int i=0;i<n;i++) {
        bool update=false;
        for(int cur=1;cur<=n;cur++) {
            if(dist[cur]==LINF) continue;
            for(auto [nxt, w]:conn[cur]) {
                if(dist[nxt]>dist[cur]+w) {
                    dist[nxt]=dist[cur]+w;
                    update=true;
                }
            }
        }
        if(!update) return true;
    }
    return false;
}
```

음수 사이클이 없다면 `true`를 반환한다.

시작 정점에서 도달 가능한 음수 사이클이 있다면 `false`를 반환한다.

```cpp
if(!bellmanFord(s, n)) {
    cout << "NEGATIVE CYCLE";
}
```

가중치가 있는 방향 그래프는 인접 리스트를 이용해 저장한다.

```cpp
conn[u].push_back({v, w});
```

`conn[u]`에는 `u`번 정점에서 이동할 수 있는 정점과 간선의 가중치가 저장된다.

## 시간복잡도

한 번의 반복에서 모든 간선을 확인하므로 $O(E)$가 걸린다.

이 과정을 최대 `V`번 반복하므로 전체 시간복잡도는 $O(VE)$이다.

여기서 `V`는 정점의 개수이고 `E`는 간선의 개수이다.

## 연습 문제

[https://soj.services/problems/39](https://soj.services/problems/39)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll LINF=0x3f3f3f3f3f3f3f3f;

ll dist[1001];
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
    for(int i=0;i<n;i++) {
        bool update=false;
        for(int j=1;j<=n;j++) {
            if(dist[j]==LINF) continue;
            for(auto [nxt, w]:conn[j]) {
                if(dist[nxt]>dist[j]+w) {
                    dist[nxt]=dist[j]+w;
                    update=true;
                }
            }
        }
        if(!update) break;
        if(i==n-1) return !(cout << "NEGATIVE CYCLE");
    }
    for(int i=1;i<=n;i++) {
        if(dist[i]==LINF) cout << "INF\n";
        else cout << dist[i] << '\n';
    }
}
```

</details>