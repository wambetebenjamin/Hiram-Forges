import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "../components/PageHead";
import { T } from "../components/T";

export const metadata: Metadata = {
  title: "Workshop safety",
  description:
    "Plain safety notes for clients visiting a metal workshop and for makers running one, including site work, personal protective equipment and emergencies.",
  alternates: { canonical: "/safety" },
};

const visiting = [
  "Call before you arrive. A workshop can be loud, and a maker mid cut should not be interrupted.",
  "Wear closed shoes and long trousers. Leave loose sleeves, scarves and dangling jewellery at home.",
  "Stand behind the line the maker points out. Sparks travel further than people expect.",
  "Do not touch finished work, tools or hot metal. Steel that looks grey can still be above 200 degrees.",
  "Ask before taking photographs near a welder. Arc flash can damage eyes at a distance.",
  "Keep children within arm's reach and away from walkways where bar stock is moved.",
  "If you feel unwell from fumes or heat, step outside and say so. Do not wait.",
];

const running = [
  "Ventilate the forge and welding area. Open both the high and low openings so fumes leave and fresh air enters.",
  "Keep fuel, gas cylinders and paint away from the forge and grinder, secured upright and away from walkways.",
  "Use eye and face protection for grinding, cutting and welding, and hearing protection when grinding or hammering for long periods.",
  "Guard abrasive wheels and check them for cracks before mounting. Never remove a guard to fit a disc.",
  "Keep a fire extinguisher charged and within reach, and a bucket of dry sand near the forge.",
  "Isolate electrical tools properly, use an earth leakage breaker and repair damaged cables before the next job.",
  "Train apprentices on one machine at a time, under supervision, before they work alone.",
  "Keep walkways clear of offcuts, and store bar stock so it cannot roll or fall.",
  "Write down the work done on each job, including the material and the finish. It protects both sides.",
];

const siteWork = [
  "Agree the scope, the hours and who provides power and water before the team arrives.",
  "Check for buried cables and pipes before any ground fixing or drilling.",
  "Barricade the work area and keep the public out of the spark and cut off zone.",
  "Ask for permits where your local authority requires them, especially for boundary walls, signage and work at height.",
  "Use proper access equipment for overhead work. Ladders are for access, not for welding platforms.",
  "Clear the site at the end of each day: offcuts, sharp edges and temporary fixings are common causes of injury.",
];

const emergency = [
  "For a burn, cool the area under clean running water for at least twenty minutes and seek medical help.",
  "For an eye injury, do not rub. Cover the eye lightly and go to a clinic immediately.",
  "For a cut from sheet metal, control the bleeding, clean the wound and check whether a tetanus booster is needed.",
  "For a fire, raise the alarm, cut the fuel or power if it is safe, and use the extinguisher only on a small fire you can turn your back on.",
  "Keep a basic first aid kit stocked and a charged phone with local emergency numbers posted near the door.",
];

export default function SafetyPage() {
  return (
    <>
      <PageHead
        title="Workshop"
        highlight="safety"
        intro="Plain notes for clients visiting a workshop and for makers running one. General guidance only, not a substitute for local regulation or a qualified inspection."
        image="/images/safety-welder.jpg"
        crumb="Safety"
      />

      <section className="hf-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hf-prose">
                <h2>
                  <T k="safety.clientTitle" />
                </h2>
                <p>
                  A workshop is a working space, not a showroom. The maker is responsible for the
                  safety of the people in it, so follow their instructions and ask before you move
                  anything. These notes are the ones most often repeated by the workshops listed
                  here.
                </p>
                <ul>
                  {visiting.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 style={{ marginTop: 44 }}>
                  <T k="safety.makerTitle" />
                </h2>
                <p>
                  Most accidents in small metal workshops come from four things: an unguarded
                  grinding disc, hot metal that looked cold, fumes in a closed room and a cable
                  that should have been replaced. None of them cost much to fix.
                </p>
                <ul>
                  {running.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 style={{ marginTop: 44 }}>
                  <T k="safety.siteTitle" />
                </h2>
                <p>
                  Site work carries different risks from workshop work because the public is
                  close by and the conditions change through the day.
                </p>
                <ul>
                  {siteWork.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 style={{ marginTop: 44 }}>
                  <T k="safety.emergencyTitle" />
                </h2>
                <ul>
                  {emergency.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="hf-note" style={{ marginTop: 30 }}>
                  <p>
                    <strong>For clients.</strong> If a workshop will not let you see the work
                    before final payment, or asks for the full amount before material is bought,
                    slow down. A written scope and staged payment protects both sides. See{" "}
                    <Link href="/terms">the terms</Link> and{" "}
                    <Link href="/specialties">the preparation notes</Link>.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="hf-disclaimer" style={{ position: "sticky", top: 120 }}>
                <h3>Local rules come first</h3>
                <p>
                  Safety law, licensing and insurance requirements differ by country and city.
                  Follow the rules that apply where the work happens. Where a licence, permit or
                  inspection is required, ask the workshop to show it.
                </p>
                <p style={{ marginTop: 14 }}>
                  Hiram Forges is an independent directory. We do not supervise work, inspect
                  workshops or guarantee the safety of any job.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
