export const DEFAULT_APPLICATION_AREAS = [
  {
    id: 'chemical',
    name: '化工行业',
    desc: '酸碱液体、溶剂、涂料、油墨等化工介质的精密过滤与纯化',
    image: '/images/application/chemical-plant-pipes-industrial-filtration.jpg',
    enabled: true,
  },
  {
    id: 'food',
    name: '食品饮料',
    desc: '饮用水、果汁、乳制品、啤酒、食用油等食品级安全过滤',
    image: '/images/application/food-beverage-production-line-bottles.jpg',
    enabled: true,
  },
  {
    id: 'pharma',
    name: '医药生物',
    desc: '制药用水、生物制剂、注射液等高标准无菌过滤与分离',
    image: '/images/application/pharmaceutical-lab-equipment-sterile.jpg',
    enabled: true,
  },
  {
    id: 'electronics',
    name: '电子半导体',
    desc: '超纯水、光刻胶、电镀液等电子级高纯度过滤处理',
    image: '/images/application/semiconductor-cleanroom-wafer-production.jpg',
    enabled: true,
  },
  {
    id: 'water',
    name: '水处理',
    desc: '市政供水、工业废水、海水淡化等水处理系统过滤环节',
    image: '/images/application/water-treatment-plant-filtration-system.jpg',
    enabled: true,
  },
  {
    id: 'automotive',
    name: '汽车制造',
    desc: '电泳漆、切削液、清洗水等汽车制造工艺中的流体过滤',
    image: '/images/application/automotive-manufacturing-assembly-line.jpg',
    enabled: true,
  },
];

export const AREA_ICONS = {
  chemical: 'M19.43 12.98c.04-.32.07-.64.07-.98 0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c.34 0 .66-.03.98-.07M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z',
  food: 'M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.19zm6.78-1.81a1.998 1.998 0 0 0 0-2.83L12.75 4.5l-1.06 1.06 3.54 3.54-1.06 1.06-3.54-3.54-1.06 1.06 2.83 2.83 4.24-4.24z',
  pharma: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z',
  electronics: 'M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z',
  water: 'M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z',
  automotive: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
};

export function getAreaIcon(id) {
  return AREA_ICONS[id] || AREA_ICONS.chemical;
}
