# \[SEA\] Startup School: Prompt to Prototype — Session 7 Program Brief

## Session Title: "From Prototype to Product: Orchestrating AI Agents with Antigravity"

---

## 1\. Course Overview

**Business Goal (The "Why"):** Equip learners to enhance a deployed application with complex features by orchestrating autonomous AI agents in Google Antigravity — shifting their role from code writer to code reviewer and product orchestrator.

---

## 2\. Target Audience

**Primary Audience:** Mixed group of startup founders (non-technical to semi-technical) and software developers who have followed the Startup School series through Sessions 4-6. They have seen an AI-powered app get prototyped in AI Studio and deployed to production.

**Prerequisites (What they MUST know):**

- Completed or watched Sessions 4-6 (AI Studio prototyping, building the Sales Prep App, deploying to Cloud Run)  
- Understanding that the Sales Prep App is a live, deployed application  
- No prior IDE or coding experience required — Antigravity's interface will be introduced from scratch during the session

**Pain Point:** "My app is deployed, but it's just a prototype. Adding real features like audio processing or AI analysis feels like it requires a full engineering team I don't have. I know what I want the app to do — I just can't build it fast enough."

---

## 3\. Learning Outcomes (The "Know")

Upon completing this class, the learner will be able to:

- Explain the difference between **AI-assisted coding** (AI Studio) and **agent-driven development** (Antigravity), and when to use each  
- Describe the three core surfaces of Antigravity: **Editor View**, **Agent Manager**, and **Antigravity Browser**  
- Understand how **Agent Manager** enables **multi-agent parallel execution** — dispatching multiple agents on independent tasks simultaneously  
- Define what **Artifacts** are and how they create transparency and trust in AI-generated code  
- Understand how **Rules**, **Workflows**, **Skills**, and **MCP (Model Context Protocol)** configure an agent's behavior and extend its capabilities  
- Recognize how **Knowledge Items** allow agents to retain context across development sessions  
- Identify the "orchestrator" mindset — reviewing plans and diffs rather than writing code line-by-line  
- Explain the importance of **reviewing AI-generated code** before deploying, including security and data safety considerations

---

## 4\. Practical Skills (The "Do")

This course will enable the learner to:

- Import an existing project from **GitHub** into Antigravity  
- Navigate Antigravity's three core surfaces (Editor, Agent Manager, Browser) and understand what each is for  
- Dispatch multiple agents from **Agent Manager** to work on independent tasks in parallel  
- Configure **Rules**, **Workflows**, **Skills**, and **MCP connections** to set project-level standards, reusable procedures, and external tool integrations for agents  
- Write a **natural language feature request** as an agent prompt that produces a structured Implementation Plan  
- Review an agent-generated **Implementation Plan** and provide feedback before approving  
- Use the **Antigravity Browser** to verify agent-built features visually  
- **(Capstone Skill)** Direct an AI agent to add a "Post-Call Audio Briefing" feature to an existing deployed application — from prompt to working feature — without writing code manually

---

## 5\. Core Content & Concepts (SME Guidance)

---

### Module 1: "The Orchestrator Upgrade" — From Builder to Reviewer

**Time: \~8 minutes**

- **Concept:** The Shift from Driver to Director — "You've been driving the car. Now you're telling the self-driving car where to go — and checking that it took the right route."  
    
  - In Sessions 4-6, you were hands-on: writing prompts, tweaking settings, copying code, configuring deployments. That's the **builder** role.  
  - Antigravity introduces a fundamentally different model: **agent-first development**. You describe what you want in plain English. The agent plans, codes, tests, and verifies. You review and approve.  
  - Your role shifts from *code writer* to *code reviewer and orchestrator*.  
  - **For founders:** "Adding a complex feature doesn't require you to learn new frameworks. You describe the business outcome. The agent handles the engineering."  
  - **For developers:** "You focus on architecture, code quality, and design decisions. The agent handles the implementation grind — like having a tireless junior developer who never forgets to add error handling."


- **Analogy:** "AI Studio is great for quick prototyping — test a prompt, generate a snippet, spin up a single-page app. But when you're building for production — multiple files, routing, API integrations, error handling, testing — you need something that understands your entire codebase, not just one prompt at a time. That's Antigravity. It reads your project, follows your conventions, builds across files, and tests its own work. AI Studio gets you from zero to prototype. Antigravity gets you from prototype to production."  
    
- **Importing the Project: GitHub → Antigravity via MCP**  
    
  Before touring the surfaces, show the audience how the Sales Prep App got into Antigravity. This is the "bridge" from Session 6 (deployment) to Session 7 (enhancement).  
    
  **Say:** "Thu Ya deployed this app in Session 6\. The code lives on GitHub. To enhance it, we need to bring it into Antigravity. Now, I've already set up something called an **MCP connection** — specifically a GitHub MCP — which lets Antigravity talk directly to GitHub. So instead of opening a terminal and typing commands, I can just ask the agent."  
    
  Demonstrate by typing into the agent sidebar:

```
Clone the sales-prep-app repository from our GitHub organization into my projects folder.
```

  The agent should clone the repo using the GitHub MCP connection.


  **Say (to founders):** "GitHub is where your code lives — think of it as Google Drive for code. Normally you'd need to open a terminal and type commands to download it. With MCP, the agent handles that for you — you just ask."


  **Say (to developers):** "MCP — Model Context Protocol — lets Antigravity integrate with external tools and services. GitHub is one. We'll look at how to set this up when we get to the Editor. For now, just know the agent can pull code, read issues, check PRs — all through this connection."


  **Say:** "And now the project is open in Antigravity. When the agent works on a task, it reads the files it needs — your code, your configs, your dependencies. It builds context on the fly, so it understands what it's working with."


  **Presenter note:** For demo reliability, pre-clone the repo before the session. On stage, show the MCP clone command but have the project already loaded. If MCP fails on stage, fall back to: "The repo is already cloned locally — let me open it directly." Then show `git remote -v` to prove it came from GitHub.


- **UI Tour: The Three Surfaces (Quick Overview)**  
    
  With the Sales Prep App now loaded, do a quick flyover of each surface — don't go deep, just orient:  
    
  1. **Editor View:**  
       
     - "This looks like VS Code — but notice the agent sidebar on the right. That's not a chatbot. That's an autonomous developer that can read your entire codebase."  
     - Show the file tree of the Sales Prep App briefly. "When you give the agent a task, it reads through the relevant files to understand your project — your code structure, your patterns, your dependencies."

     

  2. **Agent Manager View (Mission Control):**  
       
     - Switch to Agent Manager.  
     - "This is Mission Control — we're coming back to this in a moment. This is where you dispatch agents, track their work, and review results."

     

  3. **Antigravity Browser:**  
       
     - "And the agent can open a real Chrome browser — test its own work and record video of what it did. Proof, not promises."


- **"Aha\!" Moment:** "In AI Studio, you type a prompt and get code back — but you're the one who reads the codebase, decides where things go, and wires it all together. Here, the agent reads your project, creates a plan, and asks you to review it before writing a single line of code. You approve, it builds. Then it tests its own work in a real browser. That's the game changer — human review before the build, automated testing after. You stay in control without doing the heavy lifting."  
    
- **Segue:** "Let me show you what Mission Control can really do. We're going to put two agents to work — right now, in parallel."

---

### Module 2: "Mission Control" — Agent Manager and Multi-Agent Execution

**Time: \~12 minutes**

- **Concept:** Parallel Agent Orchestration — "Why have one developer when you can have a team — working simultaneously, on different tasks, reporting back to you?"  
    
  - The **Agent Manager** is Antigravity's most differentiated feature. It's where you go from using AI as a single assistant to orchestrating a team of AI agents.  
      
  - Each agent works independently — different task, different files, no conflicts.  
      
  - You monitor all of them from one dashboard. When they finish, you review their artifacts.  
      
  - This is the "Mission Control" metaphor: you're the flight director, not the astronaut.  
      
  - Explanation for non-coders: "Imagine you're a startup CEO. You just hired two interns on their first day. You tell one: 'Write me a project overview that anyone can understand.' You tell the other: 'Draw me a diagram of how this app works.' They go off, do their thing, and come back with drafts for you to review. That's Agent Manager."  
      
  - Startup Use Cases:  
      
    1. Dispatching one agent to build a feature while another writes documentation — both finish faster than doing them sequentially  
    2. Running a code cleanup agent and a test-writing agent in parallel before a launch  
    3. Having one agent research competitor APIs while another prototypes an integration


- **Analogy:** "It's the difference between having one employee and having a team. Same office, same project, different tasks. You check in on each one and review their work."  
    
- **Demo: Dispatching Two Agents for Project Documentation**  
    
  Stay in the **Agent Manager view**. This demo is chosen specifically because:  
    
  - It's low-risk (docs don't break the app)  
  - It's fast (agents produce markdown quickly)  
  - It's visually impressive (Mermaid diagrams render on screen)  
  - It's non-conflicting (two agents, different output files)  
  - Both audiences see value (founders get readable docs, developers get architecture diagrams)


  **Step 1 — Frame it (1 min):**


  **Say:** "Before we build a complex feature, let me show you Agent Manager in action with something simple but useful. Our Sales Prep App has no documentation. No README, no architecture diagram. Let's fix that — with two agents working simultaneously."


  **Step 2 — Dispatch Agent 1 (1 min):**


  In Agent Manager, create a new agent task:

```
Generate a comprehensive README.md for this project.

Include:
- Project name and one-line description
- What the app does (Sales Prep App — helps startups prepare for sales calls)
- Tech stack used
- How to install and run locally (check package.json for scripts)
- How to set up environment variables (check for .env.example or existing env references)
- Folder structure overview
- How to deploy (reference Cloud Run setup from the existing config)
```

  **Say:** "Agent 1 has its mission: write a README that any new team member can follow."


  **Step 3 — Dispatch Agent 2 (1 min):**


  Create a second agent task:

```
Generate an ARCHITECTURE.md for this project with visual diagrams.

Include:
- A Mermaid flowchart showing the high-level architecture (frontend → API routes → Gemini API → response)
- A Mermaid component tree diagram showing the main UI components and their relationships
- A Mermaid sequence diagram showing the data flow for a typical "sales prep" request
- Brief text descriptions accompanying each diagram
- List of key technologies and their roles in the stack
```

  **Say:** "Agent 2 has a different mission: map the architecture with visual diagrams. Notice — both agents are now working at the same time, on different files. No conflicts."


  **Step 4 — Monitor from Mission Control (3-4 min):**


  Show the Agent Manager dashboard with both agents running:


  **Say:** "Look at this — two agents, two tasks, running in parallel. You can see their progress, their status. This is what 'orchestrator' means. You're not switching between tasks. You're monitoring a team."


  Point out:


  - The Inbox notifications as agents make progress  
  - The status indicators for each agent  
  - "If either agent has a question, it shows up in your Inbox. You answer it without interrupting the other agent."


  **While waiting, contextualize for the audience:**


  **Say (to founders):** "Think about what just happened. You described two tasks in plain English. Two AI developers are now executing simultaneously. For a startup with no dedicated technical writer, this is documentation that would have sat on the backlog forever — done in minutes."


  **Say (to developers):** "The agents aren't sharing context or stepping on each other's files. Agent 1 writes README.md, Agent 2 writes ARCHITECTURE.md. The Agent Manager handles the isolation. Think of it like two developers on two branches."


  **Step 5 — Review the Results (3-4 min):**


  When agents complete (or if taking long, show whichever finishes first):


  **README.md Result:**


  - Open the generated README.md  
  - "Look — proper setup instructions, environment variables, folder structure. This is immediately useful for any new person joining your project."


  **ARCHITECTURE.md Result (the visual wow):**


  - Open the generated ARCHITECTURE.md  
  - Show the rendered Mermaid diagrams:  
    - The architecture flowchart: "Here's the bird's-eye view — frontend talks to API routes, API routes call Gemini, results come back."  
    - The component tree: "Here's how the UI is organized."  
    - The sequence diagram: "And here's the step-by-step data flow."  
  - **Say:** "The agent read your entire codebase and generated visual architecture diagrams. No one asked it what framework you're using or how your routes work. It figured it out."


- **"Aha\!" Moment:** "You just generated professional documentation and architecture diagrams for your entire project — in parallel, with two agents — while you watched. Most startups have zero documentation. You now have two polished docs and you didn't write a word."  
    
- **Segue:** "Now, that was the warm-up. Two agents, simple tasks, impressive results. But before we tackle the big feature build, we need to set some ground rules. Just like you wouldn't let new hires loose without an onboarding doc — let me show you how to configure your agents."

---

### Module 3: "Teaching Your Agent the Rules" — Rules, Workflows, Skills, and MCP

**Time: \~10 minutes**

- **Concept:** Configuring Agent Behavior — "An agent without rules is like a new hire without an onboarding doc. Technically capable, but doesn't know your conventions."  
    
  Switch from Agent Manager to **Editor View**. The transition itself is a teaching moment.  
    
  **Say:** "We're switching to the Editor View now. Agent Manager is where you dispatch and monitor. Editor is where you configure and review code. Think of it like switching from the command center to the workshop floor."  
    
  **Say:** "Remember when I cloned the repo from GitHub using just a text prompt? That worked because of a configuration layer I set up beforehand. Let me show you all the ways you can configure your agent."  
    
  - Antigravity lets you configure four layers of agent behavior:  
      
    1. **Rules** — Project-level standards the agent must always follow  
    2. **Workflows** — Reusable multi-step procedures the agent can execute  
    3. **Skills** — Specialized capabilities you define for domain-specific tasks  
    4. **MCP (Model Context Protocol)** — External tool connections that extend what the agent can do

    

  - These aren't optional nice-to-haves. They're how you get **consistent, predictable results** and extend the agent's reach beyond just code.  
      
  - Explanation for non-coders: "Think of it like setting up a new employee. Rules are the company handbook ('we always use TypeScript'). Workflows are the SOPs ('when you build a new page, follow these steps'). Skills are the specializations ('you know how to process audio with our API'). And MCP connections are the tools you give them access to — like giving them a key to the GitHub account, Stitch for your designs, or the project management board."  
      
  - Startup Use Cases:  
      
    1. A 3-person startup where every developer has different coding styles — Rules enforce consistency even when the agent builds features  
    2. A founder handing off to a new contractor — Workflows capture institutional knowledge so the agent (or the contractor) follows the same steps every time  
    3. A product team that frequently adds AI-powered features — Skills encode the specific Gemini API patterns so the agent reuses proven patterns  
    4. A team that uses GitHub for code, Stitch for design, and Linear for tasks — MCP connections let the agent pull code, reference design mockups, and check issues without you copy-pasting context


- **Analogy:** "Rules are the guardrails on the highway. Workflows are the GPS route. Skills are the specialized driving modes. And MCP? MCP is the car's connectivity — Bluetooth to your phone, GPS to satellites, dashcam to the cloud. It lets the agent talk to the outside world."  
    
- **Demo: Setting Up Rules for the Sales Prep App**  
    
  In Antigravity Editor View, open the Rules configuration (show where this lives in the settings/project config).  
    
  **Example Rule (show on screen and type live):**

```
# Project Rules for Sales Prep App

## Code Standards
- Use TypeScript for all new files
- Follow the existing component pattern in src/components/
- Use the project's existing CSS/styling approach — do not introduce new styling libraries
- All API calls to Gemini must go through server-side routes, never client-side (to protect API keys)

## Naming Conventions
- Components use PascalCase (e.g., PostCallBriefing.tsx)
- API routes use kebab-case (e.g., /api/post-call-briefing)
- Files go in the existing directory structure — don't create new top-level folders

## Safety
- Never hardcode API keys in source files
- Always add loading and error states to user-facing features
- Sanitize any user-uploaded file inputs before processing
```

  **Say:** "I just gave the agent its onboarding doc. Now every feature it builds will follow these conventions. No more 'the AI used a different styling library' or 'it put the API key in the frontend code.'"


  **Say (to founders):** "You can write these rules in plain English. You don't need to know TypeScript to write 'use TypeScript for all new files.' You're setting policy, not writing code."


  **Say (to developers):** "If you've ever used ESLint configs or .editorconfig files — same idea, but in natural language and covering architectural decisions, not just formatting."


  **Show Workflows example (on screen, briefly):**

```
# Workflow: Add New Feature Page

Steps:
1. Create a new component in src/components/[FeatureName]/
2. Add a new route in the router configuration
3. Add a navigation link in the sidebar/nav component
4. Create a server-side API route if the feature needs backend logic
5. Add loading and error states
6. Test in the browser and take a screenshot
```

  **Say:** "This workflow means every time I say 'add a new feature page,' the agent follows these exact steps. Consistent results, every time. Notice step 6 — it even tests its own work in the browser."


  **Show Skills example (on screen, briefly):**

```
# Skill: Gemini Audio Analysis

When asked to analyze audio:
1. Accept audio files in mp3, wav, or m4a format
2. Use the Gemini 2.5 Flash model for processing (fast and cost-effective)
3. Send audio via the Gemini Files API — upload first, then reference the file URI
4. Always request structured output with these sections:
   - Call Summary, Key Topics, Action Items, Client Sentiment, Follow-ups
5. Display results using the app's existing card component pattern
6. Include proper error handling for: file too large, unsupported format, API timeout
```

  **Say:** "This Skill is going to matter in a moment. I just taught the agent exactly how we process audio in this project. When we ask it to build the audio feature, it won't guess — it'll follow this playbook."


  **Show MCP configuration (on screen, briefly):**


  Open Antigravity's built-in MCP settings panel. Show the GitHub MCP server already configured and connected.


  **Say:** "And this is how I set up the GitHub connection you saw earlier. MCP — Model Context Protocol — lets Antigravity connect to external tools. Antigravity has a built-in settings panel for this — you just pick the service, authenticate, and it's connected."


  Point out on screen:


  - The GitHub MCP server listed as connected/active  
  - "You can see the GitHub server is active — that's what let the agent clone our repo earlier with a simple prompt."


  **Now show Stitch MCP:**


  Still in the MCP settings panel, point to the Stitch MCP server — also configured and connected.


  **Say:** "And here's our second connection — Stitch. Stitch is Google's AI-powered design tool — you describe a UI in plain English, it generates polished mockups and even production-ready React code."


  Point out on screen:


  - The Stitch MCP server listed as connected/active


  **Say:** "With this connection, the agent can call Stitch to generate new page designs. Here's the cool part — the agent first analyzes your existing frontend code to understand your app's design patterns, then it crafts a detailed prompt and sends it to Stitch to generate a new page design that matches your existing look and feel."


  **Say (to founders):** "You don't need a designer. The agent looks at your existing app, understands the visual style, and asks Stitch to generate a matching design for the new page. Design ideation, handled by AI."


  **Say (to developers):** "The agent reads your CSS, your component patterns, your layout conventions — then generates a Stitch prompt that captures those patterns. Stitch returns a design with matching component structure and styling. The agent uses that as the blueprint for implementation."


  **Say:** "So now our agent has access to our code on GitHub and it can generate designs through Stitch. When we dispatch it to build a feature, it analyzes the existing design, generates a matching mockup via Stitch, plans the implementation, and builds — all connected."


  **Briefly mention other MCP possibilities (verbal only):**


  **Say:** "Beyond GitHub and Stitch, you could connect to your database, your CI/CD pipeline, or your project management tool. Each connection makes the agent more capable in your specific workflow."


- **"Aha\!" Moment:** "You just onboarded an AI developer in 2 minutes. It knows your project conventions, your standard procedures, your domain expertise, and it has access to your code on GitHub and can generate designs through Stitch. Try doing that with a human hire."  
    
- **Ethics & Safety Integration Point:**  
    
  **Say:** "Notice the Safety section in our rules. This is critical. When an AI agent is writing code for you, it will do exactly what you ask — including insecure things, if you let it. Rules like 'never hardcode API keys' and 'sanitize uploaded files' are your guardrails. Always review the agent's code for security — especially around user input, API keys, and data handling. The agent is capable, but you are responsible."  
    
- **Segue:** "Our agent is configured. It knows our rules, our workflows, our skills — and it has access to our code on GitHub and can generate designs through Stitch. Now let's go back to Mission Control and give it the real mission — adding a complex feature to our live app."

---

### Module 4: "Building with Your Agent" — The Live Feature Build (Capstone)

**Time: \~22 minutes**

- **Concept:** Agent-Driven Feature Development — "Describe it. Review the plan. Approve the build. Test the result."  
    
  Switch back to **Agent Manager**. This completes the narrative loop: Agent Manager (simple demo) → Editor (configure) → Agent Manager (complex build).  
    
  **Say:** "We're back in Mission Control. Earlier, we dispatched two agents for documentation — the warm-up. Now we're dispatching an agent for the real thing: a production feature."  
    
  - This is the capstone demo. We're going to add a **"Post-Call Audio Briefing"** feature to the live Sales Prep App using an Antigravity agent.  
      
  - The feature: Upload an audio recording of a sales call → Gemini transcribes and analyzes it → generates a structured briefing with summary, key topics, action items, client sentiment, and follow-up recommendations.  
      
  - This ties back to Felix's Session 3 on multimodality — audio understanding, put into a real production feature.  
      
  - The agent will use the **Rules**, **Workflow**, **Skill**, and **MCP connections** (Stitch) we just configured — demonstrating that the setup pays off.  
      
  - Startup Use Cases:  
      
    1. Sales team debriefs — stop relying on handwritten notes from calls  
    2. Customer success — analyze support calls for sentiment and escalation triggers  
    3. Investor meetings — auto-generate action items and follow-up commitments


- **Analogy:** "You're a restaurant owner. You just told your head chef: 'We need a new dish on the menu — something with these ingredients, presented this way, ready for tonight.' The chef writes a recipe (the plan), you taste-test it (the review), and if it's good, it goes on the menu (deployment). You didn't cook anything — but you directed the outcome."  
    
- **Demo: The Live Agent Build**  
    
  **Step 1 — Frame the Feature (2 min):**  
    
  **Say:** "Our Sales Prep App helps you prepare for calls. But what about after the call? Right now, someone takes notes — maybe. We're going to add a feature that takes a recorded sales call and generates a structured briefing automatically."  
    
  **Say:** "In Felix's session, he showed you how Gemini can understand audio. Now we're putting that capability inside our real app — and we're letting the agent build it. And because we set up our Rules, Workflow, and Audio Analysis Skill, the agent already knows exactly how to approach this."  
    
  **Step 2 — Dispatch from Agent Manager (2 min):**  
    
  In Agent Manager, create a new agent task:

```
Add a new feature to this Sales Prep App: a "Post-Call Briefing" page.

First, analyze the existing frontend design — component patterns, styling, layout conventions. Then use Stitch to generate a design for the new Post-Call Briefing page that matches the app's existing visual style. Use the generated design as the reference for implementation.

Requirements:
1. Add a new page/route called "Post-Call Briefing" accessible from the main navigation
2. The page should have an upload area where users can upload an audio file (mp3, wav, m4a)
3. When a file is uploaded, send it to the Gemini API for transcription and analysis
4. Display the results in a structured card layout with these sections:
   - Call Summary (2-3 sentence overview)
   - Key Topics Discussed (bulleted list)
   - Action Items (checklist format with owner assignments)
   - Client Sentiment (positive/neutral/negative with brief explanation)
   - Recommended Follow-ups (next steps)
5. Match the generated Stitch design for layout, component structure, and styling
6. Add proper loading states and error handling

Follow the project Rules, use the "Add New Feature Page" Workflow, and apply the "Gemini Audio Analysis" Skill.
```

  **Say:** "Look at the first few lines — I'm telling the agent to analyze the existing design, then use Stitch to generate a matching design for the new page. Remember that MCP connection we set up? This is where it pays off. The agent will study our app, call Stitch, get a design, and use it as the blueprint."


  **Say:** "And notice — I'm not writing code. I'm writing requirements. Like a product spec. The agent will turn this into an engineering plan."


  **Step 3 — The Implementation Plan (3 min):**


  The agent generates an **Implementation Plan** artifact.


  **Say:** "Before writing a single line of code, the agent created a plan. \[Read 2-3 key points aloud.\] It identified which files to modify, what new files to create, what the component structure looks like."


  **Say:** "And look — the plan shows the agent analyzed the existing design and generated a matching mockup through Stitch. The page layout, the card components, the styling — it's all consistent with the existing app. That's the MCP connection at work."


  **Say:** "See how the plan follows our Workflow — create component, add route, update nav, create API route, add error states, test in browser. That's not coincidence. That's the Workflow we configured."


  **Say (to founders):** "If you hired a developer, this is exactly the kind of plan you'd want to see before they start. You can comment on it — 'actually, put the sentiment section first' — and the agent incorporates your feedback."


  **Say (to developers):** "This is the Implementation Plan artifact. There are also Code Diffs, Walkthroughs, Screenshots, even Browser Recordings. Everything the agent does is documented and reviewable."


  Approve the plan — let the agent start building.


  **Step 4 — Narrate the Build (8-10 min):**


  While the agent works, narrate what it's doing. **Do not stand in silence.**


  Key visual beats to call out as they happen:


  - "Look — the agent is analyzing the existing frontend code first. It's reading the components, the CSS, the layout patterns..."  
  - "Now it's crafting a prompt for Stitch based on what it found — colors, fonts, card patterns, spacing. It's calling Stitch via MCP to generate the new page design..."  
  - "The Stitch design is back — the agent has a visual blueprint that matches our existing app. Now it starts building..."  
  - "It's creating the PostCallBriefing component — PascalCase, just like our naming rules..."  
  - "Now it's modifying the router to add the new route — following our Workflow step 2..."  
  - "Look — it's creating a server-side API route for the Gemini call. Remember our rule about never calling the API from the client? It followed that."  
  - "It's using the Gemini Files API to handle the audio upload — that's from our Audio Analysis Skill..."  
  - "Now the analysis logic — requesting structured output with the exact sections we specified..."  
  - "It's adding loading states and error handling — Workflow step 5..."  
  - "It's opening the browser to test — Workflow step 6..."


  **Fill time with narration topics (pick 1-2 depending on pacing):**


  **Topic A — The Trust Gap:** "How do you trust code you didn't write? That's the biggest question. Antigravity's answer is Artifacts — an audit trail for everything the agent does. Implementation Plans before it starts. Code Diffs so you see every change. Browser Recordings proving it tested the feature. You wouldn't merge a pull request without reviewing it — same principle."


  **Topic B — Knowledge Items:** "Here's something powerful for ongoing development. Antigravity remembers. It captures patterns and solutions from previous sessions into Knowledge Items. Next time you ask it to build a feature, it already knows your project's conventions. Like onboarding a new hire — except it retains everything perfectly."


  **Topic C — Why Antigravity for Production:** "AI Studio is fantastic for prototyping — you saw Mark build a working app in a single session. But production is a different game. Production means multiple files that need to work together. It means API routes, environment variables, error handling, security. It means testing. AI Studio generates code one prompt at a time — you copy it, paste it, wire it up yourself. Antigravity's agent reads your entire codebase, understands how the pieces connect, builds across files, follows your rules, and tests its own work. That's the difference between sketching a blueprint and actually constructing the building."


  **⚠️ Timing Note:** The Stitch design generation adds an API round-trip at the start of the build. If the Stitch call is slow or fails, the agent can proceed without it — it will use its own analysis of the existing frontend as the design reference instead. Factor this into pacing.


  **⚠️ Decision Point (at \~8 min into the build):** If the agent is not near completion, transition to fallback. See SKILLS.md Fallback A for exact procedure.


  **Step 5 — Build Complete:**


  **Say:** "The agent reports it's done. But our job as the orchestrator is to verify. Trust, but verify."


  **Step 6 — Test and Reveal (5 min):**


  Ask the agent to test via the Antigravity Browser (or open browser manually):

```
Open the app in the browser and navigate to the Post-Call Briefing page.
```

  The new page should appear with an upload area.


  **Say:** "There's our new page. Now let's feed it a real recording."


  Upload the pre-prepared sample audio file (`sample-sales-call.mp3` — a 2-3 min simulated sales call).


  **Say:** "This is a 2-minute recording of a simulated sales call. Gemini is going to listen to this, transcribe it, and generate our briefing."


  Wait for processing (\~15-30 seconds).


  **When results appear, walk through each section:**


  - "Call Summary — \[read it\]. Accurate."  
  - "Key Topics — it caught the pricing discussion, the competitor mention, the timeline concern."  
  - "Action Items — it even assigned owners based on who said what in the call."  
  - "Client Sentiment — neutral-to-positive, flagged budget concerns. Spot on."  
  - "Follow-up recommendations — exactly what a sales manager would want."


- **"Aha\!" Moment:** "You just added a production-quality feature — audio processing, AI analysis, structured output, UI — to a live application. You didn't write a single line of code. You wrote requirements, configured rules, and reviewed a plan. That's the orchestrator model."  
    
- **Segue:** "Let's step back and look at the full journey."

---

### Module 5: "Your Builder's Roadmap" — What's Next

**Time: \~8 minutes**

- **Concept:** From Session to Practice — "The session ends, but your builder journey doesn't."  
    
  - Recap the full program arc:  
      
    - **Session 3 (Felix):** What AI can understand — text, images, audio, video (multimodality)  
    - **Sessions 4-5 (Mark):** How to prototype with AI Studio — building the Sales Prep App  
    - **Session 6 (Thu Ya):** How to deploy — taking code to production with Cloud Run  
    - **Session 7 (You / Alvin):** How to enhance — adding complex features with AI agents

    

  - The complete startup builder toolkit: | Stage | Tool | Your Role | |---|---|---| | Ideate & Experiment | AI Studio | Explorer | | Prototype | AI Studio \+ Code | Builder | | Design | Stitch | Creative Director | | Deploy | Cloud Run \+ Firebase | DevOps | | Enhance & Scale | Antigravity | Orchestrator |  
      
  - Recap what we built today: | What We Did | What It Demonstrated | |---|---| | Toured the 3 surfaces | Antigravity's unique architecture | | Dispatched 2 agents for docs | Multi-agent parallel execution | | Set up Rules, Workflows, Skills, MCP (GitHub \+ Stitch) | Agent configuration, consistency, and design-to-code pipeline | | Built Post-Call Briefing feature | Full agent-driven development cycle |  
      
  - **Next steps for founders:**  
      
    1. Download Antigravity (free public preview) and open an existing project  
    2. Write Rules for your project in plain English — even if you don't code, you can set the standards  
    3. Start with simple tasks — use Agent Manager to generate a README for your project like we just did  
    4. Graduate to feature builds once you trust the review loop

    

  - **Next steps for developers:**  
      
    1. Bring your existing codebase into Antigravity  
    2. Set up Rules, a Workflow, and at least one Skill for your most common patterns  
    3. Try dispatching multiple agents from Agent Manager on independent tasks  
    4. Explore Knowledge Items — let the agent build institutional memory for your project

    

  - **Ethics & Safety Closing:** "One last thing. AI agents are powerful, but you are accountable. Always review generated code before deploying. Check for hardcoded secrets, check for security vulnerabilities, check that user data is handled properly. The agent follows instructions — including bad ones. Your job as the orchestrator is to be the quality gate. That responsibility doesn't go away because the code was written by an AI."


- **Closing Message:** "You started this program with an idea. You prototyped it. You deployed it. And today, you enhanced it with capabilities that would have taken a team weeks to build. The tools will keep evolving — new models, new agents, new capabilities. But the skill you've built — clearly describing what you want, reviewing what you get, and iterating with intent — that's the skill that compounds. Go build."  
    
- **Call to Action:**  
    
  - Download Antigravity: [antigravity.google](https://antigravity.google)  
  - Revisit AI Studio: [aistudio.google.com](https://aistudio.google.com)  
  - Continue learning: Link to program resources / community

---

## 6\. Resources

- **Google Antigravity** — [antigravity.google](https://antigravity.google) (download & documentation)  
- **Google AI Studio** — [aistudio.google.com](https://aistudio.google.com)  
- **Antigravity Documentation** — [antigravity.google/docs](https://antigravity.google/docs)  
- **Gemini API Documentation** — [ai.google.dev](https://ai.google.dev)  
- **Session Demo Code** — \[Link to Sales Prep App repo — coordinate with Thu Ya\]  
- **Sample Audio File** — \[Link to the pre-recorded sales call sample\]  
- **Session Slides** — \[To be created\]

---

## Appendix A: Session Parameters

| Parameter | Value |
| :---- | :---- |
| Duration | 60 minutes |
| Demo format | Semi-live (pre-staged baseline, agent adds feature live) |
| Audience split | 50/50 founders and developers |
| App state | Real deployed Sales Prep App from Session 6 |
| Presenter | Alvin (DevRel Engineer) |
| Fallback plan | Pre-built `feature/audio-analysis-complete` branch |
| Detailed demo guide | See SKILLS.md |

## Appendix B: Timing Summary

| Module | Topic | Duration |
| :---- | :---- | :---- |
| Module 1 | The Orchestrator Upgrade — Antigravity intro \+ 3 surfaces overview | 8 min |
| Module 2 | Mission Control — Agent Manager \+ multi-agent docs demo | 12 min |
| Module 3 | Teaching Your Agent — Rules, Workflows, Skills, MCP (Editor View) | 10 min |
| Module 4 | Building with Your Agent — Live feature build (capstone, Agent Manager) | 22 min |
| Module 5 | Your Builder's Roadmap — Recap \+ next steps \+ CTA | 8 min |
| **Total** |  | **60 min** |

## Appendix C: Session Flow Diagram

```
Module 1 (Intro)          Module 2 (Agent Manager)      Module 3 (Editor)         Module 4 (Agent Manager)    Module 5 (Wrap)
─────────────────────── → ──────────────────────────── → ─────────────────────── → ──────────────────────────── → ──────────────
Overview + 3 Surfaces       Dispatch 2 agents:            Switch to Editor:         Back to Agent Manager:       Recap journey
GitHub MCP clone            • Agent 1: README.md          • Set up Rules            • Dispatch feature agent     Next steps
Quick orientation           • Agent 2: ARCHITECTURE.md    • Show Workflow           • Review Implementation Plan CTA
                            Show parallel execution       • Show Skill              • Narrate build
                            Review results + Mermaid      • Show MCP (GitHub+Stitch)• Test with audio file
                            diagrams                      Ethics/Safety note        • "Aha!" moment
```

## Appendix D: Key Analogies Quick Reference

| Concept | Analogy |
| :---- | :---- |
| AI Studio vs Antigravity | Prototype to production — sketch a blueprint vs construct the building |
| Your role shift | Driver → director of self-driving car |
| Agent-first development | Restaurant owner directing the chef, not cooking |
| Agent Manager | Mission Control — flight director, not astronaut |
| Multi-agent execution | A team of employees working on different tasks simultaneously |
| Rules | Company handbook for new hires |
| Workflows | SOPs (Standard Operating Procedures) |
| Skills | Specialized driving modes (sport mode, eco mode) |
| MCP connections | Car connectivity — Bluetooth, GPS, dashcam to cloud |
| Artifacts | Audit trail / pull request review system |
| Knowledge Items | Institutional memory that never forgets |
| The full program arc | Idea → sketch → build → deploy → enhance |

