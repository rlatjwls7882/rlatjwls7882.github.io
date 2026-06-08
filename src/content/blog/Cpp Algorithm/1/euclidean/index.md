---
title: "Euclidean Algorithm"
pubDate: 2026-06-08
tags: ["정수론"]
---

유클리드 호제법은 나머지 연산을 반복하여 두 수의 최대공약수를 구하는 알고리즘이다.

두 수 `a`, `b`의 최대공약수는 두 수를 모두 나누어떨어지게 하는 가장 큰 정수이다.

## 동작 원리

`60`과 `18`의 최대공약수를 구한다고 하자.

`60`을 `18`로 나눈 나머지는 `6`이다.

```text
60 = 18 × 3 + 6
```

`60`과 `18`의 최대공약수는 `18`과 `6`의 최대공약수와 같다.

```text
gcd(60, 18) = gcd(18, 6)
```

다시 `18`을 `6`으로 나누면 나머지는 `0`이다.

```text
18 = 6 × 3 + 0
```

나머지가 `0`이 되면 마지막으로 남은 수가 최대공약수이다.

![60과 18의 최대공약수를 구하는 과정](1.svg)

따라서 `60`과 `18`의 최대공약수는 `6`이다.

## 구현

유클리드 호제법은 다음과 같이 구현할 수 있다. $O(\log(\min(a,b)))$

```cpp
long long gcd(long long a, long long b) {
    while(b) {
        long long tmp=a%b;
        a=b;
        b=tmp;
    }
    return a;
}
```

재귀 함수로도 구현할 수 있다.

```cpp
long long gcd(long long a, long long b) {
    if(!b) return a;
    return gcd(b, a%b);
}
```

## 최소공배수

두 수의 최소공배수는 최대공약수를 이용해 구할 수 있다.

$$
\operatorname{lcm}(a,b)=\frac{a \times b}{\operatorname{gcd}(a,b)}
$$

## 내장 함수

C++에서는 `<numeric>`에 `gcd()`와 `lcm()`이 정의되어 있다.

```cpp
#include<numeric>
```

```cpp
cout << gcd(a, b);
cout << lcm(a, b);
```

보통 PS에서는 다음 헤더 파일을 사용하므로 별도로 `<numeric>`을 포함하지 않아도 된다.

```cpp
#include<bits/stdc++.h>
```

## 연습 문제

[https://soj.services/problems/34](https://soj.services/problems/34)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    long long a, b; cin >> a >> b;
    cout << gcd(a, b) << '\n' << a*b/gcd(a, b);
}
```

</details>
