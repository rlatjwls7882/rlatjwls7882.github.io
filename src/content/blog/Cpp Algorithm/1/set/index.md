---
title: "Set"
pubDate: 2026-06-01
tags: ["자료 구조"]
difficulty: "Silver V"
description: "중복 없는 원소를 저장하고 탐색하는 자료구조"
---

`set`은 중복되지 않는 원소를 정렬된 상태로 저장하는 자료구조이다.

같은 값을 여러 번 추가해도 하나만 저장된다.

## 헤더 파일

```cpp
#include<set>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `set`을 만든다. $O(1)$

```cpp
set<int> s;
```

`set`의 원소는 기본적으로 오름차순으로 정렬된다.

## 추가와 삭제

원소를 추가한다. $O(\log n)$

```cpp
s.insert(30);
s.insert(10);
s.insert(20);
s.insert(20);
```

위 코드에서 `20`은 한 번만 저장된다.

원소를 삭제한다. $O(\log n)$

```cpp
s.erase(20);
```

존재하지 않는 원소를 삭제해도 오류가 발생하지 않는다.

## 탐색

원소가 존재하는지 확인한다. $O(\log n)$

```cpp
if(s.count(20)) {
    cout << "exist";
}
```

`count()`는 원소가 존재하면 $1$, 없으면 $0$을 반환한다.

## 순회

범위 기반 `for`문으로 원소를 순서대로 확인할 수 있다. $O(n)$

```cpp
for(int x:s) {
    cout << x << ' ';
}
```

`set`은 인덱스로 원소에 직접 접근할 수 없다.

## 정렬 기준 변경

내림차순으로 정렬하려면 비교 기준을 지정한다.

```cpp
set<int, greater<int>> s;
```

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << s.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(s.empty()) {
    cout << "empty";
}
```

모든 원소를 삭제한다. $O(n)$

```cpp
s.clear();
```

## unordered_set

`unordered_set`은 중복되지 않는 원소를 저장하지만 정렬하지 않는다.

삽입, 삭제, 탐색을 평균 $O(1)$에 수행한다.

```cpp
#include<unordered_set>
```

```cpp
unordered_set<int> s;
```

사용 방법은 `set`과 거의 같다.

```cpp
s.insert(10);
s.erase(10);

if(s.count(10)) {
    cout << "exist";
}
```

해시 충돌이 많이 발생하면 최악의 경우 $O(n)$까지 걸릴 수 있다.

## 연습 문제

[https://soj.services/problems/11](https://soj.services/problems/11)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    set<int> s;
    int q; cin >> q;
    while(q--) {
        string op; int x; cin >> op;
        if(op=="insert") {
            cin >> x;
            s.insert(x);
        } else if(op=="erase") {
            cin >> x;
            s.erase(x);
        } else if(op=="count") {
            cin >> x;
            cout << s.count(x) << '\n';
        } else if(op=="size") {
            cout << s.size() << '\n';
        } else if(op=="empty") {
            cout << s.empty() << '\n';
        } else {
            s.clear();
        }
    }
}
```

</details>