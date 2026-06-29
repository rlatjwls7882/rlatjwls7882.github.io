---
title: "DSU (Disjoint Set Union)"
pubDate: 2026-06-02
tags: ["자료 구조"]
difficulty: "Gold V"
description: "서로소 집합을 관리하며 두 원소의 연결 여부를 빠르게 처리하는 자료구조"
---

`DSU`는 서로 겹치지 않는 집합을 관리하는 자료구조이다.

`Union-Find`라고도 부르며 두 원소가 같은 집합에 속하는지 확인하거나 두 집합을 합칠 때 사용한다.

## 대표 원소

각 집합은 하나의 대표 원소를 갖는다.

두 원소의 대표 원소가 같다면 같은 집합에 속한다.

처음에는 모든 원소가 서로 다른 집합에 속한다.

![초기 상태](1.svg)

각 원소의 부모를 자기 자신으로 설정한다. $O(n)$

```cpp
for(int i=1;i<=n;i++) {
    par[i]=i;
    sz[i]=1;
}
```

`par[x]`는 `x`의 부모를 저장한다.

`sz[x]`는 `x`가 대표 원소일 때 집합의 크기를 저장한다.

## 대표 원소 찾기

`find()`는 원소가 속한 집합의 대표 원소를 찾는다.

```cpp
int find(int x) {
    if(par[x]==x) return x;
    return find(par[x]);
}
```

부모를 계속 따라가다가 자기 자신을 부모로 갖는 원소를 만나면 그 원소가 대표 원소이다.

두 원소가 같은 집합인지 확인할 때는 대표 원소를 비교한다.

```cpp
if(find(a)==find(b)) {
    cout << "same";
}
```

## 집합 합치기

`merge()`는 두 원소가 속한 집합을 하나로 합친다.

먼저 두 원소의 대표 원소를 찾는다.

```cpp
a=find(a);
b=find(b);
```

이미 같은 집합이면 더 합칠 필요가 없다.

```cpp
if(a==b) return;
```

이 글의 구현에서는 작은 대표 원소를 새 대표 원소로 사용한다.

```cpp
if(a<b) {
    par[b]=a;
    sz[a]+=sz[b];
} else {
    par[a]=b;
    sz[b]+=sz[a];
}
```

![두 집합을 합친 상태](2.svg)

## 경로 압축

대표 원소를 찾는 과정에서 지나간 정점의 부모를 바로 대표 원소로 바꿀 수 있다.

```cpp
int find(int x) {
    if(par[x]==x) return x;
    return par[x]=find(par[x]);
}
```

![경로 압축을 적용한 상태](3.svg)

경로 압축을 적용하면 이후의 `find()`를 더 빠르게 수행할 수 있다.

## 구현

`find()`와 `merge()`는 다음과 같이 구현한다.

```cpp
int par[MAX], sz[MAX];

int find(int x) {
    if(par[x]==x) return x;
    return par[x]=find(par[x]);
}

void merge(int a, int b) {
    a=find(a);
    b=find(b);

    if(a==b) return;

    if(a<b) {
        par[b]=a;
        sz[a]+=sz[b];
    } else {
        par[a]=b;
        sz[b]+=sz[a];
    }
}
```

원소 `x`가 속한 집합의 크기는 다음과 같이 구한다.

```cpp
cout << sz[find(x)];
```

경로 압축을 사용하면 `find()`와 `merge()`를 매우 빠르게 수행할 수 있다.

대표적으로 크기 기준 합치기까지 함께 사용하면 시간복잡도는 $O(\alpha(n))$이다.

## 연습 문제

[https://soj.services/problems/21](https://soj.services/problems/21)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int par[1'000'001], sz[1'000'001];

int find(int x) {
    if(par[x]==x) return x;
    return par[x]=find(par[x]);
}

void merge(int a, int b) {
    a=find(a);
    b=find(b);
    if(a==b) return;
    if(a<b) {
        par[b]=a;
        sz[a]+=sz[b];
    } else {
        par[a]=b;
        sz[b]+=sz[a];
    }
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, q; cin >> n >> q;
    for(int i=1;i<=n;i++) {
        par[i]=i;
        sz[i]=1;
    }

    while(q--) {
        string s; int a, b; cin >> s;
        if(s=="merge") {
            cin >> a >> b;
            merge(a, b);
        } else if(s=="same") {
            cin >> a >> b;
            cout << (find(a)==find(b)) << '\n';
        } else {
            cin >> a;
            cout << sz[find(a)] << '\n';
        }
    }
}
```

</details>