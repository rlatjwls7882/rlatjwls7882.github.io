---
title: "Exponentiation by Squaring"
pubDate: 2026-06-08
tags: ["정수론"]
difficulty: "Silver I"
---

빠른 거듭제곱은 $a^b$를 $O(\log b)$에 계산하는 알고리즘이다.

$a$를 $b$번 직접 곱하면 $O(b)$가 걸리지만 지수를 이진수로 보면 필요한 제곱값만 곱할 수 있다.

## 지수의 이진수 표현

$3^5$를 구한다고 하자.

지수 $5$는 다음과 같이 나타낼 수 있다.

$$
5=101_2=2^2+2^0
$$

따라서 $3^5$는 다음과 같이 바뀐다.

$$
3^5=3^{2^2}\times 3^{2^0}=3^4\times 3^1
$$

$3^1$, $3^2$, $3^4$는 이전 값을 제곱해서 만들 수 있다.

```text
3¹ = 3
3² = 9
3⁴ = 81
```

이 중 지수의 비트가 $1$인 $3^1$, $3^4$만 곱한다.

```text
3⁵ = 3¹ × 3⁴ = 243
```

## 비재귀 구현

현재 밑을 `a`, 남은 지수를 `b`, 결과를 `ret`에 저장한다. $O(\log b)$

```cpp
long long pow(long long a, long long b, long long mod) {
    long long ret=1;
    while(b) {
        if(b&1) ret=ret*a%mod;
        a=a*a%mod;
        b>>=1;
    }
    return ret;
}
```

`b&1`이 참이면 현재 비트가 $1$이므로 `a`를 결과에 곱한다.

```cpp
if(b&1) ret=ret*a%mod;
```

매 반복마다 `a`는 제곱하고 `b`는 절반으로 줄인다.

```cpp
a=a*a%mod;
b>>=1;
```

## 재귀 구현

지수가 짝수라면 다음 식을 사용한다.

$$
a^b=\left(a^{b/2}\right)^2
$$

지수가 홀수라면 `a`를 한 번 더 곱한다.

$$
a^b=\left(a^{\lfloor b/2 \rfloor}\right)^2 \times a
$$

```cpp
long long pow(long long a, long long b, long long mod) {
    if(!b) return 1;
    long long tmp=pow(a, b/2, mod);
    long long ret=tmp*tmp%mod;
    if(b&1) ret=ret*a%mod;
    return ret;
}
```

## 연습 문제

[https://soj.services/problems/36](https://soj.services/problems/36)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

long long pow(long long a, long long b, long long m) {
    long long ret=1;
    while(b) {
        if(b&1) ret=ret*a%m;
        a=a*a%m;
        b>>=1;
    }
    return ret;
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    long long a, b, m; cin >> a >> b >> m;
    cout << pow(a, b, m);
}
```

</details>