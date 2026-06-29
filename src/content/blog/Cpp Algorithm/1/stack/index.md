---
title: "Stack"
pubDate: 2026-05-31
tags: ["자료 구조"]
difficulty: "Silver IV"
description: "가장 나중에 넣은 원소를 먼저 꺼내는 후입선출 자료구조"
---

`stack`은 가장 나중에 넣은 원소를 가장 먼저 꺼내는 자료구조이다.

이 방식을 후입선출이라고 한다.

## 헤더 파일

```cpp
#include<stack>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `stack`을 만든다. $O(1)$

```cpp
stack<int> stk;
```

## 추가와 삭제

맨 위에 원소를 추가한다. $O(1)$

```cpp
stk.push(10);
stk.push(20);
stk.push(30);
```

맨 위 원소를 삭제한다. $O(1)$

```cpp
stk.pop();
```

`pop()`은 삭제한 값을 반환하지 않는다.

## 접근

맨 위 원소를 확인한다. $O(1)$

```cpp
cout << stk.top();
```

`stack`은 맨 위 원소에만 접근할 수 있다.

인덱스로 중간 원소에 직접 접근할 수 없다.

비어 있는 `stack`에서 `top()`이나 `pop()`을 호출하면 안 된다.

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << stk.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(stk.empty()) {
    cout << "empty";
}
```

## 연습 문제

[https://soj.services/problems/16](https://soj.services/problems/16)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    stack<int> stk;
    int q; cin >> q;
    while(q--) {
        string s; int x; cin >> s;
        if(s=="push") {
            cin >> x;
            stk.push(x);
        } else if(s=="pop") {
            stk.pop();
        } else if(s=="top") {
            cout << stk.top() << '\n';
        } else {
            cout << stk.size() << '\n';
        }
    }
}
```

</details>