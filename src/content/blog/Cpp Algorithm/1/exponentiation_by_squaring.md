---
title: "Exponentiation by Squaring"
pubDate: 2026-06-08
tags: ["정수론"]
---

빠른 거듭제곱은 거듭제곱을 반복해서 제곱하여 $a^b$를 빠르게 구하는 알고리즘이다.

`a`를 `b`번 직접 곱하면 $O(b)$가 걸리지만 빠른 거듭제곱을 사용하면 $O(\log b)$에 계산할 수 있다.

## 지수의 이진수 표현

$3^5$를 구한다고 하자.

지수 `5`를 이진수로 나타내면 다음과 같다.

$$
5=101_2=2^2+2^0
$$

따라서 $3^5$는 다음처럼 나타낼 수 있다.

$$
3^5=3^{2^2} \times 3^{2^0}=3^4 \times 3^1
$$

$3^1$, $3^2$, $3^4$는 이전 값을 제곱하여 차례대로 구할 수 있다.

```text
3¹ = 3
3² = 9
3⁴ = 81
```

이 중 지수의 비트가 `1`인 $3^1$, $3^4$만 곱하면 된다.

```text
3⁵ = 3¹ × 3⁴ = 243
```

## 반복문 구현

반복문에서는 현재 밑을 `a`, 남은 지수를 `b`, 지금까지의 결과를 `ret`에 저장한다.

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

`b&1`이 참이라면 현재 비트가 `1`이라는 뜻이다.

이 경우 현재 `a`를 결과에 곱한다.

```cpp
if(b&1) ret=ret*a%mod;
```

매 반복마다 `a`를 제곱하고 `b`를 절반으로 줄인다.

```cpp
a=a*a%mod;
b>>=1;
```

`b`가 매번 절반으로 줄어드므로 시간복잡도는 $O(\log b)$이다.

## 재귀 구현

지수를 절반으로 나누는 성질을 이용하면 재귀 함수로도 구현할 수 있다.

지수가 짝수라면 다음 식을 사용한다.

$$
a^b=\left(a^{b/2}\right)^2
$$

지수가 홀수라면 `a`를 한 번 더 곱한다.

$$
a^b=\left(a^{\lfloor b/2 \rfloor}\right)^2 \times a
$$

지수를 절반으로 나누는 성질을 이용하면 재귀 함수로도 구현할 수 있다.

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
