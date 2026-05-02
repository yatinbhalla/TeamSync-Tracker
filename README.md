# TeamSync Tracker

A lightweight team progress dashboard — an MVP alternative to Jira for small teams that need coordination without the overhead.

The insight behind this: most teams need 80% of what Jira does, at 10% of its complexity. This is that 10%.

We use the following tech stack:
- Google Gemini for AI-powered task suggestions and smart summaries
- TypeScript + React for the interface
- Tailwind CSS for styling
- localStorage for lightweight persistence

## 🚀 Features

* **Kanban Board:** To Do / In Progress / Done columns with drag-and-drop task movement
* **Ownership:** Assign tasks to team members so responsibility is always clear
* **Blocker Flagging:** Mark tasks as blocked and surface them prominently in the view
* **Sprint Mode:** Organize work into time-boxed sprints with a clear goal
* **Progress Dashboard:** At-a-glance view of team velocity and completion rate
* **Zero Setup:** No database, no accounts — runs in the browser immediately

## Setup

```bash
git clone https://github.com/yatinbhalla/TeamSync-Tracker.git
cd TeamSync-Tracker
npm install
echo "GEMINI_API_KEY=your_key_here" > .env.local
npm run dev
```

Get a free Gemini API key at [aistudio.google.com](https://aistudio.google.com/)

## Author

Yatin Bhalla
<br>
🛍️ PM & AI builder | Managing retail businesses | PG Product Management @ BITS School of Management
<br>
🔗 [Linkedin](https://linkedin.com/in/yatin-bhalla-834632238)
