---
title: "Binary Search"
pubDate: 2026-06-03
tags: ["탐색"]
difficulty: "Silver IV"
description: "정렬된 데이터에서 탐색 구간을 절반씩 줄이며 원하는 위치를 찾는 알고리즘"
---

이분 탐색은 정렬된 배열에서 탐색 범위를 절반씩 줄이는 알고리즘이다.

원소가 $n$개일 때 값의 존재 여부나 특정 조건을 처음 만족하는 위치를 $O(\log n)$에 찾을 수 있다.

## 동작 원리

값이 $21$ 이상인 원소가 처음 나타나는 위치를 찾는다고 하자.

```text
0  4  7  10  15  20  30  35
```

처음에는 배열 전체를 탐색 범위로 둔다.

```cpp
int left=0, right=7;
```

가운데 원소를 확인한다.

![처음 가운데 위치를 확인한 상태](1.svg)

`a[mid]`가 $21$보다 작으면 `mid` 이하의 원소는 답이 될 수 없다.

```cpp
left=mid+1;
```

![왼쪽 절반을 제외한 상태](2.svg)

다시 가운데 원소를 확인한다.

`a[mid]`가 $21$ 이상이면 `mid`가 답일 수 있으므로 탐색 범위에 남긴다.

```cpp
right=mid;
```

![값이 21 이상인 위치를 찾은 상태](3.svg)

`left`와 `right`가 같아지면 탐색이 끝난다.

![탐색이 종료된 상태](4.svg)

이 예제에서 답은 인덱스 $6$이다.

## 구현

값 `x` 이상인 원소가 처음 나타나는 위치를 찾는다. $O(\log n)$

```cpp
int lowerBound(vector<int>& a, int x) {
    int left=0, right=a.size();

    while(left<right) {
        int mid=(left+right)>>1;
        if(a[mid]<x) left=mid+1;
        else right=mid;
    }

    return left;
}
```

`right`를 `a.size()`로 두면 모든 원소가 `x`보다 작은 경우에도 처리할 수 있다.

반환값이 `a.size()`이면 `x` 이상인 원소가 없다는 뜻이다.

값이 존재하는지는 다음과 같이 확인한다.

```cpp
int idx=lowerBound(a, x);

if(idx<a.size() && a[idx]==x) {
    cout << "exist";
}
```

## 내장 함수

C++에서는 `lower_bound()`를 사용할 수 있다. $O(\log n)$

```cpp
auto it=lower_bound(a.begin(), a.end(), x);
```

인덱스가 필요하면 시작 이터레이터를 뺀다.

```cpp
int idx=lower_bound(a.begin(), a.end(), x)-a.begin();
```

`binary_search()`는 값의 존재 여부만 반환한다. $O(\log n)$

```cpp
if(binary_search(a.begin(), a.end(), x)) {
    cout << "exist";
}
```

배열도 같은 방식으로 사용할 수 있다.

```cpp
int idx=lower_bound(a, a+n, x)-a;
```

## upper_bound

`upper_bound()`는 `x`보다 큰 원소가 처음 나타나는 위치를 반환한다. $O(\log n)$

```cpp
vector<int> a = {10, 20, 20, 20, 30};

int left=lower_bound(a.begin(), a.end(), 20)-a.begin();
int right=upper_bound(a.begin(), a.end(), 20)-a.begin();
```

값이 $20$인 원소의 개수는 다음과 같이 구한다.

```cpp
cout << right-left;
```

위 코드는 $3$을 출력한다.

## 연습 문제

[https://soj.services/problems/23](https://soj.services/problems/23)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int a[100'000];

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, q; cin >> n >> q;
    for(int i=0;i<n;i++) cin >> a[i];
    while(q--) {
        int x; cin >> x;
        auto it = lower_bound(a, a+n, x);
        if(it==a+n || *it!=x) cout << "-1\n";
        else cout << it-a << '\n';
    }
}
```

</details>