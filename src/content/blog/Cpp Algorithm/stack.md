---
title: "Stack"
pubDate: 2026-05-31
tags: ["자료 구조"]
---

`stack`은 원소를 순서대로 쌓고 가장 나중에 추가한 원소부터 꺼내는 후입선출(LIFO, Last In First Out) 자료구조이다.

## 헤더 파일

`stack`을 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<stack>
```

보통 PS에서는 여러 표준 라이브러리를 한 번에 포함하기 위해 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `stack`은 다음과 같이 선언한다. $O(1)$

```cpp
stack<int> stk;
```

위 코드는 `int` 자료형의 원소를 저장하는 `stack`을 생성한다.

## 원소 추가와 삭제

맨 위에 원소를 추가할 때는 `push()`를 사용한다. $O(1)$

```cpp
stk.push(10);
stk.push(20);
stk.push(30);
```

위 코드를 실행하면 `10`, `20`, `30`이 차례대로 저장된다.

가장 나중에 추가한 `30`이 맨 위에 위치한다.

맨 위 원소를 삭제할 때는 `pop()`을 사용한다. $O(1)$

```cpp
stk.pop();
```

위 코드를 실행하면 맨 위에 있던 `30`이 삭제된다.

`pop()`은 원소를 삭제하지만, 삭제한 값을 반환하지는 않는다.

## 원소 접근

맨 위 원소는 `top()`으로 확인할 수 있다. $O(1)$

```cpp
cout << stk.top();
```

`stack`에서는 맨 위 원소에만 접근할 수 있다.

배열이나 `vector`와 달리 인덱스를 이용해 중간 원소에 직접 접근할 수는 없다.

단, 비어 있는 `stack`에서 `top()`이나 `pop()`을 호출하면 안 된다.

## 크기 확인

현재 저장된 원소의 개수는 `size()`로 확인한다. $O(1)$

```cpp
cout << stk.size();
```

비어 있는지는 `empty()`로 확인한다. $O(1)$

```cpp
if(stk.empty()) {
    cout << "empty";
}
```

`empty()`는 원소가 하나도 없으면 `true`, 그렇지 않으면 `false`를 반환한다.

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