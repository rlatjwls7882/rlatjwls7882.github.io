---
title: "Primality Test"
pubDate: 2026-06-08
tags: ["정수론"]
difficulty: "Silver IV"
description: "약수 존재 여부를 확인해 소수인지 판별하는 알고리즘"
---

소수는 $1$보다 크고 $1$과 자기 자신만을 약수로 갖는 정수이다.

소수 판정은 주어진 정수가 소수인지 확인하는 알고리즘이다.

## 약수 확인

가장 단순한 방법은 $2$부터 $n-1$까지 나누어보는 것이다. $O(n)$

```cpp
for(long long i=2;i<n;i++) {
    if(n%i==0) return false;
}
```

중간에 나누어떨어지는 수가 있으면 `n`은 소수가 아니다.

## 제곱근까지만 확인하기

약수는 항상 쌍으로 나타난다.

예를 들어 $36$의 약수 쌍은 다음과 같다.

![36의 약수 쌍](1.svg)

`n`의 약수 하나가 $\sqrt{n}$보다 크다면 다른 하나는 $\sqrt{n}$보다 작거나 같다.

따라서 $2$부터 $\sqrt{n}$까지만 확인하면 된다.

예를 들어 $37$이 소수인지 확인하려면 $2$부터 $6$까지만 확인한다.

![37의 소수 여부를 확인하는 과정](2.svg)

## 구현

소수 판정은 다음과 같이 구현할 수 있다. $O(\sqrt{n})$

```cpp
bool isPrime(long long n) {
    if(n<=1) return false;
    for(long long i=2;i*i<=n;i++) {
        if(n%i==0) return false;
    }
    return true;
}
```

`n`이 $1$ 이하라면 소수가 아니다.

$2$ 이상 $\sqrt{n}$ 이하인 정수 중 하나라도 `n`의 약수라면 `n`은 소수가 아니다.

## 연습 문제

[https://soj.services/problems/32](https://soj.services/problems/32)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

bool isPrime(long long n) {
    if(n<=1) return false;
    for(long long i=2;i*i<=n;i++) {
        if(n%i==0) return false;
    }
    return true;
}

int main() {
    cin.tie(0)->sync_with_stdio(0);
    long long n; cin >> n;
    cout << (isPrime(n) ? "Yes" : "No");
}
```

</details>