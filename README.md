## React 16 vs 18 Monorepo

두 버전의 React에서 동작 차이를 예시로 비교하는 모노레포입니다.

### 워크스페이스
- `react16`: React 16.14 + Vite
- `react18`: React 18.3 + Vite (Concurrent features 데모)
- `packages/shared`: 공용 유틸/스타일 (`@shared/lib`)

### 실행
- 둘 다 실행: `npm run dev:all`
- 개별 실행:
  - React 18: `npm run dev:18` (http://localhost:5173)
  - React 16: `npm run dev:16` (http://localhost:5174)

### 데모 포인트
- 비동기 배칭: React 16 vs 18 렌더 횟수 콘솔 비교
- startTransition: 입력 즉시 반영 + 무거운 필터링은 백그라운드
- useDeferredValue: 최신 입력과 지연된 값 비교 (`isStale` 표시)

### 메모
- 렌더 성능 비교를 명확히 하기 위해 리스트는 1000개까지만 화면에 그립니다(연산량은 동일하게 큼).

