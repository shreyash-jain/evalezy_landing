import { BlogShell, postMetadata, Callout, Steps, Table, WhereEvalezyFits, Sources } from "@/components/BlogShell";
import Link from "next/link";

const SLUG = "how-to-write-a-marking-scheme";
export const metadata = postMetadata(SLUG);

export default function Page() {
  return (
    <BlogShell
      slug={SLUG}
      takeaways={[
        "A marking scheme lists, for each question, the points that earn marks, what each is worth and what earns a half mark, and its criteria add up exactly to the question’s marks.",
        "Write criteria as things you can see on the page (“names a factor and says how it works”), not as impressions (“good understanding”).",
        "A model answer is a reference, not required wording: a student’s own correct expression earns the marks, which is also how CBSE instructs its examiners.",
        "Keep marks in their own column, never inside the criterion text, so that editing one criterion cannot leave a stale figure behind.",
        "Test the scheme on five varied copies before marking the stack, and write down every near-miss decision you make.",
      ]}
      toc={[
        { id: "what-it-is", label: "What a marking scheme is" },
        { id: "rules", label: "Six rules for good criteria" },
        { id: "two-mark", label: "Example: a 2-mark definition" },
        { id: "three-mark", label: "Example: a 3-mark “explain” question" },
        { id: "five-mark", label: "Example: a 5-mark long answer" },
        { id: "mistakes", label: "Common mistakes" },
        { id: "test-it", label: "Test it before you mark" },
      ]}
      faqs={[
        {
          q: "What is the difference between a marking scheme and a rubric?",
          a: "The terms overlap. A marking scheme often means value points with marks for each, as in CBSE’s published schemes. A rubric often means descriptions of quality at each level. Both do the same job: tell every checker exactly what earns marks.",
        },
        {
          q: "How many criteria should one question have?",
          a: "Roughly one per idea that earns marks: one for a 1-mark question, two for a 2-mark definition and three to five for longer answers. Beyond five, criteria tend to overlap and become hard to apply the same way every time.",
        },
        {
          q: "Should students lose marks for not using textbook wording?",
          a: "No. The model answer is a reference. CBSE’s instructions to examiners say the value points are guidelines rather than the complete answer, and that a student’s own expression earns the due marks if it is correct.",
        },
        {
          q: "How do I decide what earns half a mark?",
          a: "Decide before marking and write it in its own column. Common half-mark rules are a point named but not explained, a definition with one of two parts, or the right method with a small slip. Then apply the same rule to every copy.",
        },
        {
          q: "Where can I find CBSE marking schemes to use as a model?",
          a: "CBSE publishes marking schemes for its board examinations on cbse.gov.in, and sample question papers with marking schemes on its academic website, cbseacademic.nic.in.",
        },
      ]}
    >
      <p>
        A marking scheme is the reason copy 1 and copy 200 get the same marks for the same answer, and the reason two
        teachers checking one paper agree. Without one, the standard lives in the checker’s head, and heads get tired.
      </p>
      <p>
        This guide shows how to write one for subjective questions, with three worked examples: a 2-mark definition, a
        3-mark “explain the factors” question and a 5-mark long answer. The examples use Class 10 Geography content so
        that they are familiar, but the method works for any subject.
      </p>

      <h2 id="what-it-is">What a marking scheme is (and what it is not)</h2>
      <p>
        A marking scheme, or rubric, lists for each question the points that earn marks, how much each is worth, and how
        to treat answers that are half right. A good one also has a model answer for reference and a short note on what
        does not earn marks.
      </p>
      <p>
        Indian board schemes are a useful model. CBSE’s published marking schemes list “expected answers / value points”
        for each question with the marks per point, written like “½ × 4 = 2”, and often add “Any other” so that other
        correct points are credited. The general instructions to examiners go further: the value points are guidelines
        and not the complete answer, and if a student’s own expression is correct, the due marks should be awarded.
      </p>
      <p>
        That is the spirit to copy. A marking scheme describes what a good answer contains. It is not a script the
        student must reproduce.
      </p>
      <p>There are two broad styles:</p>
      <ul>
        <li>
          <strong>Point-based (value points):</strong> marks for each correct idea. Best for definitions, “explain the
          factors” questions, numericals and most short and long answers in content subjects.
        </li>
        <li>
          <strong>Level-based (bands):</strong> a description of what an answer looks like at each level. Best for
          essays, letters and arguments, where quality matters more than a count of points.
        </li>
      </ul>
      <p>This guide focuses on point-based schemes, with a note on levels for long answers.</p>

      <h2 id="rules">Six rules for criteria that work</h2>
      <Steps
        items={[
          {
            title: "Make the criteria add up exactly to the marks",
            body: "A 3-mark question has criteria worth 3, not 2½ or 4. If you allow “any three of five points”, say so, and say that each point can earn marks only once.",
          },
          {
            title: "One idea per criterion, written as something you can see",
            body: "“Names a factor and says how it helps form soil” can be checked. “Shows good understanding” cannot, and two teachers will read it two ways.",
          },
          {
            title: "Decide half marks in advance",
            body: "Write down exactly what earns ½: a factor named but not explained, a definition with one of its two parts, the right method with an arithmetic slip.",
          },
          {
            title: "Keep the marks out of the criterion text",
            body: "Put marks in their own column. A figure buried in the wording, such as “explains the effect (2 marks)”, goes stale the moment you edit or rescale the criteria, and then the text and the marks column disagree.",
          },
          {
            title: "Treat the model answer as a reference, not required wording",
            body: "Students who say the right thing in their own words earn the marks. List the common acceptable alternatives so checkers do not have to decide on the spot.",
          },
          {
            title: "Say what does not earn marks",
            body: "Write down the near-misses you expect: the related but wrong term, an effect given in place of a cause, a list of examples in place of a definition. It saves a decision on every copy.",
          },
        ]}
      />
      <p>
        Two more conventions from CBSE’s instructions to examiners are worth borrowing. Penalise an error only once, not
        again in every later step that depends on it. And use the full range of marks: give full marks when an answer
        deserves them.
      </p>

      <h2 id="two-mark">Example 1: a 2-mark definition</h2>
      <p>
        <strong>Question:</strong> What is a resource? (2 marks)
      </p>
      <p>
        <strong>Model answer (for reference):</strong> Everything available in our environment that can be used to
        satisfy our needs, provided it is technologically accessible, economically feasible and culturally acceptable,
        is a resource.
      </p>
      <Table
        head={["Criterion", "What earns it", "Half marks", "Marks"]}
        rows={[
          ["Core idea", "Something available in the environment that can be used to satisfy human needs.", "½ if it says only “something found in nature” with no link to needs.", "1"],
          ["Conditions", "It must be technologically accessible, economically feasible and culturally acceptable.", "½ for any two of the three conditions.", "1"],
        ]}
        caption="Total: 2 marks."
      />
      <p>
        <strong>Accept:</strong> “can be used by people” or “useful to us” for “satisfy our needs”; “we have the
        technology to use it” for technologically accessible; “affordable to use” for economically feasible; “accepted
        by society” for culturally acceptable. <strong>Do not accept:</strong> a list of examples (water, coal, soil) in
        place of a definition. Examples show that the student recognises resources, not that they can define one.
      </p>
      <p>
        Notice what the scheme does not do: it does not demand the textbook sentence. A student who writes “Anything
        around us that people can use to meet their needs, if we have the technology, it is affordable and society
        accepts it” earns both marks.
      </p>

      <h2 id="three-mark">Example 2: a 3-mark “explain the factors” question</h2>
      <p>
        <strong>Question:</strong> Explain any three factors that help in the formation of soil. (3 marks)
      </p>
      <p>
        <strong>Factors to accept:</strong> relief, parent rock (bed rock), climate, vegetation and other forms of life,
        and time.
      </p>
      <Table
        head={["Criterion", "What earns it", "Half marks", "Marks"]}
        rows={[
          ["First factor", "A valid factor, with how it helps form soil.", "½ if named but not explained, or explained wrongly.", "1"],
          ["Second factor", "A different valid factor, with how it helps form soil.", "As above.", "1"],
          ["Third factor", "A third valid factor, with how it helps form soil.", "As above.", "1"],
        ]}
        caption="Total: 3 marks. Each factor can be credited only once."
      />
      <p>Explanations to accept include, for example:</p>
      <ul>
        <li>
          <strong>Climate:</strong> changes in temperature, and the action of running water, wind and glaciers, break
          rock down into smaller particles.
        </li>
        <li>
          <strong>Vegetation and other forms of life:</strong> decomposers break down dead plants and animals and add
          organic matter to the soil.
        </li>
        <li>
          <strong>Time:</strong> soil forms very slowly; it takes millions of years for soil to form even a few
          centimetres deep.
        </li>
        <li>
          <strong>Parent rock:</strong> soil is formed from the rock that is broken down, so the rock shapes what the
          soil is made of.
        </li>
      </ul>
      <Callout tone="tip" title="Decide the near-miss before the first copy">
        <p>
          Many students will list “temperature, running water and wind” as three separate factors. They are forces of
          nature that break rock down, and this scheme credits them together as one factor, climate. You might decide
          differently. What matters is that the decision is written down before marking starts, or one checker
          gives 3 marks for that answer and another gives 1.
        </p>
      </Callout>
      <p>
        Why split each factor into naming and explaining? It rewards the student who knows the factors but explains
        them weakly, without giving full credit for a bare list. It mirrors the “½ × 6 = 3” pattern you will find in
        CBSE marking schemes.
      </p>

      <h2 id="five-mark">Example 3: a 5-mark long answer</h2>
      <p>
        <strong>Question:</strong> What is soil erosion? Explain two causes of soil erosion and two methods of soil
        conservation. (5 marks)
      </p>
      <p>
        <strong>Model answer (for reference):</strong> Soil erosion is the removal of the soil cover and its washing
        down. One cause is deforestation: once trees are cut, there are no roots to hold the soil, and rain washes it
        away. Another is defective farming, such as ploughing up and down a slope, which makes channels for water to run
        down quickly and carry the soil with it. One method of conservation is contour ploughing: ploughing along the
        contour lines slows the flow of water down a slope. Another is planting shelter belts, rows of trees that break
        the force of the wind. In western India, shelter belts have helped to stabilise sand dunes.
      </p>
      <Table
        head={["Criterion", "What earns it", "Half marks", "Marks"]}
        rows={[
          ["Definition", "Soil erosion is the removal or washing away of the top layer of soil.", "½ for a vague answer such as “soil gets damaged”.", "1"],
          ["Causes", "Two valid causes, each with how it leads to erosion.", "½ for each cause named without an explanation.", "2"],
          ["Conservation methods", "Two valid methods, each with how it protects the soil.", "½ for each method named without an explanation.", "2"],
        ]}
        caption="Total: 5 marks. Each criterion is marked on its own."
      />
      <p>
        <strong>Accept as causes:</strong> deforestation, overgrazing, construction and mining, defective farming such
        as ploughing up and down the slope, and natural forces such as wind, glaciers and running water.{" "}
        <strong>Accept as methods:</strong> contour ploughing, terrace farming, strip cropping and shelter belts. An
        Indian example, such as terrace farming in the western and central Himalayas, is welcome but is not required for
        full marks.
      </p>
      <p>
        <strong>Keep the criteria independent.</strong> A weak definition costs the definition mark only. It should not
        pull down the marks for causes and methods that are explained correctly.
      </p>

      <h3>When a level-based scheme fits better</h3>
      <p>
        If the same 5 marks were for a piece of extended writing, such as “Should farmers on hill slopes switch to
        terrace farming? Give your view”, counting points would reward listing over reasoning. A level-based scheme fits
        better:
      </p>
      <Table
        head={["Level", "What the answer does", "Marks"]}
        rows={[
          ["High", "Takes a clear position and supports it with at least two accurate reasons and an example; considers one drawback.", "4–5"],
          ["Middle", "Takes a position with one or two reasons, but little support and no drawback.", "2–3"],
          ["Low", "Makes relevant points without a clear position or reasons.", "1"],
          ["None", "Nothing relevant.", "0"],
        ]}
      />
      <p>
        Even with levels, keep the descriptions observable, and decide in advance what moves an answer from the bottom of
        a band to the top.
      </p>

      <h3>And for numericals: method marks</h3>
      <p>
        The same rules apply to a numerical, with one addition: give marks for the method, not only the final answer.
        For “A car travels 150 km in 3 hours. Find its average speed. (3 marks)”, a workable scheme is:
      </p>
      <Table
        head={["Criterion", "What earns it", "Half marks", "Marks"]}
        rows={[
          ["Formula", "Average speed = total distance ÷ total time.", "None.", "1"],
          ["Substitution", "Correct values put into the formula: 150 ÷ 3.", "None.", "1"],
          ["Answer", "50 km/h, with the unit.", "½ for 50 with no unit or a wrong unit.", "1"],
        ]}
        caption="Total: 3 marks."
      />
      <p>
        A student who writes 150 ÷ 3 = 60 keeps the formula and substitution marks and loses only the answer mark. If a
        wrong value from one step is then used correctly in the next, penalise the error once, where it happened, and
        credit the later steps that follow from it correctly.
      </p>

      <h2 id="mistakes">Common mistakes</h2>
      <ul>
        <li>
          <strong>Criteria that do not add up.</strong> Criteria worth 4 for a 3-mark question, or a scheme in which full
          marks are impossible.
        </li>
        <li>
          <strong>Vague words.</strong> “Proper explanation”, “good answer”, “relevant points”. Replace them with what
          you will actually see on the page.
        </li>
        <li>
          <strong>Double counting.</strong> The same idea earning marks under two criteria, such as an example that also
          counts as the explanation.
        </li>
        <li>
          <strong>Marks hidden in the text.</strong> A “maximum 1 mark for examples” buried in a description, which
          quietly conflicts with the marks column after someone edits it.
        </li>
        <li>
          <strong>Textbook wording as a requirement.</strong> It penalises students who understand the idea but put it
          in their own words.
        </li>
        <li>
          <strong>No rule for choices and extra answers.</strong> If a student attempts both options of an “OR”
          question, the scheme should say which answer counts. CBSE’s instruction is to keep the answer that deserves
          more marks and score out the other with a note, “Extra Question”.
        </li>
        <li>
          <strong>Writing the scheme after marking has started.</strong> The first copies get one standard and the rest
          get another.
        </li>
      </ul>

      <h2 id="test-it">Test the scheme before you mark</h2>
      <p>
        Before marking the whole stack, mark five varied copies with the scheme. Any answer you hesitate over is a gap:
        add it as an accepted alternative or a near-miss. If two teachers share the paper, both mark the same five and
        compare. Where you disagree by more than half a mark, the wording of a criterion is usually the cause. Then
        freeze the scheme and mark the rest.
      </p>
      <p>
        For the marking itself, our guide on{" "}
        <Link href="/blog/how-to-check-answer-sheets-faster/">checking 200 answer sheets faster</Link> covers
        question-by-question marking, totalling and moderation. Exam teams writing schemes for many papers may also find
        our page for <Link href="/for/exam-boards/">exam boards</Link> useful.
      </p>

      <WhereEvalezyFits>
        <p>
          Evalezy builds the scheme first, then checks. When you set up an assessment, you can{" "}
          <Link href="/question-paper-import/">upload the question paper</Link> and it is read into questions. For each
          question, Evalezy drafts a <Link href="/marking-scheme/">marking scheme</Link> with three to five criteria for a
          subjective question (one for an objective question), rescaled so the criteria add up exactly to the question’s
          marks.
        </p>
        <p>
          You can read and edit every criterion, set your own scheme for any question and add a model answer; a model
          answer you store is used instead of a generated one. The scheme is created once per question and used for
          every student’s copy, marks are given in half-mark steps, and in{" "}
          <Link href="/teacher-review/">teacher review</Link> you see the criteria breakdown behind every mark before
          you release results. See how it looks on a <Link href="/sample/">real checked copy</Link>.
        </p>
      </WhereEvalezyFits>

      <Sources
        items={[
          {
            label: "CBSE, Marking Scheme: Home Science (064), Senior Secondary School Examination 2025 (general instructions to examiners and value-point format)",
            url: "https://www.cbse.gov.in/cbsenew/Marking-Scheme/2025/XII/XII_064_MS_Home_Science-English_Version.pdf",
            checked: "2026-10-01",
          },
          {
            label: "CBSE, Marking Scheme for Examination (index of published marking schemes)",
            url: "https://www.cbse.gov.in/cbsenew/marking-scheme.html",
            checked: "2026-10-01",
          },
          {
            label: "CBSE Academic, Class XII Sample Question Paper and Marking Scheme for Exam 2025-26",
            url: "https://cbseacademic.nic.in/SQP_CLASSXII_2025-26.html",
            checked: "2026-10-01",
          },
          {
            label: "NCERT, Contemporary India II (Class 10 Geography), Chapter 1: Resources and Development (definition of resource, soil formation, soil erosion and conservation)",
            url: "https://ncert.nic.in/textbook/pdf/jess101.pdf",
            checked: "2026-10-01",
          },
        ]}
      />
    </BlogShell>
  );
}
