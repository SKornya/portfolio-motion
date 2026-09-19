import { images } from '../assets/media';

export type ScreenId = 'hero' | 'works' | 'about' | 'skills' | 'projects' | 'showreel';

export type ScreenDef = {
  id: ScreenId;
  hash: string;
  theme: 'dark' | 'light';
  steps: number;
};

export const screens: ScreenDef[] = [
  { id: 'hero', hash: 'hero', theme: 'dark', steps: 1 },
  { id: 'works', hash: 'works', theme: 'dark', steps: 1 },
  { id: 'about', hash: 'about', theme: 'dark', steps: 1 },
  { id: 'skills', hash: 'skills', theme: 'light', steps: 5 },
  { id: 'projects', hash: 'projects', theme: 'dark', steps: 4 },
  { id: 'showreel', hash: 'showreel', theme: 'dark', steps: 2 },
];

export const navItems = [
  { label: 'Обо мне', hash: 'about' },
  { label: 'Навыки', hash: 'skills' },
  { label: 'Проекты', hash: 'projects' },
  { label: 'Контакты', hash: 'contacts' },
] as const;

export const about = {
  title: 'ОБО МНЕ',
  lead: 'Всем привет! Меня зовут Рудницкая Анастасия.',
  text: 'Я motion designer с 5-летним стажем. Занимаюсь созданием динамичных, запоминающихся рекламных роликов, 3D анимацией и промышленным дизайном. Горю своим делом и никогда не пускаю все на самотек.',
};

export const hero = {
  title: 'ПОРТФОЛИО',
  note: ['Я самая пиздатая блять', 'Понятно вам?', 'Уёбы'] as const,
};

export const skills = [
  {
    num: '01',
    title: 'МОУШЕН-ДИЗАЙН',
    text: 'Создание рекламных роликов и промо-анимаций, визуальных эффектов. Анимация персонажей, монтаж и постпродакшн.',
  },
  {
    num: '02',
    title: '3D МОДЕЛИРОВАНИЕ',
    text: 'Моделирование простых и сложных объектов, работа с топологией, UV-развертка и текстурирование, освещение. Работа с визуальной подачей.',
  },
  {
    num: '03',
    title: '3D АНИМАЦИЯ',
    text: 'Создание динамичной анимации элементов. Персонажная анимация. Работа с костями. Анимация камеры.',
  },
  {
    num: '04',
    title: 'ПРОДУКТОВЫЙ 3D ДИЗАЙН',
    text: 'Моделирование оборудования по чертежам или фото. Ретопология, UV-развертка, текстурирование и подготовка финальных рендеров.',
  },
  {
    num: '05',
    title: 'ОСОБЫЕ НАВЫКИ',
    text: 'Оценка времени на производство, соблюдение дедлайнов, предложения визуального решения относительно сроков, написание сценариев.',
  },
];

export type Project = {
  num: string;
  title: string;
  result: string;
  videoUrl: string;
  large: string;
  small: string[];
};

export const projects: Project[] = [
  {
    num: '01',
    title: 'ТЕЛЕВИЗОРЫ ТРИКОЛОР QLED — НАСТОЯЩИЙ ЦВЕТ',
    result: 'РК получила бронзу на фестивале Silver Mercury',
    videoUrl: 'https://storage.yandexcloud.net/portfolio-ruda/START_1%D1%80%D1%83%D0%B1%D0%BB%D1%8C.mp4',
    large: images.projects[0].large,
    small: images.projects[0].small,
  },
  {
    num: '02',
    title: 'ИМИДЖ ДЛЯ ОНЛАЙН-КИНОТЕАТРА ТРИКОЛОР',
    result: 'Рост всех показателей на ~10% от обычных значений',
    videoUrl: 'https://storage.yandexcloud.net/portfolio-ruda/START_1%D1%80%D1%83%D0%B1%D0%BB%D1%8C.mp4',
    large: images.projects[1].large,
    small: images.projects[1].small,
  },
  {
    num: '03',
    title: 'ВИЗУАЛЬНОЕ ОФОРМЛЕНИЕ К 20-ЛЕТИЮ ТРИКОЛОРА',
    result: 'Создание 3D графики и анимации',
    videoUrl: 'https://storage.yandexcloud.net/portfolio-ruda/START_1%D1%80%D1%83%D0%B1%D0%BB%D1%8C.mp4',
    large: images.projects[2].large,
    small: images.projects[2].small,
  },
  {
    num: '04',
    title: 'START ЗА 1 РУБЛЬ',
    result: 'Прирост аудитории после пробного периода',
    videoUrl: 'https://storage.yandexcloud.net/portfolio-ruda/START_1%D1%80%D1%83%D0%B1%D0%BB%D1%8C.mp4',
    large: images.projects[3].large,
    small: images.projects[3].small,
  },
];

export const showreel = {
  title: 'ШОУРИЛ',
  videoUrl: 'https://storage.yandexcloud.net/portfolio-ruda/START_1%D1%80%D1%83%D0%B1%D0%BB%D1%8C.mp4',
};

export const contacts = {
  socialTitle: 'СОЦСЕТИ',
  contactsTitle: 'КОНТАКТЫ',
  socials: [
    { label: 'Telegram', href: 'https://t.me/' },
    { label: 'VK', href: 'https://vk.com/' },
  ],
  details: [
    { label: 'Firestar1996@mail.ru', href: 'mailto:Firestar1996@mail.ru' },
    { label: '+7 (981) 161 43 22', href: 'tel:+79811614322' },
    { label: 'Санкт-Петербург', href: null },
  ],
};

export function resolveHash(hash: string): { index: number; step: number } {
  const clean = hash.replace(/^#/, '');
  if (clean === 'contacts') {
    return { index: screens.findIndex((screen) => screen.id === 'showreel'), step: 1 };
  }
  const projectMatch = /^project-(\d)$/.exec(clean);
  if (projectMatch) {
    const projectsIndex = screens.findIndex((screen) => screen.id === 'projects');
    return { index: projectsIndex, step: Math.max(0, Number(projectMatch[1]) - 1) };
  }
  const index = screens.findIndex((screen) => screen.hash === clean);
  return { index: index >= 0 ? index : 0, step: 0 };
}

export function hashFor(index: number, step: number): string {
  const screen = screens[index];
  if (!screen) {
    return 'hero';
  }
  if (screen.id === 'showreel' && step >= 1) {
    return 'contacts';
  }
  if (screen.id === 'projects') {
    return step > 0 ? `project-${step + 1}` : 'projects';
  }
  return screen.hash;
}
