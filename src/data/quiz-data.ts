
import type { Subject } from '@/types/quiz';
import { ScrollText, Globe2, Landmark, Scale } from 'lucide-react';

export const quizSubjects: Subject[] = [
  {
    id: 'history',
    name: 'History',
    Icon: ScrollText,
    description: 'Journey through the events that shaped our world.',
    levels: [
      {
        id: 'hist-l1-easy',
        name: 'Level 1: Ancient Civilizations (Easy)',
        passingThreshold: 0.6, 
        questions: [
          { id: 'h1q1', text: 'Which ancient civilization built the pyramids in Giza?', options: [{id: 'a', text: 'Roman'}, {id: 'b', text: 'Greek'}, {id: 'c', text: 'Egyptian'}], correctOptionId: 'c', explanation: 'The ancient Egyptians are famous for building the pyramids in Giza.' },
          { id: 'h1q2', text: 'Who was the first Roman Emperor?', options: [{id: 'a', text: 'Julius Caesar'}, {id: 'b', text: 'Augustus'}, {id: 'c', text: 'Nero'}], correctOptionId: 'b', explanation: 'Augustus (formerly Octavian) is considered the first Roman Emperor.' },
          { id: 'h1q3', text: 'What famous conqueror from Macedonia created a vast empire stretching from Greece to northwestern India?', options: [{id: 'a', text: 'Genghis Khan'}, {id: 'b', text: 'Alexander the Great'}, {id: 'c', text: 'Napoleon Bonaparte'}], correctOptionId: 'b', explanation: 'Alexander the Great of Macedon was one of history\'s most successful military commanders.' },
          { id: 'h1q4', text: 'The Colosseum is a famous landmark of which ancient city?', options: [{id: 'a', text: 'Athens'}, {id: 'b', text: 'Rome'}, {id: 'c', text: 'Alexandria'}], correctOptionId: 'b', explanation: 'The Colosseum is an oval amphitheatre in the centre of the city of Rome, Italy.' },
          { id: 'h1q5', text: 'Which of these was a common writing material in ancient Egypt?', options: [{id: 'a', text: 'Paper'}, {id: 'b', text: 'Papyrus'}, {id: 'c', text: 'Parchment'}], correctOptionId: 'b', explanation: 'Papyrus was a material similar to thick paper that was used in ancient times as a writing surface.' },
        ],
      },
      {
        id: 'hist-l2-medium',
        name: 'Level 2: Middle Ages & Renaissance (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'h2q1', text: 'The Battle of Hastings in 1066 was a key event in the history of which country?', options: [{id: 'a', text: 'France'}, {id: 'b', text: 'England'}, {id: 'c', text: 'Germany'}], correctOptionId: 'b', explanation: 'The Battle of Hastings led to the Norman conquest of England.' },
          { id: 'h2q2', text: 'Who is credited with inventing the printing press with movable type in Europe?', options: [{id: 'a', text: 'Leonardo da Vinci'}, {id: 'b', text: 'Galileo Galilei'}, {id: 'c', text: 'Johannes Gutenberg'}], correctOptionId: 'c', explanation: 'Johannes Gutenberg\'s invention around 1440 was a pivotal moment in the dissemination of knowledge.' },
          { id: 'h2q3', text: 'The Renaissance began in which European country?', options: [{id: 'a', text: 'France'}, {id: 'b', text: 'Italy'}, {id: 'c', text: 'Spain'}], correctOptionId: 'b', explanation: 'The Renaissance is a period in European history marking the transition from the Middle Ages to modernity and covering the 15th and 16th centuries, characterized by an effort to revive and surpass ideas and achievements of classical antiquity. It started in Italy.' },
          { id: 'h2q4', text: 'Joan of Arc was a national heroine of which country?', options: [{id: 'a', text: 'England'}, {id: 'b', text: 'France'}, {id: 'c', text: 'Spain'}], correctOptionId: 'b', explanation: 'Joan of Arc is a patron saint of France, honored as a defender of the French nation for her role in the siege of Orléans and her insistence on the coronation of Charles VII of France during the Hundred Years\' War.'},
          { id: 'h2q5', text: 'What was the "Black Death"?', options: [{id: 'a', text: 'A major famine'}, {id: 'b', text: 'A devastating pandemic'}, {id: 'c', text: 'A series of wars'}], correctOptionId: 'b', explanation: 'The Black Death was a bubonic plague pandemic occurring in Afro-Eurasia from 1346 to 1353. It is the most fatal pandemic recorded in human history.'}
        ],
      },
      {
        id: 'hist-l3-hard',
        name: 'Level 3: Modern World History (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'h3q1', text: 'World War I primarily took place in which decade?', options: [{id: 'a', text: '1900s'}, {id: 'b', text: '1910s'}, {id: 'c', text: '1920s'}], correctOptionId: 'b', explanation: 'World War I began in 1914 and ended in 1918.' },
          { id: 'h3q2', text: 'The Cold War was primarily a geopolitical tension between which two major powers?', options: [{id: 'a', text: 'USA and China'}, {id: 'b', text: 'USA and Soviet Union'}, {id: 'c', text: 'UK and Germany'}], correctOptionId: 'b', explanation: 'The Cold War was a period of geopolitical tension between the United States and the Soviet Union and their respective allies.' },
          { id: 'h3q3', text: 'Who was the first person to walk on the Moon?', options: [{id: 'a', text: 'Buzz Aldrin'}, {id: 'b', text: 'Yuri Gagarin'}, {id: 'c', text: 'Neil Armstrong'}], correctOptionId: 'c', explanation: 'Neil Armstrong was the first person to walk on the Moon during the Apollo 11 mission in 1969.'},
          { id: 'h3q4', text: 'The fall of the Berlin Wall in 1989 symbolized the end of what?', options: [{id: 'a', text: 'World War II'}, {id: 'b', text: 'The Cold War'}, {id: 'c', text: 'The Space Race'}], correctOptionId: 'b', explanation: 'The fall of the Berlin Wall is widely seen as a pivotal moment symbolizing the end of the Cold War.'},
          { id: 'h3q5', text: 'Apartheid was a system of institutionalised racial segregation that existed in which country?', options: [{id: 'a', text: 'India'}, {id: 'b', text: 'South Africa'}, {id: 'c', text: 'Brazil'}], correctOptionId: 'b', explanation: 'Apartheid was implemented in South Africa from 1948 to 1994.'}
        ],
      },
    ],
  },
  {
    id: 'geography',
    name: 'Geography',
    Icon: Globe2,
    description: 'Discover the Earth, its features, and inhabitants.',
    levels: [
      {
        id: 'geo-l1-easy',
        name: 'Level 1: World Features & Capitals (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g1q1', text: 'What is the capital of France?', options: [{id: 'a', text: 'London'}, {id: 'b', text: 'Berlin'}, {id: 'c', text: 'Paris'}], correctOptionId: 'c', explanation: 'Paris is the capital and largest city of France.' },
          { id: 'g1q2', text: 'What is the capital of Japan?', options: [{id: 'a', text: 'Beijing'}, {id: 'b', text: 'Seoul'}, {id: 'c', text: 'Tokyo'}], correctOptionId: 'c', explanation: 'Tokyo is the capital and largest city of Japan.' },
          { id: 'g1q3', text: 'Which is traditionally considered the longest river in the world?', options: [{id: 'a', text: 'Amazon River'}, {id: 'b', text: 'Nile River'}, {id: 'c', text: 'Yangtze River'}], correctOptionId: 'b', explanation: 'The Nile River in Africa is traditionally cited as the longest river in the world.' },
          { id: 'g1q4', text: 'Mount Everest, the world\'s highest peak, is located in which mountain range?', options: [{id: 'a', text: 'Andes'}, {id: 'b', text: 'Alps'}, {id: 'c', text: 'Himalayas'}], correctOptionId: 'c', explanation: 'Mount Everest is part of the Himalayas mountain range.' },
          { id: 'g1q5', text: 'Which desert is the largest hot desert in the world?', options: [{id: 'a', text: 'Gobi Desert'}, {id: 'b', text: 'Sahara Desert'}, {id: 'c', text: 'Arabian Desert'}], correctOptionId: 'b', explanation: 'The Sahara Desert in Africa is the largest hot desert in the world.' },
        ],
      },
      {
        id: 'geo-l2-medium',
        name: 'Level 2: Continents & Oceans (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g2q1', text: 'How many continents are there on Earth (commonly accepted model)?', options: [{id: 'a', text: '5'}, {id: 'b', text: '6'}, {id: 'c', text: '7'}], correctOptionId: 'c', explanation: 'The most widely accepted model includes seven continents: Asia, Africa, North America, South America, Antarctica, Europe, and Australia.' },
          { id: 'g2q2', text: 'Which is the largest ocean on Earth?', options: [{id: 'a', text: 'Atlantic Ocean'}, {id: 'b', text: 'Indian Ocean'}, {id: 'c', text: 'Pacific Ocean'}], correctOptionId: 'c', explanation: 'The Pacific Ocean is the largest and deepest of Earth\'s five oceanic divisions.' },
          { id: 'g2q3', text: 'The Great Barrier Reef is located off the coast of which country?', options: [{id: 'a', text: 'Brazil'}, {id: 'b', text: 'Australia'}, {id: 'c', text: 'South Africa'}], correctOptionId: 'b', explanation: 'The Great Barrier Reef is the world\'s largest coral reef system, located in the Coral Sea, off the coast of Queensland, Australia.' },
          { id: 'g2q4', text: 'What is the smallest continent by land area?', options: [{id: 'a', text: 'Europe'}, {id: 'b', text: 'Australia'}, {id: 'c', text: 'South America'}], correctOptionId: 'b', explanation: 'Australia is the smallest continent by land area.' },
          { id: 'g2q5', text: 'Which imaginary line divides the Earth into the Northern and Southern Hemispheres?', options: [{id: 'a', text: 'Prime Meridian'}, {id: 'b', text: 'Equator'}, {id: 'c', text: 'Tropic of Cancer'}], correctOptionId: 'b', explanation: 'The Equator is an imaginary line drawn around the Earth equally distant from both poles, dividing the Earth into northern and southern hemispheres.' }
        ],
      },
      {
        id: 'geo-l3-hard',
        name: 'Level 3: Climate & Topography (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g3q1', text: 'What type of climate is typically found near the Earth\'s equator?', options: [{id: 'a', text: 'Polar'}, {id: 'b', text: 'Temperate'}, {id: 'c', text: 'Tropical'}], correctOptionId: 'c', explanation: 'Tropical climates are characterized by high temperatures and significant precipitation, typical of equatorial regions.' },
          { id: 'g3q2', text: 'A fjord is a long, narrow, deep inlet of the sea between high cliffs, typically formed by what?', options: [{id: 'a', text: 'Volcanic activity'}, {id: 'b', text: 'Submergence of a glaciated valley'}, {id: 'c', text: 'River erosion'}], correctOptionId: 'b', explanation: 'Fjords are formed when a glacier cuts a U-shaped valley by ice segregation and abrasion of the surrounding bedrock.' },
          { id: 'g3q3', text: 'The Ring of Fire is an area in the basin of the Pacific Ocean where a large number of what occur?', options: [{id: 'a', text: 'Hurricanes'}, {id: 'b', text: 'Tornadoes'}, {id: 'c', text: 'Earthquakes and volcanic eruptions'}], correctOptionId: 'c', explanation: 'The Ring of Fire is a major area in the basin of the Pacific Ocean where many earthquakes and volcanic eruptions occur.' },
          { id: 'g3q4', text: 'What is a monsoon?', options: [{id: 'a', text: 'A type of desert'}, {id: 'b', text: 'A seasonal prevailing wind in the region of South and Southeast Asia'}, {id: 'c', text: 'A mountain range'}], correctOptionId: 'b', explanation: 'A monsoon is a seasonal change in the direction of the prevailing winds of a region, often associated with heavy rainfall.' },
          { id: 'g3q5', text: 'What is "permafrost"?', options: [{id: 'a', text: 'A type of cloud'}, {id: 'b', text: 'A layer of soil that remains frozen throughout the year'}, {id: 'c', text: 'A warm ocean current'}], correctOptionId: 'b', explanation: 'Permafrost is ground, including rock or soil, that remains at or below 0°C (32°F) for at least two consecutive years.' }
        ],
      },
    ],
  },
  {
    id: 'economics',
    name: 'Economics',
    Icon: Landmark,
    description: 'Understand principles of production, distribution, and consumption.',
    levels: [
      {
        id: 'econ-l1-easy',
        name: 'Level 1: Basic Economic Concepts (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e1q1', text: 'What is the fundamental problem of economics?', options: [{id: 'a', text: 'Inflation'}, {id: 'b', text: 'Scarcity'}, {id: 'c', text: 'Unemployment'}], correctOptionId: 'b', explanation: 'Scarcity, the gap between limited resources and limitless wants, is the fundamental economic problem.' },
          { id: 'e1q2', text: 'What does GDP stand for?', options: [{id: 'a', text: 'General Domestic Product'}, {id: 'b', text: 'Gross Domestic Product'}, {id: 'c', text: 'Global Development Program'}], correctOptionId: 'b', explanation: 'GDP stands for Gross Domestic Product, the total value of goods and services produced in a country.' },
          { id: 'e1q3', text: 'Which of these is a primary type of economic system?', options: [{id: 'a', text: 'Monarchy'}, {id: 'b', text: 'Capitalism'}, {id: 'c', text: 'Oligarchy'}], correctOptionId: 'b', explanation: 'Capitalism is a major economic system. Monarchy and Oligarchy are forms of government.' },
          { id: 'e1q4', text: 'What is "inflation"?', options: [{id: 'a', text: 'A decrease in the general price level'}, {id: 'b', text: 'An increase in the general price level'}, {id: 'c', text: 'A period of high unemployment'}], correctOptionId: 'b', explanation: 'Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling.' },
          { id: 'e1q5', text: 'Supply and demand primarily determine what in a market economy?', options: [{id: 'a', text: 'Government regulations'}, {id: 'b', text: 'Prices and quantities'}, {id: 'c', text: 'Company profits only'}], correctOptionId: 'b', explanation: 'In a market economy, the interaction of supply and demand is the primary determinant of prices and quantities of goods and services.' },
        ],
      },
      {
        id: 'econ-l2-medium',
        name: 'Level 2: Market Structures & Finance (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e2q1', text: 'What is a "monopoly"?', options: [{id: 'a', text: 'A market with many sellers'}, {id: 'b', text: 'A market with a single seller'}, {id: 'c', text: 'A market with few sellers'}], correctOptionId: 'b', explanation: 'A monopoly is a market structure characterized by a single seller, selling a unique product in the market.' },
          { id: 'e2q2', text: 'What is "opportunity cost"?', options: [{id: 'a', text: 'The actual monetary cost of a decision'}, {id: 'b', text: 'The value of the next best alternative forgone'}, {id: 'c', text: 'The total cost of production'}], correctOptionId: 'b', explanation: 'Opportunity cost represents the potential benefits an individual, investor, or business misses out on when choosing one alternative over another.' },
          { id: 'e2q3', text: 'What is the main function of a central bank?', options: [{id: 'a', text: 'Providing loans to individuals'}, {id: 'b', text: 'Managing a nation\'s currency and monetary policy'}, {id: 'c', text: 'Collecting taxes'}], correctOptionId: 'b', explanation: 'Central banks typically manage monetary policy, issue currency, and oversee the banking system.' },
          { id: 'e2q4', text: 'What does "diversification" mean in finance?', options: [{id: 'a', text: 'Investing all money in one stock'}, {id: 'b', text: 'Spreading investments across various assets'}, {id: 'c', text: 'Only investing in bonds'}], correctOptionId: 'b', explanation: 'Diversification is a risk management strategy that mixes a wide variety of investments within a portfolio.' },
          { id: 'e2q5', text: 'What is a "recession"?', options: [{id: 'a', text: 'A period of rapid economic growth'}, {id: 'b', text: 'A significant decline in economic activity'}, {id: 'c', text: 'A period of stable prices'}], correctOptionId: 'b', explanation: 'A recession is a business cycle contraction when there is a general decline in economic activity.' }
        ],
      },
      {
        id: 'econ-l3-hard',
        name: 'Level 3: Macroeconomics & Global Trade (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e3q1', text: 'What is "fiscal policy"?', options: [{id: 'a', text: 'Policy related to interest rates'}, {id: 'b', text: 'Government use of spending and taxation to influence the economy'}, {id: 'c', text: 'International trade agreements'}], correctOptionId: 'b', explanation: 'Fiscal policy refers to the use of government spending and tax policies to influence economic conditions.' },
          { id: 'e3q2', text: 'What is a "tariff"?', options: [{id: 'a', text: 'A subsidy for domestic producers'}, {id: 'b', text: 'A tax on imported goods'}, {id: 'c', text: 'A limit on the quantity of imported goods'}], correctOptionId: 'b', explanation: 'A tariff is a tax imposed by a government of a country or of a supranational union on imports or exports of goods.' },
          { id: 'e3q3', text: 'What does "comparative advantage" refer to in international trade?', options: [{id: 'a', text: 'A country\'s ability to produce all goods more efficiently'}, {id: 'b', text: 'A country\'s ability to produce a good at a lower opportunity cost than others'}, {id: 'c', text: 'A country having the largest market share'}], correctOptionId: 'b', explanation: 'Comparative advantage is an economic term that refers to an economy\'s ability to produce goods and services at a lower opportunity cost than that of trade partners.' },
          { id: 'e3q4', text: 'What is the "Phillips Curve" intended to show a relationship between?', options: [{id: 'a', text: 'Inflation and GDP growth'}, {id: 'b', text: 'Unemployment and inflation'}, {id: 'c', text: 'Interest rates and investment'}], correctOptionId: 'b', explanation: 'The Phillips curve suggests an inverse relationship between inflation and unemployment.' },
          { id: 'e3q5', text: 'What does the "Gini coefficient" measure?', options: [{id: 'a', text: 'Economic growth rate'}, {id: 'b', text: 'Income inequality'}, {id: 'c', text: 'National debt'}], correctOptionId: 'b', explanation: 'The Gini coefficient is a measure of statistical dispersion intended to represent the income or wealth inequality within a nation or any other group of people.' }
        ],
      },
    ],
  },
  {
    id: 'pol-sci',
    name: 'Political Science',
    Icon: Scale,
    description: 'Study systems of governance, political activities, and political behavior.',
    levels: [
      {
        id: 'ps-l1-easy',
        name: 'Level 1: Fundamentals of Governance (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps1q1', text: 'In the USA, what are the three main branches of government?', options: [{id: 'a', text: 'Executive, Legislative, Judicial'}, {id: 'b', text: 'Federal, State, Local'}, {id: 'c', text: 'Presidential, Congressional, Senatorial'}], correctOptionId: 'a', explanation: 'The U.S. government is divided into the Executive, Legislative, and Judicial branches to ensure a separation of powers.' },
          { id: 'ps1q2', text: 'What is a key characteristic of a democracy?', options: [{id: 'a', text: 'Rule by a single, unelected leader'}, {id: 'b', text: 'Citizens have the power to elect their leaders'}, {id: 'c', text: 'State control of all media'}], correctOptionId: 'b', explanation: 'Democracy is a system of government where citizens exercise power by voting and electing representatives.' },
          { id: 'ps1q3', text: 'What is a constitution?', options: [{id: 'a', text: 'A list of current political leaders'}, {id: 'b', text: 'A set of fundamental principles or established precedents by which a state is governed.'}, {id: 'c', text: 'A temporary decree by a ruler'}], correctOptionId: 'b', explanation: 'A constitution outlines the fundamental principles, laws, and structure of a government.' },
          { id: 'ps1q4', text: 'What is a "veto"?', options: [{id: 'a', text: 'The power to pass a law'}, {id: 'b', text: 'The power to reject a decision or proposal'}, {id: 'c', text: 'The power to declare war'}], correctOptionId: 'b', explanation: 'A veto is the power, often held by an executive, to unilaterally stop an official action, especially the enactment of legislation.' },
          { id: 'ps1q5', text: 'A system where power is held by a single person, often through inheritance, is called a:', options: [{id: 'a', text: 'Republic'}, {id: 'b', text: 'Democracy'}, {id: 'c', text: 'Monarchy'}], correctOptionId: 'c', explanation: 'A monarchy is a form of government in which a single person, called a monarch (such as a king or queen), rules until they die or abdicate the throne.' },
        ],
      },
      {
        id: 'ps-l2-medium',
        name: 'Level 2: Political Systems & Ideologies (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps2q1', text: 'What is a "federal" system of government?', options: [{id: 'a', text: 'All power is held by a central government'}, {id: 'b', text: 'Power is divided between a central government and regional governments'}, {id: 'c', text: 'Power is held by a single political party'}], correctOptionId: 'b', explanation: 'Federalism is a system of government in which the same territory is controlled by two levels of government.' },
          { id: 'ps2q2', text: 'Which political ideology emphasizes individual liberty and limited government intervention?', options: [{id: 'a', text: 'Socialism'}, {id: 'b', text: 'Communism'}, {id: 'c', text: 'Liberalism (Classical)'}], correctOptionId: 'c', explanation: 'Classical liberalism emphasizes individual rights, limited government, and free markets.' },
          { id: 'ps2q3', text: 'What is the primary role of the legislative branch of government?', options: [{id: 'a', text: 'To enforce laws'}, {id: 'b', text: 'To interpret laws'}, {id: 'c', text: 'To make laws'}], correctOptionId: 'c', explanation: 'The legislative branch is primarily responsible for creating and enacting laws.' },
          { id: 'ps2q4', text: 'A "bicameral" legislature has how many chambers or houses?', options: [{id: 'a', text: 'One'}, {id: 'b', text: 'Two'}, {id: 'c', text: 'Three'}], correctOptionId: 'b', explanation: 'A bicameral legislature is one that has two separate assemblies, chambers, or houses.' },
          { id: 'ps2q5', text: 'What is "suffrage"?', options: [{id: 'a', text: 'The act of suffering for a cause'}, {id: 'b', text: 'The right to vote in political elections'}, {id: 'c', text: 'A type of tax'}], correctOptionId: 'b', explanation: 'Suffrage is the right to vote in public, political elections.' }
        ],
      },
      {
        id: 'ps-l3-hard',
        name: 'Level 3: International Relations & Political Theory (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps3q1', text: 'What is "sovereignty"?', options: [{id: 'a', text: 'A type of currency'}, {id: 'b', text: 'The supreme authority within a territory'}, {id: 'c', text: 'A political alliance'}], correctOptionId: 'b', explanation: 'Sovereignty is the full right and power of a governing body over itself, without any interference from outside sources or bodies.' },
          { id: 'ps3q2', text: 'What does "NGO" stand for in international relations?', options: [{id: 'a', text: 'National Government Organization'}, {id: 'b', text: 'Non-Governmental Organization'}, {id: 'c', text: 'New Global Order'}], correctOptionId: 'b', explanation: 'A non-governmental organization (NGO) is a non-profit group that functions independently of any government.' },
          { id: 'ps3q3', text: 'The concept of "balance of power" in international relations aims to prevent what?', options: [{id: 'a', text: 'Economic recessions'}, {id: 'b', text: 'Any single state from becoming too dominant'}, {id: 'c', text: 'Free trade agreements'}], correctOptionId: 'b', explanation: 'The balance of power theory suggests that states may secure their survival by preventing any one state from gaining enough military power to dominate all others.' },
          { id: 'ps3q4', text: 'Who wrote "The Prince," a famous work of political philosophy?', options: [{id: 'a', text: 'Plato'}, {id: 'b', text: 'Aristotle'}, {id: 'c', text: 'Niccolò Machiavelli'}], correctOptionId: 'c', explanation: '"The Prince" is a 16th-century political treatise written by the Italian diplomat and political theorist Niccolò Machiavelli.' },
          { id: 'ps3q5', text: 'What is "soft power" in international relations?', options: [{id: 'a', text: 'Military force'}, {id: 'b', text: 'The ability to attract and co-opt, rather than coerce'}, {id: 'c', text: 'Economic sanctions'}], correctOptionId: 'b', explanation: 'Soft power is the ability to shape the preferences of others through appeal and attraction, as opposed to coercion (hard power, which uses force or money as a means of persuasion).' }
        ],
      },
    ],
  }
];

    