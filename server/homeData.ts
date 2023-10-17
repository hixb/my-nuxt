export interface ServerData {
  id: number
  title: string
  description: string
  height: string
  countries: string[]
  continent: string
  image: string
  dir: string
  path: string
  slug: string
  updatedAt: string
}

export function fetchHomeData(): Promise<ServerData[]> {
  return new Promise((resolve) => {
    resolve([
      {
        id: 1,
        title: 'Aconcagua',
        description: 'Aconcagua is a mountain in the Principal Cordillera of the Andes mountain range, in Mendoza Province, Argentina. It is the highest mountain in the Americas and the highest outside of Asia, being the highest in both the Southern and Western Hemispheres with a summit elevation of 6,960.8 metres.',
        height: '6,962 m',
        countries: [
          'Argentina',
        ],
        continent: 'South America',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aconcagua2016.jpg/600px-Aconcagua2016.jpg',
        dir: '/mountains',
        path: '/mountains/aconcagua',
        slug: 'aconcagua',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 2,
        title: 'Mont Blanc',
        description: 'Mont Blanc is the highest mountain in the Alps and the highest in Europe west of the Caucasus peaks of Russia and Georgia. It rises 4,808 m above sea level and is ranked 11th in the world in topographic prominence.',
        height: '4,810 m',
        countries: [
          'France',
          'Italy',
        ],
        continent: 'Europe',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mont-Blanc_from_Planpraz_station.jpg/600px-Mont-Blanc_from_Planpraz_station.jpg',
        dir: '/mountains',
        path: '/mountains/mount-blanc',
        slug: 'mount-blanc',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 3,
        title: 'Denali',
        description: 'Denali is the highest mountain peak in North America, with a summit elevation of 20,310 feet above sea level. With a topographic prominence of 20,156 feet and a topographic isolation of 4,629 miles, Denali is the third most prominent and third most isolated peak on Earth, after Mount Everest and Aconcagua.',
        height: '6,190 m',
        countries: [
          'Alaska',
        ],
        continent: 'North America',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Wonder_Lake_and_Denali.jpg/600px-Wonder_Lake_and_Denali.jpg',
        dir: '/mountains',
        path: '/mountains/denali',
        slug: 'denali',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 4,
        title: 'Mount Everest',
        description: 'Mount Everest is Earth\'s highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas. The China–Nepal border runs across its summit point',
        height: '8,848 m',
        countries: [
          'China',
          'Nepal',
        ],
        continent: 'Asia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Everest_kalapatthar.jpg/600px-Everest_kalapatthar.jpg',
        dir: '/mountains',
        path: '/mountains/mount-everest',
        slug: 'mount-everest',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 5,
        title: 'Mount Kilimanjaro',
        description: 'Mount Kilimanjaro is a dormant volcano in Tanzania. It has three volcanic cones: Kibo, Mawenzi and Shira. It is the highest mountain in Africa and the highest single free-standing mountain in the world: 5,895 metres above sea level and about 4,900 metres above its plateau base.',
        height: '5,895 m',
        countries: [
          'Tanzania',
        ],
        continent: 'Africa',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Mont-Blanc_from_Planpraz_station.jpg/600px-Mont-Blanc_from_Planpraz_station.jpg',
        dir: '/mountains',
        path: '/mountains/mount-kilimanjaro',
        slug: 'mount-kilimanjaro',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 6,
        title: 'Mount Kosciuszko',
        description: 'Mount Kosciuszko is mainland Australia\'s highest mountain, at 2,228 metres above sea level. It is located on the Main Range of the Snowy Mountains in Kosciuszko National Park, part of the Australian Alps National Parks and Reserves in New South Wales.',
        height: '2,228 m',
        countries: [
          'Australia',
        ],
        continent: 'Australia',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Sunrise_views_from_the_summit_of_Mount_Kosciuszko%2C_Kosciuszko_National_Park_56.jpg/600px-Sunrise_views_from_the_summit_of_Mount_Kosciuszko%2C_Kosciuszko_National_Park_56.jpg',
        dir: '/mountains',
        path: '/mountains/mount-kosciuszko',
        slug: 'mount-kosciuszko',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
      {
        id: 7,
        title: 'Vinson Massif',
        description: 'Vinson Massif is a large mountain massif in Antarctica that is 21 km long and 13 km wide and lies within the Sentinel Range of the Ellsworth Mountains. It overlooks the Ronne Ice Shelf near the base of the Antarctic Peninsula. The massif is located about 1,200 kilometres from the South Pole.',
        height: '4,892 m',
        countries: [
          'Antarctic',
        ],
        continent: 'Antarctic',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Mount_Vinson_from_NW_at_Vinson_Plateau_by_Christian_Stangl_%28flickr%29.jpg/600px-Mount_Vinson_from_NW_at_Vinson_Plateau_by_Christian_Stangl_%28flickr%29.jpg',
        dir: '/mountains',
        path: '/mountains/vinson-massif',
        slug: 'vinson-massif',
        updatedAt: '2020-12-11T15:40:35.000Z',
      },
    ])
  })
}
