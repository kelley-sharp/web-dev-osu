const questions = [
  {
    text: "Where would you like to live the most?",
    id: 1,
    options: [
      {
        text: "Somewhere nice and cool, maybe near the ocean",
        id: "1.1",
        weights: { addax: 2, panda: 3, baboon: 1, bear: 5, bat: 4 },
      },
      {
        text: "Somewhere tropical",
        id: "1.2",
        weights: { addax: 3, panda: 4, baboon: 1, bear: 0, bat: 5 },
      },
      {
        text: "In the Desert (warm and dry)",
        id: "1.3",
        weights: { addax: 5, panda: 0, baboon: 4, bear: 0, bat: 1 },
      },
      {
        text: "In the Temperate forest",
        id: "1.4",
        weights: { addax: 1, panda: 5, baboon: 1, bear: 1, bat: 0 },
      },
    ],
  },
  {
    text: "What would you prefer to eat the most of?",
    id: 2,
    options: [
      {
        text: "Plants",
        id: "2.1",
        weights: { addax: 5, panda: 5, baboon: 4, bear: 1, bat: 0 },
      },
      {
        text: "Meat or insects",
        id: "2.2",
        weights: { addax: 0, panda: 1, baboon: 2, bear: 5, bat: 0 },
      },
      {
        text: "Flowers, Fruits, and/or Nectar",
        id: "2.3",
        weights: { addax: 0, panda: 2, baboon: 3, bear: 1, bat: 5 },
      },
      {
        text: "Seeds",
        id: "2.4",
        weights: { addax: 0, panda: 0, baboon: 4, bear: 0, bat: 0 },
      },
    ],
  },
  {
    text: "What is your social life most like?",
    id: 3,
    options: [
      {
        text: "Surrounded by more than 20 people",
        id: "3.1",
        weights: { addax: 1, panda: 0, baboon: 4, bear: 0, bat: 5 },
      },
      {
        text: "Have between 10-20 close family members/friends",
        id: "3.2",
        weights: { addax: 5, panda: 0, baboon: 4, bear: 0, bat: 2 },
      },
      {
        text: "Mostly solitary, just you and maybe a significant other",
        id: "3.3",
        weights: { addax: 0, panda: 5, baboon: 0, bear: 1, bat: 0 },
      },
      {
        text:
          "Mostly solitary, enjoy having fun and being affectionate with close family and friends",
        id: "3.4",
        weights: { addax: 0, panda: 3, baboon: 1, bear: 4, bat: 0 },
      },
    ],
  },
  {
    text: " What best describes your ideal time of day to be active?",
    id: 4,
    options: [
      {
        text: "Mostly at night",
        id: "4.1",
        weights: { addax: 4, panda: 5, baboon: 0, bear: 0, bat: 3 },
      },
      {
        text: "Only during the day",
        id: "4.2",
        weights: { addax: 0, panda: 1, baboon: 5, bear: 5, bat: 2 },
      },
      {
        text: "Sometimes at night, sometimes during the day",
        id: "4.3",
        weights: { addax: 1, panda: 1, baboon: 0, bear: 0, bat: 4 },
      },
      {
        text: "sleep all day, active only at night",
        id: "4.4",
        weights: { addax: 5, panda: 4, baboon: 0, bear: 0, bat: 3 },
      },
    ],
  },
];

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
});
