---
title: "2-SAT (2-Satisfiability)"
pubDate: 2026-06-12
tags: ["그래프", "DFS"]
difficulty: "Platinum IV"
description: "2-CNF를 Implication Graph로 바꾸고 SCC로 만족 가능성을 판별하는 알고리즘"
---

`2-SAT`은 각 절에 리터럴이 두 개씩 포함된 논리식이 주어졌을 때 식을 만족하는 값 할당이 존재하는지 판별하는 문제이다.

리터럴은 변수 $x$ 또는 변수의 부정 $\neg x$를 의미한다.

```text
(A ∨ B) ∧ (¬B ∨ C) ∧ (A ∨ ¬C)
```

## Implication Graph

하나의 절 $(A \lor B)$를 생각해 보자.

$A$가 거짓이라면 절을 만족시키기 위해 $B$는 반드시 참이어야 한다.

$B$가 거짓이라면 $A$는 반드시 참이어야 한다.

![하나의 절을 두 개의 함의로 바꾸는 과정](1.svg)

따라서 절 $(x \lor y)$는 다음 두 간선으로 바꿀 수 있다.

```text
¬x → y
¬y → x
```

각 리터럴을 정점으로 두고 이러한 조건을 방향 간선으로 나타낸 그래프를 `Implication Graph`라고 한다.

## SCC를 이용한 판별

다음 식을 생각해 보자.

```text
(¬1 ∨ 2) ∧ (¬2 ∨ 3) ∧ (2 ∨ ¬3)
```

![Implication graph와 SCC](2.svg)

같은 `SCC`에 속한 리터럴은 서로 도달할 수 있다.

어떤 변수 $x$와 그 부정 $\neg x$가 같은 `SCC`에 속한다면 $x$는 참이면서 동시에 거짓이어야 한다.

따라서 식을 만족시킬 수 없다.

```cpp
if(par[i]==par[i+1]) return false;
```

모든 변수와 그 부정이 서로 다른 `SCC`에 속한다면 식을 만족하는 값 할당이 존재한다.

## 리터럴 저장

각 변수마다 참 리터럴과 거짓 리터럴을 연속한 두 정점으로 저장한다.

![리터럴과 정점 번호의 대응 관계](3.svg)

변수 $x$는 `2*x-1`번 정점에 저장하고 $\neg x$는 `2*x`번 정점에 저장한다.

반대 리터럴은 마지막 비트를 뒤집어 구한다.

```cpp
int neg(int x) {
    return x%2 ? x+1 : x-1;
}
```

절 $(x \lor y)$는 다음과 같이 추가한다.

```cpp
void addEdge(int x, int y) {
    x = x<0 ? -2*x : 2*x-1;
    y = y<0 ? -2*y : 2*y-1;
    conn[neg(x)].push_back(y);
    conn[neg(y)].push_back(x);
}
```

## 구현

`Tarjan` 알고리즘으로 `SCC`를 구하면 `2-SAT`을 $O(N+M)$에 판별할 수 있다.

변수는 $N$개이고 절은 $M$개라고 하자.

`Implication Graph`에는 정점 $2N$개와 간선 $2M$개가 생긴다.

```cpp
stack<int> stk;
int idx, vis[MAX], par[MAX];
vector<vector<int>> conn(MAX), SCCs;

int dfs(int cur) {
    int rem=par[cur]=++idx;
    stk.push(cur);
    for(int next:conn[cur]) {
        if(!par[next]) rem=min(rem, dfs(next));
        else if(!vis[next]) rem=min(rem, par[next]);
    }
    if(rem==par[cur]) {
        SCCs.push_back(vector<int>());
        while(true) {
            int top=stk.top(); stk.pop();
            SCCs.back().push_back(top);
            vis[top]=true;
            par[top]=rem;
            if(top==cur) break;
        }
    }
    return rem;
}

int neg(int x) { return x%2 ? x+1 : x-1; }

bool twoSat(int n) {
    for(int i=1;i<=2*n;i++) {
        if(!vis[i]) dfs(i);
    }
    for(int i=1;i<=2*n;i+=2) {
        if(par[i]==par[i+1]) return false;
    }
    return true;
}
```

`twoSat()`이 `true`를 반환하면 식을 만족하는 값 할당이 존재한다.

`false`를 반환하면 존재하지 않는다.

## 연습 문제

[https://soj.services/problems/49](https://soj.services/problems/49)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

const int MAX = 20001;

stack<int> stk;
int idx, vis[MAX], par[MAX];
vector<vector<int>> conn(MAX), SCCs;

int dfs(int cur) {
    int rem = par[cur] = ++idx;
    stk.push(cur);
    for(int next:conn[cur]) {
        if(!par[next]) rem=min(rem, dfs(next));
        else if(!vis[next]) rem=min(rem, par[next]);
    }
    if(rem==par[cur]) {
        SCCs.push_back(vector<int>());
        while(true) {
            int top = stk.top(); stk.pop();
            SCCs.back().push_back(top);
            vis[top]=true;
            par[top]=rem;
            if(top==cur) break;
        }
    }
    return rem;
}

int neg(int x) { return x%2 ? x+1 : x-1; }

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n, m; cin >> n >> m;
    while(m--) {
        int a, b; cin >> a >> b;
        a = a<0 ? -2*a : 2*a-1;
        b = b<0 ? -2*b : 2*b-1;
        conn[neg(a)].push_back(b);
        conn[neg(b)].push_back(a);
    }
    for(int i=1;i<=2*n;i++) if(!vis[i]) dfs(i);

    for(int i=1;i<=2*n;i+=2) {
        if(par[i]==par[i+1]) return !(cout << "No");
    }
    cout << "Yes";
}
```

</details>