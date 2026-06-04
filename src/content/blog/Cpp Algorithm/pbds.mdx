---
title: "PBDS (Ordered Set)"
pubDate: 2026-06-03
tags: ["자료 구조"]
---

`PBDS`(Policy-Based Data Structures)는 GNU C++에서 제공하는 자료구조 모음이다.

이 글에서는 `PBDS`의 `tree`를 이용해 `ordered_set`을 만든다.

`ordered_set`은 `set`처럼 중복되지 않는 원소를 정렬된 상태로 저장한다. 여기에 특정 값보다 작은 원소의 개수와 `k`번째 원소를 구하는 기능이 추가되어 있다.

## 헤더 파일

`PBDS`를 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
```

다음 네임스페이스도 함께 선언한다.

```cpp
using namespace __gnu_pbds;
```

`PBDS`는 C++ 표준 라이브러리가 아니므로 지원하는 컴파일러에서만 사용할 수 있다.

## 선언

다음 별칭을 미리 선언한다.

```cpp
template<typename T> using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;
```

빈 `ordered_set`은 다음과 같이 선언한다. $O(1)$

```cpp
ordered_set<int> s;
```

위 코드는 `int` 자료형의 원소를 저장하는 `ordered_set`을 생성한다.

## 원소 추가와 삭제

원소를 추가할 때는 `insert()`를 사용한다. $O(\log n)$

```cpp
s.insert(30);
s.insert(10);
s.insert(20);
```

위 코드를 실행하면 `ordered_set`에는 `10`, `20`, `30`이 저장된다.

`set`과 마찬가지로 같은 값을 여러 번 추가해도 하나만 저장된다.

원소를 삭제할 때는 `erase()`를 사용한다. $O(\log n)$

```cpp
s.erase(20);
```

## 특정 값보다 작은 원소의 개수

`order_of_key()`는 주어진 값보다 작은 원소의 개수를 반환한다. $O(\log n)$

```cpp
s.insert(10);
s.insert(20);
s.insert(30);

cout << s.order_of_key(20);
```

`20`보다 작은 원소는 `10`뿐이므로 `1`이 출력된다.

주어진 값과 같은 원소는 포함하지 않는다.

## k번째 원소

`find_by_order()`는 `k`번째 원소를 가리키는 이터레이터를 반환한다. $O(\log n)$

인덱스는 $0$부터 시작한다.

```cpp
s.insert(10);
s.insert(20);
s.insert(30);

cout << *s.find_by_order(0);
cout << *s.find_by_order(1);
cout << *s.find_by_order(2);
```

위 코드를 실행하면 `10`, `20`, `30`이 차례대로 출력된다.

`k`가 원소의 개수 이상이라면 `end()`를 반환한다.

```cpp
if(s.find_by_order(k)==s.end()) {
    cout << "out of range";
}
```

## 기본 연산

`size()`, `empty()`, `find()`는 `set`과 같은 방식으로 사용할 수 있다.

```cpp
cout << s.size();

if(s.empty()) {
    cout << "empty";
}

if(s.find(20)!=s.end()) {
    cout << "exist";
}
```

## 중복 원소 처리

`ordered_set`은 기본적으로 중복 원소를 저장하지 않는다.

중복 원소를 구분해야 한다면 값과 인덱스를 함께 저장한다.

```cpp
ordered_set<pair<int, int>> s;

s.insert({10, 0});
s.insert({10, 1});
s.insert({20, 2});
```

위 코드는 값이 `10`인 두 원소를 서로 다른 원소로 저장한다.

특정 원소를 삭제할 때도 값과 인덱스를 함께 사용한다.

```cpp
s.erase({10, 0});
```

값이 `x`보다 작은 원소의 개수는 다음과 같이 구할 수 있다.

```cpp
cout << s.order_of_key({x, -1});
```

인덱스를 $0$ 이상으로 지정했다면 `{x, -1}`은 값이 `x`인 모든 원소보다 앞에 위치한다.

## 연습 문제

[Ordered Set](https://soj.services/problems/22)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
#include<ext/pb_ds/assoc_container.hpp>
#include<ext/pb_ds/tree_policy.hpp>
using namespace std;
using namespace __gnu_pbds;

template<typename T> using ordered_set = tree<T, null_type, less<T>, rb_tree_tag, tree_order_statistics_node_update>;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int q; cin >> q;

    ordered_set<int> S;
    while(q--) {
        string s; cin >> s;
        if(s=="insert") {
            int x; cin >> x;
            S.insert(x);
        } else if(s=="erase") {
            int x; cin >> x;
            S.erase(x);
        } else if(s=="order_of_key") {
            int x; cin >> x;
            cout << S.order_of_key(x) << '\n';
        } else if(s=="find_by_order") {
            int i; cin >> i;
            cout << *S.find_by_order(i-1) << '\n';
        } else {
            cout << S.size() << '\n';
        }
    }
}
```

</details>