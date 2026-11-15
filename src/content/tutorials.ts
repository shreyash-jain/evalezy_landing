/**
 * Video tutorials (public/tutorials/<slug>.mp4 + .jpg poster, 720x1280, English voice-over, captions burned in).
 * The Evalezy app links to the same files at https://evalezy.com/tutorials/, so keep slugs stable.
 */
export interface Tutorial {
  slug: string;
  title: string;
  summary: string;
  /** Seconds. */
  duration: number;
  /** The written steps, the same as the video's captions. */
  steps: string[];
}

export const TUTORIALS_PATH = "/tutorials/";
export const TUTORIALS_UPDATED = "2026-11-14";

export const FULL_TUTORIAL: Tutorial = {
  slug: "full-tutorial",
  title: "How to use Evalezy, start to finish",
  summary: "Sign up, create a test from the question paper, add the copies, let the AI check them, download the checked copies and set your pen.",
  duration: 124,
  steps: [
    "Sign up at evalezy.com with your email and start the free trial.",
    "Tap New, type the test name and total marks, and add the question paper.",
    "The AI reads every question, its marks and the checking criteria. Edit anything.",
    "Scan the answer copies with your camera, or upload PDFs.",
    "Tap Check. The AI checks every copy and reads each student's name.",
    "Download all the checked copies as one ZIP.",
    "Set your pen, handwriting, comments and spelling check in Evaluation settings.",
  ],
};

export const TUTORIALS: Tutorial[] = [
  {
    slug: "01-sign-up",
    title: "Sign up and start your free trial",
    summary: "Create your account in a minute. No card needed.",
    duration: 66,
    steps: [
      "On evalezy.com, tap Start free trial.",
      "Enter your work email and tap Email me a code.",
      "Type the 6-digit code from your inbox and tap Verify email.",
      "Add your name, phone and a password, then your institute, its type, how many teachers, city and state.",
      "Tap Start trial. You land in the app with free AI credits (1 credit checks 1 page).",
    ],
  },
  {
    slug: "03-create-test",
    title: "Create a test from the question paper",
    summary: "Upload the question paper once; the AI reads the questions and marks.",
    duration: 49,
    steps: [
      "On the home screen, tap New.",
      "Type the test name and the paper's total marks.",
      "Take photos of the paper, or tap Upload PDF or photos (page 1 first).",
      "Check the page order and tap Use this page. The credits for reading the paper are shown first.",
      "Tap Create & read the paper. The questions are ready in a few minutes.",
    ],
  },
  {
    slug: "04-marks-criteria",
    title: "Edit marks and checking criteria",
    summary: "Tell the AI exactly what to look for in each answer.",
    duration: 55,
    steps: [
      "Open your test and tap Question paper.",
      "Each question shows its marks and its evaluation criteria.",
      "To change a question's marks, tap Edit marks, type the marks and Save.",
      "To change the criteria, tap Edit under Evaluation criteria.",
      "Add or edit a point: its name, what to look for, and its marks. Tap Save criteria.",
    ],
  },
  {
    slug: "05-upload-copies",
    title: "Upload answer copies",
    summary: "PDFs or photos from your phone or computer.",
    duration: 48,
    steps: [
      "Open your test and scroll to Add copies.",
      "Tap Upload files. Each PDF is one copy; photos picked together make one copy.",
      "Remove a copy with the bin icon. Pages and credits are shown before you start.",
      "Open Checking settings and add the subject and class / board.",
      "Tap Check copies.",
    ],
  },
  {
    slug: "06-scan-camera",
    title: "Scan copies with your phone camera",
    summary: "No scanner needed.",
    duration: 44,
    steps: [
      "Open your test and tap Scan with camera.",
      "Hold the page flat, fill the frame and tap the round button.",
      "More pages in the same copy? Take another photo.",
      "Tap Next student, then scan the next copy.",
      "After the last copy, tap Done. Each copy is saved as a PDF.",
    ],
  },
  {
    slug: "07-check-results",
    title: "Start the AI check and see the results",
    summary: "Watch every copy get checked, then open each result.",
    duration: 39,
    steps: [
      "With your copies ready, tap Check copies.",
      "The AI reads the handwriting, checks every answer against your criteria and gives marks.",
      "Each student's name and roll number are read from the copy.",
      "Tap Open or AI report for a student, or AI class report for the whole class.",
    ],
  },
  {
    slug: "08-download-zip",
    title: "Download the checked copies",
    summary: "Every checked copy in one ZIP, named by student.",
    duration: 25,
    steps: [
      "When the check is done, open the results of your test.",
      "Tap Download checked copies. The ZIP is saved to your phone or computer.",
      "Inside: one checked PDF per student, named by the student. Share or print them.",
    ],
  },
  {
    slug: "09-pen-handwriting",
    title: "Change the pen colour and handwriting",
    summary: "Make the checked copy look like your own.",
    duration: 64,
    steps: [
      "Tap the menu (⋮) and open Evaluation settings.",
      "Under Pen on the checked copy, pick the ink colour: red, blue, green, black or custom.",
      "Use How dark to make the ink lighter or darker.",
      "Pick a handwriting (Teacher, Natural, Scrawled, Quick, Cursive or Classic) and a size.",
      "Tap See how it will look for a real sample page, then Save settings.",
    ],
  },
  {
    slug: "10-checking-style",
    title: "Comments, instructions and spelling check",
    summary: "Set how the AI checks every copy.",
    duration: 80,
    steps: [
      "Open Evaluation settings from the menu.",
      "Choose where comments go: inside the copy, or outside in a Teacher comments panel.",
      "Write your own instructions for the AI checker, e.g. follow the CBSE marking scheme.",
      "Turn on Highlight spelling and grammar errors: each mistake is underlined with its correction; no marks are cut.",
      "Choose how copies are matched to students, set camera / upload / email options, and tap Save settings.",
    ],
  },
];

export const tutorialVideo = (slug: string) => `${TUTORIALS_PATH}${slug}.mp4`;
export const tutorialPoster = (slug: string) => `${TUTORIALS_PATH}${slug}.jpg`;
export const isoDuration = (s: number) => `PT${Math.floor(s / 60) ? `${Math.floor(s / 60)}M` : ""}${s % 60}S`;
export const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
