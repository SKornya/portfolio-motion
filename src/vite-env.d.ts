/// <reference types="vite/client" />

declare module '*?format=webp*' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
