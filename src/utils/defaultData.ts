import { BirthdayConfig } from '../types';

export const INITIAL_BIRTHDAY_CONFIG: BirthdayConfig = {
  girlfriendName: 'Shrishti',
  boyfriendName: 'Aryan',
  nickname: 'My Sunshine',
  birthdayDate: '2026-11-30', // 30.11.26
  anniversaryDate: '2026-02-15', // 15.2.26
  ageMilestone: 16,
  heroHeadline: 'Happy Birthday to the Love of My Life',
  heroSubtitle:
    'Every single day with you feels like poetry. Today is all about celebrating the most incredible, radiant, and gentle soul in the entire universe.',
  customWish: 'May all your dreams blossom into reality, and may our laughs together only grow louder and sweeter with every passing year.',
  wishesBlownOut: false,

  loveReasons: [
    'The adorable way your nose scrunches when you genuinely laugh at something silly.',
    'How your hand fits so perfectly inside mine, like they were designed as a pair.',
    'The passionate sparkle in your eyes whenever you talk about things you love.',
    'How you always know when I need a hug, even before I realize it myself.',
    'The sweet sleepy voice you have in the morning before your first cup of coffee.',
    'How kind and empathetic you are to every person and animal you meet.',
    'The funny impromptu dance parties we have in the kitchen while cooking dinner.',
    'Your incredible taste in music and how we sing off-key at the top of our lungs in the car.',
    'The way you remember tiny details about our stories that happened years ago.',
    'How patient and understanding you are whenever life gets overwhelming.',
    'Your infectious giggle that instantly turns my worst day into my favorite one.',
    'How beautiful and breathtaking you look, especially when you are just in a cozy oversized hoodie.',
    'The warmth of your forehead kisses when we are saying goodbye for the day.',
    'The way you believe in me even when I doubt myself.',
    'Our late-night talks about the universe, our future, and funny childhood memories.',
    'How you hold onto my arm when we are walking together in the cold.',
    'Your courage to always follow your dreams and stand up for what is right.',
    'The comforting scent of your perfume that lingers on my favorite jackets.',
    'How you make ordinary trips to the grocery store feel like our own private adventure.',
    'The way you look at me across a crowded room and give me that knowing little smile.',
    'Your creative spirit and how you bring light, beauty, and warmth into every room you enter.',
    'How you celebrate my little victories as if they were your own.',
    'The cute little sounds you make when you are cozy under a warm blanket.',
    'How safe, peaceful, and entirely at home I feel whenever I am near you.',
    'Simply because you are you—unapologetically authentic, wonderfully loving, and forever my person.',
  ],

  memories: [
    {
      id: 'mem-1',
      title: 'The Day Everything Began',
      date: 'February 15, 2026',
      location: 'The Corner Espresso Cafe',
      story:
        'The day our journey officially started. We initially met up for a quick coffee, but before we knew it, hours flew by as we laughed and talked about everything under the sun.',
      tag: 'Day One',
      caption: 'The moment my world changed for the better.',
    },
    {
      id: 'mem-2',
      title: 'Our Spontaneous Rainy Afternoon',
      date: 'April 20, 2026',
      location: 'Scenic Coastline Walk',
      story:
        'It was pouring rain, our umbrella flipped inside out, and we ended up dancing in the rain completely soaked, laughing until our stomachs hurt.',
      tag: 'Adventure',
      caption: 'Dancing under raindrops without a single care.',
    },
    {
      id: 'mem-3',
      title: 'Under the Starlit Observatory',
      date: 'June 14, 2026',
      location: 'Skyline Ridge Lookout',
      story:
        'Wrapped up together watching the stars. You pointed out constellations and made a sweet secret wish—and I already had mine right beside me.',
      tag: 'Magical Night',
      caption: 'Under infinite stars, with my favorite person.',
    },
    {
      id: 'mem-4',
      title: 'The Great Pasta Disaster',
      date: 'August 02, 2026',
      location: 'Our Cozy Kitchen',
      story:
        'We attempted to make homemade ravioli from scratch. Flour ended up everywhere, the sauce was a mess, but the laughing was five-star gourmet.',
      tag: 'Laughs & Chaos',
      caption: 'Flour everywhere, hearts completely full.',
    },
    {
      id: 'mem-5',
      title: 'Sunset at Golden Harbor',
      date: 'September 18, 2026',
      location: 'Seaside Bluffs',
      story:
        'Sitting together watching the sky turn vibrant shades of coral, apricot, and violet. You leaned your head against my shoulder as the waves washed against the rocks.',
      tag: 'Golden Hour',
      caption: 'My favorite view will always be you.',
    },
    {
      id: 'mem-6',
      title: 'Sunday Morning Pancakes',
      date: 'October 12, 2026',
      location: 'Sunny Breakfast Table',
      story:
        'Sunlight pouring through the blinds, soft music playing, warm pancakes on the griddle, and your bright sleepy smile.',
      tag: 'Simple Bliss',
      caption: 'Paradise is found in our calmest ordinary mornings.',
    },
  ],

  letters: [
    {
      id: 'letter-today',
      sealColor: '#9f1239', // deep rose
      openWhen: 'On Your Birthday Today',
      subtitle: 'To the girl who holds my whole heart',
      datePenciled: 'Today',
      salutation: 'Dearest Shrishti,',
      body: [
        'Happy Birthday, my darling. When I look at you today, my heart is so deeply grateful for the day you came into this world.',
        'You have this gentle superpower: you make everyone around you feel valued, cherished, and seen. But to me, you are my sanctuary, my compass, and my greatest joy.',
        'I hope this year brings you all the peace, the wildest dreams, and the boundless love you deserve. Whatever life brings, I will be right here by your side, cheering for you and loving you more with every beat of my heart.',
      ],
      signature: 'Forever and always yours,\nAryan',
    },
    {
      id: 'letter-miss-me',
      sealColor: '#0369a1', // deep sky
      openWhen: 'When You Miss Me',
      subtitle: 'Whenever distance feels a little too far',
      datePenciled: 'With endless warmth',
      salutation: 'My Sweet Love,',
      body: [
        'If you are reading this right now, close your eyes for three seconds. Take a slow, deep breath.',
        'No matter how many miles or hours stand between us at any moment, remember that you are carrying a piece of my heart everywhere you go.',
        'Look at our photos, remember our silly inside jokes, and remember that I am probably thinking about you at this exact same second.',
      ],
      signature: 'Counting down the minutes until I hold you,\nAryan',
    },
    {
      id: 'letter-stressed',
      sealColor: '#15803d', // sage emerald
      openWhen: 'When You Feel Stressed or Overwhelmed',
      subtitle: 'A gentle reminder to pause and breathe',
      datePenciled: 'A soft refuge',
      salutation: 'Hey Beautiful,',
      body: [
        'First: drop your shoulders. Unclench your jaw. Take a sip of water.',
        'You are doing your absolute best, and you have survived 100% of the hardest days that came before this one. You don’t have to carry the whole world on your shoulders today.',
        'Be gentle with yourself. You are brilliant, capable, and more than enough. When you come home, I’ve got dinner, a warm blanket, and infinite back massages waiting for you.',
      ],
      signature: 'Your biggest fan & safe haven,\nAryan',
    },
    {
      id: 'letter-sleep',
      sealColor: '#4338ca', // indigo twilight
      openWhen: 'When You Cannot Fall Asleep',
      subtitle: 'A cozy late-night lullaby in words',
      datePenciled: 'Midnight Whispers',
      salutation: 'My Sleepy Angel,',
      body: [
        'The moon is high, the stars are watching over you, and the world is resting. Put your worries on the nightstand—they can wait until morning.',
        'Imagine my arms wrapped tightly around you, the gentle sound of rain against the window, and how safe and warm we are together.',
        'Dream sweet dreams of ocean breezes, warm sunshine, and all the adventures waiting for us. Goodnight my darling.',
      ],
      signature: 'Loving you in every dream,\nAryan',
    },
    {
      id: 'letter-doubt',
      sealColor: '#b45309', // warm amber
      openWhen: 'When You Need a Reminder of How Gorgeous You Are',
      subtitle: 'The truth you sometimes forget',
      datePenciled: 'From the bottom of my heart',
      salutation: 'To the Most Stunning Woman,',
      body: [
        'I see the way you look in the mirror sometimes, being overly critical of tiny things no one else would ever notice.',
        'Let me tell you what I see: eyes that tell stories of deep kindness, a smile that can illuminate the darkest room, and a grace that takes my breath away every single time you walk through the door.',
        'You are captivating, not just in your beauty, but in the radiant spirit that shines through everything you do.',
      ],
      signature: 'Hopelessly in love with you,\nAryan',
    },
  ],

  vouchers: [
    {
      id: 'vouch-1',
      title: 'Candlelit 3-Course Dinner',
      category: 'Romantic Date',
      reward: 'A custom homemade 3-course dinner prepared by me, with your favorite wine and dessert of your choice!',
      iconName: 'UtensilsCrossed',
      isRedeemed: false,
    },
    {
      id: 'vouch-2',
      title: 'Spontaneous Weekend Getaway',
      category: 'Travel & Fun',
      reward: 'A cozy weekend road trip to a cabin or beach town, planned and arranged completely by me!',
      iconName: 'Compass',
      isRedeemed: false,
    },
    {
      id: 'vouch-3',
      title: 'Unlimited Hugs & Massages',
      category: 'Tender Care',
      reward: 'Valid anytime, anywhere! 30-minute head/back massage followed by unlimited cozy cuddles.',
      iconName: 'HeartHandshake',
      isRedeemed: false,
    },
    {
      id: 'vouch-4',
      title: 'Ultimate Movie & Snack Night',
      category: 'Cozy Fun',
      reward: 'You pick any movie (even rom-coms I pretend not to like) + custom snack bar & bottomless popcorn!',
      iconName: 'Film',
      isRedeemed: false,
    },
  ],

  quizQuestions: [
    {
      id: 'q1',
      question: 'What did we order on our very first spontaneous date?',
      options: ['Iced caramel lattes & blueberry muffins', 'Two hot chocolates and a shared croissant', 'Two matcha lattes with oat milk', 'Black coffee and lemon scones'],
      correctIndex: 0,
      explanation: 'You insisted on getting the largest iced caramel latte with extra whipped cream!',
    },
    {
      id: 'q2',
      question: 'What is Aryan’s absolute favorite thing about you?',
      options: ['Your brilliant mind', 'Your adorable nose scrunch laugh', 'Your endless kindness', 'All of the above, plus a million more'],
      correctIndex: 3,
      explanation: 'It is impossible to pick just one—you are perfection through and through!',
    },
    {
      id: 'q3',
      question: 'Where did we take our unforgettable rainy road trip?',
      options: ['Blue Ridge Parkway', 'Pacific Coast Highway', 'Route 66', 'Great Smoky Mountains'],
      correctIndex: 1,
      explanation: 'Driving along the coast in the pouring rain, dancing at the scenic overlook!',
    },
    {
      id: 'q4',
      question: 'How long will Aryan love Shrishti?',
      options: ['Until tomorrow', 'For 10 years', 'Until the stars burn out and forever after', 'Only on weekends'],
      correctIndex: 2,
      explanation: 'Forever and always, through every chapter of this beautiful life.',
    },
  ],
};
