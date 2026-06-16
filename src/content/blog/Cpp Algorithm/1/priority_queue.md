---
title: "Priority Queue"
pubDate: 2026-06-01
tags: ["자료 구조"]
difficulty: "Silver II"
---

`priority_queue`는 우선순위가 가장 높은 원소부터 꺼내는 자료구조이다.

C++에서는 기본적으로 값이 큰 원소가 먼저 나온다.

## 헤더 파일

```cpp
#include<queue>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `priority_queue`를 만든다. $O(1)$

```cpp
priority_queue<int> pq;
```

기본적으로 가장 큰 값이 맨 위에 위치한다.

## 추가와 삭제

원소를 추가한다. $O(\log n)$

```cpp
pq.push(10);
pq.push(30);
pq.push(20);
```

맨 위 원소를 삭제한다. $O(\log n)$

```cpp
pq.pop();
```

`pop()`은 삭제한 값을 반환하지 않는다.

## 접근

맨 위 원소를 확인한다. $O(1)$

```cpp
cout << pq.top();
```

`priority_queue`는 우선순위가 가장 높은 원소에만 접근할 수 있다.

인덱스로 중간 원소에 직접 접근할 수 없다.

비어 있는 `priority_queue`에서 `top()`이나 `pop()`을 호출하면 안 된다.

## 최소 힙

가장 작은 값이 먼저 나오게 하려면 비교 기준을 바꾼다.

```cpp
priority_queue<int, vector<int>, greater<int>> pq;
```

이 경우 `top()`은 현재 저장된 원소 중 가장 작은 값을 반환한다.

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << pq.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(pq.empty()) {
    cout << "empty";
}
```

## 연습 문제

[https://soj.services/problems/20](https://soj.services/problems/20)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    priority_queue<int> pq;
    int q; cin >> q;
    while(q--) {
        string s; int x; cin >> s;
        if(s=="push") {
            cin >> x;
            pq.push(x);
        } else if(s=="pop") {
            pq.pop();
        } else if(s=="top") {
            cout << pq.top() << '\n';
        } else {
            cout << pq.size() << '\n';
        }
    }
}
```

</details>