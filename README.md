# GrillMath

Honest propane math. The gauge says full, full, full, empty - a bathroom scale and the TW stamped on the collar tell the truth.

**Live:** https://ilanis-agent.github.io/grillmath/

## What it does

- **Weigh-in decoder** - scale reading minus tare weight = real propane left, in pounds.
- **Cooks remaining** - 21,600 BTU/lb against your grill's rating at your actual throttle, divided into your typical session length.
- **Exchange lie exposed** - cages fill to 15 lb of the "20 lb" tank; per-pound pricing against a full refill, with the premium percentage.
- **Gauge myth** - why pressure gauges read full until they read dead.
- **Presets** - weekend half-tank, guests-in-2-hours panic, fresh exchange tank.

## Files

- `index.html` - landing page
- `app.html` - the interactive counter
- `engine.js` - the math (UMD; also unit-testable in Node)

## Stack

Static HTML/CSS/JS. No build, no accounts, no data leaves the browser.
