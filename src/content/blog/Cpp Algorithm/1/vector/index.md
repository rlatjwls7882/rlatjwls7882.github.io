---
title: "Vector"
pubDate: 2026-05-27
tags: ["자료 구조"]
difficulty: "Bronze III"
description: "동적 배열을 사용해 원소를 순서대로 저장하고 임의 접근을 빠르게 처리하는 자료구조"
---

`vector`는 크기가 변할 수 있는 연속 배열이다.

인덱스로 원소에 접근할 수 있고 뒤쪽에 원소를 추가하거나 삭제할 수 있다.

## 헤더 파일

```cpp
#include<vector>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 선언

빈 `vector`를 만든다. $O(1)$

```cpp
vector<int> v;
```

크기가 $n$인 `vector`를 만든다. $O(n)$

```cpp
vector<int> v(n);
```

모든 원소가 $-1$인 크기 $n$의 `vector`를 만든다. $O(n)$

```cpp
vector<int> v(n, -1);
```

## 추가와 삭제

맨 뒤에 원소를 추가한다. 평균 $O(1)$

```cpp
v.push_back(10);
```

맨 뒤 원소를 삭제한다. $O(1)$

```cpp
v.pop_back();
```

`pop_back()`은 삭제한 값을 반환하지 않는다.

## 접근

인덱스로 원소에 접근한다. $O(1)$

```cpp
cout << v[i];
```

인덱스는 $0$부터 시작한다.

크기가 $n$이면 첫 번째 원소는 `v[0]`, 마지막 원소는 `v[n-1]`이다.

맨 앞 원소와 맨 뒤 원소는 다음과 같이 확인한다. $O(1)$

```cpp
cout << v.front();
cout << v.back();
```

비어 있는 `vector`에서 `front()`나 `back()`을 호출하면 안 된다.

## 크기 확인

원소의 개수를 확인한다. $O(1)$

```cpp
cout << v.size();
```

비어 있는지 확인한다. $O(1)$

```cpp
if(v.empty()) {
    cout << "empty";
}
```

## 2차원 vector

`vector`를 중첩하면 2차원 배열처럼 사용할 수 있다. $O(nm)$

```cpp
vector<vector<int>> a(n, vector<int>(m));
```

초기값을 지정할 수도 있다. $O(nm)$

```cpp
vector<vector<int>> a(n, vector<int>(m, -1));
```

접근 방법은 배열과 같다. $O(1)$

```cpp
a[i][j] = 10;
cout << a[i][j];
```

## 연습 문제

[https://soj.services/problems/10](https://soj.services/problems/10)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    vector<int> v;
    int q; cin >> q;
    while(q--) {
        string s; int i, x; cin >> s;
        if(s=="push_back") {
            cin >> x;
            v.push_back(x);
        } else if(s=="pop_back") {
            v.pop_back();
        } else if(s=="front") {
            cout << v.front() << '\n';
        } else if(s=="back") {
            cout << v.back() << '\n';
        } else {
            cin >> i;
            cout << v[i] << '\n';
        }
    }
}
```

</details>