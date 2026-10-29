export type Region = {
  slug: string;
  country: string;
  cities: string[];
  image: string;
  intro: string;
  craft: string;
  practical: string[];
};

export const regions: Region[] = [
  {
    slug: "kenya",
    country: "Kenya",
    cities: ["Nairobi", "Kisumu", "Nakuru", "Machakos"],
    image: "/images/region-kenya.jpg",
    intro:
      "Kenyan workshops range from single forge sheds behind a homestead to fabrication yards supplying hardware shops. Nairobi and Nakuru lean towards gates, grills and welding, while Kisumu and Machakos keep a strong line in agricultural blades and repair work for smallholder farms.",
    craft:
      "Expect jua kali workshops with charcoal or coke forges alongside workshops running arc welders on mains or generator power. Most take both repair and new commissions.",
    practical: [
      "Agree whether the price includes transport to your site",
      "Ask for a written receipt with the work described",
      "Confirm the current cost of steel before a large order",
    ],
  },
  {
    slug: "nigeria",
    country: "Nigeria",
    cities: ["Kaduna", "Ibadan", "Enugu", "Osogbo"],
    image: "/images/region-nigeria.jpg",
    intro:
      "Northern and central Nigerian smithing has deep roots in tool making and blade work. Kaduna and Osogbo workshops are known for hand forged agricultural tools and cutlery, while Enugu and Ibadan fabricators handle gates, tanks and structural welding.",
    craft:
      "Many workshops work in family groups, with one forge shared between three or four makers. Power supply shapes the working day, so ask early whether a job needs a generator.",
    practical: [
      "Visit during morning hours when the forge is hot and light is good",
      "Ask which family member will actually do the work",
      "Confirm the delivery date in writing, not only by phone",
    ],
  },
  {
    slug: "ghana",
    country: "Ghana",
    cities: ["Kumasi", "Tamale", "Accra", "Ho"],
    image: "/images/region-ghana.jpg",
    intro:
      "Kumasi and Tamale keep strong blacksmithing traditions serving farming communities, with tool repair and forging as steady work. Accra workshops tilt towards fabrication for construction, signage and security grills.",
    craft:
      "Some workshops also cast or finish non ferrous metal, so a single visit can cover both forged and cast parts if you ask in advance.",
    practical: [
      "Ask if the workshop buys scrap steel or works only from new stock",
      "Confirm the finish on outdoor pieces, since humidity is high",
      "Agree a pick up date and who bears transport",
    ],
  },
  {
    slug: "tanzania",
    country: "Tanzania",
    cities: ["Arusha", "Dar es Salaam", "Mwanza", "Dodoma"],
    image: "/images/region-tanzania.jpg",
    intro:
      "Arusha and Mwanza workshops serve farming and tourism economies, repairing implements and building fittings for lodges and camps. Dar es Salaam fabricators cover gates, tanks and construction steelwork.",
    craft:
      "Blade and hoe work is common in the lake regions, while the coast leans towards welded fabrication and decorative grills for hotels and homes.",
    practical: [
      "Ask for dimensions in metric and confirm on site",
      "Establish whether coastal humidity has affected old welds",
      "Request a small test piece for decorative patterns",
    ],
  },
  {
    slug: "south-africa",
    country: "South Africa",
    cities: ["Soweto", "Durban", "Gqeberha", "Pretoria"],
    image: "/images/region-southafrica.jpg",
    intro:
      "South African metalwork spans township fabrication shops, security gate specialists and small artisan studios working in decorative iron. Welding and gate work dominate the urban market, with a growing number of studios taking on furniture and art commissions.",
    craft:
      "Workshops are usually clear about coded welding and material certificates for structural work. Ask for certificates where a job needs them.",
    practical: [
      "Confirm whether the workshop issues material certificates",
      "Ask about municipal approval if the work touches a boundary wall",
      "Check whether the quote includes primer and topcoat",
    ],
  },
  {
    slug: "ethiopia",
    country: "Ethiopia",
    cities: ["Addis Ababa", "Dire Dawa", "Hawassa", "Mekelle"],
    image: "/images/region-ethiopia.jpg",
    intro:
      "Ethiopian smiths work across farm tools, household metalware and repair work, with Addis Ababa hosting larger fabrication yards. Dire Dawa and Hawassa keep strong hand forging traditions serving agricultural buyers.",
    craft:
      "Hand forging with simple hearths is still common alongside electric welding, and many workshops make parts to a sample rather than to a drawing.",
    practical: [
      "Bring a sample or a worn part when ordering a copy",
      "Confirm the material before work starts",
      "Ask whether a second person is needed to help on site",
    ],
  },
];

export function getRegion(slug: string): Region | undefined {
  return regions.find((region) => region.slug === slug);
}

export const coverageRoadmap = [
  { country: "Uganda", note: "Kampala and Mbale workshops are being listed." },
  { country: "Rwanda", note: "Kigali fabrication and repair listings in review." },
  { country: "Zambia", note: "Lusaka and Ndola tool makers are being contacted." },
  { country: "Senegal", note: "Dakar metalworkers are being contacted." },
];
