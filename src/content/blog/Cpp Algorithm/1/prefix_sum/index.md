---
title: "Prefix Sum"
pubDate: 2026-06-04
tags: ["구간 처리"]
difficulty: "Silver III"
---

누적 합은 각 위치까지의 합을 미리 계산하는 방법이다.

누적 합 배열을 만들면 구간 합을 $O(1)$에 구할 수 있다.

## 누적 합 배열

배열 `a`가 있다고 하자.

```text
4  8  5  3  5  7  6  1
```

`preSum[i]`에는 $1$번 원소부터 $i$번 원소까지의 합을 저장한다.

$$
preSum_i=a_1+a_2+\cdots+a_i
$$

![누적 합 배열을 만드는 과정](1.svg)

`preSum[i]`는 이전 누적 합에 현재 값을 더해 만든다.

```cpp
preSum[i]=preSum[i-1]+a[i];
```

## 구현

앞에 $0$을 하나 두면 구간 합을 예외 처리 없이 계산할 수 있다. $O(n)$

```cpp
vector<long long> preSum(n+1);

for(int i=1;i<=n;i++) {
    cin >> preSum[i];
    preSum[i]+=preSum[i-1];
}
```

이때 `preSum[0]`은 $0$이고 `preSum[i]`는 $1$번부터 $i$번까지의 합이다.

## 구간 합

구간 $[l,r]$의 합은 다음과 같이 구한다. $O(1)$

$$
a_l+a_{l+1}+\cdots+a_r=preSum_r-preSum_{l-1}
$$

![누적 합 배열을 이용해 구간 합을 구하는 과정](2.svg)

```cpp
cout << preSum[r]-preSum[l-1];
```

`preSum[r]`에서 `preSum[l-1]`을 빼면 $l$번부터 $r$번까지의 합만 남는다.

## 연습 문제

[https://soj.services/problems/24](https://soj.services/problems/24)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

long long preSum[100'001];

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, q; cin >> n >> q;
    for(int i=1;i<=n;i++) {
        cin >> preSum[i];
        preSum[i]+=preSum[i-1];
    }
    while(q--) {
        int l, r; cin >> l >> r;
        cout << preSum[r]-preSum[l-1] << '\n';
    }
}
```

</details>