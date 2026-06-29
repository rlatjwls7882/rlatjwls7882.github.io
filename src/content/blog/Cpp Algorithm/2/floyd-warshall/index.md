---
title: "Floyd-Warshall Algorithm"
pubDate: 2026-06-10
tags: ["그래프", "최단 경로"]
difficulty: "Gold IV"
description: "모든 정점 쌍 사이의 최단 거리를 DP로 구하는 알고리즘"
---

플로이드-워셜은 모든 정점 쌍 사이의 최단 거리를 구하는 알고리즘이다.

모든 출발점과 도착점의 조합을 한 번에 처리한다.

## 동작 원리

다음 그래프에서 모든 정점 쌍 사이의 최단 거리를 구한다고 하자.

![예시 그래프](1.svg)

먼저 간선을 이용해 거리 행렬을 만든다.

`dist[start][end]`는 `start`에서 `end`까지 현재까지 찾은 가장 짧은 거리이다.

직접 연결된 간선이 있다면 간선의 가중치를 저장한다.

```cpp
dist[u][v]=min(dist[u][v], w);
```

같은 두 정점 사이에 여러 간선이 있을 수 있으므로 가장 작은 가중치만 남긴다.

자기 자신까지의 거리는 $0$으로 두고 연결되지 않은 정점 사이의 거리는 무한대로 둔다.

```cpp
fill(dist[0], dist[MAX], LINF);

for(int i=1;i<=n;i++) {
    dist[i][i]=0;
}
```

![간선을 이용해 만든 초기 거리 행렬](2.svg)

이후 각 정점을 경유지 `mid`로 사용한다.

`start`에서 `end`로 바로 가는 거리와 `mid`를 거쳐 가는 거리를 비교한다.

```cpp
dist[start][end]=min(dist[start][end], dist[start][mid]+dist[mid][end]);
```

예를 들어 `mid=1`이라면 모든 쌍에 대해 `start → 1 → end` 경로를 확인한다.

![1번 정점을 경유지로 사용한 뒤](3.svg)

이 과정을 모든 정점에 대해 반복한다.

![모든 정점을 경유지로 사용한 뒤](4.svg)

최종 행렬에는 모든 정점 쌍 사이의 최단 거리가 저장된다.

## 구현

플로이드-워셜은 다음과 같이 구현한다. $O(V^3)$

```cpp
ll dist[MAX][MAX];

void floydWarshall(int n) {
    for(int mid=1;mid<=n;mid++) {
        for(int start=1;start<=n;start++) {
            for(int end=1;end<=n;end++) {
                dist[start][end]=min(dist[start][end], dist[start][mid]+dist[mid][end]);
            }
        }
    }
}
```

반복문의 순서는 `mid → start → end`여야 한다.

`mid`번 정점까지 경유지로 사용할 수 있을 때의 최단 거리를 이용해 다음 상태를 계산하기 때문이다.

## 초기화

간선을 입력받기 전에는 거리 행렬을 초기화한다.

```cpp
fill(dist[0], dist[MAX], LINF);

for(int i=1;i<=n;i++) {
    dist[i][i]=0;
}
```

방향 간선 `u → v`의 가중치가 `w`라면 다음과 같이 저장한다.

```cpp
dist[u][v]=min(dist[u][v], w);
```

양방향 간선이라면 반대 방향도 함께 저장한다.

```cpp
dist[u][v]=min(dist[u][v], w);
dist[v][u]=min(dist[v][u], w);
```

## 음수 간선

플로이드-워셜은 음수 간선이 있어도 사용할 수 있다.

음수 사이클을 확인하려면 실행 후 `dist[i][i]`가 음수인지 확인한다.

```cpp
for(int i=1;i<=n;i++) {
    if(dist[i][i]<0) {
        cout << "NEGATIVE CYCLE";
    }
}
```

## 시간복잡도

세 개의 반복문이 각각 $V$번 실행되므로 시간복잡도는 $O(V^3)$이다.

거리 행렬을 저장하므로 공간복잡도는 $O(V^2)$이다.

## 연습 문제

[https://soj.services/problems/40](https://soj.services/problems/40)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
const ll LINF=0x3f3f3f3f3f3f3f3f;

ll dist[401][401];

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m; cin >> n >> m;

    fill(dist[0], dist[401], LINF);
    for(int i=1;i<=n;i++) dist[i][i]=0;
    while(m--) {
        ll u, v, w; cin >> u >> v >> w;
        dist[u][v]=min(dist[u][v], w);
    }

    for(int m=1;m<=n;m++) {
        for(int s=1;s<=n;s++) {
            for(int e=1;e<=n;e++) {
                dist[s][e] = min(dist[s][e], dist[s][m]+dist[m][e]);
            }
        }
    }
    for(int i=1;i<=n;i++) {
        for(int j=1;j<=n;j++) {
            if(dist[i][j]==LINF) cout << "INF ";
            else cout << dist[i][j] << ' ';
        }
        cout << '\n';
    }
}
```

</details>