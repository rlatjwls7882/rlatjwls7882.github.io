---
title: "Sort"
pubDate: 2026-06-03
tags: ["정렬"]
difficulty: "Bronze I"
---

정렬은 원소를 정해진 순서로 배치하는 작업이다.

C++에서는 `sort()`로 배열이나 `vector`를 정렬할 수 있다.

## 헤더 파일

```cpp
#include<algorithm>
```

PS에서는 보통 다음 헤더 파일을 사용한다.

```cpp
#include<bits/stdc++.h>
```

## 기본 정렬

`vector`를 오름차순으로 정렬한다. $O(n \log n)$

```cpp
vector<int> v = {30, 10, 40, 20};

sort(v.begin(), v.end());
```

배열도 같은 방식으로 정렬한다. $O(n \log n)$

```cpp
int a[4] = {30, 10, 40, 20};

sort(a, a+4);
```

배열의 크기가 $n$이면 다음과 같이 쓴다.

```cpp
sort(a, a+n);
```

## 구간 정렬

구간 $[l,r)$만 정렬한다. $O(k \log k)$

```cpp
sort(v.begin()+l, v.begin()+r);
```

배열도 같은 방식으로 사용할 수 있다.

```cpp
sort(a+l, a+r);
```

여기서 $k=r-l$이다.

## 내림차순 정렬

세 번째 인자로 비교 기준을 넘기면 내림차순으로 정렬할 수 있다. $O(n \log n)$

```cpp
sort(v.begin(), v.end(), greater<int>());
```

배열도 같은 방식으로 정렬한다.

```cpp
sort(a, a+n, greater<int>());
```

## 비교 함수

비교 함수를 만들면 원하는 기준으로 정렬할 수 있다. $O(n \log n)$

```cpp
bool cmp(int a, int b) {
    return a>b;
}

sort(v.begin(), v.end(), cmp);
```

비교 함수가 `true`를 반환하면 첫 번째 원소가 두 번째 원소보다 앞에 온다.

`pair`도 원하는 기준으로 정렬할 수 있다.

```cpp
bool cmp(pair<int, int> a, pair<int, int> b) {
    if(a.second!=b.second) return a.second<b.second;
    return a.first<b.first;
}
```

위 함수는 두 번째 값을 기준으로 오름차순 정렬하고 같으면 첫 번째 값을 기준으로 오름차순 정렬한다.

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

값의 범위가 작다면 카운팅 정렬을 사용할 수 있다.

각 값의 등장 횟수를 센 뒤 작은 값부터 출력하는 방식이다.

```cpp
int a[6] = {3, 1, 2, 3, 1, 3};
```

등장 횟수는 다음과 같다.

```text
1: 2번
2: 1번
3: 3번
```

따라서 `1`, `1`, `2`, `3`, `3`, `3` 순서로 출력하면 정렬된 결과가 된다.

## 카운팅 정렬 구현

값이 $0$ 이상 $k$ 이하라면 다음과 같이 구현할 수 있다. $O(n+k)$

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

공간복잡도는 $O(k)$이다.

값의 범위가 크면 카운팅 정렬을 사용하기 어렵다.

예를 들어 값이 최대 $10^9$까지 등장하면 크기가 $10^9+1$인 배열이 필요하다.

```cpp
int cnt[1'000'000'001];
```

음수가 등장한다면 최솟값만큼 인덱스를 이동해 저장할 수 있다.

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