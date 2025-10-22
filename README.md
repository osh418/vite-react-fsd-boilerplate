# Vite React FSD Boilerplate

이 템플릿은 **Feature-Sliced Design (FSD)** 아키텍처를 적용한 React + TypeScript + Vite 보일러플레이트입니다.

## 🏗️ 기술 스택

- **React 19** + **TypeScript** + **Vite**
- **shadcn/ui** + **Tailwind CSS v4**
- **Feature-Sliced Design** 아키텍처
- **ESLint** + **React Compiler**
- **Steiger** (FSD 구조 검증)

## 🚀 빠른 시작

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev

# FSD 구조 초기화 (이미 완료됨)
pnpm run fsd:init
```

## 📁 FSD 구조 생성 스크립트

이 프로젝트는 Feature-Sliced Design 구조를 쉽게 생성할 수 있는 스크립트를 제공합니다.

### 사용 가능한 명령어

```bash
# 도움말 보기
pnpm run fsd:help

# 전체 FSD 구조 초기화
pnpm run fsd:init

# 특정 레이어에 슬라이스 생성
pnpm run fsd:slice <layer> <slice-name> [segments...]

# 특정 슬라이스에 세그먼트 추가
pnpm run fsd:segment <layer> <slice> <segment>
```

### 사용 예시

```bash
# features 레이어에 auth 슬라이스 생성
pnpm run fsd:slice features auth

# features 레이어에 user-management 슬라이스를 특정 세그먼트와 함께 생성
pnpm run fsd:slice features user-management ui api hooks

# entities 레이어에 user 슬라이스 생성
pnpm run fsd:slice entities user

# widgets 레이어에 header 슬라이스 생성
pnpm run fsd:slice widgets header

# pages 레이어에 dashboard 슬라이스 생성
pnpm run fsd:slice pages dashboard
```

## 🏗️ FSD 레이어 구조

```
src/
├── app/          # 앱 초기화, 라우터, 전역 설정
├── pages/        # 페이지 컴포넌트
├── widgets/      # 페이지 블록 (헤더, 사이드바 등)
├── features/     # 비즈니스 로직이 있는 기능
├── entities/     # 비즈니스 엔티티
└── shared/       # 재사용 가능한 코드
```

### FSD 규칙

- **상위 레이어는 하위 레이어만 import 가능**
- **같은 레이어 내에서는 import 금지**
- **shared 레이어는 모든 곳에서 import 가능**

### 레이어 순서 (상위 → 하위)
1. `app` - 앱 설정
2. `pages` - 페이지
3. `widgets` - 위젯
4. `features` - 기능
5. `entities` - 엔티티
6. `shared` - 공유 코드

## 🛠️ 개발 스크립트

```bash
pnpm run dev        # 개발 서버 실행
pnpm run build      # 프로덕션 빌드
pnpm run lint       # ESLint 실행
pnpm run preview    # 빌드 결과 미리보기
pnpm run steiger    # FSD 구조 검증 (watch 모드)
```

## 🎯 다음 단계

이 보일러플레이트를 사용하여 다음 라이브러리들을 추가로 설정할 수 있습니다:

- **Zustand** - 상태 관리
- **Axios** - HTTP 클라이언트  
- **TanStack Query** - 서버 상태 관리
- **Zod** - 스키마 검증

## 📚 참고 자료

- [Feature-Sliced Design](https://feature-sliced.design/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [React Compiler](https://react.dev/learn/react-compiler)
