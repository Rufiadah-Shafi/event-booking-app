import { Event } from "@/types";

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
}

const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "Houston, TX",
  "Phoenix, AZ",
  "San Francisco, CA",
  "Seattle, WA",
  "Denver, CO",
  "Boston, MA",
  "Miami, FL",
  "Austin, TX",
  "Portland, OR",
  "Nashville, TN",
  "Atlanta, GA",
  "San Diego, CA",
];

const eventTemplates: { title: string; description: string; category: string }[] = [
  {
    title: "Summer Music Festival",
    description: "An electrifying outdoor music festival featuring top artists across rock, pop, indie, and electronic genres. Enjoy live performances on three stages, gourmet food trucks, art installations, and a vibrant atmosphere under the stars. Perfect for music lovers of all ages.",
    category: "Music",
  },
  {
    title: "Tech Innovation Summit",
    description: "Join industry leaders and visionaries at this premier technology conference. Explore cutting-edge topics like AI, blockchain, cloud computing, and cybersecurity through keynote speeches, hands-on workshops, and networking sessions with top professionals.",
    category: "Technology",
  },
  {
    title: "International Food & Wine Expo",
    description: "Savor the finest cuisines from around the world at this culinary celebration. Sample dishes from award-winning chefs, attend cooking demonstrations, explore wine and craft beer tastings, and discover new flavors from over 50 global vendors.",
    category: "Food & Drink",
  },
  {
    title: "Contemporary Art Exhibition",
    description: "Immerse yourself in a stunning collection of contemporary artwork from emerging and established artists. This exhibition features paintings, sculptures, digital art, and mixed-media installations that challenge perspectives and inspire creativity.",
    category: "Art",
  },
  {
    title: "Marathon & Fun Run",
    description: "Lace up your running shoes for this city-wide marathon and fun run event. Choose from a full marathon, half marathon, 10K, or 5K family fun run. All participants receive a medal, event t-shirt, and access to the post-race celebration with live music and refreshments.",
    category: "Sports",
  },
  {
    title: "Startup Pitch Competition",
    description: "Watch the next generation of entrepreneurs pitch their groundbreaking ideas to a panel of top venture capitalists and angel investors. Network with founders, attend workshops on fundraising and growth strategies, and be part of the startup ecosystem.",
    category: "Business",
  },
  {
    title: "Jazz & Blues Night",
    description: "Experience an unforgettable evening of smooth jazz and soulful blues performed by acclaimed musicians. Set in an intimate venue with premium cocktails and a warm ambiance, this is the perfect night out for music enthusiasts and date nights alike.",
    category: "Music",
  },
  {
    title: "Outdoor Yoga & Wellness Retreat",
    description: "Recharge your mind and body at this full-day wellness retreat held in a beautiful park setting. Enjoy guided yoga sessions, meditation workshops, sound healing, healthy smoothie bars, and expert talks on nutrition, mindfulness, and holistic health.",
    category: "Health",
  },
  {
    title: "Film Festival Premiere Night",
    description: "Be among the first to watch exclusive screenings of independent films from talented directors worldwide. The evening includes red carpet arrivals, Q&A sessions with filmmakers, an awards ceremony, and a VIP after-party with cast and crew.",
    category: "Entertainment",
  },
  {
    title: "Craft Beer & Street Food Festival",
    description: "Discover over 100 craft beers from local and regional breweries paired with mouthwatering street food from the city's best vendors. Live bands, lawn games, and a lively atmosphere make this the ultimate weekend hangout for foodies and beer lovers.",
    category: "Food & Drink",
  },
  {
    title: "Digital Marketing Masterclass",
    description: "Upgrade your marketing skills at this intensive full-day workshop. Learn proven strategies for SEO, social media advertising, email campaigns, content marketing, and analytics from industry experts who have worked with Fortune 500 brands.",
    category: "Education",
  },
  {
    title: "Stand-Up Comedy Showcase",
    description: "Laugh the night away with a lineup of top comedians performing their best material. From observational humor to sharp political satire, this showcase promises non-stop entertainment in a lively club setting with great drinks and appetizers.",
    category: "Entertainment",
  },
  {
    title: "Charity Gala Dinner",
    description: "Join a glamorous evening of fine dining, live entertainment, and philanthropy. This black-tie gala supports local community initiatives with a silent auction, inspiring speeches from beneficiaries, and a live orchestra performing throughout the night.",
    category: "Charity",
  },
  {
    title: "Photography Workshop & Photo Walk",
    description: "Sharpen your photography skills with hands-on training from professional photographers. Start with an indoor workshop covering composition, lighting, and editing techniques, then head outdoors for a guided photo walk through the city's most photogenic spots.",
    category: "Education",
  },
  {
    title: "Classic Car & Motorcycle Show",
    description: "Admire a stunning collection of vintage cars, custom hot rods, and classic motorcycles from private collectors. The show features live detailing demos, a best-in-show competition, automotive memorabilia vendors, and family-friendly entertainment.",
    category: "Automotive",
  },
  {
    title: "Electronic Dance Music Party",
    description: "Dance the night away at this high-energy EDM event featuring world-class DJs, dazzling laser shows, and immersive sound systems. With VIP lounge access, themed dance floors, and spectacular visual effects, this party is an experience like no other.",
    category: "Music",
  },
  {
    title: "Book Fair & Author Meet-Up",
    description: "Browse thousands of titles from independent publishers and bestselling authors at this annual book fair. Attend author readings, panel discussions on literary trends, book signings, and workshops for aspiring writers. A paradise for book lovers.",
    category: "Education",
  },
  {
    title: "Science & Space Expo",
    description: "Explore the wonders of science and space at this interactive exhibition. Featuring planetarium shows, rocket-building workshops, VR space walks, and talks from NASA scientists and astronauts, this expo makes science exciting and accessible for all ages.",
    category: "Science",
  },
  {
    title: "Salsa & Latin Dance Night",
    description: "Heat up your evening with a vibrant night of salsa, bachata, and merengue. Whether you are a seasoned dancer or a complete beginner, enjoy free dance lessons, live Latin music, and an energetic dance floor that keeps the party going until midnight.",
    category: "Dance",
  },
  {
    title: "Farmers Market & Artisan Fair",
    description: "Shop for fresh organic produce, handcrafted goods, artisan bread, local honey, and unique handmade jewelry at this weekend market. Enjoy live acoustic music, face painting for kids, and cooking demos by local chefs using seasonal ingredients.",
    category: "Community",
  },
  {
    title: "AI & Machine Learning Conference",
    description: "Dive deep into the latest advancements in artificial intelligence and machine learning. This conference features research paper presentations, live coding sessions, product demos from leading AI companies, and panel discussions on the ethics and future of AI.",
    category: "Technology",
  },
  {
    title: "Rock Climbing Championship",
    description: "Watch elite climbers compete on challenging bouldering and lead-climbing walls at this thrilling championship. Open categories are available for amateurs, and there are beginner workshops, gear exhibitions, and meet-and-greets with pro athletes.",
    category: "Sports",
  },
  {
    title: "Acoustic Sunset Sessions",
    description: "Enjoy a beautiful evening of live acoustic performances as the sun sets over the waterfront. Featuring singer-songwriters and folk artists in a relaxed outdoor setting with blankets, picnic baskets welcome, and artisan coffee and pastries available.",
    category: "Music",
  },
  {
    title: "Hackathon Weekend",
    description: "Collaborate with developers, designers, and entrepreneurs in this 48-hour hackathon. Build innovative solutions to real-world challenges, compete for cash prizes and mentorship opportunities, and network with recruiters from top tech companies.",
    category: "Technology",
  },
  {
    title: "Fashion Week Pop-Up Show",
    description: "Experience the latest trends from up-and-coming designers at this exclusive fashion show. Runway presentations, behind-the-scenes access, styling workshops, and a pop-up marketplace where you can shop directly from designer collections.",
    category: "Fashion",
  },
  {
    title: "Wine Tasting & Vineyard Tour",
    description: "Spend an afternoon exploring a beautiful vineyard with guided tours of the winemaking process. Sample award-winning wines paired with artisanal cheese and charcuterie boards, and learn tasting techniques from certified sommeliers in a picturesque setting.",
    category: "Food & Drink",
  },
  {
    title: "Kids Science Fun Day",
    description: "A day packed with exciting science experiments, robot-building workshops, and interactive STEM activities designed for children ages 5 to 14. Spark your child's curiosity with volcano eruptions, slime making, coding games, and a mini rocket launch.",
    category: "Family",
  },
  {
    title: "Outdoor Movie Night",
    description: "Grab your blanket and enjoy a classic film under the stars at this outdoor cinema event. Set in a beautiful park with a giant inflatable screen, the evening features pre-show trivia, popcorn and snack stands, and a cozy atmosphere for all ages.",
    category: "Entertainment",
  },
  {
    title: "Blockchain & Web3 Summit",
    description: "Explore the decentralized future at this summit covering blockchain technology, DeFi, NFTs, and Web3 development. Hear from crypto founders, participate in smart contract workshops, and connect with investors shaping the next era of the internet.",
    category: "Technology",
  },
  {
    title: "Pet Adoption & Wellness Fair",
    description: "Find your new best friend at this pet adoption event featuring dogs, cats, and small animals from local shelters. The fair also offers free pet health checkups, grooming demos, training tips from certified behaviorists, and a pet costume contest.",
    category: "Community",
  },
  {
    title: "Ceramics & Pottery Workshop",
    description: "Get your hands dirty in this beginner-friendly pottery workshop. Learn hand-building and wheel-throwing techniques from experienced ceramic artists. All materials are provided, and you will take home your finished pieces after they are kiln-fired.",
    category: "Art",
  },
  {
    title: "Comedy Roast Night",
    description: "A hilarious evening where top comedians take turns roasting each other and brave audience volunteers. Enjoy sharp wit, clever comebacks, and belly laughs in an intimate comedy club setting with craft cocktails and a lively crowd.",
    category: "Entertainment",
  },
  {
    title: "Triathlon Challenge",
    description: "Test your endurance in this multi-sport event combining swimming, cycling, and running. Categories range from sprint to Olympic distance, with a kids triathlon available too. All finishers receive a medal, and top athletes compete for prize money.",
    category: "Sports",
  },
  {
    title: "Spoken Word & Poetry Slam",
    description: "Experience the raw power of live poetry at this spoken word event. Local and touring poets perform original pieces on themes of identity, love, justice, and resilience. Open mic slots are available for aspiring poets to share their voice.",
    category: "Art",
  },
  {
    title: "Cybersecurity Workshop",
    description: "Learn how to protect yourself and your organization from cyber threats in this hands-on workshop. Topics include ethical hacking, penetration testing fundamentals, phishing awareness, and building secure applications, taught by certified security professionals.",
    category: "Technology",
  },
  {
    title: "Garden & Flower Show",
    description: "Stroll through breathtaking floral displays and landscaped gardens at this annual show. Attend talks on sustainable gardening, buy rare plants from specialty nurseries, and participate in flower arranging workshops led by award-winning florists.",
    category: "Community",
  },
  {
    title: "Board Game & Tabletop Convention",
    description: "Dive into the world of board games, card games, and tabletop RPGs at this fun-filled convention. Try out new releases before they hit shelves, join tournaments, meet game designers, and shop for rare collectibles and accessories.",
    category: "Entertainment",
  },
  {
    title: "Meditation & Breathwork Session",
    description: "Find your inner calm at this guided meditation and breathwork session. Led by experienced wellness practitioners, this event helps reduce stress, improve focus, and cultivate mindfulness through proven techniques suitable for beginners and advanced practitioners.",
    category: "Health",
  },
  {
    title: "Street Art & Mural Festival",
    description: "Watch talented street artists transform blank walls into vibrant murals in real time. This festival celebrates urban art with live painting, spray can workshops, gallery exhibitions, hip-hop performances, and guided walking tours of the city's best street art.",
    category: "Art",
  },
  {
    title: "Entrepreneur Networking Mixer",
    description: "Connect with fellow entrepreneurs, mentors, and investors at this high-energy networking event. Enjoy casual conversations over drinks and appetizers, lightning pitch rounds, and one-on-one mentorship sessions with successful business founders.",
    category: "Business",
  },
  {
    title: "Holiday Craft Market",
    description: "Shop unique handmade gifts, decorations, and treats from local artisans and bakers at this festive holiday market. Enjoy caroling, hot cocoa, gingerbread decorating, and visits from Santa, making it a magical outing for the whole family.",
    category: "Community",
  },
  {
    title: "Open Water Swimming Race",
    description: "Dive into this exciting open water swimming competition held at the city lake. Distances range from 500 meters to 3 kilometers, with categories for all skill levels. Safety boats, professional timing, and a post-race barbecue are all included.",
    category: "Sports",
  },
  {
    title: "Vintage Vinyl Record Fair",
    description: "Dig through crates of rare and classic vinyl records from dozens of dealers and collectors. Find everything from jazz and blues to punk and hip-hop. The fair also features DJ sets, album art exhibitions, and listening stations with high-end turntables.",
    category: "Music",
  },
  {
    title: "Leadership & Management Seminar",
    description: "Develop essential leadership skills at this intensive seminar featuring talks from CEOs, executive coaches, and organizational psychologists. Topics include team building, conflict resolution, strategic thinking, and leading through change.",
    category: "Business",
  },
  {
    title: "Night Sky Stargazing Event",
    description: "Join amateur astronomers for an evening of stargazing with professional telescopes. Learn to identify constellations, planets, and deep-sky objects with expert guidance. Hot drinks and blankets provided at this family-friendly outdoor event.",
    category: "Science",
  },
  {
    title: "Sushi Making Masterclass",
    description: "Learn the art of sushi making from a trained Japanese chef in this hands-on cooking class. Master techniques for preparing rice, slicing fish, and rolling maki. All ingredients and tools are provided, and you get to enjoy your creations at the end.",
    category: "Food & Drink",
  },
  {
    title: "Indie Game Developer Showcase",
    description: "Play unreleased indie games and meet the developers behind them at this interactive showcase. Vote for your favorite title, attend game design talks, participate in a game jam, and connect with publishers looking for the next breakout hit.",
    category: "Technology",
  },
  {
    title: "Ballet & Contemporary Dance Performance",
    description: "Witness a breathtaking evening of ballet and contemporary dance performed by a renowned dance company. The program features both classical pieces and original choreography set to live orchestral music in a beautifully restored theater.",
    category: "Dance",
  },
  {
    title: "Mountain Biking Trail Day",
    description: "Hit the trails at this organized mountain biking event with routes for all skill levels. Enjoy scenic single-track paths, technical downhill sections, and beginner-friendly loops. Bike mechanics, hydration stations, and a post-ride meal are included.",
    category: "Sports",
  },
  {
    title: "Home Renovation & Design Expo",
    description: "Get inspired for your next home project at this comprehensive expo featuring interior designers, contractors, and smart home technology vendors. Attend DIY workshops, browse room makeover displays, and consult with experts on your renovation plans.",
    category: "Lifestyle",
  },
];

export function transformPosts(posts: JsonPlaceholderPost[]): Event[] {
  return posts.map((post, index) => {
    const seed = post.id;
    const template = eventTemplates[index % eventTemplates.length];
    const date = new Date(2026, (seed * 3) % 12, (seed * 7) % 28 + 1);

    // For duplicates beyond 50, add year suffix to make titles unique
    const suffix = index >= eventTemplates.length ? ` ${2026 + Math.floor(index / eventTemplates.length)}` : "";

    return {
      id: post.id,
      title: template.title + suffix,
      description: template.description,
      date: date.toISOString().split("T")[0],
      location: locations[seed % locations.length],
      price: 20 + ((seed * 13) % 180),
      availableSeats: 10 + ((seed * 17) % 90),
    };
  });
}
