export type SpecialtyKey = "tools" | "gates" | "agri" | "decorative" | "welding";

export type Specialty = {
  key: SpecialtyKey;
  name: string;
  short: string;
  image: string;
  intro: string;
  work: string[];
  prepare: string[];
  ask: string[];
};

export const specialties: Specialty[] = [
  {
    key: "tools",
    name: "Tools",
    short: "Hoes, knives, chisels, hammers, spanners and repair work",
    image: "/images/specialty-tools.jpg",
    intro:
      "Tool work is the backbone of most workshops in this directory. A smith who makes agricultural blades can usually re-eye a hammer, draw out a worn wedge or harden a cold chisel. Bring the broken item with you where possible: the shape of the break tells the maker more than a description does.",
    work: [
      "Forged hoes, machetes, slashers and axes",
      "Cold chisels, punches, wedges and drifts",
      "Re-handling and re-eyeing hammers and mattocks",
      "Straightening bent bars, levers and pry tools",
      "Hardening and tempering of small cutting edges",
    ],
    prepare: [
      "Bring the original tool, including any loose pieces",
      "Say what the tool is used for and how often",
      "Ask whether the repair is a reforge or a replacement",
      "Confirm the finish you want: ground edge or hammered edge",
    ],
    ask: [
      "What steel are you starting from?",
      "Will the edge be tempered after grinding?",
      "How long is the tool expected to last in daily use?",
    ],
  },
  {
    key: "gates",
    name: "Gates and grills",
    short: "Driveway gates, window grills, railings, doors and frames",
    image: "/images/specialty-gates.jpg",
    intro:
      "Gate and grill work is a measured job. Most delays come from site measurements taken loosely, so agree on who measures and when. Good fabricators will ask about wall condition, opening direction, ground clearance and how the gate will be locked before quoting.",
    work: [
      "Single and double driveway gates",
      "Window grills and security bars",
      "Handrails, balcony railings and stair guards",
      "Steel door frames and security doors",
      "Gate repair, re-hanging and hinge replacement",
    ],
    prepare: [
      "Measure the clear opening, wall to wall, at three heights",
      "Photograph the wall surface and the ground line",
      "Decide the opening direction and hinge side",
      "Ask what finish is included and who applies it",
    ],
    ask: [
      "Is the quote for supply only or supply and fitting?",
      "What section steel is being used for the frame?",
      "How are the posts fixed to the wall or ground?",
    ],
  },
  {
    key: "agri",
    name: "Agri implements",
    short: "Plough parts, hoes, sickles, sprayer frames and repairs",
    image: "/images/specialty-agri.jpg",
    intro:
      "Farm work is seasonal, so timing matters more than finish. A workshop that understands planting and harvest calendars can tell you what can wait and what must be repaired before the next rain. Ask for a written note of the work done so a second repair is easier later.",
    work: [
      "Ox-plough shares, mouldboards and beams",
      "Hoes, sickles, slashers and digging forks",
      "Sprayer frames, tanks stands and wheelbarrow repairs",
      "Grain grinder and feed chopper parts",
      "Reinforcing worn joints before harvest",
    ],
    prepare: [
      "Bring the worn part, not only a photograph",
      "Say which crop and soil the implement works in",
      "Ask for the repair to be tested on site if possible",
      "Agree a date before the season starts, not during it",
    ],
    ask: [
      "Can this be built up and re-shaped, or does it need replacement?",
      "What thickness of steel are you using for the share?",
      "Will you deliver to the farm or should I collect?",
    ],
  },
  {
    key: "decorative",
    name: "Decorative metalwork",
    short: "Balustrades, furniture, signage, screens and art pieces",
    image: "/images/specialty-decorative.jpg",
    intro:
      "Decorative work carries the widest gap between what a client pictures and what a workshop can make in the time agreed. Bring references, agree a sample piece for complex patterns, and settle the finish early. Decorative commissions are usually paid in stages.",
    work: [
      "Interior and exterior balustrades",
      "Steel and wrought iron furniture frames",
      "Shop signage, brackets and lettering",
      "Room dividers, screens and grills",
      "Sculptural and garden metalwork",
    ],
    prepare: [
      "Bring reference images at the size you want the piece",
      "Agree a sample or drawing before production",
      "Confirm the finish: bare, primed, painted or oiled",
      "Ask for a staged payment plan in writing",
    ],
    ask: [
      "Can you show a previous piece in this style?",
      "How much tolerance is there on the dimensions?",
      "What is the lead time for a piece this size?",
    ],
  },
  {
    key: "welding",
    name: "Welding and fabrication",
    short: "Frames, tanks, trailers, repairs and mobile welding",
    image: "/images/specialty-welding.jpg",
    intro:
      "Welding covers structural repair as well as light fabrication. Ask whether the workshop is set up for arc, MIG or TIG work, and whether they can test a weld before you rely on it. For anything load bearing, insist on a thickness that matches the load, not the cheapest sheet available.",
    work: [
      "Trailers, carts and chassis repairs",
      "Water tanks, troughs and gutter sections",
      "Shop counters, shelving and racks",
      "Structural brackets and machine guards",
      "On-site and mobile welding for repairs",
    ],
    prepare: [
      "Say what the part will carry or hold",
      "Ask for the weld process and material thickness",
      "Confirm whether the work is done in the workshop or on site",
      "Keep a photo of the finished weld for your records",
    ],
    ask: [
      "Which welding process are you using on this joint?",
      "How will you check the weld before handover?",
      "What is the safe load for this frame?",
    ],
  },
];

export function getSpecialty(key: string): Specialty | undefined {
  return specialties.find((specialty) => specialty.key === key);
}

export function specialtyName(key: SpecialtyKey): string {
  return specialties.find((specialty) => specialty.key === key)?.name ?? key;
}
