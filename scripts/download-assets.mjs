import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/assets/images/raw');

const assets = {
  'fig-04.png': 'https://www.figma.com/api/mcp/asset/ba7ed287-92d0-4dc1-a463-b7d32c83cdd3.png',
  'fig-03.png': 'https://www.figma.com/api/mcp/asset/d016244f-fb51-4fd3-a644-598235a9883b.png',
  'logo-premier.png': 'https://www.figma.com/api/mcp/asset/f5e083c4-622d-4055-afb0-b5ae2c2a5ef5.png',
  'logo-tricolor.png': 'https://www.figma.com/api/mcp/asset/4849b979-0f77-45f6-8436-e2aef1a690c3.png',
  'logo-start.png': 'https://www.figma.com/api/mcp/asset/dc5db052-8e73-4976-81a5-7de2d8e671eb.png',
  'logo-sts.png': 'https://www.figma.com/api/mcp/asset/3ad9f15e-a998-46d8-ba53-2a4ffe170890.png',
  'logo-amediateka.png': 'https://www.figma.com/api/mcp/asset/c1ff67af-8cb6-495b-a447-ed569e4f63db.png',
  'work-01.png': 'https://www.figma.com/api/mcp/asset/ab922673-3dc7-4fb4-8610-16d402e1dc16.png',
  'work-02.png': 'https://www.figma.com/api/mcp/asset/d75b1428-ed44-4aa3-b8df-faa8d3e2c095.png',
  'work-03.png': 'https://www.figma.com/api/mcp/asset/b218dfa0-25b1-491a-bacd-abc1fc36b17a.png',
  'work-04.png': 'https://www.figma.com/api/mcp/asset/2f938cce-67dd-45ef-bb65-245a2fe83b82.png',
  'work-05.png': 'https://www.figma.com/api/mcp/asset/f95ca2db-bc0f-4c25-9eb2-e6e61beb005d.png',
  'work-06.png': 'https://www.figma.com/api/mcp/asset/df9331f5-54f9-4d17-9d7b-fbeae20547f2.png',
  'work-07.png': 'https://www.figma.com/api/mcp/asset/51eb4a8e-9ba5-43aa-918a-2cde8a0a96dc.png',
  'work-08.png': 'https://www.figma.com/api/mcp/asset/4db1fe68-c1f2-48fc-bbc2-64ee4202d1f8.png',
  'work-09.png': 'https://www.figma.com/api/mcp/asset/93a922af-c132-4850-91b2-f3a05f66122b.png',
  'work-10.png': 'https://www.figma.com/api/mcp/asset/5c842ef0-9a2e-4f3b-b0e2-708f57353b37.png',
  'work-11.png': 'https://www.figma.com/api/mcp/asset/9d39b61a-a0d7-4fe8-a246-d9ab6957a181.png',
  'work-12.png': 'https://www.figma.com/api/mcp/asset/f62072df-0ab2-47bc-9954-7f4cd0e71503.png',
  'work-13.png': 'https://www.figma.com/api/mcp/asset/a2797fe1-c633-46fb-b10a-5d8f716630ef.png',
  'work-14.png': 'https://www.figma.com/api/mcp/asset/6aa74648-b2da-483c-9012-7b49b19611de.png',
  'work-15.png': 'https://www.figma.com/api/mcp/asset/22bedb0e-e679-427e-94fa-398f6d005a72.png',
  'project-01-small-1.png': 'https://www.figma.com/api/mcp/asset/4b6e0b39-7c0e-4d4c-b3ec-896e4cfd4e0e.png',
  'project-01-small-2.png': 'https://www.figma.com/api/mcp/asset/70f12436-7c9b-4882-8951-5b3a3f953e14.png',
  'project-01-large.png': 'https://www.figma.com/api/mcp/asset/d1d8f2dd-f3b2-4ee8-9981-4fc5a4d663ef.png',
  'project-02-small-2.png': 'https://www.figma.com/api/mcp/asset/e7178f80-8fda-481d-8b08-b617f33a2b08.png',
  'project-02-small-1.png': 'https://www.figma.com/api/mcp/asset/b15a6bda-d3b0-4e73-84f0-ad5df95a7532.png',
  'project-02-large.png': 'https://www.figma.com/api/mcp/asset/69afc798-c042-45d4-8f54-1e2b4c07894c.png',
  'project-04-large.png': 'https://www.figma.com/api/mcp/asset/617cb86d-dcf2-46c5-98f3-366517df227d.png',
  'project-04-small-1.png': 'https://www.figma.com/api/mcp/asset/c8184aee-0590-44f7-8a90-8a5bddf877f1.png',
  'project-04-small-2.png': 'https://www.figma.com/api/mcp/asset/2f6e5eb0-db1c-4c8c-b48e-6da3f0877440.png',
  'contact-01.png': 'https://www.figma.com/api/mcp/asset/7eb5d0f5-a1bf-4f24-b468-92dc09f2a1dc.png',
  'contact-02.png': 'https://www.figma.com/api/mcp/asset/d6c22802-fc32-4939-9dc1-53374ea629b5.png',
  'contact-03.png': 'https://www.figma.com/api/mcp/asset/175a1289-ffbf-40f5-bdb7-ce05e8da113b.png',
  'contact-04.png': 'https://www.figma.com/api/mcp/asset/917e9752-ea1c-4ca6-a249-7d9b9ec22a80.png',
  'contact-05.png': 'https://www.figma.com/api/mcp/asset/b813addd-d129-4337-8cf9-fe5f6225849f.png',
  'contact-06.png': 'https://www.figma.com/api/mcp/asset/2191064f-9f7f-4e1b-823f-4b4cdfe069f7.png',
  'showreel-tv.png': 'https://www.figma.com/api/mcp/asset/423f1be1-be53-4350-8ef6-85e9ea6c3f6f.png',
  'hero-face.png': 'https://www.figma.com/api/mcp/asset/1591c222-061e-4ff3-ab5d-7d9e74498d63.png',
  'project-03-large.png': 'https://www.figma.com/api/mcp/asset/09a0e442-015f-4f53-8c7f-a6180cfd5e59.png',
  'project-03-small-1.png': 'https://www.figma.com/api/mcp/asset/032afd5e-b872-4c96-956b-2aa367516055.png',
  'project-03-small-2.png': 'https://www.figma.com/api/mcp/asset/be905469-8ea9-4cb5-89c2-f3e95e2020fe.png',
};

await mkdir(outDir, { recursive: true });

for (const [name, url] of Object.entries(assets)) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed ${name}: ${res.status} ${res.statusText}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, name), buf);
  console.log('ok', name, buf.length);
}
