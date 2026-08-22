import type { Place } from './places';

export type FoodCategory = {
  id: string;
  title: string;
  blurb: string;
  places: Place[];
};

export const foodCategories: FoodCategory[] = [
  {
    id: 'buffets',
    title: 'All you can eat',
    blurb: 'Calabash-style seafood is the local institution. Come hungry.',
    places: [
      {
        id: 'pirates-table-calabash-seafood-buffet',
        name: "Pirate's Table Calabash Seafood Buffet",
        note: '20 minutes south · Surfside Beach',
        description:
          'One of the biggest buffets on the strand: crab legs, prime rib and a wall of Calabash-fried seafood. In season there are pirates and mermaids swimming in a 10,000-gallon pool while you eat. Worth the drive with children.',
        address: '1100 Water Ave, Surfside Beach, SC 29575',
      },
      {
        id: 'the-original-benjamins-calabash-seafood',
        name: "The Original Benjamin's Calabash Seafood",
        note: '10 minutes north',
        description:
          'The one that introduced the Grand Strand to Calabash-style seafood nearly forty years ago. Over 170 items including all-you-can-eat crab legs, in a huge nautical dining room built around a ship.',
        address: '9593 N Kings Hwy, Myrtle Beach, SC 29572',
        links: [
          {
            text: 'originalbenjamins.com',
            url: 'https://www.originalbenjamins.com/',
          },
        ],
      },
      {
        id: 'seafood-world-calabash-seafood-steak-buffet',
        name: 'Seafood World Calabash Seafood & Steak Buffet',
        note: '5 minutes south · the closest',
        description:
          'The closest of the big buffets to the condo. More than 120 items: snow crab, broiled and fried seafood, steaks and a long dessert line.',
        address: '411 N Kings Hwy, Myrtle Beach, SC 29577',
        links: [
          { text: 'seafoodworld.net', url: 'https://www.seafoodworld.net/' },
        ],
      },
      {
        id: 'captain-georges-seafood',
        name: "Captain George's Seafood",
        note: '5 minutes away',
        description:
          'Running since the late seventies, and the most upscale room of the bunch. Over seventy items on the buffet, with table service for drinks.',
        address: '1401 29th Ave N, Myrtle Beach, SC 29577',
      },
    ],
  },
  {
    id: 'local',
    title: 'When you want something other than seafood',
    blurb: 'A few places we keep going back to.',
    places: [
      {
        id: 'cafe-old-vienna',
        name: 'Cafe Old Vienna',
        note: 'Two blocks inland · walkable',
        description:
          'A proper Austrian and German restaurant run since 1997 by Werner and Martina Horvath, who are Austrian themselves. Wiener schnitzel, sauerbraten, rouladen, spaetzle and a beer garden, then apple strudel or Black Forest cake. The closest good dinner to the condo, and a real change of pace from fried shrimp.',
        address: '1604 N Kings Hwy, Myrtle Beach, SC 29577',
        links: [
          { text: 'cafeoldvienna.com', url: 'https://cafeoldvienna.com/' },
        ],
      },
      {
        id: 'the-marshwalk-at-murrells-inlet',
        name: 'The MarshWalk at Murrells Inlet',
        note: '25 minutes south',
        description:
          'Eight restaurants along a half-mile boardwalk over the marsh. Wahoo’s for shrimp and grits, Drunken Jack’s for the pirate room, Bovine’s for wood-fired steak and pizza, Neptune for the raw bar. Most have live music and a deck facing the sunset.',
        address: 'MarshWalk, Murrells Inlet, SC 29576',
      },
    ],
  },
  {
    id: 'breweries',
    title: 'Breweries',
    blurb: 'The local beer scene is better than the beach-town reputation.',
    places: [
      {
        id: 'grand-strand-brewing',
        name: 'Grand Strand Brewing',
        note: 'A mile south · the closest',
        description:
          'A small independent brewery with a taproom and outdoor seating, and the easiest one to reach from the condo. Seasonal and experimental beers alongside the regulars.',
        address: '819 N Kings Hwy, Myrtle Beach, SC 29577',
      },
      {
        id: 'voodoo-brewing-co',
        name: 'Voodoo Brewing Co.',
        note: 'At Broadway at the Beach',
        description:
          'Veteran-owned brewpub with rotating hop-forward IPAs and stouts alongside scratch-made pub food: burgers, nachos, pretzels and a proper kids’ menu. Ask about Voodoo Love Child, a Belgian tripel aged on sour cherries, raspberries and passion fruit. Easy to fold into a Broadway afternoon.',
        address: '1318 Celebrity Cir Unit CS8, Myrtle Beach, SC 29577',
        links: [
          {
            text: 'myrtlebeach.voodoobrewery.com',
            url: 'https://myrtlebeach.voodoobrewery.com/',
          },
        ],
      },
      {
        id: 'new-south-brewing',
        name: 'New South Brewing',
        note: 'Short drive',
        description:
          'Brewing small batches here since 1998, which makes it the elder statesman of Myrtle Beach beer. The taproom is where the seasonal and one-off brews turn up.',
        address: '1109 Campbell St, Myrtle Beach, SC 29577',
      },
      {
        id: 'tidal-creek-brewhouse',
        name: 'Tidal Creek Brewhouse',
        note: 'Short drive',
        description:
          'More than a dozen house beers on tap, plus fresh-roasted coffee in the morning, hard seltzer and cocktails. Open from breakfast onward, so it works at almost any hour.',
        address: '3421 Knoles St, Myrtle Beach, SC 29577',
      },
      {
        id: 'crooked-hammock-brewery',
        name: 'Crooked Hammock Brewery',
        note: '20 minutes north · Barefoot Landing',
        description:
          'Half beach bar, half backyard, with a big outdoor area of lawn games and fire pits, a full family menu, and enough beer to justify the drive. The most to do with children in tow.',
        address: '4924 Hwy 17 S, North Myrtle Beach, SC 29582',
      },
    ],
  },
];
