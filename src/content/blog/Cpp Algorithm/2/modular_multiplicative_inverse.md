---
title: "Modular Multiplicative Inverse"
pubDate: 2026-06-09
tags: ["정수론"]
---

모듈러 곱셈의 역원은 모듈러 연산에서 나눗셈을 처리할 때 사용한다.

정수 `a`의 모듈러 역원은 다음 조건을 만족하는 정수 `a⁻¹`이다.

$$
a \times a^{-1} \equiv 1 \pmod m
$$

## 모듈러 연산의 나눗셈

덧셈과 곱셈은 각 값을 먼저 나눈 나머지로 바꾸어도 결과가 같다.

$$
(a+b) \bmod m=((a \bmod m)+(b \bmod m)) \bmod m
$$

$$
(a \times b) \bmod m=((a \bmod m) \times (b \bmod m)) \bmod m
$$

하지만 나눗셈에는 같은 성질을 바로 적용할 수 없다.

$$
\frac{a}{b} \bmod m \neq \frac{a \bmod m}{b \bmod m} \bmod m
$$

따라서 `b`로 나누는 대신 `b`의 모듈러 역원 `b⁻¹`을 곱한다.

$$
\frac{a}{b} \equiv a \times b^{-1} \pmod m
$$

## 모듈러 역원 찾기

모듈러 역원은 곱한 결과를 `m`으로 나눈 나머지가 `1`이 되는 값이다.

하지만 모든 정수가 모듈러 역원을 갖는 것은 아니다.

`a`의 modulo `m`에 대한 역원이 존재하려면 다음 조건을 만족해야 한다.

$$
\gcd(a,m)=1
$$

예를 들어 modulo `8`에서 `2`의 역원은 존재하지 않는다.

`2`에 어떤 정수를 곱해도 나머지가 `1`이 되지 않는다.

## 페르마의 소정리

`m`이 소수이고 `a`가 `m`의 배수가 아니라면 페르마의 소정리에 의해 다음 식이 성립한다.

$$
a^{m-1} \equiv 1 \pmod m
$$

왼쪽의 `a`를 하나 분리하면 다음과 같다.

$$
a \times a^{m-2} \equiv 1 \pmod m
$$

모듈러 역원의 정의와 비교하면 다음 식을 얻을 수 있다.

$$
a^{-1} \equiv a^{m-2} \pmod m
$$

## 구현

빠른 거듭제곱을 이용하면 모듈러 역원을 $O(\log m)$에 구할 수 있다.

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

long long modularInverse(long long a, long long mod) {
    return pow(a, mod-2, mod);
}
```

이 방법은 `mod`가 소수이고 `gcd(a, mod)=1`일 때 사용할 수 있다.

## 연습 문제

[https://soj.services/problems/37](https://soj.services/problems/37)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

long long MOD = 998244353;

long long pow(long long a, long long b) {
    long long ret=1;
    while(b) {
        if(b&1) ret=ret*a%MOD;
        a=a*a%MOD;
        b>>=1;
    }
    return ret;
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    long long a; cin >> a;
    cout << pow(a, MOD-2)%MOD;
}
```

</details>
