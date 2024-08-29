# MP3 File Analysis App

A Basic HTTP REST API based micro app for analyzing mp3 file for various informations. Built using Node.js + ExpressJS + TypeScript

## What Project Features
- TypeScript Based
- Test-ready with Vi Test
- Async Handling with error handling if error is thrown
- Path aliases for cleaner imports
- tsx watch for refresh on save
- Setup build script for production with tsup
- Environment variables configured on load

## Setup
### Environment Variables
1. Copy `.env.example`, and rename to `.env`
2. Configure newly copied `.env` file

### Upload Folder Setup
1. Create a `tmp/uploads` folder for upload files to be stored

### Development
> This project was setup using Node.js v22.7.0 LTS Please use specified version for best experience.
1. Install dependencies with `npm install`
2. Start developoment server with `npm run dev`

### Production
Production build is compiled first into JavaScript, built on the `./dist` folder, and can be ran after compilation.
1. Run `npm run build`
2. Run `npm run start`

## Project Structure
Every development files are located within the ./src folder.
```
├── index.ts
├── config
│   └── envConfig.ts
├── api
│   └── file
│   │   ├── fileController.ts
│   │   ├── fileRouter.ts
│   │   └── fileService.ts
│   └── healthCheck
│       ├── healthCheckController.ts
│       └── healthCheckRouter.ts
├── middleware
│   ├── asyncMiddleware.ts
│   ├── fileUploadMiddleware.ts
│   └── errorMiddleware.ts
├── types
│   └── interfaces
│       └── interfaces.common.ts
├── utils
│   ├── ApiError.ts
│   ├── ApiSucess.ts
│   └── mp3FileAnalyzer.ts
└── tmp
    └── uploads
```

## Important helper functions
Passing middleware into the asyncHandler will allow the server to automatically catch any internal server errors, or manually thrown errors from the server.
```typescript
// ? asyncHandler should be used for every request for easy async handling
export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const data: Record<string, unkown> = { id: 4 };
    res.status(200).json(new ApiSuccess<Record<string, unknown>>(data, "Success"));
  },
);
```