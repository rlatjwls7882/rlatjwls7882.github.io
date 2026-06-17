---
title: "Queue"
pubDate: 2026-06-01
tags: ["자료 구조"]
difficulty: "Silver IV"
---

`queue`는 먼저 넣은 원소를 먼저 꺼내는 자료구조이다.

이 방식을 선입선출이라고 한다.

## 헤더 파일

```cpp
#include<queue>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `queue`를 만든다. $O(1)$

```cpp
queue<int> q;
```

## 추가와 삭제

맨 뒤에 원소를 추가한다. $O(1)$

```cpp
q.push(10);
q.push(20);
q.push(30);
```

맨 앞 원소를 삭제한다. $O(1)$

```cpp
q.pop();
```

`pop()`은 삭제한 값을 반환하지 않는다.

## 접근

맨 앞 원소와 맨 뒤 원소를 확인한다. $O(1)$

```cpp
cout << q.front();
cout << q.back();
```

`queue`는 맨 앞 원소와 맨 뒤 원소에만 접근할 수 있다.

인덱스로 중간 원소에 직접 접근할 수 없다.

비어 있는 `queue`에서 `front()`, `back()`, `pop()`을 호출하면 안 된다.

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << q.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(q.empty()) {
    cout << "empty";
}
```

## 연습 문제

[https://soj.services/problems/17](https://soj.services/problems/17)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    queue<int> Q;
    int q; cin >> q;
    while(q--) {
        string s; cin >> s;
        if(s=="push") {
            int x; cin >> x;
            Q.push(x);
        } else if(s=="pop") {
            Q.pop();
        } else if(s=="front") {
            cout << Q.front() << '\n';
        } else if(s=="back") {
            cout << Q.back() << '\n';
        } else {
            cout << Q.size() << '\n';
        }
    }
}
```

</details>