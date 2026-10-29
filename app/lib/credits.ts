export type PhotoCredit = {
  file: string;
  pexelsId: number;
  title: string;
  photographer: string;
  usedFor: string;
};

const known: Record<number, string> = {
  39281476: "Cheyenne Olander",
  33739127: "Tahir Xelfequliyev",
  3760958: "Tope J. Asokere",
  31554441: "soft__work__",
  31633685: "mg shotz",
  31633683: "mg shotz",
  31004832: "Yasin Onus",
  3680094: "J Mt Photography",
  5846096: "Tima Miroshnichenko",
  5845939: "Tima Miroshnichenko",
  5845963: "Tima Miroshnichenko",
  3688501: "topeasokere",
};

export const photoCredits: PhotoCredit[] = [
  { file: "hero-01.jpg", pexelsId: 39281476, title: "Blacksmith forging glowing hot metal on an anvil", photographer: "Cheyenne Olander", usedFor: "Home hero, first slide" },
  { file: "hero-02.jpg", pexelsId: 33739127, title: "Blacksmith forging metal beside fire in a rustic workshop", photographer: "Tahir Xelfequliyev", usedFor: "Home hero, second slide" },
  { file: "hero-03.jpg", pexelsId: 31185575, title: "Blacksmith at work in a forge with hammer and anvil", photographer: "", usedFor: "Home hero, third slide" },
  { file: "about-forge.jpg", pexelsId: 3760958, title: "Artisan working with metal instruments in a rustic workshop", photographer: "Tope J. Asokere", usedFor: "Home about block" },
  { file: "about-hands.jpg", pexelsId: 31554441, title: "Skilled blacksmith crafting in a Kaduna workshop", photographer: "soft__work__", usedFor: "About page" },
  { file: "artisan-abel.jpg", pexelsId: 5846096, title: "Blacksmith working indoors on heated metal", photographer: "Tima Miroshnichenko", usedFor: "Profile, Bekele Iron Works" },
  { file: "artisan-aisha.jpg", pexelsId: 33940886, title: "Welder in protective gear working on a steel structure", photographer: "", usedFor: "Profile, Coast Welding and Fabrication" },
  { file: "artisan-amara.jpg", pexelsId: 37554382, title: "Welder at work with sparks flying in a workshop", photographer: "", usedFor: "Profiles, Nwosu Welding Works" },
  { file: "artisan-chanda.jpg", pexelsId: 20796310, title: "Close up of a blacksmith shaping red hot metal on an anvil", photographer: "", usedFor: "Profile, Asare Metal Foundry" },
  { file: "artisan-chidi.jpg", pexelsId: 19408409, title: "Blacksmiths working on metal plates in a dimly lit workshop", photographer: "", usedFor: "Profile, Okonkwo Fabrication" },
  { file: "artisan-dawit.jpg", pexelsId: 8216252, title: "Welder producing bright sparks during metal welding", photographer: "", usedFor: "Profile, Mekonnen Welding" },
  { file: "artisan-fatuma.jpg", pexelsId: 29543207, title: "Welder working in a factory surrounded by sparks", photographer: "", usedFor: "Profile, Sani Metal Craft" },
  { file: "artisan-hassan.jpg", pexelsId: 33739127, title: "Blacksmith forging metal beside fire in a rustic workshop", photographer: "", usedFor: "Profile, Mwinyi Metal Workshop" },
  { file: "artisan-joseph.jpg", pexelsId: 31554441, title: "Skilled blacksmith crafting in a Kaduna workshop", photographer: "soft__work__", usedFor: "Profile, Kariuki Forge" },
  { file: "artisan-kwame.jpg", pexelsId: 34116082, title: "Blacksmith at work in a rustic workshop", photographer: "", usedFor: "Profile, Mensah Forge and Tools" },
  { file: "artisan-miriam.jpg", pexelsId: 16273145, title: "Close up of a smith working with hammer and anvil", photographer: "", usedFor: "Profile, Achieng Metal Studio" },
  { file: "artisan-neema.jpg", pexelsId: 5323348, title: "Blacksmith hand gripping heated metal", photographer: "", usedFor: "Profile, Mushi Smithy" },
  { file: "artisan-nomvula.jpg", pexelsId: 5845963, title: "Welder wearing safety glasses producing sparks", photographer: "Tima Miroshnichenko", usedFor: "Profile, Dlamini Metal Craft" },
  { file: "artisan-otieno.jpg", pexelsId: 32910565, title: "Blacksmith crafting metal in a forge workshop", photographer: "", usedFor: "Profile, Lakeview Smithy" },
  { file: "artisan-patrick.jpg", pexelsId: 5845939, title: "Blacksmith at work in a forge surrounded by tools", photographer: "Tima Miroshnichenko", usedFor: "Profile, Oduor Ironworks" },
  { file: "artisan-rudo.jpg", pexelsId: 16041153, title: "Tinsmith at work in his shop", photographer: "", usedFor: "Profile, Mabaso Metal Studio" },
  { file: "artisan-selamawit.jpg", pexelsId: 15419840, title: "Welder working with metal beams on a construction site", photographer: "", usedFor: "Profile, Girma Metal and Tools" },
  { file: "artisan-thabo.jpg", pexelsId: 22863133, title: "Welder using protective equipment in a workshop", photographer: "", usedFor: "Profile, Nkosi Steel and Gate" },
  { file: "artisan-wanjiru.jpg", pexelsId: 6036672, title: "Welder working with sparks flying", photographer: "", usedFor: "Profile, Wanjiru Metal Works" },
  { file: "artisan-yaw.jpg", pexelsId: 9729626, title: "Welder in protective gear welding metal in a workshop", photographer: "", usedFor: "Profile, Owusu Steel Works" },
  { file: "artisan-zawadi.jpg", pexelsId: 8216252, title: "Welder producing bright sparks during metal welding", photographer: "", usedFor: "Profile, Mwakalinga Fabrication" },
  { file: "specialty-tools.jpg", pexelsId: 39449101, title: "Blacksmith forging metal on an anvil with a hammer", photographer: "", usedFor: "Specialty, tools" },
  { file: "specialty-gates.jpg", pexelsId: 34856770, title: "Ornate iron gate in Sao Paulo", photographer: "", usedFor: "Specialty, gates and grills" },
  { file: "specialty-agri.jpg", pexelsId: 20077008, title: "Pile of metal hand tools in an outdoor market", photographer: "", usedFor: "Specialty, agricultural implements" },
  { file: "specialty-decorative.jpg", pexelsId: 39743614, title: "House behind a decorative iron gate", photographer: "", usedFor: "Specialty, decorative metalwork" },
  { file: "specialty-welding.jpg", pexelsId: 39712855, title: "Worker using an angle grinder during metal fabrication", photographer: "", usedFor: "Specialty, welding and fabrication" },
  { file: "region-kenya.jpg", pexelsId: 31554441, title: "Blacksmith working in a Kaduna workshop", photographer: "soft__work__", usedFor: "Regions, Kenya" },
  { file: "region-nigeria.jpg", pexelsId: 34116082, title: "Blacksmith at work in a rustic workshop", photographer: "", usedFor: "Regions, Nigeria" },
  { file: "region-ghana.jpg", pexelsId: 33739127, title: "Blacksmith forging metal beside fire", photographer: "", usedFor: "Regions, Ghana" },
  { file: "region-tanzania.jpg", pexelsId: 16041153, title: "Tinsmith at work in his shop", photographer: "", usedFor: "Regions, Tanzania" },
  { file: "region-southafrica.jpg", pexelsId: 37785346, title: "Welder working on a metal structure outdoors", photographer: "", usedFor: "Regions, South Africa" },
  { file: "region-ethiopia.jpg", pexelsId: 38156404, title: "Blacksmith hammering metal in a traditional forge", photographer: "", usedFor: "Regions, Ethiopia" },
  { file: "workshop-01.jpg", pexelsId: 9729626, title: "Welder in protective gear welding metal", photographer: "", usedFor: "Workshops and listings" },
  { file: "workshop-02.jpg", pexelsId: 8216252, title: "Welder producing bright sparks", photographer: "", usedFor: "Workshops and listings" },
  { file: "workshop-03.jpg", pexelsId: 2760343, title: "Skilled welder focused on welding a metal piece", photographer: "", usedFor: "Artisan directory header" },
  { file: "workshop-04.jpg", pexelsId: 7451185, title: "Worker in safety gear pouring molten metal", photographer: "", usedFor: "Workshops and listings" },
  { file: "workshop-05.jpg", pexelsId: 37502090, title: "Foundry workers pouring molten metal into moulds", photographer: "", usedFor: "Workshops and listings" },
  { file: "workshop-06.jpg", pexelsId: 13930446, title: "Welder wearing safety gear welding metal beams", photographer: "", usedFor: "Workshops and listings" },
  { file: "safety-forge.jpg", pexelsId: 31185575, title: "Blacksmith at work in a forge", photographer: "", usedFor: "Safety page" },
  { file: "safety-welder.jpg", pexelsId: 37554382, title: "Welder at work with sparks", photographer: "", usedFor: "Safety page header" },
  { file: "safety-grinder.jpg", pexelsId: 39712855, title: "Worker using an angle grinder", photographer: "", usedFor: "Safety notes" },
  { file: "join-workshop.jpg", pexelsId: 2760343, title: "Welder focused on welding a metal piece", photographer: "", usedFor: "Join page header" },
  { file: "contact-workshop.jpg", pexelsId: 37800206, title: "Industrial workers pouring molten metal safely", photographer: "", usedFor: "Contact page header" },
  { file: "tools-detail.jpg", pexelsId: 4270181, title: "Selection of hand tools on a rough surface", photographer: "", usedFor: "Privacy page header" },
  { file: "anvil-detail.jpg", pexelsId: 39281476, title: "Blacksmith forging glowing hot metal on an anvil", photographer: "Cheyenne Olander", usedFor: "Terms page header" },
  { file: "header.jpg", pexelsId: 0, title: "Template header texture supplied with the uploaded theme", photographer: "Template asset", usedFor: "Header band" },
  { file: "bg-about.png", pexelsId: 0, title: "Template diagonal texture supplied with the uploaded theme", photographer: "Template asset", usedFor: "About background" },
];

// Fill in the photographer from the known table when the record above is blank.
for (const credit of photoCredits) {
  if (!credit.photographer && known[credit.pexelsId]) {
    credit.photographer = known[credit.pexelsId];
  }
}

export function creditFor(file: string): PhotoCredit | undefined {
  return photoCredits.find((credit) => credit.file === file);
}

export function photographerFor(id: number): string {
  return known[id] || "";
}
