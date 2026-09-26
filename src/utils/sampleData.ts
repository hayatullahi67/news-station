import { NewsArticle, Author } from '../types/news';

export const authors: Author[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format',
    title: 'Senior Political Correspondent',
  },
  {
    id: '2',
    name: 'James Okafor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format',
    title: 'Business & Finance Editor',
  },
  {
    id: '3',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format',
    title: 'Technology Reporter',
  },
  {
    id: '4',
    name: 'Marcus Webb',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format',
    title: 'Sports Correspondent',
  },
  {
    id: '5',
    name: 'Elena Vasquez',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&auto=format',
    title: 'Entertainment Editor',
  },
];

export const sampleArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Global Leaders Convene in Geneva for Historic Climate Emergency Summit',
    summary:
      'World leaders from over 140 nations gathered in Geneva to draft binding agreements on carbon emissions, marking the most ambitious climate policy effort in a decade.',
    content: `World leaders from over 140 nations gathered in Geneva this week to draft binding agreements on carbon emissions, marking the most ambitious climate policy effort since the Paris Accord. The summit, hosted by the United Nations Environment Programme, brought together heads of state, environmental scientists, and industry representatives to address the accelerating climate crisis.

"We are at a tipping point," said UN Secretary-General Antonio Guterres in his opening address. "The decisions made in the next 72 hours will define the trajectory of our planet for generations to come."

Key proposals on the table include a global net-zero carbon target by 2045, a $500 billion green transition fund for developing nations, and enforceable penalties for nations that fail to meet emissions benchmarks. The agreement would represent a significant departure from the voluntary framework of previous climate accords.

The United States and European Union have signaled strong support for the binding targets, while China and India have called for more flexibility in implementation timelines, citing their ongoing development needs. Several island nations, facing existential threats from rising sea levels, have pushed for even more aggressive timelines.

Environmental groups have cautiously welcomed the summit's ambition while warning that commitments must be followed by immediate action. "We've had promises before," said Greenpeace director Jennifer Morgan. "What we need now is legally binding enforcement mechanisms."

Markets responded positively to news of the summit's progress, with renewable energy stocks surging on Thursday. Solar panel manufacturer SunTech saw shares rise 12% while wind energy giant Vestas gained 8% in morning trading.

The final agreement is expected to be signed on Friday, with implementation frameworks to be established by member nations within 18 months.`,
    category: 'Politics',
    author: authors[0],
    publishedAt: '2026-09-24T09:00:00Z',
    updatedAt: '2026-09-24T11:30:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: true,
    isFeatured: true,
    views: 48320,
    readingTime: 5,
    tags: ['Climate', 'Geneva', 'UN Summit', 'Carbon Emissions'],
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Pause on Rate Hikes as Inflation Cools to 2.1%',
    summary:
      'The Federal Reserve indicated it may hold interest rates steady at its next meeting after new data showed inflation falling to its lowest level in four years.',
    content: `The Federal Reserve signaled Wednesday that it is likely to pause its interest rate hiking cycle after new consumer price index data showed inflation cooling to 2.1% — the lowest level since early 2022.

Fed Chair Jerome Powell, speaking at a press conference following the central bank's policy meeting, described the data as "encouraging progress" but cautioned that the Fed would remain "data-dependent" in its approach.

"We are seeing the effects of our policy actions take hold," Powell said. "Price pressures are easing across most categories, though we remain vigilant against any resurgence."

The news sent markets surging, with the Dow Jones Industrial Average gaining 580 points and the S&P 500 climbing 1.9% to close at 5,847. Treasury yields fell sharply, with the 10-year note dropping to 3.82%.

For consumers, the prospect of stable rates offers some relief after two years of elevated borrowing costs that have weighed heavily on mortgages, auto loans, and credit card debt. The average 30-year fixed mortgage rate, which peaked at 8.1% last year, has already fallen to 6.4% in anticipation of the Fed's pivot.

Economists are now forecasting the first rate cut could come as early as December, with markets pricing in a 73% probability of a 25 basis point reduction at the December meeting.

"This is welcome news for American households and businesses," said Treasury Secretary Janet Yellen. "The data confirms our strategy of targeted, measured policy is working."`,
    category: 'Business',
    author: authors[1],
    publishedAt: '2026-09-23T14:30:00Z',
    updatedAt: '2026-09-23T16:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    views: 32150,
    readingTime: 4,
    tags: ['Federal Reserve', 'Inflation', 'Interest Rates', 'Economy'],
  },
  {
    id: '3',
    title: 'OpenAI Launches GPT-6 with Real-Time Reasoning and Multimodal Capabilities',
    summary:
      'OpenAI unveiled its next-generation AI model with unprecedented reasoning abilities, real-time web access, and the capacity to process audio, video, and text simultaneously.',
    content: `OpenAI unveiled its most advanced artificial intelligence system Thursday, introducing GPT-6 with capabilities that researchers say represent a fundamental leap in machine reasoning and real-world performance.

The model, which launches to enterprise customers next month before a broader consumer rollout in November, can process audio, video, and text simultaneously while maintaining coherent, extended reasoning chains — a capability previous models struggled with.

"GPT-6 marks a genuine inflection point," said OpenAI CEO Sam Altman at a product launch event in San Francisco. "We're seeing benchmark performance that consistently exceeds expert human performance across scientific, legal, and engineering domains."

In demonstrations, the model solved novel mathematical proofs, wrote and debugged complex software, analyzed live video feeds to answer questions about real-world scenarios, and engaged in extended scientific reasoning across multi-step problems.

The release reignites debate about AI safety and deployment timelines. OpenAI's board published a 40-page safety evaluation alongside the announcement, noting that the model passed all internal safety benchmarks but that "certain emergent capabilities require ongoing monitoring."

Competitors are expected to respond quickly. Google DeepMind and Anthropic both declined to comment on their own roadmaps, while Microsoft, which has a major investment in OpenAI, confirmed it will integrate GPT-6 across its Azure cloud platform and Office suite.

Pricing for enterprise access starts at $0.15 per 1,000 tokens, with consumer subscription tiers expected to remain similar to the current ChatGPT Plus pricing.`,
    category: 'Technology',
    author: authors[2],
    publishedAt: '2026-09-22T18:00:00Z',
    updatedAt: '2026-09-22T20:15:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: true,
    isFeatured: false,
    views: 67890,
    readingTime: 5,
    tags: ['OpenAI', 'GPT-6', 'Artificial Intelligence', 'Technology'],
  },
  {
    id: '4',
    title: 'Manchester City Clinches Champions League Title in Dramatic Penalty Shootout',
    summary:
      'Manchester City defeated Real Madrid 4-2 on penalties after a breathless 2-2 draw in the Champions League final, claiming their fourth European title.',
    content: `Manchester City claimed their fourth UEFA Champions League title on Wednesday night, defeating Real Madrid 4-2 in a penalty shootout after a thrilling 2-2 draw at Wembley Stadium.

The match lived up to its billing as a classic final, with City racing into a 2-0 lead through goals from Erling Haaland and Phil Foden, before Madrid's Vinicius Jr. and Jude Bellingham leveled with two strikes in ten second-half minutes to send the match to extra time.

The shootout was a nervy affair, with Madrid's Kylian Mbappe and Federico Valverde both seeing their penalties saved by City goalkeeper Ederson, before Haaland coolly dispatched the winning kick to send City's fans into raptures.

"This team never stops believing," said City manager Pep Guardiola, visibly emotional. "When they equalized I thought, 'here we go again' — but this squad has a resilience that is extraordinary."

Haaland, who scored 38 goals in all competitions this season, was named player of the tournament after a campaign in which he consistently proved the difference for City. The Norwegian striker now has two Champions League medals to his name.

For Real Madrid, the defeat ends a remarkable cup run that saw them eliminate Bayern Munich, PSG, and Borussia Dortmund. Manager Carlo Ancelotti praised his team's never-say-die spirit but admitted City had been the better side over the season.

The match drew a global television audience of over 400 million viewers, making it the most-watched Champions League final since 2019.`,
    category: 'Sports',
    author: authors[3],
    publishedAt: '2026-09-21T23:00:00Z',
    updatedAt: '2026-09-22T01:30:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 89450,
    readingTime: 4,
    tags: ["Champions League", "Manchester City", "Real Madrid", "Football"],
  },
  {
    id: '5',
    title: "Beyoncé's 'Renaissance III' Album Breaks Spotify Streaming Record in 24 Hours",
    summary:
      "The global superstar's third installment of her Renaissance trilogy set a new Spotify record with 284 million streams in its first 24 hours, eclipsing her own previous record.",
    content: `Beyoncé shattered streaming records Friday with the release of "Renaissance III," her highly anticipated album that broke Spotify's all-time 24-hour streaming record with 284 million plays — surpassing her own previous record set by "Renaissance II" in 2025.

The 18-track album, which blends Afrobeats, house, and orchestral R&B, debuted at number one in 47 countries simultaneously and is already the fastest album to reach 500 million streams on the platform.

Critics have responded with near-universal acclaim. Rolling Stone called it "a monumental artistic statement," while The Guardian awarded it five stars, describing it as "the most complete artistic vision of her career."

The album features collaborations with Kendrick Lamar, Burna Boy, and a surprise appearance from Rihanna on the closing track, "Sovereign," which immediately became the most-searched song globally following the album's midnight release.

Beyoncé addressed fans in a rare direct statement posted to her website: "This trilogy has been the most personal creative journey of my life. Renaissance III is about reclaiming power, joy, and the unapologetic fullness of being."

Ticket demand for her accompanying world tour, announced simultaneously with the album, immediately crashed Ticketmaster's servers, with fans reporting wait times of over four hours. The tour will span 94 dates across North America, Europe, Africa, and Asia.`,
    category: 'Entertainment',
    author: authors[4],
    publishedAt: '2026-09-20T07:00:00Z',
    updatedAt: '2026-09-20T09:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 54320,
    readingTime: 3,
    tags: ['Beyoncé', 'Music', 'Streaming', 'Entertainment'],
  },
  {
    id: '6',
    title: 'Senate Passes Bipartisan Infrastructure Renewal Act in 68-32 Vote',
    summary:
      'A bipartisan coalition in the Senate approved a $1.2 trillion infrastructure package to repair bridges, expand broadband, and modernize the electrical grid.',
    content: `The United States Senate passed the Infrastructure Renewal Act Thursday in a 68-32 bipartisan vote, approving $1.2 trillion in spending to repair the nation's aging bridges, roads, and water systems while significantly expanding broadband access and modernizing the electrical grid.

The bill, which now moves to the House where passage is expected next week, represents the largest infrastructure investment in American history and the most significant bipartisan legislative achievement in years.

"This is a win for every American community, from rural Montana to downtown Detroit," said Senate Majority Leader Chuck Schumer. "We're investing in the backbone of our economy for the next generation."

Republican Senate Leader Mitch McConnell, who helped negotiate the deal, called the bill "fiscally responsible infrastructure investment that will pay dividends for decades."

Key provisions include $550 billion for roads, bridges, and transit systems; $65 billion to expand high-speed internet to rural areas; $110 billion for water infrastructure, including lead pipe replacement; and $73 billion to modernize the electrical grid with improved capacity for renewable energy.

The bill is projected to create 2.2 million jobs over its eight-year implementation period, according to the Congressional Budget Office, which also estimated it would reduce the deficit by $31 billion over ten years through increased economic activity.

Construction and engineering stocks surged on the news, with Caterpillar rising 6.4% and Jacobs Engineering gaining 9.1%.`,
    category: 'Politics',
    author: authors[0],
    publishedAt: '2026-09-19T16:30:00Z',
    updatedAt: '2026-09-19T18:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 28900,
    readingTime: 4,
    tags: ['Senate', 'Infrastructure', 'Bipartisan', 'Congress'],
  },
  {
    id: '7',
    title: "Apple Unveils iPhone 18 with Satellite Connectivity and AI-Powered Health Monitoring",
    summary:
      "Apple's latest flagship introduces direct satellite messaging, real-time blood glucose monitoring without needles, and a dedicated AI neural engine capable of on-device reasoning.",
    content: `Apple unveiled the iPhone 18 lineup Tuesday at its annual fall event, introducing a sweeping set of health and connectivity features that the company says represent "the biggest leap forward in iPhone history."

The flagship iPhone 18 Pro includes non-invasive blood glucose monitoring using optical sensors embedded in the titanium chassis — a feature Apple calls "GlucoseGuard" — along with real-time blood pressure tracking and advanced sleep apnea detection with FDA clearance.

Two-way satellite connectivity now comes standard across all iPhone 18 models, allowing users to send iMessages, make emergency calls, and even use certain apps in areas with no cellular coverage. Apple has partnered with GlobalStar and SpaceX's Starlink satellite networks to provide the service.

The A20 Bionic chip features a dedicated "Neural Reasoning Engine" — a separate processor cluster designed specifically for on-device AI inference. Apple says this allows complex AI tasks, including real-time language translation, contextual reasoning, and image analysis, to run entirely on the device without sending data to servers.

"We've always believed that privacy and intelligence aren't mutually exclusive," said Apple CEO Tim Cook. "The iPhone 18 proves that the most powerful AI can live right in your pocket."

Camera improvements include a 108-megapixel main sensor, a periscope telephoto lens with 10x optical zoom, and Apple Intelligence-powered photo editing that can realistically adjust lighting, remove objects, and enhance details.

The iPhone 18 starts at $1,099 for the base model, with the Pro Max starting at $1,399. Pre-orders begin October 1, with availability October 8.`,
    category: 'Technology',
    author: authors[2],
    publishedAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-18T12:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 73200,
    readingTime: 5,
    tags: ['Apple', 'iPhone 18', 'Technology', 'AI'],
  },
  {
    id: '8',
    title: 'NASA Confirms Water Ice Deposits in Permanently Shadowed Lunar Craters',
    summary:
      'NASA scientists have confirmed the presence of accessible water ice deposits near the lunar south pole, dramatically improving the prospects for sustained human presence on the Moon.',
    content: `NASA confirmed Thursday the presence of substantial, accessible water ice deposits in permanently shadowed craters near the Moon's south pole, a discovery that scientists say dramatically improves the prospects for sustained human settlement on the lunar surface.

The confirmation, based on data from the Lunar Reconnaissance Orbiter and the VIPER rover which landed near the Nobile Crater in March, identifies at least 17 cubic kilometers of accessible ice — far more than previous conservative estimates suggested.

"This is a transformative discovery for human spaceflight," said NASA Administrator Bill Nelson. "Water ice is rocket fuel, drinking water, and life support, all in one. The Moon just became a much more hospitable destination."

The VIPER rover drilled to a depth of 1.2 meters in three separate locations within the shadowed crater and detected ice concentrations ranging from 5% to 11% by volume — accessible enough to be extracted with proposed mining equipment.

The discovery has immediate implications for NASA's Artemis program, which aims to establish a permanent lunar base by 2031. A permanent ice extraction facility could theoretically produce enough hydrogen and oxygen to refuel spacecraft heading deeper into the solar system, potentially serving as a staging point for Mars missions.

International partners and commercial companies are already responding to the news. European Space Agency director Josef Aschbacher called the findings "a game-changer for the entire international lunar exploration community," while space mining startup AstroForge announced it was accelerating plans for a lunar ice extraction demonstration mission.`,
    category: 'General',
    author: authors[2],
    publishedAt: '2026-09-17T15:00:00Z',
    updatedAt: '2026-09-17T17:30:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 41600,
    readingTime: 4,
    tags: ['NASA', 'Moon', 'Space', 'Water Ice'],
  },
  {
    id: '9',
    title: 'Tesla Announces Robotaxi Network Launch in 15 Major US Cities by Year-End',
    summary:
      "Tesla's fully autonomous Cybercab robotaxi service will begin operating without safety drivers in 15 American cities before December, the company announced Wednesday.",
    content: `Tesla announced Wednesday it will launch its fully autonomous Cybercab robotaxi network in 15 major American cities before the end of the year, a milestone Elon Musk described as "the most important product launch in Tesla's history."

The service, which will operate without safety drivers, will initially be available in Austin, Miami, Phoenix, Nashville, Dallas, Denver, Atlanta, Charlotte, Tampa, Orlando, San Antonio, Houston, Las Vegas, Salt Lake City, and Tucson — all in states that have granted regulatory approval for fully driverless commercial operations.

Pricing is set at $0.40 per mile for standard rides and $0.60 per mile for premium routes, making it significantly cheaper than traditional rideshare services. Tesla says the network will be available through a dedicated app, separate from its existing vehicle software.

The Cybercab, a two-passenger electric vehicle unveiled last year, has logged 2.8 billion simulated miles and 47 million real-world miles in the company's internal testing program. Tesla's AI-powered Full Self-Driving system has been validated for commercial driverless use by regulators in all 15 launch states.

"At 40 cents a mile, we're cheaper than owning a car," said Musk. "This will be the fastest adoption of any technology in human history."

Safety advocates have urged caution, noting that while Tesla's FSD has improved dramatically, edge cases and unpredictable scenarios remain a concern. The National Highway Traffic Safety Administration said it would monitor the rollout closely and has the authority to intervene if safety issues emerge.`,
    category: 'Technology',
    author: authors[1],
    publishedAt: '2026-09-16T11:00:00Z',
    updatedAt: '2026-09-16T13:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1617886903355-9354bb57751f?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 58900,
    readingTime: 4,
    tags: ['Tesla', 'Robotaxi', 'Autonomous Vehicles', 'Technology'],
  },
  {
    id: '10',
    title: 'US Women\'s Soccer Team Wins Olympic Gold, Defeating Brazil 3-1 in Paris',
    summary:
      "The United States women's national team claimed Olympic gold at the Paris Games, defeating Brazil 3-1 in a dominant final performance at Parc des Princes.",
    content: `The United States women's national soccer team reclaimed Olympic gold at the Paris Games on Saturday, defeating Brazil 3-1 in a commanding final that showcased the depth and quality of American women's football.

Goals from Trinity Rodman, Mallory Swanson, and Sophia Smith secured the victory in front of a sold-out crowd of 47,000 at Parc des Princes, ending Brazil's dream of claiming their first Olympic title on French soil.

Rodman, 23, was the standout performer of the tournament, scoring seven goals across six matches to win the Golden Boot award. Her partnership with Swanson, who contributed six assists, proved unplayable for opposing defenses throughout the competition.

"This team is special," said head coach Emma Hayes, who guided the squad through a remarkable unbeaten run. "The character these players showed after a difficult qualification period — to perform like this on the biggest stage — is extraordinary."

Brazil's Marta, competing in her final Olympic tournament at age 40, received a standing ovation from both sets of fans when she was substituted in the 72nd minute, a tribute to her legendary career. "She is the greatest who ever played this game," said USWNT captain Alex Morgan.

The victory is the United States' fifth Olympic gold in women's soccer and ends a 12-year wait since their last title. A victory parade is planned for New York City next Tuesday.`,
    category: 'Sports',
    author: authors[3],
    publishedAt: '2026-09-15T22:30:00Z',
    updatedAt: '2026-09-16T00:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1551958219-acbc34c09cf4?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 44700,
    readingTime: 3,
    tags: ['Olympics', "Women's Soccer", 'USWNT', 'Paris 2026'],
  },
  {
    id: '11',
    title: 'New Study Reveals Mediterranean Diet Reduces Dementia Risk by 40%',
    summary:
      'A landmark 20-year study of 95,000 participants found that strict adherence to a Mediterranean diet significantly reduces the risk of developing Alzheimer\'s and other dementias.',
    content: `A landmark study published Thursday in the New England Journal of Medicine has found that strict adherence to a Mediterranean diet reduces the risk of developing dementia by up to 40%, based on a 20-year longitudinal study of nearly 95,000 participants across seven countries.

The research, led by Dr. Claudia Martinez of Harvard's T.H. Chan School of Public Health, is the largest and longest study of its kind and provides the strongest evidence yet that dietary choices have a profound impact on long-term brain health.

Participants who most closely followed the diet — emphasizing olive oil, fish, legumes, whole grains, fruits, and vegetables while limiting red meat and processed foods — showed significantly lower rates of Alzheimer's disease, vascular dementia, and mild cognitive impairment compared to those who followed a Western diet.

"What we eat is not just fuel for our bodies — it is medicine for our brains," said Dr. Martinez at a press conference. "These findings should change the way we counsel patients about prevention."

The protective effects were most pronounced among participants who adopted the diet before age 50, though researchers noted measurable benefits even among those who made dietary changes in their 60s.

The study also found that the diet reduced inflammation markers in the blood by 34% and preserved grey matter volume in key brain regions associated with memory and cognition. Researchers hypothesize that the anti-inflammatory properties of Mediterranean foods, combined with their abundance of antioxidants, omega-3 fatty acids, and polyphenols, may protect neurons from age-related damage.`,
    category: 'General',
    author: authors[0],
    publishedAt: '2026-09-14T09:00:00Z',
    updatedAt: '2026-09-14T11:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=700&fit=crop&auto=format',
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    views: 36800,
    readingTime: 4,
    tags: ['Health', 'Dementia', 'Mediterranean Diet', 'Science'],
  },
  {
    id: '12',
    title: "Netflix's 'The Last Continent' Wins 14 Emmy Awards, Breaking Industry Record",
    summary:
      'The climate thriller miniseries swept the Emmy Awards with 14 wins including Outstanding Drama Series, setting a new record for most wins by a single program.',
    content: `Netflix's critically acclaimed climate thriller "The Last Continent" dominated the 78th Primetime Emmy Awards on Sunday, claiming 14 wins including Outstanding Drama Series — the most wins ever recorded by a single program in a single year, surpassing the previous record of 11 set by "Game of Thrones" in 2019.

The six-part miniseries, which depicts a near-future world grappling with the collapse of Antarctic ice shelves, also claimed Outstanding Lead Actor for Mahershala Ali, Outstanding Lead Actress for Cate Blanchett, and Outstanding Limited Series Writing for showrunner Ava DuVernay.

DuVernay, accepting the writing award, used her platform to call attention to the real-world climate crisis the show depicts. "This is fiction, but it doesn't have to be our future," she said to a standing ovation from the audience.

The series, which was produced with the scientific oversight of 47 climate researchers and filmed partly in Antarctica, has been credited with significantly increasing public awareness of climate change. Netflix reported it was the most-watched drama in the platform's history, with 340 million households viewing the series within 90 days of its premiere.

Blanchett, who plays a climate scientist racing to prevent catastrophic sea level rise, called the role "the most important project of my career." Her co-star Ali praised the show's writers for making "the most urgent story of our time feel human and immediate."

The show's success has already prompted Netflix to green-light a second season, reportedly set in 2055.`,
    category: 'Entertainment',
    author: authors[4],
    publishedAt: '2026-09-13T23:00:00Z',
    updatedAt: '2026-09-14T01:00:00Z',
    featuredImage:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&h=700&fit=crop&auto=format',
    status: 'draft',
    isBreaking: false,
    isFeatured: false,
    views: 29400,
    readingTime: 4,
    tags: ['Emmy Awards', 'Netflix', 'Television', 'Entertainment'],
  },
];

export const breakingNewsHeadlines = [
  "BREAKING: Global Leaders Sign Historic Climate Agreement at Geneva Summit",
  "BREAKING: Stock Markets Surge as Fed Signals Rate Pause",
  "BREAKING: OpenAI Launches GPT-6 with Real-Time Reasoning Capabilities",
  "BREAKING: Manchester City Claims Fourth Champions League Title in Penalty Shootout",
];

export const trendingArticles = sampleArticles
  .sort((a, b) => b.views - a.views)
  .slice(0, 5);
