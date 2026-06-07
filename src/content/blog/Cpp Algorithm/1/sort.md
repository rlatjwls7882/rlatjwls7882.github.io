---
title: "Sort"
pubDate: 2026-06-03
tags: ["정렬"]
---

정렬은 원소를 일정한 순서로 배치하는 작업이다.

C++에서는 `sort()`를 이용해 배열이나 `vector`를 간단하게 정렬할 수 있다.

## 헤더 파일

`sort()`를 사용하려면 다음 헤더 파일을 포함해야 한다.

```cpp
#include<algorithm>
```

보통 PS에서는 여러 표준 라이브러리를 한 번에 포함하기 위해 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## vector 정렬

`vector`를 오름차순으로 정렬할 때는 `sort()`를 사용한다. $O(n \log n)$

```cpp
vector<int> v = {30, 10, 40, 20};

sort(v.begin(), v.end());
```

위 코드를 실행하면 `vector`의 원소가 `10`, `20`, `30`, `40` 순서로 정렬된다.

## 배열 정렬

배열도 같은 방식으로 정렬할 수 있다. $O(n \log n)$

```cpp
int a[4] = {30, 10, 40, 20};

sort(a, a+4);
```

배열의 크기가 `n`이라면 다음과 같이 정렬한다.

```cpp
sort(a, a+n);
```

## 일부 구간 정렬

일부 구간만 정렬할 수도 있다.

```cpp
sort(v.begin()+l, v.begin()+r);
```

위 코드는 인덱스가 `l` 이상 `r` 미만인 원소만 정렬한다.

배열도 같은 방식으로 일부 구간만 정렬할 수 있다.

```cpp
sort(a+l, a+r);
```

## 내림차순 정렬

정렬 기준을 지정하면 원소를 내림차순으로 정렬할 수 있다. $O(n \log n)$

```cpp
sort(v.begin(), v.end(), greater<int>());
```

배열도 같은 방식으로 정렬할 수 있다.

```cpp
sort(a, a+n, greater<int>());
```

## 정렬 기준 직접 정의

비교 함수를 만들면 원하는 기준으로 정렬할 수 있다. $O(n \log n)$

```cpp
bool cmp(int a, int b) {
    return a>b;
}

sort(v.begin(), v.end(), cmp);
```

비교 함수가 `true`를 반환하면 첫 번째 원소가 두 번째 원소보다 앞에 위치한다.

위 코드는 값이 큰 원소가 앞에 오도록 정렬한다.

두 값을 저장하는 `pair`도 원하는 기준으로 정렬할 수 있다.

```cpp
bool cmp(pair<int, int> a, pair<int, int> b) {
    if(a.second!=b.second) return a.second<b.second;
    return a.first<b.first;
}
```

위 비교 함수는 두 번째 값을 기준으로 오름차순 정렬하고, 두 번째 값이 같다면 첫 번째 값을 기준으로 오름차순 정렬한다.

## 연습 문제

[https://soj.services/problems/4](https://soj.services/problems/4)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n; cin >> n;
    vector<int> a(n);
    for(int i=0;i<n;i++) cin >> a[i];
    sort(a.begin(), a.end());
    for(auto e:a) cout << e << ' ';
}
```

</details>

## 카운팅 정렬

`sort()`는 대부분의 경우에 충분히 빠르지만 정렬할 값의 범위가 작다면 카운팅 정렬을 사용할 수도 있다.

카운팅 정렬은 각 값이 몇 번 등장했는지 저장한 뒤 작은 값부터 등장 횟수만큼 출력하는 정렬 알고리즘이다.

예를 들어 다음과 같은 배열이 있다고 하자.

```cpp
int a[6] = {3, 1, 2, 3, 1, 3};
```

각 값의 등장 횟수를 저장하면 다음과 같다.

```text
1: 2번
2: 1번
3: 3번
```

따라서 `1`, `1`, `2`, `3`, `3`, `3` 순서로 출력하면 정렬된 결과를 얻을 수 있다.

## 카운팅 정렬 구현

정렬할 값이 `0` 이상 `k` 이하라면 다음과 같이 구현할 수 있다. $O(n+k)$

```cpp
vector<int> cnt(k+1);

for(int x:a) {
    cnt[x]++;
}

for(int x=0;x<=k;x++) {
    while(cnt[x]--) {
        cout << x << ' ';
    }
}
```

`cnt[x]`에는 값이 `x`인 원소의 개수가 저장된다.

카운팅 정렬의 시간복잡도는 $O(n+k)$이고, 공간복잡도는 $O(k)$이다.

값의 범위가 충분히 작을 때는 `sort()`보다 빠르게 동작할 수 있다.

## 카운팅 정렬의 제한

카운팅 정렬은 값의 범위가 클 때 사용하기 어렵다.

예를 들어 원소의 개수는 적지만 값이 최대 $10^9$까지 등장한다면, 크기가 $10^9$인 배열을 만들어야 하므로 메모리를 지나치게 많이 사용한다.

```cpp
int cnt[1'000'000'001];
```

따라서 값의 범위가 작을 때만 카운팅 정렬을 사용해야 한다.

음수가 등장한다면 최솟값만큼 인덱스를 이동하여 저장할 수 있다.

```cpp
cnt[x-minValue]++;
```

## 연습 문제

[https://soj.services/problems/5](https://soj.services/problems/5)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int cnt[100'001];

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n; cin >> n;
    while(n--) {
        int a; cin >> a;
        cnt[a]++;
    }

    for(int i=1;i<=100'000;i++) {
        while(cnt[i]--) {
            cout << i << ' ';
        }
    }
}
```

</details>