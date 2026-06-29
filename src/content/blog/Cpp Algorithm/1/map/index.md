---
title: "Map"
pubDate: 2026-06-01
tags: ["자료 구조"]
difficulty: "Silver V"
description: "키와 값을 쌍으로 저장하고 키를 기준으로 탐색하는 자료구조"
---

`map`은 키와 값을 쌍으로 저장하는 자료구조이다.

각 키는 하나만 존재하고 키를 이용해 값을 찾을 수 있다.

## 헤더 파일

```cpp
#include<map>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `map`을 만든다. $O(1)$

```cpp
map<string, int> m;
```

위 코드는 `string` 키와 `int` 값을 저장한다.

`map`의 원소는 기본적으로 키를 기준으로 오름차순 정렬된다.

## 추가와 수정

키에 대응하는 값을 저장한다. $O(\log n)$

```cpp
m["apple"] = 10;
m["banana"] = 20;
m["orange"] = 30;
```

이미 존재하는 키에 값을 다시 저장하면 기존 값이 바뀐다.

```cpp
m["apple"] = 100;
```

## 접근

키에 대응하는 값을 확인한다. $O(\log n)$

```cpp
cout << m["apple"];
```

존재하지 않는 키에 `[]`를 사용하면 새 원소가 만들어진다.

값 자료형이 `int`라면 초기값은 $0$이다.

```cpp
cout << m["grape"];
```

키의 존재 여부만 확인할 때는 `count()`를 사용한다. $O(\log n)$

```cpp
if(m.count("apple")) {
    cout << "exist";
}
```

`count()`는 키가 존재하면 $1$, 없으면 $0$을 반환한다.

## 삭제

키를 삭제한다. $O(\log n)$

```cpp
m.erase("apple");
```

존재하지 않는 키를 삭제해도 오류가 발생하지 않는다.

## 순회

범위 기반 `for`문으로 키와 값을 순서대로 확인한다. $O(n)$

```cpp
for(auto [k, v]:m) {
    cout << k << ' ' << v << '\n';
}
```

원소는 키를 기준으로 정렬된 순서로 나온다.

## 정렬 기준 변경

내림차순으로 정렬하려면 비교 기준을 지정한다.

```cpp
map<string, int, greater<string>> m;
```

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << m.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(m.empty()) {
    cout << "empty";
}
```

모든 원소를 삭제한다. $O(n)$

```cpp
m.clear();
```

## unordered_map

`unordered_map`은 키와 값을 쌍으로 저장하지만 정렬하지 않는다.

삽입, 삭제, 탐색을 평균 $O(1)$에 수행한다.

```cpp
#include<unordered_map>
```

```cpp
unordered_map<string, int> m;
```

사용 방법은 `map`과 거의 같다.

```cpp
m["apple"] = 10;
m.erase("apple");

if(m.count("banana")) {
    cout << "exist";
}
```

해시 충돌이 많이 발생하면 최악의 경우 $O(n)$까지 걸릴 수 있다.

키를 정렬된 순서로 볼 필요가 없다면 `map` 대신 `unordered_map`을 사용할 수 있다.

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