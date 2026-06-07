---
title: "Two Pointer"
pubDate: 2026-06-04
tags: ["탐색"]
---

투 포인터는 두 개의 포인터를 움직이며 조건을 만족하는 값을 찾는 알고리즘이다.

불필요한 탐색을 줄여 완전 탐색보다 빠르게 문제를 해결할 수 있다.

## 두 수의 합

정렬된 배열에서 합이 `13`인 두 원소의 쌍을 찾는다고 하자.

```text
1  2  4  5  6  8  10  12
```

처음에는 `left`를 배열의 왼쪽 끝에 두고 `right`를 오른쪽 끝에 둔다.

![처음 두 포인터를 배치한 상태](1.svg)

현재 두 원소의 합은 `13`이다.

조건을 만족하는 쌍을 찾았으므로 개수를 `1` 증가시킨다. 사용한 두 원소를 제외하기 위해 `left`와 `right`를 모두 이동한다.

```cpp
cnt++;
left++;
right--;
```

![합이 목표값보다 작은 상태](2.svg)

이번에는 두 원소의 합이 `12`이므로 목표값인 `13`보다 작다.

더 큰 합을 만들기 위해 `left`를 오른쪽으로 이동한다.

```cpp
left++;
```

![합이 목표값보다 큰 상태](3.svg)

두 원소의 합이 `14`이므로 목표값보다 크다.

더 작은 합을 만들기 위해 `right`를 왼쪽으로 이동한다.

```cpp
right--;
```

![다시 합이 목표값보다 작은 상태](4.svg)

두 원소의 합이 `12`이므로 `left`를 오른쪽으로 이동한다.

```cpp
left++;
```

![두 번째 쌍을 찾은 상태](5.svg)

두 원소의 합이 `13`이므로 조건을 만족하는 쌍을 하나 더 찾았다.

이제 `left`와 `right`를 모두 이동하면 두 포인터가 만나므로 탐색을 종료한다.

## 구현

정렬된 배열에서 합이 `x`인 두 원소의 쌍은 다음과 같이 셀 수 있다. $O(n)$

```cpp
int cnt=0, left=0, right=n-1;

while(left<right) {
    int sum=a[left]+a[right];
    if(sum<x) {
        left++;
    } else if(sum>x) {
        right--;
    } else {
        cnt++;
        left++;
        right--;
    }
}
```

현재 합이 `x`보다 작다면 더 큰 값을 사용해야 하므로 `left`를 오른쪽으로 이동한다.

현재 합이 `x`보다 크다면 더 작은 값을 사용해야 하므로 `right`를 왼쪽으로 이동한다.

두 포인터는 각각 최대 $n$번 이동하므로 시간복잡도는 $O(n)$이다.

## 연습 문제

[https://soj.services/problems/25](https://soj.services/problems/25)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int a[100'000];

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, x; cin >> n >> x;
    for(int i=0;i<n;i++) cin >> a[i];

    int cnt=0, l=0, r=n-1;
    while(l<r) {
        if(a[l]+a[r]==x) l++, r--, cnt++;
        else if(a[l]+a[r]<x) l++;
        else r--;
    }
    cout << cnt;
}
```

</details>
