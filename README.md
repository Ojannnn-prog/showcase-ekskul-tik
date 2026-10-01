# Showcase Ekskul TIK

Showcase digital karya anak-anak Ekskul TIK, dibangun dengan Next.js, React, TypeScript, dan Tailwind CSS.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Struktur penting

- `src/app` — route dan layout Next.js.
- `src/components` — UI showcase, galeri, filter, pencarian, dan kuis.
- `src/data/projects.ts` — metadata seluruh karya.
- `public/karya/biodata` — karya biodata HTML asli.
- `public/karya/toko` — karya toko HTML asli.
- `legacy/static-entrypoints` — arsip entrypoint showcase HTML lama.

## Pemeriksaan produksi

```bash
npm run lint
npm run build
npm run start
```

Project ini siap dihubungkan ke Vercel melalui repository GitHub yang sudah terhubung.
