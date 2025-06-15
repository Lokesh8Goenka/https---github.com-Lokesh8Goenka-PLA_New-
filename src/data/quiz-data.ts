
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
        name: 'Level 1: Water Resources (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g1q1', text: "What percentage of the earth's surface is covered with water?", options: [{id: 'a', text: 'One-fourth'}, {id: 'b', text: 'Three-fourth'}, {id: 'c', text: 'Half'}, {id: 'd', text: 'Two-thirds'}], correctOptionId: 'b', explanation: "Approximately 71% of the Earth's surface is covered with water, which is about three-fourths." },
          { id: 'g1q2', text: 'What is the main source of freshwater?', options: [{id: 'a', text: 'Oceans'}, {id: 'b', text: 'Surface run off and groundwater'}, {id: 'c', text: 'Glaciers'}, {id: 'd', text: 'Rivers'}], correctOptionId: 'b', explanation: 'Surface runoff and groundwater are the primary accessible sources of freshwater for human use.' },
          { id: 'g1q3', text: 'What is the main reason for water scarcity in most cases?', options: [{id: 'a', text: 'Low rainfall'}, {id: 'b', text: 'Over-exploitation and excessive use'}, {id: 'c', text: 'Unequal access to water'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Water scarcity is often a combination of low rainfall, over-exploitation, excessive use, and unequal access.' },
          { id: 'g1q4', text: 'Which sector is the largest consumer of water?', options: [{id: 'a', text: 'Domestic use'}, {id: 'b', text: 'Industrial use'}, {id: 'c', text: 'Irrigated agriculture'}, {id: 'd', text: 'Recreation'}], correctOptionId: 'c', explanation: 'Irrigated agriculture accounts for the largest consumption of freshwater globally.' },
          { id: 'g1q5', text: 'What is the purpose of dams?', options: [{id: 'a', text: 'To irrigate agricultural fields'}, {id: 'b', text: 'To generate electricity'}, {id: 'c', text: 'To control floods'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Dams serve multiple purposes including irrigation, electricity generation, flood control, and water supply.' },
        ],
      },
      {
        id: 'geo-l2-medium',
        name: 'Level 2: Hydraulic Structures & Water Management (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g2q1', text: 'What are some examples of hydraulic structures built in ancient India?', options: [{id: 'a', text: 'Sringaverapura water harvesting system'}, {id: 'b', text: 'Chandragupta Maurya\'s dams and irrigation systems'}, {id: 'c', text: 'Bhopal Lake'}, {id: 'd', text: 'Hauz Khas tank'}], correctOptionId: 'a', explanation: 'Ancient India had sophisticated hydraulic structures like the Sringaverapura water harvesting system near Allahabad. Other options are also historical water bodies/systems from different periods.' },
          { id: 'g2q2', text: 'How are dams classified according to their height?', options: [{id: 'a', text: 'Low, medium height, and high'}, {id: 'b', text: 'Large, major, and minor'}, {id: 'c', text: 'Timber, embankment, and masonry'}, {id: 'd', text: 'Permanent, temporary, and seasonal'}], correctOptionId: 'a', explanation: 'Dams can be classified based on their height into low, medium height, and high dams.' },
          { id: 'g2q3', text: 'What is the advantage of multi-purpose projects?', options: [{id: 'a', text: 'They integrate different uses of water'}, {id: 'b', text: 'They reduce the cost of construction'}, {id: 'c', text: 'They increase the efficiency of water use'}, {id: 'd', text: 'They promote economic development'}], correctOptionId: 'a', explanation: 'Multi-purpose projects are designed to serve several objectives simultaneously, such as irrigation, flood control, and power generation.' },
          { id: 'g2q4', text: 'What is the main reason behind the over-exploitation of water resources?', options: [{id: 'a', text: 'Growing population and increased demand'}, {id: 'b', text: 'Climate change'}, {id: 'c', text: 'Industrial pollution'}, {id: 'd', text: 'Lack of proper infrastructure'}], correctOptionId: 'a', explanation: 'A growing population and the subsequent increased demand for water for domestic, agricultural, and industrial uses are primary drivers of over-exploitation.' },
          { id: 'g2q5', text: 'What are some ways to conserve and manage water?', options: [{id: 'a', text: 'Constructing dams'}, {id: 'b', text: 'Developing drought-resistant crops'}, {id: 'c', text: 'Using water-efficient technologies'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Water conservation and management involve various strategies including building storage, using drought-resistant crops, and adopting water-efficient technologies.' }
        ],
      },
      {
        id: 'geo-l3-hard',
        name: 'Level 3: Major Projects & Water Issues (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'g3q1', text: 'What is the significance of the Bhakra-Nangal project?', options: [{id: 'a', text: "It is India's largest multi-purpose project."}, {id: 'b', text: 'It integrates water conservation with flood control.'}, {id: 'c', text: 'It provides water for irrigation and electricity generation.'}, {id: 'd', text: 'It is a major tourist attraction.'}], correctOptionId: 'a', explanation: "The Bhakra-Nangal project is one of India's earliest and largest multi-purpose river valley projects, significant for irrigation and power." },
          { id: 'g3q2', text: 'How did Jawaharlal Nehru view dams?', options: [{id: 'a', text: 'As symbols of modern India'}, {id: 'b', text: 'As a solution to all water problems'}, {id: 'c', text: 'As a waste of resources'}, {id: 'd', text: 'As a threat to the environment'}], correctOptionId: 'a', explanation: 'Jawaharlal Nehru famously referred to dams as the "temples of modern India," viewing them as crucial for development.' },
          { id: 'g3q3', text: 'What is the purpose of a spillway in a dam?', options: [{id: 'a', text: 'To prevent the dam from overflowing'}, {id: 'b', text: 'To release excess water'}, {id: 'c', text: 'To generate electricity'}, {id: 'd', text: 'To create a reservoir'}], correctOptionId: 'b', explanation: 'A spillway is designed to safely release excess floodwater from a reservoir to prevent the dam from overtopping.' },
          { id: 'g3q4', text: 'What is the main reason behind the over-exploitation of water resources?', options: [{id: 'a', text: 'Growing population and increased demand'}, {id: 'b', text: 'Climate change'}, {id: 'c', text: 'Industrial pollution'}, {id: 'd', text: 'Lack of proper infrastructure'}], correctOptionId: 'a', explanation: 'A growing population and the subsequent increased demand for water for domestic, agricultural, and industrial uses are primary drivers of over-exploitation. This is a crucial concept often revisited.' },
          { id: 'g3q5', text: 'What are some ways to conserve and manage water?', options: [{id: 'a', text: 'Constructing dams'}, {id: 'b', text: 'Developing drought-resistant crops'}, {id: 'c', text: 'Using water-efficient technologies'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Comprehensive water conservation and management involve multiple approaches, including infrastructure, agricultural practices, and technological advancements.' }
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
        name: 'Level 1: Money Basics (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e1q1', text: 'What is the main function of money?', options: [{id: 'a', text: 'To act as a medium of exchange'}, {id: 'b', text: 'To store value'}, {id: 'c', text: 'To measure the value of goods and services'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Money serves as a medium of exchange, a store of value, and a unit of account (measure of value).' },
          { id: 'e1q2', text: 'What is one of the disadvantages of a barter system?', options: [{id: 'a', text: 'It is difficult to find people who want to trade what you have'}, {id: 'b', text: 'It is difficult to determine the value of different goods and services'}, {id: 'c', text: 'It is difficult to carry around large amounts of goods'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Barter systems suffer from a lack of double coincidence of wants, difficulty in valuing goods, and issues with portability/divisibility.' },
          { id: 'e1q3', text: 'What is the "purchasing power" of money?', options: [{id: 'a', text: 'The amount of goods and services that can be purchased with a unit of money'}, {id: 'b', text: 'The value of money relative to other currencies'}, {id: 'c', text: 'The rate at which the value of money is increasing or decreasing'}, {id: 'd', text: 'The amount of money that people hold in their wallets'}], correctOptionId: 'a', explanation: 'Purchasing power refers to the quantity of goods/services a unit of money can buy.' },
          { id: 'e1q4', text: 'What is one of the factors that affects the demand for money?', options: [{id: 'a', text: 'Income'}, {id: 'b', text: 'Interest rates'}, {id: 'c', text: 'Inflation'}, {id: 'd', text: 'Government spending'}], correctOptionId: 'a', explanation: 'Income levels, interest rates, and inflation expectations all affect the demand for money. Higher income generally increases demand for transactions. Government spending is more related to fiscal policy than direct demand for money by individuals.' },
          { id: 'e1q5', text: 'What is the "money supply"?', options: [{id: 'a', text: 'The total amount of money in circulation in an economy'}, {id: 'b', text: 'The amount of money that people hold in their wallets'}, {id: 'c', text: 'The amount of money that banks lend out'}, {id: 'd', text: 'The amount of money that the government prints'}], correctOptionId: 'a', explanation: 'The money supply is the total stock of money circulating in an economy, including currency and demand deposits.' },
        ],
      },
      {
        id: 'econ-l2-medium',
        name: 'Level 2: Banking & Monetary Systems (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e2q1', text: 'What is the difference between "money" and "wealth"?', options: [{id: 'a', text: 'Money is a medium of exchange, while wealth is anything that has value'}, {id: 'b', text: 'Money is a store of value, while wealth is anything that can be used to produce goods and services'}, {id: 'c', text: 'Money is a unit of account, while wealth is anything that can be bought and sold'}, {id: 'd', text: 'There is no difference between money and wealth'}], correctOptionId: 'a', explanation: 'Money is a specific type of asset used for transactions (a medium of exchange), while wealth is a broader concept encompassing all assets of value an individual or entity owns.' },
          { id: 'e2q2', text: 'What is the role of the central bank in the money supply?', options: [{id: 'a', text: 'To issue currency'}, {id: 'b', text: 'To control interest rates'}, {id: 'c', text: 'To regulate the banking system'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Central banks typically issue currency, manage monetary policy (which includes influencing interest rates), and oversee/regulate the banking system to ensure stability and control the money supply.' },
          { id: 'e2q3', text: 'What is the "spread" in the context of banking?', options: [{id: 'a', text: 'The difference between the interest rate paid on deposits and the interest rate charged on loans'}, {id: 'b', text: 'The difference between the amount of money that banks lend out and the amount of money that they hold in reserve'}, {id: 'c', text: 'The difference between the amount of money that people deposit in banks and the amount of money that they withdraw'}, {id: 'd', text: 'The difference between the value of money today and the value of money in the future'}], correctOptionId: 'a', explanation: 'The bank spread (often related to the net interest margin) is the difference between the interest income banks generate from loans and the interest they pay out on deposits.' },
          { id: 'e2q4', text: 'What is the difference between "money creation" and "credit creation"?', options: [{id: 'a', text: 'Money creation is the process of creating new money, while credit creation is the process of creating new loans'}, {id: 'b', text: 'Money creation is done by the central bank, while credit creation is done by commercial banks'}, {id: 'c', text: 'Money creation increases the money supply, while credit creation does not'}, {id: 'd', text: 'There is no difference between money creation and credit creation'}], correctOptionId: 'a', explanation: 'Money creation broadly refers to increasing the money supply (e.g., central bank printing money or commercial banks lending). Credit creation specifically refers to the extension of loans, which is a primary way commercial banks "create" money through the fractional reserve system.' },
          { id: 'e2q5', text: 'What is the role of commercial banks in the money supply?', options: [{id: 'a', text: 'To accept deposits from the public'}, {id: 'b', text: 'To lend out money to borrowers'}, {id: 'c', text: 'To create new money'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Commercial banks accept deposits, make loans, and through the process of fractional reserve lending, they play a crucial role in creating new money within the economy.' },
        ],
      },
      {
        id: 'econ-l3-hard',
        name: 'Level 3: Advanced Monetary Concepts (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'e3q1', text: 'Explain the concept of "liquidity" and how it affects the demand for money.', options: [{id: 'a', text: 'Liquidity is the ease with which an asset can be converted into cash, and it affects the demand for money because people prefer to hold assets that are more liquid'}, {id: 'b', text: 'Liquidity is the same as purchasing power'}, {id: 'c', text: 'Liquidity is only important for businesses'}, {id: 'd', text: 'Liquidity is not a factor that affects the demand for money'}], correctOptionId: 'a', explanation: 'Liquidity refers to how quickly and easily an asset can be converted into cash without significant loss of value. Money is the most liquid asset, and the desire to hold liquid assets (liquidity preference) influences the demand for money.' },
          { id: 'e3q2', text: 'Discuss the different ways in which the central bank can control the money supply.', options: [{id: 'a', text: 'Open market operations'}, {id: 'b', text: 'Changes in reserve requirements'}, {id: 'c', text: 'Changes in the discount rate'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Central banks use tools like open market operations (buying/selling government securities), adjusting reserve requirements for banks, and changing the discount rate (interest rate for bank borrowing from central bank) to control the money supply.' },
          { id: 'e3q3', text: 'Explain the process of "fractional reserve banking" and how it affects the money supply.', options: [{id: 'a', text: 'Fractional reserve banking is the practice of banks holding only a fraction of their deposits in reserve, and it affects the money supply because it allows banks to create new money by lending out more than they have on deposit'}, {id: 'b', text: 'Fractional reserve banking is only practiced in developing countries'}, {id: 'c', text: 'Fractional reserve banking is not allowed in the United States'}, {id: 'd', text: 'Fractional reserve banking does not affect the money supply'}], correctOptionId: 'a', explanation: 'In fractional reserve banking, banks are required to hold only a fraction of their deposit liabilities in reserve. This allows them to lend out the remainder, which then gets re-deposited, enabling a multiplier effect that expands the money supply.' },
          { id: 'e3q4', text: 'What are the potential benefits and risks of a cashless society?', options: [{id: 'a', text: 'Benefits: reduced crime, increased efficiency, greater financial inclusion; Risks: privacy concerns, technical glitches, dependence on technology'}, {id: 'b', text: 'Benefits: increased inflation, reduced economic growth; Risks: none'}, {id: 'c', text: 'Benefits: none; Risks: reduced crime, increased efficiency, greater financial inclusion'}, {id: 'd', text: 'Benefits: reduced crime, increased efficiency, greater financial inclusion; Risks: increased inflation, reduced economic growth'}], correctOptionId: 'a', explanation: 'A cashless society can offer benefits such as reduced transaction-related crime and increased efficiency. However, it also poses risks related to data privacy, cybersecurity, technical failures, and potential exclusion of those without digital access.' },
          { id: 'e3q5', text: 'Explain the role of money in a modern economy.', options: [{id: 'a', text: 'Money is used to facilitate transactions, store value, and measure the value of goods and services'}, {id: 'b', text: 'Money is only used to facilitate transactions'}, {id: 'c', text: 'Money is only used to store value'}, {id: 'd', text: 'Money is only used to measure the value of goods and services'}], correctOptionId: 'a', explanation: 'In a modern economy, money serves three key functions: as a medium of exchange (facilitating transactions), a store of value (allowing purchasing power to be saved), and a unit of account (providing a common measure of value).' },
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
        name: 'Level 1: Indian Democracy Basics (Easy)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps1q1', text: 'What was the primary reason that many newly independent nations, previously under colonial rule, opted for non-democratic forms of governance?', options: [{id: 'a', text: 'They feared that democracy would introduce differences and conflicts'}, {id: 'b', text: 'They believed that national unity was more important than democracy'}, {id: 'c', text: 'They were not ready for democracy'}, {id: 'd', text: 'They were pressured by foreign powers'}], correctOptionId: 'b', explanation: 'Many leaders in newly independent nations prioritized national unity and stability, sometimes viewing democratic processes as potentially divisive in the early stages of nation-building.' },
          { id: 'ps1q2', text: "According to the perspective of India's leaders, what was the fundamental purpose of engaging in political activity?", options: [{id: 'a', text: 'To gain power'}, {id: 'b', text: 'To pursue public interest'}, {id: 'c', text: 'To promote social harmony'}, {id: 'd', text: 'To protect the rights of minorities'}], correctOptionId: 'b', explanation: "India's foundational leaders often emphasized that political activity should be aimed at serving the public interest and national development." },
          { id: 'ps1q3', text: 'On what date did the Constitution of India officially become effective?', options: [{id: 'a', text: '26 November 1949'}, {id: 'b', text: '24 January 1950'}, {id: 'c', text: '26 January 1950'}, {id: 'd', text: '15 August 1947'}], correctOptionId: 'c', explanation: 'The Constitution of India was adopted on 26 November 1949, but it officially came into effect on 26 January 1950, celebrated as Republic Day.' },
          { id: 'ps1q4', text: "Who held the position of India's first Chief Election Commissioner?", options: [{id: 'a', text: 'Rajendra Prasad'}, {id: 'b', text: 'Sukumar Sen'}, {id: 'c', text: 'Zakir Hussain'}, {id: 'd', text: 'B. R. Ambedkar'}], correctOptionId: 'b', explanation: 'Sukumar Sen was the first Chief Election Commissioner of India, instrumental in conducting the first general elections.' },
          { id: 'ps1q5', text: "What represented the greatest difficulty in arranging India's inaugural general election?", options: [{id: 'a', text: 'The large size of the country'}, {id: 'b', text: 'The lack of infrastructure'}, {id: 'c', text: 'The high level of illiteracy'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: "India's first general election faced numerous challenges including its vast size, limited infrastructure, and a largely illiterate electorate." },
        ],
      },
      {
        id: 'ps-l2-medium',
        name: 'Level 2: Electoral Process in India (Medium)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps2q1', text: "Why did the Election Commission initially reject voter lists containing names like 'wife of ...' or 'daughter of ...'?", options: [{id: 'a', text: 'It violated the principle of universal adult franchise'}, {id: 'b', text: 'It was against the rules of the Constitution'}, {id: 'c', text: 'It was unfair to the women'}, {id: 'd', text: 'It was impractical to verify their identities'}], correctOptionId: 'a', explanation: "Such lists did not recognize women as individual voters, undermining the principle of universal adult franchise which treats each adult as an individual elector with their own identity." },
          { id: 'ps2q2', text: "Why did some observers view India's adoption of universal adult franchise as a potentially hazardous experiment?", options: [{id: 'a', text: 'Because it had never been tried in a country with such a large population'}, {id: 'b', text: 'Because it was feared that illiterate voters would be easily manipulated'}, {id: 'c', text: 'Because it was believed that the majority would vote for extremist candidates'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Concerns included the vast scale, high illiteracy rates, poverty, social hierarchies influencing voting, and the lack of democratic experience, making it a bold experiment.' },
          { id: 'ps2q3', text: "Approximately how much time was required to conduct and complete India's first general election?", options: [{id: 'a', text: 'Three months'}, {id: 'b', text: 'Six months'}, {id: 'c', text: 'One year'}, {id: 'd', text: 'Two years'}], correctOptionId: 'b', explanation: "India's first general election was a massive undertaking, with polling spanning from October 1951 to February 1952, taking about six months to complete the entire process." },
          { id: 'ps2q4', text: "Identify the political party that was victorious in India's inaugural general election.", options: [{id: 'a', text: 'Indian National Congress'}, {id: 'b', text: 'Communist Party of India'}, {id: 'c', text: 'Socialist Party of India'}, {id: 'd', text: 'Bharatiya Jana Sangh'}], correctOptionId: 'a', explanation: 'The Indian National Congress, due to its legacy in the independence movement and widespread organization, won a landslide victory in the first general election.' },
          { id: 'ps2q5', text: "Following the first general election, who assumed the role of India's first Prime Minister?", options: [{id: 'a', text: 'Jawaharlal Nehru'}, {id: 'b', text: 'Rajendra Prasad'}, {id: 'c', text: 'Vallabhbhai Patel'}, {id: 'd', text: 'B. R. Ambedkar'}], correctOptionId: 'a', explanation: 'Jawaharlal Nehru became India\'s first Prime Minister after the inaugural general elections, leading the newly elected government.' },
        ],
      },
      {
        id: 'ps-l3-hard',
        name: 'Level 3: Significance & Challenges of Early Indian Elections (Hard)',
        passingThreshold: 0.6,
        questions: [
          { id: 'ps3q1', text: "Identify some criticisms leveled against India's choice to conduct elections based on universal adult suffrage.", options: [{id: 'a', text: 'It was too expensive'}, {id: 'b', text: 'It would lead to chaos and violence'}, {id: 'c', text: 'It would not be fair to the illiterate and poor'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'Critics raised concerns about the financial burden, potential for disorder given social complexities, and the ability of an impoverished and largely illiterate population to make informed democratic choices.' },
          { id: 'ps3q2', text: 'How did the outcomes of the first general election counter the initial criticisms?', options: [{id: 'a', text: 'The elections were held peacefully and fairly'}, {id: 'b', text: 'The voters turned out in large numbers'}, {id: 'c', text: 'The results were accepted by the losers'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'The largely peaceful and fair conduct of the elections, high voter turnout (around 45%), and the general acceptance of results by all parties (including losers) proved many critics wrong and validated India\'s democratic experiment.' },
          { id: 'ps3q3', text: "Explain the significance of India's inaugural general election within the global history of democracy.", options: [{id: 'a', text: 'It showed that democracy could be practiced in any country, regardless of its economic or educational level'}, {id: 'b', text: 'It inspired other countries to adopt democratic systems of government'}, {id: 'c', text: 'It strengthened the belief in the power of the people'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: "India's first election was a landmark event, demonstrating the viability of democracy in a large, diverse, and developing nation. It set a precedent for other post-colonial countries and affirmed faith in democratic principles globally." },
          { id: 'ps3q4', text: 'Why did the Congress party achieve such widespread success in the initial three general elections?', options: [{id: 'a', text: 'It had the support of the majority of the people'}, {id: 'b', text: 'It had a strong organization'}, {id: 'c', text: 'It had a charismatic leader in Jawaharlal Nehru'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: "The Congress party's early dominance was due to its deep-rooted legacy from the freedom struggle, a well-established organizational network reaching grassroot levels, and the popular leadership of figures like Jawaharlal Nehru." },
          { id: 'ps3q5', text: 'Following the first general election, what was the primary difficulty faced by the Congress party?', options: [{id: 'a', text: 'Maintaining its popularity'}, {id: 'b', text: 'Dealing with the opposition parties'}, {id: 'c', text: 'Implementing its election promises'}, {id: 'd', text: 'All of the above'}], correctOptionId: 'd', explanation: 'The Congress party, as the governing party, faced multifaceted challenges including fulfilling vast public expectations and election promises, managing a nascent but growing opposition, addressing regional aspirations, and driving socio-economic development in a newly independent nation.' },
        ],
      },
    ],
  }
];

    