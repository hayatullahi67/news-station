import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDTc8Uhj9psDFy3gYm4EABlfv-1fmRsz9Q',
  authDomain: 'crooz-66275.firebaseapp.com',
  projectId: 'crooz-66275',
  storageBucket: 'crooz-66275.firebasestorage.app',
  messagingSenderId: '976956522344',
  appId: '1:976956522344:web:d7d2100effc5c6f814a0dd',
  measurementId: 'G-MLQLC9XLJJ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function main() {
  console.log('Authenticating with Firebase...');
  const userCredential = await signInWithEmailAndPassword(auth, 'crooz@gmail.com', 'wahadis67');
  console.log('Successfully logged in as:', userCredential.user.email, 'UID:', userCredential.user.uid);

  // 1. Categories
  const categoryList = [
    { name: 'Politics', color: 'bg-red-500' },
    { name: 'Business', color: 'bg-blue-500' },
    { name: 'Technology', color: 'bg-purple-500' },
    { name: 'Entertainment', color: 'bg-yellow-500' },
    { name: 'Sports', color: 'bg-green-500' },
    { name: 'Science & Health', color: 'bg-orange-500' },
    { name: 'World News', color: 'bg-red-600' },
  ];

  console.log('Checking existing categories...');
  const catCollection = collection(db, 'categories');
  const catSnapshot = await getDocs(catCollection);
  const existingCatNames = new Set(catSnapshot.docs.map(d => d.data().name));
  console.log('Existing categories in Firestore:', Array.from(existingCatNames));

  for (const cat of categoryList) {
    if (!existingCatNames.has(cat.name)) {
      const docRef = await addDoc(catCollection, cat);
      console.log(`Added category: ${cat.name} (${docRef.id})`);
    } else {
      console.log(`Category already exists: ${cat.name}`);
    }
  }

  // 2. Authors
  const authorsList = [
    {
      id: 'author-1',
      name: 'Elena Vance',
      title: 'Senior Political Correspondent',
      bio: 'Award-winning journalist covering international diplomacy, legislative policy, and federal governance with over 15 years in broadcast journalism.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'author-2',
      name: 'Marcus Thorne',
      title: 'Global Markets & Technology Editor',
      bio: 'Former financial analyst turned tech correspondent covering artificial intelligence, venture capital trends, and macroeconomic policies.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'author-3',
      name: 'David Rodriguez',
      title: 'Chief Sports Analyst',
      bio: 'Veteran sports commentator reporting on international tournaments, tactical game analysis, and Olympic athletics.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'author-4',
      name: 'Sarah Jenkins',
      title: 'Culture & Entertainment Lead',
      bio: 'Specialist in cinematic arts, music industry developments, and global pop culture phenomena.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'author-5',
      name: 'Dr. Maya Lin',
      title: 'Health & Environmental Science Editor',
      bio: 'Epidemiologist and science writer dedicated to translating complex medical breakthroughs and climate research into accessible news.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    }
  ];

  console.log('Adding/Updating authors...');
  const authorsCollection = collection(db, 'authors');
  for (const author of authorsList) {
    const authorDoc = doc(db, 'authors', author.id);
    await setDoc(authorDoc, {
      name: author.name,
      title: author.title,
      bio: author.bio,
      avatar: author.avatar,
    }, { merge: true });
    console.log(`Configured author: ${author.name}`);
  }

  // 3. News Articles
  const now = new Date();
  const articlesList = [
    {
      title: 'Global Climate Accord Reached as 40 Nations Commit to Accelerated Clean Grid Transition',
      summary: 'World leaders and energy ministers finalize a historic framework in Geneva to modernize transmission networks and phase out coal subsidies ahead of 2035 targets.',
      content: `<p>In what diplomatic observers are calling the most substantive multilateral environmental agreement in a decade, representatives from 40 nations concluded four days of intensive negotiations in Geneva by signing the <strong>Global Clean Grid Accord</strong>.</p>
<p>The treaty mandates binding commitments to scale up battery storage infrastructure, unify smart-grid standards across international borders, and redirect an estimated $420 billion in annual fossil fuel subsidies toward renewable energy research and deployment.</p>
<p>"This represents a pivotal shift from abstract pledges to concrete, accountable infrastructure benchmarks," said Lead Negotiator Amb. Helen Carter during the joint closing plenary.</p>
<p>Key pillars of the agreement include:</p>
<ul>
  <li>Immediate cessation of state funding for unmitigated coal generation.</li>
  <li>Cross-border power sharing agreements to stabilize regional grids during peak demand.</li>
  <li>A dedicated $75 billion transition fund for emerging economies transitioning legacy energy sectors.</li>
</ul>
<p>Markets responded positively to the announcement, with green infrastructure indices surging over 4.2% in early morning trading across European and Asian exchanges.</p>`,
      category: 'World News',
      author: authorsList[0],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: true,
      isFeatured: true,
      views: 1420,
      readingTime: 4,
      tags: ['Climate', 'Global News', 'Renewables', 'Geneva'],
    },
    {
      title: 'Next-Gen Quantum Computing Chip Achieves Room-Temperature Coherence Breakthrough',
      summary: 'Engineers have demonstrated stable qubit operations at ambient temperatures, potentially removing the cryogenic bottlenecks holding back commercial quantum systems.',
      content: `<p>A multidisciplinary research consortium has announced a breakthrough in solid-state quantum computing: stable qubit coherence sustained at room temperature for over 450 milliseconds.</p>
<p>Historically, quantum processing units required ultra-cold dilution refrigerators operating mere fractions of a degree above absolute zero. The new topological semiconductor architecture bypasses the need for massive liquid helium cooling arrays, opening the door for compact, server-rack quantum accelerators.</p>
<p>Dr. Alan Vance, head of the quantum photonics laboratory, highlighted the commercial implications:</p>
<p>"By removing cryogenic cooling from the equation, operational costs for quantum nodes drop by more than 90%, making complex molecular simulations and cryptanalysis accessible to enterprise data centers."</p>
<p>Commercial prototypes are slated for pilot deployment with pharmaceutical partners early next year to accelerate drug discovery pipelines.</p>`,
      category: 'Technology',
      author: authorsList[1],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 120).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: true,
      isFeatured: true,
      views: 980,
      readingTime: 3,
      tags: ['Quantum', 'Technology', 'AI', 'Computing'],
    },
    {
      title: 'Central Banks Signal Coordinated Rate Policy Shift Amid Easing Inflation Pressures',
      summary: 'Financial regulators across North America and Europe suggest monetary easing could begin next quarter as supply chain stabilization cools core CPI figures.',
      content: `<p>In a joint symposium address, governors representing the world's leading monetary authorities signaled a potential pivot toward interest rate normalization following eighteen months of aggressive tightening.</p>
<p>Latest figures reveal headline inflation has settled within the target 2.1% band across major economies, bolstered by plummeting freight rates and steady agricultural yields.</p>
<p>Bond yields dipped across benchmark 10-year treasuries, while equity markets in London, Tokyo, and New York posted broad-based gains led by banking and consumer cyclical stocks.</p>
<p>"We are witnessing the soft landing that many considered unattainable," noted Senior Market Strategist Marcus Thorne. "However, central bankers emphasize that policy will remain strictly data-dependent to prevent secondary price spirals."</p>`,
      category: 'Business',
      author: authorsList[1],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 240).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: false,
      isFeatured: false,
      views: 754,
      readingTime: 3,
      tags: ['Economy', 'Markets', 'Banking', 'Inflation'],
    },
    {
      title: 'Championship Finals: Dramatic Stoppage-Time Header Clinches Historic Double',
      summary: 'An exhilarating 94th-minute winner sent 65,000 fans into delirium as United sealed their first major domestic double in twenty-four years.',
      content: `<p>Under floodlights and torrential rain, one of the most memorable cup finals in modern football history reached its climax in the 94th minute when 19-year-old winger Mateo Silva rose above the defense to nod home the decisive goal.</p>
<p>The 3-2 victory capped a remarkable season-long campaign defined by tactical discipline, relentless pressing, and unmatched home support.</p>
<p>"We believed until the final whistle blew," Silva stated in an emotional post-match interview as confetti rained over the trophy podium. "This club and these supporters deserve every second of this celebration."</p>
<p>Celebrations are expected to continue throughout the weekend with an open-top bus parade scheduled through the city center on Sunday afternoon.</p>`,
      category: 'Sports',
      author: authorsList[2],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 360).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: false,
      isFeatured: false,
      views: 2150,
      readingTime: 4,
      tags: ['Football', 'Champions', 'Final', 'Sports'],
    },
    {
      title: 'International Film Festival Honors Independent Cinema with Groundbreaking Top Prize',
      summary: 'The jury unanimously awarded the prestigious Golden Star to a poignant, low-budget drama shot entirely on anamorphic lenses across rural Scandinavia.',
      content: `<p>Closing out two weeks of world premieres and standing ovations, the 48th Annual International Film Festival concluded by awarding its top honor to director Astrid Holm’s intimate drama, <em>Echoes in the Mist</em>.</p>
<p>Produced with a modest budget of under $1.5 million, the film captivated critics and audiences alike with its breathtaking natural lighting, nuanced screenplay, and deeply human portrayal of generational resilience.</p>
<p>"In an era dominated by algorithmic blockbusters, this film proves that deeply personal storytelling remains the beating heart of cinema," said Jury President Julian Moreau.</p>
<p>Distributors have already secured worldwide streaming and theatrical release rights, with a wider release planned for the upcoming awards season.</p>`,
      category: 'Entertainment',
      author: authorsList[3],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 500).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: false,
      isFeatured: false,
      views: 620,
      readingTime: 3,
      tags: ['Cinema', 'Film Festival', 'Entertainment', 'Awards'],
    },
    {
      title: 'Revolutionary mRNA Therapy Shows 85% Efficacy in Early-Stage Pancreatic Trials',
      summary: 'Personalized cancer vaccines tailored to each patient\'s unique genetic tumor profile demonstrate unprecedented immune activation in Phase II clinical results.',
      content: `<p>Oncologists and biomedical researchers are celebrating a milestone in oncology following publication of Phase II trial results for a customized neoantigen mRNA vaccine.</p>
<p>Administered alongside standard checkpoint inhibitors, the personalized therapy trained T-cells to identify and neutralize micro-metastases, yielding an 85% recurrence-free survival rate at the two-year mark.</p>
<p>"For a disease that has historically presented limited therapeutic options, these numbers represent a transformative breakthrough," explained Dr. Maya Lin.</p>
<p>Regulatory agencies in both the US and the European Union have granted fast-track designation to expedite Phase III multi-center trials slated to begin in six months.</p>`,
      category: 'Science & Health',
      author: authorsList[4],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 650).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: false,
      isFeatured: false,
      views: 1830,
      readingTime: 4,
      tags: ['Health', 'Biomedical', 'Medicine', 'Cancer Research'],
    },
    {
      title: 'Parliamentary Debate Heats Up Over Digital Privacy and Autonomous AI Oversight Bill',
      summary: 'Lawmakers engage in rigorous deliberation over stringent new disclosure mandates and consumer protection standards for autonomous frontier AI systems.',
      content: `<p>A high-stakes debate unfolded on the parliamentary floor today as lawmakers scrutinized the proposed <strong>Frontier Technology Accountability Act</strong>.</p>
<p>The legislation seeks to establish strict compliance protocols, mandatory bias audits, and clear consumer privacy safeguards for generative artificial intelligence models operating within critical national infrastructure.</p>
<p>While tech industry coalitions have called for balanced regulatory sandboxes to preserve innovation speed, consumer advocacy groups and data privacy watchdogs have urged legislators to maintain rigorous penalties for non-compliance.</p>
<p>A final committee vote is expected by Thursday before the bill moves to the upper chamber for ratification.</p>`,
      category: 'Politics',
      author: authorsList[0],
      publishedAt: new Date(now.getTime() - 1000 * 60 * 800).toISOString(),
      updatedAt: new Date().toISOString(),
      featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
      isBreaking: false,
      isFeatured: false,
      views: 890,
      readingTime: 3,
      tags: ['Politics', 'Legislation', 'AI Policy', 'Privacy'],
    }
  ];

  console.log('Writing news articles to Firestore...');
  const articlesCollection = collection(db, 'articles');
  for (const article of articlesList) {
    const docRef = await addDoc(articlesCollection, article);
    console.log(`Added article: "${article.title}" (${docRef.id})`);
  }

  console.log('Seed completed successfully!');
}

main().catch(err => {
  console.error('Error during seed:', err);
  process.exit(1);
});
