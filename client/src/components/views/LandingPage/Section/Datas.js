const ingreMeat = [
  {
    _id: 1,
    name: "삼겹살",
  },
  {
    _id: 2,
    name: "오겹살",
  },
  {
    _id: 3,
    name: "목살",
  },
  {
    _id: 4,
    name: "앞다리살",
  },
  {
    _id: 5,
    name: "등심",
  },
  {
    _id: 6,
    name: "안심",
  },
  {
    _id: 7,
    name: "갈빗살",
  },
  {
    _id: 8,
    name: "아롱사태",
  },
  {
    _id: 9,
    name: "뒷다리살",
  },
  {
    _id: 10,
    name: "새우살",
  },
];

const ingreVegi = [
  {
    _id: 1,
    name: "파",
  },
  {
    _id: 2,
    name: "마늘",
  },
  {
    _id: 3,
    name: "버섯",
  },
  {
    _id: 4,
    name: "당근",
  },
  {
    _id: 5,
    name: "고추",
  },
  {
    _id: 6,
    name: "양파",
  },
  {
    _id: 7,
    name: "양배추",
  },
  {
    _id: 8,
    name: "깻잎",
  },
  {
    _id: 9,
    name: "상추",
  },
  {
    _id: 10,
    name: "오이",
  },
];

const ingreFish = [
  {
    _id: 1,
    name: "조기",
  },
  {
    _id: 2,
    name: "명태",
  },
  {
    _id: 3,
    name: "우럭",
  },
  {
    _id: 4,
    name: "광어",
  },
  {
    _id: 5,
    name: "오징어",
  },
  {
    _id: 6,
    name: "문어",
  },
  {
    _id: 7,
    name: "쭈꾸미",
  },
  {
    _id: 8,
    name: "농어",
  },
  {
    _id: 9,
    name: "방어",
  },
];

const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "North America",
  },
  {
    _id: 5,
    name: "South America",
  },
  {
    _id: 6,
    name: "Australia",
  },
  {
    _id: 7,
    name: "Antarctica",
  },
];

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $249",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "$250 to $279",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$280 to $299",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More then $300",
    array: [300, 150000],
  },
];
export { continents, price, ingreMeat, ingreVegi,  ingreFish};
