---
title: "Input / Output"
pubDate: 2026-06-30
tags: ["기초"]
difficulty: "Bronze V"
---

C++에서는 `cin`과 `cout`을 사용해 표준 입력과 출력을 처리할 수 있다. `cin`은 표준 입력에서 값을 읽는 객체이고 `cout`은 표준 출력으로 값을 출력하는 객체이다. `>>` 연산자는 값을 읽을 때 사용하고 `<<` 연산자는 값을 출력할 때 사용한다.

기본 상태의 `cin`과 `cout`은 C의 표준 입출력과 동기화되어 있어서 많은 입력을 처리할 때 느리므로 대회나 코딩 테스트에서는 보통 다음 설정을 사용한다.

```cpp
cin.tie(0)->sync_with_stdio(0);
````

`sync_with_stdio(0)`은 C++ 입출력과 C 입출력의 동기화를 끊고 `cin.tie(0)`은 입력 전에 `cout`을 자동으로 비우는 연결을 끊는다. 이 설정을 사용하면 `cin`과 `cout`을 더 빠르게 사용할 수 있다. 그렇기에 C 입출력인 `scanf`, `printf`와 C++의 입출력인 `cin`, `cout`을 동시에 사용할 수 없고, 콘솔에서의 출력 결과는 프로그램이 종료될 때 한꺼번에 확인할 수 있다.

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int n; cin >> n;
    cout << n << '\n';
}
```

`bits/stdc++.h`는 대부분의 표준 라이브러리를 한 번에 포함하는 헤더이다. 대회 환경에서는 자주 사용하지만 표준 C++ 헤더는 아니므로 일부 컴파일러에서는 사용할 수 없다. 이후 설명에서 별도로 언급하지 않는 한 모든 C++ 코드는 `bits/stdc++.h`만 사용한다.

`using namespace std;`를 사용하면 `std::cin`, `std::cout`, `std::vector`처럼 `std::`를 매번 붙이지 않아도 된다.

`endl`은 줄바꿈과 함께 출력 버퍼를 비우기 때문에 `'\n'`을 사용하는 것이 좋다.

## 연습 문제

[https://soj.services/problems/1](https://soj.services/problems/1)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    cout << "Hello, World!";
}
```

</details>

[https://soj.services/problems/2](https://soj.services/problems/2)

<details>
<summary>코드 보기</summary>

```cpp
#include<bits/stdc++.h>
using namespace std;

int main() {
    cin.tie(0)->sync_with_stdio(0);
    int a, b; cin >> a >> b;
    cout << a+b;
}
```

</details>
