/* GrillMath engine - honest propane math. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.GrillMath = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  var BTU_PER_LB = 21600;      // propane energy content
  var FULL_TANK_LB = 20;       // honest full fill of a standard cylinder
  var EXCHANGE_LB = 15;        // what exchange cages actually put in
  var DEFAULT_TARE = 17;       // stamped TW on the collar, most 20 lb tanks

  // Propane remaining from a bathroom-scale weigh-in.
  function propaneLeft(scaleLb, tareLb) {
    return Math.max(0, Math.round((scaleLb - tareLb) * 10) / 10);
  }

  // Burn hours: grill rated BTU/hr at full blast, typical throttle as a fraction.
  function burnHours(lb, grillBtu, throttle) {
    if (grillBtu <= 0 || throttle <= 0) return 0;
    var draw = grillBtu * throttle;
    return Math.round(lb * BTU_PER_LB / draw * 10) / 10;
  }

  function cooksLeft(lb, grillBtu, throttle, sessionHours) {
    if (sessionHours <= 0) return 0;
    return Math.floor(burnHours(lb, grillBtu, throttle) / sessionHours);
  }

  // Gauge-free estimation without a scale: the hot-water strip test is binary; this is the math version.
  function tankVerdict(lb) {
    if (lb <= 0.5) return { code: 'empty', label: 'Effectively empty' };
    if (lb <= 2) return { code: 'one-cook', label: 'One cook, maybe - bring a backup plan' };
    if (lb <= 6) return { code: 'few-cooks', label: 'A few cooks left' };
    return { code: 'loaded', label: 'Well stocked' };
  }

  // The exchange lie: cage tanks are filled to ~15 lb, sold at the 20 lb price anchor.
  function exchangeTruth(exchangePrice, refillPrice) {
    var perLbExchange = exchangePrice / EXCHANGE_LB;
    var perLbRefill = refillPrice / FULL_TANK_LB;
    return {
      perLbExchange: Math.round(perLbExchange * 100) / 100,
      perLbRefill: Math.round(perLbRefill * 100) / 100,
      shortedPct: Math.round((1 - EXCHANGE_LB / FULL_TANK_LB) * 100),
      exchangePremiumPct: Math.round((perLbExchange / perLbRefill - 1) * 100)
    };
  }

  // The gauge myth: pressure gauges read vapor pressure, which is flat until the tank is nearly empty.
  function gaugeTruth() {
    return 'Pressure gauges sit at "full" until the last half-pound - propane is a liquid, and vapor pressure does not drop with level. Weight is the only honest number.';
  }

  function fmtLb(x) { return (Math.round(x * 10) / 10) + ' lb'; }

  return {
    BTU_PER_LB: BTU_PER_LB,
    FULL_TANK_LB: FULL_TANK_LB,
    EXCHANGE_LB: EXCHANGE_LB,
    DEFAULT_TARE: DEFAULT_TARE,
    propaneLeft: propaneLeft,
    burnHours: burnHours,
    cooksLeft: cooksLeft,
    tankVerdict: tankVerdict,
    exchangeTruth: exchangeTruth,
    gaugeTruth: gaugeTruth,
    fmtLb: fmtLb
  };
});
