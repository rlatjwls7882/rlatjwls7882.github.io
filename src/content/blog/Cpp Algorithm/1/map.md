---
title: "Map"
pubDate: 2026-06-01
tags: ["자료 구조"]
---

`map`은 키와 값을 쌍으로 저장하는 자료구조이다.

각 키는 하나만 존재하며 키를 이용해 대응하는 값을 빠르게 찾을 수 있다.

## 헤더 파일

`map`을 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<map>
```

보통 PS에서는 여러 표준 라이브러리를 한 번에 포함하기 위해 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `map`은 다음과 같이 선언한다. $O(1)$

```cpp
map<string, int> m;
```

위 코드는 `string` 자료형의 키와 `int` 자료형의 값을 저장하는 `map`을 생성한다.

`map`의 원소는 기본적으로 키를 기준으로 오름차순으로 정렬된다.

키가 문자열이라면 사전순으로 정렬된다.

## 원소 추가와 수정

키에 대응하는 값을 저장할 때는 `[]` 연산자를 사용한다. $O(\log n)$

```cpp
m["apple"] = 10;
m["banana"] = 20;
m["orange"] = 30;
```

위 코드를 실행하면 각 문자열에 대응하는 값이 저장된다.

이미 존재하는 키에 새로운 값을 저장하면 기존 값이 변경된다. $O(\log n)$

```cpp
m["apple"] = 100;
```

위 코드를 실행하면 `"apple"`에 대응하는 값이 `100`으로 변경된다.

## 원소 접근

키에 대응하는 값은 `[]` 연산자로 확인할 수 있다. $O(\log n)$

```cpp
cout << m["apple"];
```

배열이나 `vector`에서는 정수를 인덱스로 사용하지만, `map`에서는 키를 이용해 값에 접근한다.

존재하지 않는 키에 `[]` 연산자를 사용하면 해당 키가 새로 생성된다.

값 자료형이 `int`라면 초기값으로 `0`이 저장된다.

```cpp
cout << m["grape"];
```

위 코드를 실행하면 `"grape"`에 대응하는 값으로 `0`이 출력되며, `"grape"`가 새로운 키로 추가된다.

## 원소 탐색

특정 키가 존재하는지는 `count()`로 확인할 수 있다. $O(\log n)$

```cpp
if(m.count("apple")) {
    cout << "exist";
}
```

`count()`는 키가 존재하면 `1`, 그렇지 않으면 `0`을 반환한다.

## 원소 삭제

특정 키를 삭제할 때는 `erase()`를 사용한다. $O(\log n)$

```cpp
m.erase("apple");
```

존재하지 않는 키를 삭제해도 아무 일도 일어나지 않는다.

## 원소 순회

범위 기반 `for`문을 사용하면 저장된 키와 값을 순서대로 확인할 수 있다. $O(n)$

```cpp
for(auto [k, v]:m) {
    cout << k << ' ' << v << '\n';
}
```

원소는 키를 기준으로 정렬된 순서로 출력된다.

## 정렬 기준 변경

정렬 기준을 지정하면 키를 기준으로 내림차순으로 정렬할 수도 있다.

```cpp
map<string, int, greater<string>> m;
```

## 크기 확인

현재 저장된 원소의 개수는 `size()`로 확인한다. $O(1)$

```cpp
cout << m.size();
```

비어 있는지는 `empty()`로 확인한다. $O(1)$

```cpp
if(m.empty()) {
    cout << "empty";
}
```

`empty()`는 원소가 하나도 없으면 `true`, 그렇지 않으면 `false`를 반환한다.

모든 원소를 삭제할 때는 `clear()`를 사용한다. $O(n)$

```cpp
m.clear();
```

## unordered_map

`unordered_map`은 `map`과 마찬가지로 키와 값을 쌍으로 저장하는 자료구조이다.

`map`과 달리 키를 정렬하지 않으므로 순서를 보장하지 않는다.

해시를 이용해 삽입, 삭제, 탐색을 평균 $O(1)$에 수행한다.

### 헤더 파일

`unordered_map`을 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<unordered_map>
```

### 선언

빈 `unordered_map`은 다음과 같이 선언한다. $O(1)$

```cpp
unordered_map<string, int> m;
```

`operator[]`, `count()`, `erase()`, `size()`, `empty()`, `clear()`는 `map`과 같은 방식으로 사용할 수 있다.

```cpp
m["apple"] = 10;
m["banana"] = 20;

cout << m["apple"];
cout << m.count("banana");

m.erase("apple");
```

`unordered_map`은 키의 순서를 보장하지 않는다.

키를 정렬된 순서로 확인할 필요가 없다면 `map` 대신 `unordered_map`을 사용할 수 있다.

단, 해시 충돌이 많이 발생하면 삽입, 삭제, 탐색의 시간복잡도가 최악의 경우 $O(n)$까지 증가할 수 있다.

## 연습 문제

[https://soj.services/problems/12](https://soj.services/problems/12)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int q; cin >> q;

    map<int, int> m;
    while(q--) {
        string s; int k, v; cin >> s;
        if(s=="insert") {
            cin >> k >> v;
            m[k]=v;
        } else if(s=="erase") {
            cin >> k;
            m.erase(k);
        } else if(s=="count") {
            cin >> k;
            cout << m.count(k) << '\n';
        } else if(s=="get") {
            cin >> k;
            if(m.count(k)) cout << m[k] << '\n';
            else cout << "-1\n";
        } else {
            cout << m.size() << '\n';
        }
    }
}
```

</details>