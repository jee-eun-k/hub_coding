This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

* npm run server
* npx json-server db.json --port 4000
* curl http://localhost:4000/result // TODO: automation

* 사용 기술은 React.js 또는 Next.js를 사용해 과제를 해결해주세요. (JavaScript, TypeScript 상관없이 사용 가능합니다.)


*   메인페이지
    * 내용
        *   위키 페이지의 제목 목록 표시 (X)
        *   제목 클릭 시 위키페이지로 이동 (제목과 본문 표시) (X)
    * 페이징 기능
        *   한 페이지에 표시되는 제목의 갯수는 5개로, 전체 페이지가 5개 이상인 경우 페이지네이션 (X)
    * 추가 버튼
        *   클릭 시 신규 등록 창이 표시, 제목과 내용을 입력 (X)
*   위키 페이지
    *   내용
        *   제목과 본문으로 구성되며 각각 텍스트 (X)
        *   본문에 다른 위키페이지의 제목이 있으면 해당 위키페이지 링크 자동 생성
    *   수정 버튼
        *   클릭 시 내용을 수정해서 저장 가능 (X)
