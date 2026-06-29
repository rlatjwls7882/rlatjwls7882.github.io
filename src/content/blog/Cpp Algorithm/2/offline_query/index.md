---
title: "Offline Query"
pubDate: 2026-06-14
tags: ["쿼리 처리"]
difficulty: "Gold IV"
description: "쿼리 순서를 바꾸거나 미리 저장해 효율적으로 처리하는 기법"
---

`Offline Query`는 쿼리를 입력 순서대로 바로 처리하지 않고 모두 저장한 뒤 순서를 바꾸어 처리하는 기법이다.

쿼리 전체를 미리 알고 있으면 정렬이나 역순 처리를 이용해 어려운 연산을 쉬운 연산으로 바꿀 수 있다.

## 문제 형태

배열 `a`가 있고 여러 쿼리 `x`가 주어진다고 하자.

각 쿼리에서는 값이 $x$ 이하인 원소만 사용할 수 있다.

사용할 수 있는 원소들이 연속한 구간을 만들 때 가장 긴 구간의 길이를 구한다.

예를 들어 다음 배열이 있다고 하자.

```text
a = [4, 1, 3, 2, 5]
```

쿼리 `x=3`에서는 값이 $3$ 이하인 위치만 사용할 수 있다.

이때 가장 긴 연속 구간의 길이는 $3$이다.

## 바로 처리하기

각 쿼리마다 배열 전체를 확인하면 한 쿼리에 $O(N)$이 걸린다.

쿼리가 $Q$개라면 전체 시간복잡도는 $O(NQ)$가 된다.

```cpp
while(q--) {
    int res=0;
    for(int i=0;i<n;i++) {
        int len=0;
        if(a[i]<=x) {
            ...
        }
    }
}
```

하지만 쿼리를 모두 알고 있다면 더 작은 값부터 처리할 수 있다.

## 쿼리 정렬

값이 작은 원소부터 하나씩 활성화한다고 생각하자.

쿼리도 `x`가 작은 순서대로 정렬한다.

```cpp
sort(v.begin(), v.end());
sort(query.begin(), query.end());
```

`v`에는 배열의 값과 위치를 함께 저장한다.

```cpp
v[i]={a[i], i};
```

`query`에는 쿼리 값과 원래 인덱스를 함께 저장한다.

```cpp
query[i]={x, i};
```

정렬한 뒤 작은 쿼리부터 처리하면 한 번 활성화한 원소는 이후 쿼리에서도 계속 사용할 수 있다.

따라서 같은 원소를 여러 번 확인하지 않아도 된다.

## 원소 활성화

현재 쿼리 값이 `x`라면 값이 `x` 이하인 원소를 모두 활성화한다.

```cpp
while(idx<n && v[idx].first<=x) {
    int i=v[idx++].second;
    sz[i]=1;
    par[i]=i;
}
```

`sz[i]`가 $0$이면 아직 활성화되지 않은 위치이다.

`sz[i]`가 $1$ 이상이면 활성화된 위치이다.

새로 활성화한 위치의 왼쪽이나 오른쪽이 이미 활성화되어 있다면 두 구간을 합친다.

```cpp
if(i>0 && sz[i-1]) merge(i, i-1);
if(i+1<n && sz[i+1]) merge(i, i+1);
```

연속한 활성 구간을 `DSU`의 하나의 집합으로 관리하는 것이다.

## 최댓값 갱신

새로운 위치를 활성화하고 주변 구간과 합친 뒤 해당 집합의 크기를 확인한다.

```cpp
cur=max(cur, sz[find(i)]);
```

`cur`에는 지금까지 만들어진 활성 구간 중 가장 긴 길이를 저장한다.

현재 쿼리의 답은 `cur`이다.

```cpp
res[qi]=cur;
```

쿼리를 정렬해서 처리했으므로 바로 출력하면 순서가 달라진다.

따라서 원래 쿼리 번호 `qi`에 답을 저장한다.

## 구현

값과 쿼리를 정렬한 뒤 작은 쿼리부터 처리한다.

```cpp
sort(v.begin(), v.end());
sort(query.begin(), query.end());

int idx=0, cur=0;
for(auto [x, qi]:query) {
    while(idx<n && v[idx].first<=x) {
        int i=v[idx++].second;
        sz[i]=1;
        par[i]=i;
        if(i>0 && sz[i-1]) merge(i, i-1);
        if(i+1<n && sz[i+1]) merge(i, i+1);
        cur=max(cur, sz[find(i)]);
    }
    res[qi]=cur;
}
```

배열의 각 원소는 한 번만 활성화된다.

각 활성화마다 최대 두 번의 `merge()`를 수행한다.

따라서 전체 시간복잡도는 $O(N\log N+Q\log Q)$이다.

정렬을 제외한 `DSU` 처리 시간은 $O(N\alpha(N))$이다.

공간복잡도는 $O(N+Q)$이다.

## 연습 문제

[https://soj.services/problems/59](https://soj.services/problems/59)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int par[200'000], sz[200'000];

int find(int x) {
    if(x==par[x]) return x;
    return par[x] = find(par[x]);
}

void merge(int x, int y) {
    x=find(x);
    y=find(y);
    if(x<y) {
        par[y]=x;
        sz[x]+=sz[y];
    } else if(x>y) {
        par[x]=y;
        sz[y]+=sz[x];
    }
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, q; cin >> n >> q;
    vector<pair<int, int>> v(n), query(q);
    for(int i=0;i<n;i++) {
        cin >> v[i].first;
        v[i].second=i;
    }
    for(int i=0;i<q;i++) {
        cin >> query[i].first;
        query[i].second=i;
    }
    sort(v.begin(), v.end());
    sort(query.begin(), query.end());

    int idx=0, cur=0;
    vector<int> res(q);
    for(auto [x, qi]:query) {
        while(idx<n && v[idx].first<=x) {
            int i=v[idx++].second;
            sz[i]=1; par[i]=i;
            if(i>0 && sz[i-1]) merge(i, i-1);
            if(i+1<n && sz[i+1]) merge(i, i+1);
            cur = max(cur, sz[find(i)]);
        }
        res[qi]=cur;
    }
    for(auto e:res) cout << e << '\n';
}
```

</details>