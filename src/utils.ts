const mockData = [
  "Bret",
  "Antonette",
  "Samantha",
  "Karianne",
  "Kamren",
  "Leopoldo_Corkery",
  "Elwyn.Skiles",
  "Maxime_Nienow",
  "Delphine",
  "Moriah.Stanton",
];

export const getMockData = () =>
  mockData[Math.floor(Math.random() * mockData.length)];
