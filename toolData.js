// Master tool list based on your study packets and flash cards.

const TOOL_BANK = [
  // Power tools / powered equipment
  { name: "Cordless drill/driver", type: "power" },
  { name: "Impact driver", type: "power" },
  { name: "Corded drill", type: "power" },
  { name: "Screw gun", type: "power" },
  { name: "Circular saw", type: "power" },
  { name: "Reciprocating saw (Sawzall)", type: "power" },
  { name: "Jigsaw", type: "power" },
  { name: "Miter saw (chop saw)", type: "power" },
  { name: "Table saw", type: "power" },
  { name: "Angle grinder", type: "power" },
  { name: "Belt sander", type: "power" },
  { name: "Oscillating multi-tool", type: "power" },
  { name: "Rotary hammer / hammer drill", type: "power" },
  { name: "Spade bit (drill bit)", type: "power" },
  { name: "Magnetic bit holder / nut driver adapter", type: "power" },
  { name: "Hole saw", type: "power" },
  { name: "Portable band saw", type: "power" },
  { name: "Mini excavator", type: "power" },
  { name: "Backhoe loader", type: "power" },
  { name: "Bulldozer", type: "power" },
  { name: "Asphalt paver / paving machine", type: "power" },
  { name: "Worm drive circular saw", type: "power" },
  { name: "Hypoid drive circular saw", type: "power" },
  { name: "Sidewinder / direct-drive circular saw", type: "power" },
  { name: "Angle-head drill motor", type: "power" },
  { name: "Pistol-grip drill motor", type: "power" },
  { name: "Band saw (stationary)", type: "power" },
  { name: "Auger bit", type: "power" },
  { name: "Multi-spur bit", type: "power" },
  { name: "Twist drill bit", type: "power" },
  { name: "Boom lift", type: "power" },
  { name: "GFI protector", type: "power" },
  { name: "'Spider' power distribution box", type: "power" },

  // Hand tools
  { name: "Claw hammer", type: "hand" },
  { name: "Sledge hammer", type: "hand" },
  { name: "Rubber mallet", type: "hand" },
  { name: "Tape measure", type: "hand" },
  { name: "Speed square", type: "hand" },
  { name: "Framing square", type: "hand" },
  { name: "Combination square", type: "hand" },
  { name: "Torpedo level", type: "hand" },
  { name: "4-foot level", type: "hand" },
  { name: "Corner/post level", type: "hand" },
  { name: "Line level", type: "hand" },
  { name: "Chalk line reel", type: "hand" },
  { name: "String line reel", type: "hand" },
  { name: "Plumb bob", type: "hand" },
  { name: "Architect's scale / measuring rule", type: "hand" },
  { name: "Story pole / grade rods set", type: "hand" },
  { name: "Carpenter's pencil", type: "hand" },
  { name: "Utility knife", type: "hand" },
  { name: "Putty knife", type: "hand" },
  { name: "Cold chisel", type: "hand" },
  { name: "Wood chisel", type: "hand" },
  { name: "Nail set / center punch", type: "hand" },
  { name: "Block plane", type: "hand" },
  { name: "Wood rasp", type: "hand" },
  { name: "Metal file", type: "hand" },
  { name: 'Flat bar / "wonder bar" (pry bar)', type: "hand" },
  { name: "Cat's paw nail puller", type: "hand" },
  { name: "Wire brush", type: "hand" },
  { name: "Flat-head screwdriver", type: "hand" },
  { name: "Phillips-head screwdriver", type: "hand" },
  { name: "Torx screwdriver", type: "hand" },
  { name: "Adjustable (crescent) wrench", type: "hand" },
  { name: "Open-end wrench", type: "hand" },
  { name: "Box-end wrench", type: "hand" },
  { name: "Socket wrench / ratchet handle", type: "hand" },
  { name: "Slip-joint pliers", type: "hand" },
  { name: "Tongue-and-groove pliers (channel locks)", type: "hand" },
  { name: "Linesman pliers", type: "hand" },
  { name: "Diagonal cutters (dikes)", type: "hand" },
  { name: "Needle-nose pliers", type: "hand" },
  { name: "C-clamp", type: "hand" },
  { name: "Bar clamp", type: "hand" },
  { name: "Pipe wrench", type: "hand" },
  { name: "Hand saw (crosscut saw)", type: "hand" },
  { name: "Backsaw / miter box saw", type: "hand" },
  { name: "Hacksaw", type: "hand" },
  { name: "Coping saw", type: "hand" },
  { name: "Framing hammer", type: "hand" },
  { name: "Engineering hammer / single jack", type: "hand" },
  { name: "Ball peen hammer", type: "hand" },
  { name: "Dead blow mallet", type: "hand" },
  { name: "Wrecking bar / crow bar", type: "hand" },
  { name: "Robertson (square) screwdriver", type: "hand" },
  { name: "6-in-1 screwdriver", type: "hand" },
  { name: "Folding ruler", type: "hand" },
  { name: "Mason's line / dry line", type: "hand" },
  { name: "Locking pliers / Vise-Grips", type: "hand" },
  { name: "Spring clamp", type: "hand" },
  { name: "Breaker bar", type: "hand" },
  { name: "Allen / hex wrench set", type: "hand" },
  { name: "Framing chisel", type: "hand" },
  { name: "Rip saw", type: "hand" },
  { name: "Hybrid hand saw", type: "hand" },
  { name: "Pointing trowel", type: "hand" },
  { name: "Margin trowel", type: "hand" },
  { name: "Finishing trowel", type: "hand" },
  { name: "Gauging trowel", type: "hand" },
  { name: "Bull float", type: "hand" },
  { name: "Hand float", type: "hand" },
  { name: "Edger (concrete edger)", type: "hand" },
  { name: "Groover (concrete groover)", type: "hand" },
  { name: "Float trowel", type: "hand" },
  { name: "Concrete broom", type: "hand" },
  { name: "Snap ties", type: "hand" }
];

const HAND_TOOLS = TOOL_BANK.filter((t) => t.type === "hand");
const POWER_TOOLS = TOOL_BANK.filter((t) => t.type === "power");

// Tape measure question bank (text-only, no images)
const TAPE_MEASURE_QUESTIONS = [
  {
    question:
      "How many sixteenths of an inch are in one inch on a standard tape measure?",
    options: ["8", "10", "12", "16"],
    correctIndex: 3
  },
  {
    question: "How many inches are in one foot?",
    options: ["10", "11", "12", "16"],
    correctIndex: 2
  },
  {
    question: "Which fraction is larger?",
    options: ["3/8\"", "1/2\"", "1/4\"", "5/16\""],
    correctIndex: 1
  },
  {
    question:
      "On a framing tape, studs are commonly laid out every how many inches?",
    options: ["12\"", "16\"", "18\"", "24\""],
    correctIndex: 1
  },
  {
    question:
      "Which marking usually shows the longest line between inch numbers?",
    options: ["1/16\"", "1/8\"", "1/4\"", "1/2\""],
    correctIndex: 3
  },
  {
    question:
      "If a board measures 4 feet long, how many inches long is it?",
    options: ["36\"", "40\"", "44\"", "48\""],
    correctIndex: 3
  },
  {
    question:
      "You read a measurement as 3 1/2\". What does that mean?",
    options: [
      "Three and a half inches",
      "Three and a quarter inches",
      "Three and three-quarter inches",
      "Thirty and a half inches"
    ],
    correctIndex: 0
  },
  {
    question:
      "Which measurement is closest to one meter on a standard imperial tape?",
    options: ["12\"", "24\"", "39\"", "60\""],
    correctIndex: 2
  },
  {
    question:
      "On many construction tapes, what color are the 16\" stud marks often highlighted in?",
    options: ["Red", "Green", "Blue", "Black"],
    correctIndex: 0
  },
  {
    question:
      "If a tape reads 7' 6\", what is the total length in inches?",
    options: ["78\"", "80\"", "82\"", "90\""],
    correctIndex: 1 // 7*12 = 84; 84 - 4? Wait, correct: 7*12 = 84; 84 + 6 = 90. So correctIndex should be 3; fix below.
  }
];

// Fix the last question's correct index:
TAPE_MEASURE_QUESTIONS[TAPE_MEASURE_QUESTIONS.length - 1].correctIndex = 3;
