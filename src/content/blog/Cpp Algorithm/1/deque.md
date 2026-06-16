---
title: "Deque"
pubDate: 2026-06-01
tags: ["자료 구조"]
difficulty: "Silver IV"
---

`deque`는 양쪽 끝에서 원소를 추가하거나 삭제할 수 있는 자료구조이다.

앞과 뒤를 모두 사용할 수 있고 인덱스로 원소에 접근할 수도 있다.

## 헤더 파일

```cpp
#include<deque>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `deque`를 만든다. $O(1)$

```cpp
deque<int> deq;
```

## 추가와 삭제

맨 앞에 원소를 추가한다. $O(1)$

```cpp
deq.push_front(10);
```

맨 뒤에 원소를 추가한다. $O(1)$

```cpp
deq.push_back(20);
```

맨 앞 원소를 삭제한다. $O(1)$

```cpp
deq.pop_front();
```

맨 뒤 원소를 삭제한다. $O(1)$

```cpp
deq.pop_back();
```

`pop_front()`와 `pop_back()`은 삭제한 값을 반환하지 않는다.

## 접근

맨 앞 원소와 맨 뒤 원소를 확인한다. $O(1)$

```cpp
cout << deq.front();
cout << deq.back();
```

인덱스로 원소에 접근할 수도 있다. $O(1)$

```cpp
cout << deq[i];
```

인덱스는 $0$부터 시작한다.

크기가 $n$인 `deque`에서 첫 번째 원소는 `deq[0]`, 마지막 원소는 `deq[n-1]`이다.

비어 있는 `deque`에서 `front()`, `back()`, `pop_front()`, `pop_back()`을 호출하면 안 된다.

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << deq.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(deq.empty()) {
    cout << "empty";
}
```

## 연습 문제

[https://soj.services/problems/19](https://soj.services/problems/19)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
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