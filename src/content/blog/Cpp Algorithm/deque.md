---
title: "Deque"
pubDate: 2026-06-01
tags: ["자료 구조"]
---

`deque`는 양쪽 끝에서 원소를 추가하거나 삭제할 수 있는 자료구조이다.

`stack`과 `queue`의 기능을 모두 사용할 수 있으며 인덱스를 이용해 원소에 접근할 수도 있다.

## 헤더 파일

`deque`를 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<deque>
```

보통 PS에서는 여러 표준 라이브러리를 한 번에 포함하기 위해 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `deque`는 다음과 같이 선언한다. $O(1)$

```cpp
deque<int> deq;
```

위 코드는 `int` 자료형의 원소를 저장하는 `deque`를 생성한다.

## 원소 추가와 삭제

맨 앞에 원소를 추가할 때는 `push_front()`를 사용한다. $O(1)$

```cpp
deq.push_front(10);
```

맨 뒤에 원소를 추가할 때는 `push_back()`을 사용한다. $O(1)$

```cpp
deq.push_back(20);
deq.push_back(30);
```

위 코드를 실행하면 `deque`에는 `10`, `20`, `30`이 차례대로 저장된다.

맨 앞 원소를 삭제할 때는 `pop_front()`를 사용한다. $O(1)$

```cpp
deq.pop_front();
```

맨 뒤 원소를 삭제할 때는 `pop_back()`을 사용한다. $O(1)$

```cpp
deq.pop_back();
```

`pop_front()`와 `pop_back()`은 원소를 삭제하지만, 삭제한 값을 반환하지는 않는다.

## 원소 접근

맨 앞 원소와 맨 뒤 원소는 각각 `front()`, `back()`으로 확인할 수 있다. $O(1)$

```cpp
cout << deq.front();
cout << deq.back();
```

배열이나 `vector`와 같은 방식으로 인덱스를 이용해 원소에 접근할 수도 있다. $O(1)$

```cpp
cout << deq[0];
cout << deq[1];
```

인덱스는 $0$부터 시작한다.  
따라서 크기가 $n$인 `deque`에서 첫 번째 원소는 `deq[0]`, 마지막 원소는 `deq[n-1]`이다.

단, 비어 있는 `deque`에서 `front()`, `back()`, `pop_front()`, `pop_back()`을 호출하면 안 된다.

## 크기 확인

현재 저장된 원소의 개수는 `size()`로 확인한다. $O(1)$

```cpp
cout << deq.size();
```

비어 있는지는 `empty()`로 확인한다. $O(1)$

```cpp
if(deq.empty()) {
    cout << "empty";
}
```

`empty()`는 원소가 하나도 없으면 `true`, 그렇지 않으면 `false`를 반환한다.

## 연습 문제

[C++ Deque](https://soj.services/problems/19)

<details>
<summary>코드 보기</summary>

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int q; cin >> q;
    deque<int> D;
    while(q--) {
        string s; int x; cin >> s;
        if(s=="push_front") {
            cin >> x;
            D.push_front(x);
        } else if(s=="push_back") {
            cin >> x;
            D.push_back(x);
        } else if(s=="front") {
            cout << D.front() << '\n';
        } else if(s=="back") {
            cout << D.back() << '\n';
        } else if(s=="size") {
            cout << D.size() << '\n';
        } else if(s=="pop_back") {
            D.pop_back();
        } else {
            D.pop_front();
        }
    }
}
```

</details>